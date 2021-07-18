import { useApi } from './useApi';
import { API_ENDPIONT } from '../constant';

export const useLatestInvoices = () => {
  const apiUrl = `${API_ENDPIONT}/invoices/?_sort=date&_order=desc&_limit=15`;
  const { isLoading, data, error } = useApi(apiUrl);

  return {
    isLoading,
    data,
    error,
  };
};
