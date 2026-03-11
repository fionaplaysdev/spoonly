interface SpoonIconProps {
  className?: string
}

export function SpoonIcon({ className }: SpoonIconProps) {
  return (
    <svg 
      viewBox="0 0 10 28" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Spoon bowl - vertical oval */}
      <ellipse cx="5" cy="5.5" rx="3" ry="4.5" />
      {/* Handle - outlined rounded rectangle */}
      <path d="M3.5 10 L3.5 26 Q3.5 27 5 27 Q6.5 27 6.5 26 L6.5 10" />
    </svg>
  )
}
