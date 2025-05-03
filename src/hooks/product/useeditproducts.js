import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("price", body.price);
      formData.append("category", body.category);
      if (body.image) {
        formData.append("image", body.image); 
      }

      const productsResponse = await axiosInstance.patch(
        `/products/${body.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return productsResponse;
    },
    onSuccess,
  });
};
