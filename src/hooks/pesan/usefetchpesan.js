import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPesan = ({onError})=>{
    return useQuery({
        queryFn: async () =>{
            const pesanresponse = await axiosInstance.get("/pesan");
            return pesanresponse;
        },
        queryKey:["pesan"],
        onError
    });
}