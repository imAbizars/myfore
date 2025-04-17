import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = ({onSuccess,onError})=>{
    return useMutation({
        mutationFn:async(body)=>{
            const res = await axiosInstance.post("/auth/login",body,{
                withCredentials:true
            });
            return res.data
        },
        onSuccess,
        onError,
    });
};