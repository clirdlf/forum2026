Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ImageDir = "src/static"
$MaxWidth = 2560
$MaxHeight = 1400

if (-not (Test-Path -LiteralPath $ImageDir -PathType Container)) {
    Write-Error "Error: directory not found: $ImageDir"
    exit 1
}

$identify = Get-Command identify -ErrorAction SilentlyContinue
$mogrify = Get-Command mogrify -ErrorAction SilentlyContinue
$magick = Get-Command magick -ErrorAction SilentlyContinue

if ((-not $identify -or -not $mogrify) -and -not $magick) {
    Write-Error @"
Error: ImageMagick not found. Install with:
  winget install ImageMagick.ImageMagick
"@
    exit 1
}

function Invoke-ImageIdentify {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if ($identify) {
        & $identify.Source -ping -format "%w %h" -- $Path 2>$null
    }
    else {
        & $magick.Source identify -ping -format "%w %h" -- $Path 2>$null
    }
}

function Invoke-ImageMogrify {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if ($mogrify) {
        & $mogrify.Source -auto-orient -resize "${MaxWidth}x${MaxHeight}>" -- $Path
    }
    else {
        & $magick.Source mogrify -auto-orient -resize "${MaxWidth}x${MaxHeight}>" -- $Path
    }
}

$images = Get-ChildItem -LiteralPath $ImageDir -Recurse -File |
    Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' }

if (-not $images) {
    Write-Host "No images found in $ImageDir matching jpg/jpeg/png."
    exit 0
}

foreach ($image in $images) {
    $imagePath = $image.FullName
    $dimOutput = Invoke-ImageIdentify -Path $imagePath

    if ([string]::IsNullOrWhiteSpace($dimOutput)) {
        Write-Host "Skipping unreadable or unsupported file: $imagePath"
        continue
    }

    $parts = $dimOutput.Trim() -split '\s+'
    if ($parts.Count -ne 2 -or $parts[0] -notmatch '^\d+$' -or $parts[1] -notmatch '^\d+$') {
        Write-Host "Skipping file with unexpected dimensions output: $imagePath -> '$dimOutput'"
        continue
    }

    $width = [int]$parts[0]
    $height = [int]$parts[1]

    if ($width -gt $MaxWidth -or $height -gt $MaxHeight) {
        Write-Host "Resizing: $imagePath (${width}x${height}) -> fit within ${MaxWidth}x${MaxHeight}"
        Invoke-ImageMogrify -Path $imagePath
    }
    else {
        Write-Host "Skipping: $imagePath (${width}x${height}) within limits"
    }
}
