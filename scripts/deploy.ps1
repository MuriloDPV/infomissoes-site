# Publica o site no container "site" (ssh murilo@site, nginx em /var/www/site).
# Uso, na pasta do projeto:  npm run deploy
#
# Por que existe (04/11/2026): o scp vindo do Windows criava as pastas com permissão 700. O nginx (www-data)
# não lia os CSS e as fontes e o site ficou sem estilo. Este script SEMPRE acerta as permissões no fim
# (pastas 755, arquivos 644) e confere se a página e o CSS abrem. Para em qualquer erro.

$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$Destino = 'murilo@site'
$Pasta = '/var/www/site'
$Url = 'https://infomissoes.net.br'

function Passo($texto) { Write-Host "==> $texto" -ForegroundColor Cyan }
function Falhou($texto) { Write-Host "ERRO: $texto" -ForegroundColor Red; exit 1 }

Passo 'Build'
npm run build
if ($LASTEXITCODE -ne 0) { Falhou 'o build falhou; nada foi enviado.' }

Passo "Enviando dist/ para ${Destino}:${Pasta}"
scp -r dist/* "${Destino}:${Pasta}/"
if ($LASTEXITCODE -ne 0) { Falhou 'o envio (scp) falhou. Confira se o Tailscale está ligado e se "ssh murilo@site" entra.' }

Passo 'Acertando permissões (pastas 755, arquivos 644)'
ssh $Destino "find $Pasta -type d -exec chmod 755 {} + && find $Pasta -type f -exec chmod 644 {} + && echo PERMISSOES-OK"
if ($LASTEXITCODE -ne 0) { Falhou 'não consegui acertar as permissões. Rode à mão: ssh murilo@site "find /var/www/site -type d -exec chmod 755 {} + && find /var/www/site -type f -exec chmod 644 {} +"' }

Passo "Conferindo $Url (página e CSS)"
try {
  $pagina = Invoke-WebRequest -Uri "$Url/?deploy=$(Get-Date -Format yyyyMMddHHmmss)" -UseBasicParsing -TimeoutSec 30
} catch { Falhou "a página não abriu: $($_.Exception.Message)" }
$css = [regex]::Match($pagina.Content, 'href="(/[^"]+\.css)"').Groups[1].Value
if (-not $css) {
  Write-Host 'Aviso: não achei link de CSS na página (conferir no navegador).' -ForegroundColor Yellow
} else {
  try {
    $r = Invoke-WebRequest -Uri "$Url$css" -UseBasicParsing -TimeoutSec 30
    if ($r.StatusCode -ne 200) { Falhou "o CSS respondeu $($r.StatusCode)." }
  } catch { Falhou "o CSS ($css) não abriu: $($_.Exception.Message). Provável permissão ou cache; rode o passo de permissões de novo." }
}

Write-Host "Deploy ok: $Url" -ForegroundColor Green
