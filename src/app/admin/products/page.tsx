"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    countInStock: number;
    imageUrl: string;
    duration: number;
  }


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { toast } = useToast();
    
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/getAllProduct");
        setProducts(response.data);
        
        
      } catch (error :any) {
        toast({
          title: "Error fetching products",
          description: error.response?.data?.message || "An error occurred while fetching products.",
        });
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId :any) => {
    setLoading(true);
    
    try {
      await axios.delete("/api/delete-product", { data: { productId } });
      setProducts(products.filter((product) => product._id !== productId));
      toast({
        title: "Product deleted successfully",
        description: "The product has been deleted from the inventory.",
      });
    } catch (error :any) {
      toast({
        title: "Error deleting product",
        description: error.response?.data?.message || "An error occurred while deleting the product.",
        
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-3xl mb-6 text-center">Products</h1>
      <div className=" md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id} className="mb-4">
            <CardHeader>
              <CardTitle >{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p>Price: {formatPrice(product.price)}</p>
              <p>In Stock: {product.countInStock}</p>
              <p>Duration: {product.duration} months</p>
            </CardContent>
            <CardFooter >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" onClick={() => setSelectedProduct(product)}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product and remove it from our inventory.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="outline" onClick={                        
                        () => setSelectedProduct(null)
                        
                        }>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (selectedProduct) {
                            
                            
                            handleDelete(selectedProduct._id);
                            setSelectedProduct(null);
                          }
                        }}
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}