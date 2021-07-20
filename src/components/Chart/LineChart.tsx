import React, { memo, useMemo, useRef, useEffect, useState } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { intToString } from './utils';
import './LineChart.css';

export interface ChartPoint {
  index: number;
  title?: string;
  value: number;
}

interface LineChartProps {
  points: ChartPoint[];
  y?: string;
  x?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = memo(
  ({ points = [], height = 270, y, x }) => {
    const windowWidth = useWindowWidth();
    const svgRef = useRef<SVGSVGElement>(null);
    const [svgWidth, setSvgWidth] = useState(0);
    useEffect(() => {
      setSvgWidth((svgRef.current as SVGSVGElement).clientWidth);
    }, [windowWidth]);
    const len = points.length
      ? points[points.length - 1].index - points[0].index + 1
      : 0;
    const { max, min } = useMemo(
      () =>
        points.reduce(
          (acc, p) => {
            return {
              min: Math.min(p.value, acc.min),
              max: Math.max(p.value, acc.max),
            };
          },
          { max: -Infinity, min: Infinity }
        ),
      [points]
    );
    const scaleY = (max - Math.min(min, 0)) / height;
    const scaleX = svgWidth / len;
    const svgPoints = points
      .map((p) => `${p.index * scaleX},${(max - p.value) / scaleY}`)
      .join(' ');

    // TODO: Extract skipping dots into a separate hook
    // Allowed 3 points per 100 px
    const allowedDots = Math.round((3 * windowWidth) / 100) - len;
    const skipDots = allowedDots < 0 ? Math.ceil(len / (len + allowedDots)) : 1;

    return (
      <div className="linechart">
        {y && <span className="linechart-y">{y}</span>}
        {x && <span className="linechart-x">{x}</span>}
        <div className="linechart-plot" style={{ height }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgWidth} ${height}`}
            className="linechart-svg"
            preserveAspectRatio="none">
            <polyline points={svgPoints} className="linechart-line" />
            <line
              x1="0"
              y1="1"
              x2={svgWidth}
              y2="1"
              className="linechart-axiz"
            />
            <line
              x1="0"
              y1={(max - min) / scaleY}
              x2={svgWidth}
              y2={(max - min) / scaleY}
              className="linechart-axiz"
            />
          </svg>
          <span
            className="linechart-value"
            style={{ bottom: `${min / scaleY}px` }}>
            {intToString(min)}
          </span>
          <span className="linechart-value" style={{ bottom: '100%' }}>
            {intToString(max)}
          </span>
          {points.map(({ index, title, value }: ChartPoint, i) => {
            const isSkipped = index % skipDots !== 0 && i !== 0;
            return isSkipped ? null : (
              <span
                key={index}
                className="linechart-title"
                style={{ left: `${index * scaleX}px` }}>
                {title}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
);
