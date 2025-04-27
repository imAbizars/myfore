import { axiosInstance } from "@/lib/axios";
import {useQuery} from "@tanstack/react-query";

export const useFetchCategories = ({ onError }) => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: async () => {
        const res = await axiosInstance.get("/categories");
        return res.data.data; // ← pastikan hanya array yang di-return
      },
      onError,
    });
  };
  