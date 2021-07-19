import React, { memo } from 'react';
import { useCummulativeRevenuePoints } from '../api/useRevenues';
import { Chart } from '../components/Chart/Chart';
import { ValueTypeFilter, PeriodFilter } from '../constant';

interface TotalRevenueChartProps {
  valueType: ValueTypeFilter;
  period: PeriodFilter;
}

export const TotalRevenueChart: React.FC<TotalRevenueChartProps> = memo(
  ({ period, valueType }) => {
    const { isLoading, data, error } = useCummulativeRevenuePoints(
      period,
      valueType
    );

    if (isLoading) {
      return <div>...is loading</div>;
    }
    if (error) {
      return <div>loading error</div>;
    }

    return <Chart points={data} y={valueType} />;
  }
);
