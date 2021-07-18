import { useApi } from './useApi';
import { API_ENDPIONT } from '../constant';

export const useBestCustomers = () => {
  const apiUrl = `${API_ENDPIONT}/customers/revenues`;
  const { isLoading, data, error } = useApi(apiUrl);

  return {
    isLoading,
    data,
    error,
  };
};
