import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditPesan = ({ onSuccess }) => {
    return useMutation({
      mutationFn: async (body) => {
        const pesanresponse = await axiosInstance.patch(`/pesan/${body.id}/status`, body);
        return pesanresponse;
      },
      onSuccess,
    });
  };
  