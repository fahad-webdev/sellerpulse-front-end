import React from 'react';

const GaugeChart = ({ percentage, color }) => {
    const radius = 60;
    const strokeWidth = 15;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <svg
        height={radius}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <path
          d={`
            M ${radius}, ${radius}
            m -${normalizedRadius}, 0
            a ${normalizedRadius},${normalizedRadius} 0 1,1 ${normalizedRadius * 2},0
            a ${normalizedRadius},${normalizedRadius} 0 1,1 -${normalizedRadius * 2},0
          `}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <path
          d={`
            M ${radius}, ${radius}
            m -${normalizedRadius}, 0
            a ${normalizedRadius},${normalizedRadius} 0 1,1 ${normalizedRadius * 2},0
            a ${normalizedRadius},${normalizedRadius} 0 1,1 -${normalizedRadius * 2},0
          `}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.35s' }}
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fill="#000"
          fontSize="1.5em"
          fontWeight="bold"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
        >
          {percentage}%
        </text>
      </svg>
    );
  };
  

export default GaugeChart;
