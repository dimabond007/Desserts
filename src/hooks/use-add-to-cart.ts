import { addToCart } from "@/lib/api";
import {
  useMutation,
  // useQueryClient
} from "@tanstack/react-query";

// export function useAddToCart() {
//   // const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: addToCart,
//     // mutationKey: "add-to-cart",
//     // onMutate: async (dessertId) => {
//     //   await new Promise((resolve) => setTimeout(resolve, 2000));
//     //   return dessertId;
//     // },
//     // onSuccess: (dessertId, variables) => {
//     //   queryClient.setQueryData(["desserts", variables.dessertId], (oldData) => {
//     //     if (oldData) {
//     //       const updatedDessert = oldData.find((d) => d.id === variables.dessertId)!;
//     //       updatedDessert.quantity++;
//     //       return [...oldData];
//     //     }
//     //     return oldData;
//     //   });
//     // },
//   });
// }
