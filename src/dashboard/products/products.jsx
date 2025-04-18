import React, { useState, useEffect,useRef } from "react";
import { useCreateProduct } from "@/hooks/product/usecreateproduct";
import { useFetchProducts } from "@/hooks/product/usefetchproducts";
import { useDeleteProduct } from "@/hooks/product/usedeleteproducts";
import { axiosInstance } from "@/lib/axios";

export default function ProductContent() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null)
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null); // simpan id product yang sedang diedit

  const { data: productsResponse, isLoading, refetch } = useFetchProducts({});
  const products = productsResponse?.data || [];

  const createProduct = useCreateProduct({
    onSuccess: () => {
      alert(editId ? "Produk berhasil diupdate!" : "Produk berhasil ditambahkan!");
      resetForm();
      refetch(); // refresh daftar produk
    },
  });
  const {mutate:deleteproduct} = useDeleteProduct({
    onSuccess:()=>{
      alert("Produk Berhasil Dihapus!");
      refetch();
    },
    onError:()=>{
      alert("Terjadi Kesalahan Saat Menghapus");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image); // hanya jika ada
    formData.append("category", categoryName);

    if (editId) {
      // update product
      axiosInstance
        .put(`/products/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then(() => createProduct.options.onSuccess());
    } else {
      // create product
      createProduct.mutate(formData);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategoryName(product.category);
    setImage(null);
     // reset, gambar lama biar tetap di-backend kalau tidak diubah
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      deleteproduct(id);
    }
  };
//pr handle edit
  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setImage(null);
    setCategoryName("");
    if(imageInputRef.current){
      imageInputRef.current.value = ""
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{editId ? "Edit Produk" : "Tambah Produk"}</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nama Produk</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Harga</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Gambar</label>
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="w-full p-2 border rounded"
              // tidak required saat edit
              required={!editId}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Kategori</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              disabled={createProduct.isPending}
            >
              {createProduct.isPending
                ? "Menyimpan..."
                : editId
                ? "Update Produk"
                : "Tambah Produk"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
        <h2 className="text-2xl font-bold pt-4 mb-4">Daftar Produk</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center p-4 border rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://expressbackfore-production.up.railway.app/uploads/${product.image}`}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p>Rp {product.price}</p>
                <p className="text-sm text-gray-600">Kategori: {product.category}</p>
              </div>
            </div>
      
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      )}
      </div>
          
     
    </>
  );
}
