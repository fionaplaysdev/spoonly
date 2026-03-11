interface CupboardIconProps {
  className?: string
}

export function CupboardIcon({ className }: CupboardIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Cupboard outline */}
      <rect x="3" y="2" width="18" height="20" rx="1" />
      {/* Center divider */}
      <line x1="12" y1="2" x2="12" y2="22" />
      {/* Left door handle */}
      <line x1="9" y1="10" x2="9" y2="14" />
      {/* Right door handle */}
      <line x1="15" y1="10" x2="15" y2="14" />
    </svg>
  )
}
