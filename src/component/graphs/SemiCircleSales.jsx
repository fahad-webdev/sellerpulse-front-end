import React, { useEffect, useState } from "react";

const SemiCircleSales = ({
  percentage,
  color,
  radius = 100,
  strokeWidth = 20,
  textMarginTop = "1.5rem", // New prop for margin-top in text
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const animationDuration = 1500; // Animation duration in ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const animationProgress = Math.min(elapsedTime / animationDuration, 1);
      const currentPercentage = animationProgress * percentage;
      setAnimatedPercentage(currentPercentage);

      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage]);

  return (
    <svg
      height={radius}
      width={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius + strokeWidth}`}
      style={{ overflow: "visible" }}
    >
      <path
        d={`
          M ${strokeWidth / 2}, ${normalizedRadius + strokeWidth / 2}
          A ${normalizedRadius},${normalizedRadius} 0 1,1 ${
          radius * 2 - strokeWidth / 2
        },${normalizedRadius + strokeWidth / 2}
        `}
        stroke="#d0d0d0d9"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round" // Add border-radius to unfilled portion
      />
      <path
        d={`
          M ${strokeWidth / 2}, ${normalizedRadius + strokeWidth / 2}
          A ${normalizedRadius},${normalizedRadius} 0 1,1 ${
          radius * 2 - strokeWidth / 2
        },${normalizedRadius + strokeWidth / 2}
        `}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: "stroke-dashoffset 0.35s",
          strokeLinecap: "round", // Add border-radius to filled portion
        }}
      />
      <text
        x="50%"
        y="50%"
        dy={textMarginTop} // Adjusted to include margin-top
        textAnchor="middle"
        fill={color}
        fontSize="2.5em"
        fontWeight="bold"
      >
        +{Math.round(animatedPercentage)}%
      </text>
    </svg>
  );
};

export default SemiCircleSales;
