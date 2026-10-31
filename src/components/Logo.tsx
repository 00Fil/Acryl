export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="7" fill="#2a52ff" fillOpacity=".55" />
      <rect x="11" y="11" width="20" height="20" rx="7" fill="#2a52ff" fillOpacity=".55" />
      <path d="M11 18a7 7 0 0 0 7 7h-1a6 6 0 0 1-6-6zM21 14a7 7 0 0 0-7-7h1a6 6 0 0 1 6 6z" fill="none" />
      <rect x="11" y="11" width="10" height="10" rx="3" fill="#1b3ad1" />
    </svg>
  );
}
