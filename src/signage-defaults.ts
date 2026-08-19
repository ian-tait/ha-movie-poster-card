export const DEFAULT_SIGNAGE_HTML = `<div class="mpc-wrap">
  <div class="mpc-dots"></div>
  <div class="mpc-body">
    <div class="mpc-title">Family Cinema</div>
    <div class="mpc-sub">&#10022; &nbsp; Possibly Showing at a Living Room Near You &nbsp; &#10022;</div>
  </div>
  <div class="mpc-dots"></div>
</div>`;

export const DEFAULT_SIGNAGE_CSS = `.mpc-wrap {
  background: linear-gradient(180deg, #120900 0%, #1f1000 60%, #2a1500 100%);
  border: 1.5px solid #a87020;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,200,80,0.1);
  overflow: hidden;
}
.mpc-dots {
  height: 13px;
  background-image: radial-gradient(circle, #f5c518 3px, transparent 3px);
  background-size: 32px 13px;
  background-position: 0px 50%;
  filter: drop-shadow(0 0 3px #f5c518) drop-shadow(0 0 6px rgba(245,197,24,0.5));
}
.mpc-body {
  padding: 5px 16px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.mpc-title {
  font-family: 'Cinzel', 'Palatino Linotype', Georgia, serif;
  font-size: clamp(12px, 1.6vw, 22px);
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #f5c518;
  white-space: nowrap;
  animation: mpc-glow 3.5s ease-in-out infinite;
}
@keyframes mpc-glow {
  0%, 100% { text-shadow: 0 0 10px rgba(245,197,24,0.5), 0 0 22px rgba(245,197,24,0.2); }
  50%       { text-shadow: 0 0 18px rgba(245,197,24,0.95), 0 0 38px rgba(245,197,24,0.5), 0 0 64px rgba(245,197,24,0.2); }
}
.mpc-sub {
  font-size: clamp(9px, 0.9vw, 12px);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #c8922a;
  transition: opacity 0.65s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.mpc-sub.mpc-fading { opacity: 0; }`;

export const DEFAULT_SIGNAGE_JS = `// host = the signage container element
const quotes = [
  '✦   Possibly Showing at a Living Room Near You   ✦',
  '✦   Showing Near You, If You Are Lucky   ✦',
  '✦   Maybe If You Ask Dad Nicely   ✦',
  "✦   Now Showing — But It's Dad's TV, You'd Better Ask Him   ✦",
  '✦   Warning: Dad Controls the Remote   ✦',
  "✦   Tonight's Feature Handpicked by Dad   ✦",
  "✦   Two Stars: One for the Film, One for Dad's Running Commentary   ✦",
  '✦   Rated PG: Pretty Good, According to Dad   ✦',
  '✦   Dad Has Spoken. Popcorn Is Optional.   ✦',
  '✦   No Refunds. But You Can Always Ask Dad Nicely.   ✦',
];

// Shuffle
for (let i = quotes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [quotes[i], quotes[j]] = [quotes[j], quotes[i]];
}

const el = host.querySelector('.mpc-sub');
if (el) {
  let qi = 0;
  el.textContent = quotes[0];
  setInterval(() => {
    el.classList.add('mpc-fading');
    setTimeout(() => {
      qi = (qi + 1) % quotes.length;
      el.textContent = quotes[qi];
      el.classList.remove('mpc-fading');
    }, 650);
  }, 7000);
}`;
