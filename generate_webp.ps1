param(
    [switch]$All,

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$RemainingArgs
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Directory = "src/static"

foreach ($argument in $RemainingArgs) {
    if ($argument -eq "--all") {
        $All = $true
    }
    else {
        Write-Error "Unknown option: $argument"
        exit 1
    }
}

if (-not (Test-Path -LiteralPath $Directory -PathType Container)) {
    Write-Error "Directory '$Directory' does not exist."
    exit 1
}

$cwebp = Get-Command cwebp -ErrorAction SilentlyContinue
if (-not $cwebp) {
    Write-Error "Error: cwebp command not found."
    exit 1
}

$jpgFiles = Get-ChildItem -LiteralPath $Directory -File -Filter "*.jpg"

foreach ($jpgFile in $jpgFiles) {
    $webpFile = [System.IO.Path]::ChangeExtension($jpgFile.FullName, ".webp")

    if (-not $All -and (Test-Path -LiteralPath $webpFile -PathType Leaf)) {
        continue
    }

    Write-Host "Converting: $($jpgFile.Name) -> $([System.IO.Path]::GetFileName($webpFile))"
    & $cwebp.Source -q 80 $jpgFile.FullName -o $webpFile
}

Write-Host "Processing complete."
