import { useQuery } from "@tanstack/react-query";

const useGetQuery = ({ queryInfo, body }) => {
  const { queryKey, queryFunction, options } = queryInfo;

  const fetchResult = useQuery({
    queryKey: [queryKey, body],
    queryFn: async () => {
      const response = await queryFunction(body ?? {});
      return response.data.metaData;
    },
    ...options,
  });

  return fetchResult;
};

export default useGetQuery;
