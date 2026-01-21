import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      aria-label="LanguageKids Logo"
      {...props}
      className={cn("fill-current", props.className)}
    >
      <g transform="matrix(1,0,0,1,0,0)">
        <path
          d="M 20 80 L 20 20 L 45 20 L 45 35 L 35 35 L 35 80 Z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            opacity: 1,
          }}
          transform="translate(0, 0)"
        />
        <path
          d="M 55 80 L 55 20 L 80 20 L 80 35 L 70 35 L 70 45 L 75 45 L 75 60 L 70 60 L 70 80 Z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            opacity: 1,
          }}
          transform="translate(0, 0)"
        />
      </g>
    </svg>
  );
}
