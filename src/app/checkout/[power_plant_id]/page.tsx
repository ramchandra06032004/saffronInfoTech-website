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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { loadScript } from "@/helpers/loadRazorpayScript";
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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [powerPlant, setPowerPlant] = useState<PowerPlant | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState<string>("Cash");
  const { toast } = useToast();
  const { power_plant_id } = useParams();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get user data
        const userResponse = await axios.get("/api/getUserData");
        const { cartItem, email } = userResponse.data;
        setEmail(email);
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
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };
  const { subtotal, gst, total } = calculateTotalPrice();

  const handlePlaceOrder = async () => {
    if (cartItems.length == 0 || cartItems.length > 1) {
      toast({
        title: "Invalid Cart",
        description:
          "Cannot add more then 1 item in cart at time the of checkout",
      });
      return;
    }
    try {
      const payload = {
        preferedDate: date?.toISOString(),
        powerPlantId: power_plant_id,
        type: "Service",
        paymentMode: paymentMode,
        cartItems,
      };

      const response = await axios.post("/api/generateRecipt", payload);
      const { orderId, amount, id } = response.data;
      
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast({
          title: "Razorpay SDK failed to load",
          description: "Please check your internet connection.",
          variant: "destructive",
        });
        return;
      }
      
      const options = {
        key: "rzp_test_R7AkQBloGy98Rq",
        amount: parseInt((amount * 100).toString()),
        currency: "INR",
        name: powerPlant?.nameOfOwner,
        description: "Test Payment to order solar service",
        image: "https://avatars.githubusercontent.com/u/76506184?v=4",
        order_id: orderId,
        handler: async function (response: any) {
          const orderPayload = {
            preferedDate: date?.toISOString(),
            powerPlantId: power_plant_id,
            type: "Service",
            paymentMode,
            cartItems,
            id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          const orderResponse = await axios.post(
            "/api/confermOrder",
            orderPayload
          );
          

          if (orderResponse.data.status == 201) {
            toast({
              title: "Order confirmed!",
              description: "Your order has been confirmed.",
            });
            router.push("/profile");
          }
        },

        prefill: {
          name: powerPlant?.nameOfOwner,
          email: email,
          contact: powerPlant?.mobileNumber,
        },
        notes: {
          address: powerPlant?.address,
        },
        theme: {
          color: "#000000",
        },
      };
      // @ts-ignore
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed.",
      });
    } catch (error: any) {
      toast({
        title: "Order placement failed!",
        description:
          error.response?.data?.error ||
          "An error occurred while placing the order.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Toaster />
      <h1 className="text-3xl mb-6 text-center">Checkout</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col w-full max-w-xl gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Selected Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.map((product) => (
                <div key={product._id} className="mb-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
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
          <Card>
            <CardHeader>
              <CardTitle>Preferred Date for Service</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => setDate(day ?? undefined)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Online" id="online" />
                  <Label htmlFor="Online">Online</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          <div className="flex justify-center mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Place Order</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Order</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to place this order?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePlaceOrder}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
