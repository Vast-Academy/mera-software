import React from 'react'

const Logo = ({w,h}) => {
  return (
    <svg width={w} height={h} viewBox="0 0 200 300">
<g transform="translate(25, 30)">
    <path d="M70,60 L50,100 L70,140" 
          stroke="#4a90e2" 
          stroke-width="12" 
          stroke-linecap="round" 
          fill="none"/>
    
    <path d="M130,60 L150,100 L130,140" 
          stroke="#2ecc71" 
          stroke-width="12" 
          stroke-linecap="round" 
          fill="none"/>
    
    <circle cx="100" cy="80" r="8" fill="#4a90e2"/>
    <circle cx="100" cy="120" r="8" fill="#2ecc71"/>
    
    <path d="M92,80 L70,80" 
          stroke="#4a90e2" 
          stroke-width="6" 
          stroke-linecap="round"/>
    
    <path d="M108,120 L130,120" 
          stroke="#2ecc71" 
          stroke-width="6" 
          stroke-linecap="round"/>
  </g>

  <g transform="translate(100, 230)">
    <text x="25" y="-20" 
          font-family="Arial" 
          font-size="32" 
          font-weight="bold" 
          fill="#4a90e2" 
          text-anchor="middle">Mera</text>
    
    <text x="25" y="10" 
          font-family="Arial" 
          font-size="32" 
          font-weight="bold" 
          fill="#2ecc71" 
          text-anchor="middle">Software</text>
  </g>
</svg>
  )
}

export default Logo
