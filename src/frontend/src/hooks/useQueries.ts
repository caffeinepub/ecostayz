import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Property } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
      propertyId: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitEnquiry(
        data.name,
        data.email,
        data.message,
        data.propertyId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}
