import React from "react";
import { useFetchPesan, useEditPesan } from "@/hooks/pesan/index";

export default function Pesan() {
  const { data: pesanresponse, isLoading, refetch } = useFetchPesan({});
  const pesan = pesanresponse?.data || [];

  const { mutate: editpesan, isLoading: isLoadingEdit } = useEditPesan({
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEditStatus = (id, status) => {
    editpesan({ id, status });
  };

  return (
    <div className="bg-white p-4 mb-6">
      <h1 className="text-xl font-bold mb-4">Daftar Pesanan</h1>
      {pesan.length === 0 ? (
        <p>Tidak ada pesanan.</p>
      ) : (
        <ul className="space-y-4">
          {pesan.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow">
              <div className="mb-2">
                <strong>ID Pesanan:</strong> {item.id}
              </div>
              <div className="mb-2">
                <strong>Alamat:</strong> {item.address}
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {item.status}
              </div>
              <div className="mb-2">
                <strong>Total Harga:</strong> {item.totalPrice}
              </div>

              {/* Detail Produk */}
              {item.details && item.details.length > 0 && (
                <div className="mt-4">
                  <strong>Detail Produk:</strong>
                  <ul className="mt-2">
                    {item.details.map((detail, index) => (
                      <li key={index} className="ml-4">
                        <div><strong>Nama Produk:</strong> {detail.product}</div>
                        <div><strong>Total Item:</strong> {detail.qty}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tombol Update Status */}
              <div className="mt-4 flex gap-2">
                {item.status === "Pending" && (
                  <button
                    onClick={() => handleEditStatus(item.id, "Diproses")}
                    className="px-4 py-2 bg-[#ACC572] hover:bg-[#B8D575] text-white rounded "
                  >
                    Proses Order
                  </button>
                )}
                {item.status === "Diproses" && (
                  <button
                    onClick={() => handleEditStatus(item.id, "Dikirim")}
                    className="px-4 py-2 bg-[#ACC572] hover:bg-[#B8D575] text-white rounded"
                  >
                    Kirim Order
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
