import React from "react";
import { useFetchPesan, useEditPesan } from "@/hooks/pesan/index";
import PesanAccordion from "@/dashboard/components/PesanAccordion";

export default function Pesan() {
  const { data: pesanresponse, isLoading, refetch } = useFetchPesan({});
  const pesan = (pesanresponse?.data || []);

  const { mutateAsync: editpesan } = useEditPesan({
    onSuccess: () => refetch(),
  });

  const handleEditStatus = async (id, status) => {
    await editpesan({ id, status });
  };

  return (
    <>
    <h1 className="text-3xl font-bold mb-4 text-white">Daftar Pesanan</h1>
    <div className="bg-white p-4 mb-6 rounded-xl ">
      {isLoading ? (
        <p>Loading...</p>
      ) : pesan.length === 0 ? (
        <p>Tidak ada pesanan.</p>
      ) : (
        <PesanAccordion pesan={pesan} onEditStatus={handleEditStatus} />
      )}
    </div>
    </>
  );
}
