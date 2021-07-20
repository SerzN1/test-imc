import React, { memo } from 'react';
import { useCummulativeRevenuePoints } from '../api/useRevenues';
import { LineChart } from '../components/Chart/LineChart';
import { ValueTypeFilter, PeriodFilter } from '../constant';

interface CummulativeRevenueChartProps {
  valueType: ValueTypeFilter;
  period: PeriodFilter;
}

export const CummulativeRevenueChart: React.FC<CummulativeRevenueChartProps> =
  memo(({ period, valueType }) => {
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

    return <LineChart points={data} y={valueType} x={period} />;
  });
