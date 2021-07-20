import React, { memo } from 'react';
import { useRevenuePoints } from '../api/useRevenues';
import { Chart } from '../components/Chart/Chart';
import { ValueTypeFilter, PeriodFilter } from '../constant';

interface RevenueChartProps {
  valueType: ValueTypeFilter;
  period: PeriodFilter;
}

export const RevenueChart: React.FC<RevenueChartProps> = memo(
  ({ period, valueType }) => {
    const { isLoading, data, error } = useRevenuePoints(period, valueType);

    if (isLoading) {
      return <div>...is loading</div>;
    }
    if (error) {
      return <div>loading error</div>;
    }

    return <Chart points={data} y={valueType} x={period} />;
  }
);
