import { useQueryClient } from "@tanstack/react-query";
import { Shop } from "./types";

export const useGetCachedStoreData = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<Shop>(["shop-data"]);
};
