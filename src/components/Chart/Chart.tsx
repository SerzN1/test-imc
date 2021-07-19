import React, { memo } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { intToString } from './utils';
import './Chart.css';

export interface ChartPoint {
  index: number;
  title?: string;
  value: number;
}

interface ChartProps {
  points: ChartPoint[];
  y?: string;
  x?: string;
  height?: number;
}

export const Chart: React.FC<ChartProps> = memo(
  ({ points = [], height = 270, y, x }) => {
    const width = useWindowWidth();

    if (!points.length) return null;

    const len = points[points.length - 1].index - points[0].index + 1;
    const { max, min } = points.reduce(
      (acc, p) => {
        return {
          min: Math.min(p.value, acc.min),
          max: Math.max(p.value, acc.max),
        };
      },
      { max: -Infinity, min: 0 }
    );

    // Allowed 5 points per 100 px
    const allowedDots = Math.round((4 * width) / 100) - len;
    const skipDots = allowedDots < 0 ? Math.ceil(len / (len + allowedDots)) : 1;

    return (
      <div className="chart" style={{ height }}>
        {y && <span className="chart-y">{y}</span>}
        {x && <span className="chart-x">{x}</span>}
        {points.map(({ index, title, value }: ChartPoint, i) => {
          const barStyle = {
            left: `${100 * (index / (len + 1))}%`,
            height: (height * value) / (max - min),
            width: `${100 / len}%`,
          };
          const isSkipped =
            index % skipDots !== 0 && i !== 0 && i !== points.length - 1;
          return (
            <div key={index} className="chart-point" style={barStyle}>
              {!isSkipped && (
                <span className="chart-value">{intToString(value)}</span>
              )}
              {!isSkipped && title && (
                <span className="chart-title">{title}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);
