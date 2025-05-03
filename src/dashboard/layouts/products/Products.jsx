import React, { useState, useEffect } from "react";
import { useFetchProducts, useDeleteProduct } from "@/hooks/product/index";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import ModalProduct from "./modalproducts";
import DeleteModal from "./deletemodal";

export default function Products() {
  const {
    data,
    isLoading: productIsLoading,
    refetch: refetchProducts,
  } = useFetchProducts({
    onError: () => {
      alert("Ada kesalahan");
    },
  });
  const deleteProduct = useDeleteProduct({
    onSuccess: () => {
      refetchProducts();
      setShowDeleteDialog(false);
      setSelectedProductToDelete(null);
    },
  });
  

  
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [lastModifiedId, setLastModifiedId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState(null);


  //sorted data
  useEffect(() => {
    if (data?.data) {
      console.log("Data berubah, LastModifiedId:", lastModifiedId);
      console.log("Data sebelum diurutkan:", data.data);
      
      
      if (!lastModifiedId) {
        setSortedProducts(data.data);
        return;
      }
      try {
        const modifiedProductIndex = data.data.findIndex(product => 
          String(product.id) === String(lastModifiedId)
        );
        
        if (modifiedProductIndex !== -1) {
          const newSortedProducts = [...data.data];
          const modifiedProduct = newSortedProducts.splice(modifiedProductIndex, 1)[0];
          newSortedProducts.unshift(modifiedProduct);
          console.log("setelah diurutkan manual:", newSortedProducts);
          setSortedProducts(newSortedProducts);
        } else {
          console.log("Produk dengan ID", lastModifiedId, "tidak ditemukan dalam data");
          setSortedProducts(data.data);
        }
      } catch (error) {
        console.error("Error saat mengurutkan produk:", error);
        setSortedProducts(data.data);
      }
    }
  }, [data, lastModifiedId]);
  
  //handle berhasil
  const handleProductSuccess = (productId) => {
    setLastModifiedId(productId);
    refetchProducts();
    setOpenModal(false);
    setEditData(null);
  };
  //handle delete
  const handleDelete = () => {
    deleteProduct.mutate(selectedProductToDelete.id, {
      onSuccess: () => {
        refetchProducts();
        setShowDeleteDialog(false);
        setSelectedProductToDelete(null);
        toast.success("Produk berhasil dihapus.");
      },
      onError: () => {
        alert("Gagal menghapus produk");
      },
    });
  };
  
  const renderProducts = () => {
    if (!sortedProducts || !sortedProducts.length) return <p>Tidak ada produk</p>;
    
    return sortedProducts.map((product) => (
      <div key={product.id} className="mb-4 ">
        <div className="flex justify-between items-center p-4 border rounded shadow">
          <div className="flex items-center gap-4">
            <img
              src={`https://expressbackfore-production.up.railway.app/uploads/${product.image}`}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium">{product.name}</p>
              <p>Rp.{product.price}</p>
              <p>Kategori: {product.category}</p>
              <p className="text-xs text-gray-500">ID: {product.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-yellow-600 hover:bg-yellow-500"
              onClick={() => {
                setEditData(product);
                setOpenModal(true);
              }}
            >
              Edit
            </Button>
            <Button
             className="bg-[#A31D1D] hover:bg-red-700"
             onClick={()=>{
              setSelectedProductToDelete(product);
              setShowDeleteDialog(true);
             }}>
              Hapus
            </Button>
            
          </div>
        </div>
      </div>
    ));
  };
  
  return (
    <div className="bg-white mb-6 p-4 rounded-xl shadow">
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button size="lg" className="bg-[#ACC572] hover:bg-[#B8D575]">
            Tambah Produk
          </Button>
        </DialogTrigger>
        
        <ModalProduct
          onSuccess={(savedProductId) => handleProductSuccess(savedProductId)}
          editData={editData}
        />
      </Dialog>
      
      {productIsLoading ? (
        <Loader className="animate-spin"/>
      ) : (
        <div className="mt-4">{renderProducts()}</div>
      )}
      {selectedProductToDelete && (
        <DeleteModal
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}