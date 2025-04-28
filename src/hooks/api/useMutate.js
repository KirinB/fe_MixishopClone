import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useMutate = ({ mutationFunction, onError }) => {
  const mutateResult = useMutation({
    mutationFn: (body) => mutationFunction(body),
    onError: onError,
  });

  return mutateResult;
};

export default useMutate;
