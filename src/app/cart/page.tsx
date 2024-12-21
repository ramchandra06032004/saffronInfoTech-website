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
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  duration: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        // Get user data
        const userResponse = await axios.get("/api/getUserData");
        const { cartItem } = userResponse.data;

        // Get cart items
        const cartResponse = await axios.post("/api/getAllCartItem", {
          productIds: cartItem,
        });
        setCartItems(cartResponse.data);
      } catch (error: any) {
        toast({
          title: "Error fetching cart items",
          description:
            error.response?.data?.message ||
            "An error occurred while fetching cart items.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [toast]);

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete("/api/removeItemFromCart", { data: { productId } });
      setCartItems(cartItems.filter((item) => item._id !== productId));
      toast({
        title: "Product removed from cart",
        description: "Product has been removed from cart successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error removing product from cart",
        description:
          error.response?.data?.message ||
          "An error occurred while removing the product from the cart.",
      });
    }
  };

  const calculateTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const gst = subtotal * 0.18; // Assuming 18% GST
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };

  const { subtotal, gst, total } = calculateTotalPrice();

  return (
    <>
      <h1 className="text-3xl mb-6 text-center ">Cart</h1>
      <div className="flex items-center justify-center py-2 gap-3">
        <Toaster />
        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-xl text-center text-gray-900 dark:text-gray-100">
            Your cart is empty
          </p>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center py-2">
              <div className="md:grid-cols-2 lg:grid-cols-3">
                {cartItems.map((product) => (
                  <Card key={product._id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{product.description}</p>
                      <p>Price: ₹{product.price}</p>
                      <p>In Stock: {product.countInStock}</p>
                      <p>Duration: {product.duration} months</p>
                    </CardContent>
                    <CardFooter className="gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(product._id)}
                      >
                        Remove from Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="">
              <CardHeader>
                <CardTitle className="text-green-600">Price Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-600">Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p className="text-green-600">GST (18%): ₹{gst.toFixed(2)}</p>
                <p className="text-green-600" >Total: ₹{total.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>
                  <Link href="/powerPlant">Select Power Plant</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
