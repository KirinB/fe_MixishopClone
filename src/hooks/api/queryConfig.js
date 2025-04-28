import { QueryClient, keepPreviousData } from "@tanstack/react-query";

const defaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 15 * 1000,
    gcTime: 30 * 10000,
    placeholderData: keepPreviousData,
  },
};

const queryClient = new QueryClient({ defaultOptions });

export default queryClient;
