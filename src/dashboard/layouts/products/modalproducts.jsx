import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetchCategories, useCreateProduct, useEditProduct } from "@/hooks/product/index";

export default function ModalProduct({ onSuccess, editData }) {
  const { mutate: createProduct, isLoading: createProductLoading } = useCreateProduct({
    onSuccess: (res) => {
      alert("Produk berhasil ditambahkan");
      form.reset();
      //  debugging
      if (res.data && res.data.id) {
        onSuccess?.(res.data.id);
      } else {
        const tempId = Date.now();
        onSuccess?.(tempId);
      }
    },
  });

  const { mutate: editProduct } = useEditProduct({
    onSuccess: (res) => {
      alert("Produk berhasil diedit");
      if (res.data && res.data.id) {
        onSuccess?.(res.data.id);
      } else if (editData && editData.id) {
        onSuccess?.(editData.id);
      } else {
        console.error("ID tidak ditemukan di response atau editData:", res, editData);
      }
    },
  });

  const { data: categories } = useFetchCategories({});
  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      image: null,
    },
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name || "",
        price: editData.price || "",
        category: editData.category || "",
        image: null, 
      });
    } else {
      form.reset({
        name: "",
        price: "",
        category: "",
        image: null,
      });
  
    }
  }, [editData, form]);
  
  const onSubmit = (data) => {
    if (editData) {
      editProduct({ ...data, id: editData.id });
    } else {
      createProduct(data);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{editData ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
      </DialogHeader>
      <Form {...form} key={editData?.id || "new"}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama produk" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Masukkan harga" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Gambar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      form.setValue("image", file);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={createProductLoading}>
            {editData ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}