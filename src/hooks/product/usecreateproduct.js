import { useMutation } from "@tanstack/react-query";
import {axiosInstance} from "@/lib/axios"; // pastikan ini instance dari axios

export const useCreateProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (formData) => {
      return await axiosInstance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // supaya cookie session ikut dikirim
      });
    },
    onSuccess,
  });
};
