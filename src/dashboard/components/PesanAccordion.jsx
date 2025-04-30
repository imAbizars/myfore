import React, { useState } from "react";
import { CircleChevronDown, Loader2 } from "lucide-react";

export default function PesanAccordion({ pesan, onEditStatus }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleStatusChange = (id, newStatus) => {
    setLoadingId(id);
    onEditStatus(id, newStatus).finally(() => {
      setLoadingId(null);
    });
  };
  
  

  return (
    <ul className="space-y-4 p-3">
      {pesan.map((item, index) => (
        <li key={item.id} className="border rounded shadow">
          {item.details.map((detail) => (
            <div
              key={detail.id}
              className="flex justify-between w-full text-left p-4 bg-gray-100 font-semibold"
            >
              <span>
                {detail.product} - Total {detail.qty} ({item.status})
              </span>
              <button onClick={() => handleToggle(index)}>
                <CircleChevronDown className="hover:bg-gray-200" />
              </button>
            </div>
          ))}

          {/* Accordion Content */}
          <div
            className={`px-4 transition-all duration-400 overflow-hidden ${
              openIndex === index ? "max-h-[1000px] bg-white" : "max-h-0"
            }`}
          >
            <div className="mb-2">
              <strong>Status :</strong> {item.status}
            </div>
            <div className="mb-2">
              <strong>Nama :</strong> {item.userName}
            </div>
            <div className="mb-2">
              <strong>Alamat :</strong> {item.address}
            </div>
            <div className="mb-2">
              <strong>Total Harga:</strong> {item.totalPrice}
            </div>

            <div className="mt-4 flex gap-2 mb-3 font-bold">
              {item.status === "Pending" && (
                <button
                  onClick={() => handleStatusChange(item.id, "Diproses")}
                  className="px-4 py-2 bg-[#ACC572] hover:bg-[#B8D575] text-white rounded flex items-center justify-center gap-2 min-w-[120px]"
                  disabled={loadingId === item.id}
                >
                  {loadingId === item.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    "Proses Order"
                  )}
                </button>
              )}
              {item.status === "Diproses" && (
                <button
                  onClick={() => handleStatusChange(item.id, "Dikirim")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#ACC572] hover:bg-[#B8D575] text-white rounded"
                  disabled={loadingId === item.id}
                >
                  {loadingId === item.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    "Kirim Order"
                  )}
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
