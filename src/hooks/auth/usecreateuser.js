import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (newUser) => {
      const res = await axiosInstance.post("/auth/register", newUser); 
      return res.data;
    },
    onSuccess,
    onError,
  });
};
