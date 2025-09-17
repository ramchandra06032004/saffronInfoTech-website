"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonComp from "@/components/SkeletonCompBody";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  duration: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/getAllProduct");
        setProducts(response.data);
      } catch (error: any) {
        toast({
          title: "Error fetching products",
          description:
            error.response?.data?.message ||
            "An error occurred while fetching products.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await axios.post("/api/addToCart", { productId });
      toast({
        title: "Product added to cart",
        description: "Product has been added to cart successfully",
      });
    } catch (error: any) {      
      toast({
        title: "Error while adding to cart",
        description:
          error.response?.data?.error ||
          "An error occurred while adding the product to the cart.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      {loading ? (
        <div>
          <SkeletonComp />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl mb-6 text-center ">Products</h1>
          <div className="md:grid-cols-2 lg:grid-cols-3 flex flex-col items-center ">
            {products.map((product) => (
              <Card key={product._id} className="mb-4 w-1/2">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>In Stock: {product.countInStock}</p>
                  <p>Duration: {product.duration} months</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
