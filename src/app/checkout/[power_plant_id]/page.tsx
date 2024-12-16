"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
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

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  duration: number;
}

interface PowerPlant {
  _id: string;
  govId: string;
  nameOfOwner: string;
  mobileNumber: string;
  address: string;
  capacity: string;
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [powerPlant, setPowerPlant] = useState<PowerPlant | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { power_plant_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
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

        // Get power plant data
        const powerPlantResponse = await axios.post("/api/getPowerPlant", {
          powerPlantIds: [power_plant_id],
        });
        setPowerPlant(powerPlantResponse.data[0]);
      } catch (error: any) {
        toast({
          title: "Error fetching data",
          description:
            error.response?.data?.message ||
            "An error occurred while fetching data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast, power_plant_id]);

  const calculateTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const gst = subtotal * 0.18; // Assuming 18% GST
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };

  const { subtotal, gst, total } = calculateTotalPrice();

  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <Toaster />
      <h1 className="text-3xl mb-6 text-center">Checkout</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col w-full max-w-xl gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center"> Selected Plans

              </CardTitle>

            </CardHeader>
            <CardContent>
              {cartItems.map((product) => (
                <div key={product._id} className="mb-4">
                  <h2 className="text-lg font-bold ">{product.name}</h2>
                  <p>{product.description}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>In Stock: {product.countInStock}</p>
                  <p>Duration: {product.duration} months</p>
                </div>
              ))}
            </CardContent>
          </Card>
          {powerPlant && (
            <Card>
              <CardHeader>
                <CardTitle>Power Plant Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Government ID: {powerPlant.govId}</p>
                <p>Name of Owner: {powerPlant.nameOfOwner}</p>
                <p>Mobile Number: {powerPlant.mobileNumber}</p>
                <p>Address: {powerPlant.address}</p>
                <p>Capacity: {powerPlant.capacity}</p>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Price Estimate</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p>GST (18%): ₹{gst.toFixed(2)}</p>
              <p>Total: ₹{total.toFixed(2)}</p>
            </CardContent>
          </Card>
          <div className="flex justify-center mt-4">
            <Button>Proceed to Payment</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
