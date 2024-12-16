"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    imageUrl: "",
    duration: "",
  });
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/addProduct", product);
      toast({
        title: "Product added successfully",
        description: "The product has been added to the inventory.",
      });
      router.push("/admin/products");
    } catch (error: any) {
      toast({
        title: "Error adding product",
        description: error.response?.data?.message || "An error occurred while adding the product.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <Card className=" p-8 rounded shadow-md w-full max-w-md ">
        <CardHeader>
          <CardTitle >
            {loading ? "Processing" : "Add New Product"}
          </CardTitle>
          <CardDescription >
            Please enter the product details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              
            />
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              
            />
            <Input
              type="number"
              name="countInStock"
              placeholder="Count In Stock"
              value={product.countInStock}
              onChange={handleChange}
              
            />
            <Input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={product.imageUrl}
              onChange={handleChange}
              
            />
            <Input
              type="number"
              name="duration"
              placeholder="Duration (months)"
              value={product.duration}
              onChange={handleChange}
              
            />
            <Button
              type="submit"
              
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}