const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="120 40 160 170"
    >
      <g transform="rotate(-5 200 125)">
        <rect
          x="150"
          y="50"
          width="100"
          height="140"
          rx="8"
          ry="8"
          fill="#2e1f0f"
          stroke="#d4af37"
          stroke-width="4"
        />

        <rect
          x="155"
          y="55"
          width="90"
          height="130"
          rx="6"
          ry="6"
          fill="#1b1308"
          stroke="#8b5e3c"
          stroke-width="2"
        />

        <rect
          x="160"
          y="60"
          width="80"
          height="60"
          rx="4"
          ry="4"
          fill="#111"
          stroke="#f5d300"
          stroke-width="1"
        />

        <circle
          cx="200"
          cy="90"
          r="10"
          fill="#f5d300"
          stroke="#000"
          stroke-width="2"
        />
        <path
          d="M180 90 Q200 75 220 90 Q200 105 180 90"
          fill="none"
          stroke="#f5d300"
          stroke-width="2"
        />

        <line
          x1="165"
          y1="135"
          x2="235"
          y2="135"
          stroke="#f5d300"
          stroke-width="1"
        />
        <line
          x1="165"
          y1="140"
          x2="235"
          y2="140"
          stroke="#f5d300"
          stroke-width="1"
        />
        <line
          x1="165"
          y1="145"
          x2="235"
          y2="145"
          stroke="#f5d300"
          stroke-width="1"
        />
      </g>

      <circle cx="200" cy="125" r="75" fill="url(#glow)" opacity="0.15" />

      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f5d300" />
          <stop offset="100%" stop-color="#0d0d1a" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Logo;
