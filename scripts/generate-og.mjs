import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

// Blue theme colors
const PRIMARY = '#0046C8';
const PRIMARY_LIGHT = '#4A8FE7';
const BG_DARK = '#0B1120';

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main gradient background -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_DARK}"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <!-- Blue accent gradient -->
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PRIMARY}"/>
      <stop offset="100%" stop-color="${PRIMARY_LIGHT}"/>
    </linearGradient>
    <!-- Glow filter -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="20" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="950" cy="120" r="200" fill="${PRIMARY}" opacity="0.08"/>
  <circle cx="200" cy="500" r="250" fill="${PRIMARY_LIGHT}" opacity="0.06"/>
  <circle cx="1100" cy="530" r="150" fill="${PRIMARY}" opacity="0.05"/>

  <!-- Grid pattern overlay -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="url(#accent)"/>

  <!-- Code bracket decorations -->
  <text x="80" y="280" font-family="Consolas, monospace" font-size="160" font-weight="800" fill="${PRIMARY}" opacity="0.12">{</text>
  <text x="1040" y="480" font-family="Consolas, monospace" font-size="160" font-weight="800" fill="${PRIMARY_LIGHT}" opacity="0.10">}</text>

  <!-- Main title: VIBE -->
  <text x="600" y="230" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="96" font-weight="900" fill="white" letter-spacing="-2">VIBE</text>

  <!-- Main title: CODING -->
  <text x="600" y="330" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="96" font-weight="900" fill="url(#accent)" letter-spacing="-2">CODING</text>

  <!-- Subtitle -->
  <text x="600" y="400" text-anchor="middle" font-family="'Noto Sans KR', Arial, sans-serif" font-size="30" font-weight="600" fill="#94A3B8">AI Cursor | Claude Code | Codex</text>

  <!-- Divider line -->
  <rect x="450" y="430" width="300" height="2" rx="1" fill="url(#accent)" opacity="0.5"/>

  <!-- Description -->
  <text x="600" y="478" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="22" fill="#CBD5E1">Vibe Coding Learning Platform</text>

  <!-- Bottom bar with branding -->
  <rect x="0" y="560" width="${WIDTH}" height="70" fill="rgba(0,0,0,0.3)"/>
  <rect x="0" y="560" width="${WIDTH}" height="1" fill="rgba(255,255,255,0.06)"/>

  <!-- DreamIT Biz logo text -->
  <text x="80" y="602" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="700" fill="${PRIMARY_LIGHT}">DreamIT Biz</text>

  <!-- URL -->
  <text x="1120" y="602" text-anchor="end" font-family="'JetBrains Mono', Consolas, monospace" font-size="16" fill="#64748B">vibe.dreamitbiz.com</text>

  <!-- Tool icons as text badges -->
  <rect x="310" y="500" width="120" height="36" rx="18" fill="rgba(0,70,200,0.15)" stroke="${PRIMARY}" stroke-width="1" opacity="0.8"/>
  <text x="370" y="524" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="${PRIMARY_LIGHT}">Cursor</text>

  <rect x="450" y="500" width="160" height="36" rx="18" fill="rgba(0,70,200,0.15)" stroke="${PRIMARY}" stroke-width="1" opacity="0.8"/>
  <text x="530" y="524" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="${PRIMARY_LIGHT}">Claude Code</text>

  <rect x="630" y="500" width="120" height="36" rx="18" fill="rgba(0,70,200,0.15)" stroke="${PRIMARY}" stroke-width="1" opacity="0.8"/>
  <text x="690" y="524" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="${PRIMARY_LIGHT}">Codex</text>

  <rect x="770" y="500" width="120" height="36" rx="18" fill="rgba(0,70,200,0.15)" stroke="${PRIMARY}" stroke-width="1" opacity="0.8"/>
  <text x="830" y="524" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="${PRIMARY_LIGHT}">Copilot</text>
</svg>`;

async function generate() {
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log(`OG image generated: ${outputPath}`);
  console.log(`Size: ${WIDTH}x${HEIGHT}`);
}

generate().catch(console.error);
