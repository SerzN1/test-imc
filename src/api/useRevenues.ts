import { useEffect, useState } from 'react';
import { useApi } from './useApi';
import { API_ENDPIONT, PeriodFilter, ValueTypeFilter } from '../constant';

// Cannot sort by date
export const useRevenues = (period: PeriodFilter) => {
  const apiUrl = `${API_ENDPIONT}/revenues/${
    period === PeriodFilter.month ? 'monthly' : 'weekly'
  }`;
  const { isLoading, data, error } = useApi(apiUrl);

  return {
    isLoading,
    data,
    error,
  };
};

interface CumullativeRevenuePoint {
  index: number;
  title: string;
  value: number;
}

const MONTH_NAMES = 'jan feb mar apr may jun jul aug sep oct nov dec'.split(
  ' '
);

export const useCummulativeRevenuePoints = (
  period: PeriodFilter,
  valueType: ValueTypeFilter
) => {
  const [cummulativeRevenuePoints, setCummulativeRevenuePoints] = useState<
    CumullativeRevenuePoint[]
  >([]);
  const { isLoading, data, error } = useRevenues(period);

  useEffect(() => {
    if (data) {
      const points = data.map((revenue: IMonthlyRevenue | IWeeklyRevenue) => {
        if (revenueIsWeekly(revenue)) {
          const index = parseInt(revenue.week.split('-')[1]);
          return {
            index,
            title: index.toString(),
            value:
              valueType === ValueTypeFilter.margin
                ? revenue.total_margin
                : revenue.total_revenue,
          };
        } else {
          const index = parseInt(revenue.month.split('-')[1]);
          return {
            index,
            title: MONTH_NAMES[index - 1],
            value:
              valueType === ValueTypeFilter.margin
                ? revenue.total_margin
                : revenue.total_revenue,
          };
        }
      });

      points.sort(
        (a: CumullativeRevenuePoint, b: CumullativeRevenuePoint) =>
          a.index - b.index
      );
      let sum = 0;
      setCummulativeRevenuePoints(
        points.map((p: CumullativeRevenuePoint) => {
          sum += p.value;
          return {
            ...p,
            value: sum,
          };
        })
      );
    } else {
      setCummulativeRevenuePoints([]);
    }
  }, [data, valueType]);

  return {
    isLoading,
    data: cummulativeRevenuePoints,
    error,
  };
};

function revenueIsWeekly(
  revenue: IMonthlyRevenue | IWeeklyRevenue
): revenue is IWeeklyRevenue {
  return 'week' in revenue;
}
