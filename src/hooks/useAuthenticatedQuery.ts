import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
  refetchInterval?: number
}

const useAuthenticatedQuery = ({queryKey, url, config, refetchInterval}: IAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const {data} = await axiosInstance.get(url, config);
      return data
    },
    refetchInterval
  });
}

export default useAuthenticatedQuery;