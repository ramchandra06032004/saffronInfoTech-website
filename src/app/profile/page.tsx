"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SkeletonComp from "@/components/SkeletonCompBody";
import SkeletonCompUser from "@/components/SkeletonCompUser";

const ProfilePage = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/getUserData");
        if (response.status === 200) {
          setUserData(response.data);

          // Fetch orders data
          const ordersResponse = await axios.post("/api/getAllOrders", {
            orderIds: response.data.orders,
          });
          if (ordersResponse.status === 200) {
            const ordersData = ordersResponse.data;

            // Fetch power plant data for each order
            const powerPlantIds = ordersData.map(
              (order: any) => order.powerPlant
            );
            const powerPlantResponse = await axios.post("/api/getPowerPlant", {
              powerPlantIds,
            });

            if (powerPlantResponse.status === 200) {
              const powerPlants = powerPlantResponse.data;
              const ordersWithPowerPlantDetails = ordersData.map(
                (order: any) => {
                  const powerPlant = powerPlants.find(
                    (pp: any) => pp._id === order.powerPlant
                  );
                  return {
                    ...order,
                    powerPlantDetails: powerPlant,
                  };
                }
              );

              setOrders(ordersWithPowerPlantDetails);
            } else {
              toast({
                title: "Error",
                description: powerPlantResponse.data.error,
              });
            }
          } else {
            toast({
              title: "Error",
              description: ordersResponse.data.error,
            });
          }
        } else {
          toast({
            title: "Error",
            description: response.data.error,
          });
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description:
            error.message || "An error occurred while fetching user data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading ? (
        <div className="flex flex-col gap-7">
          <SkeletonCompUser />
          <SkeletonComp />
        </div>
      ) : (
        <div>
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={
                      userData?.profileImage || "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>
                    {userData?.name?.charAt(0) || "CN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{userData?.name}</CardTitle>
                  <p className="text-gray-600">{userData?.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl mb-4">Orders</h2>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <Card key={order._id} className="mb-4">
                    <CardHeader>
                      <CardTitle>Order ID: {order._id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Order Date:{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                      <p>
                        Preferred Date:{" "}
                        {new Date(order.preferedDate).toLocaleDateString()}
                      </p>
                      <p>Order Status: {order.orderStatus}</p>
                      <p>Amount: ₹{order.amount}</p>
                      <p>Type: {order.type}</p>
                      <p>Payment Mode: {order.paymentMode}</p>
                      <h3 className="text-lg font-bold mt-4">
                        Power Plant Details
                      </h3>
                      <p>Government ID: {order.powerPlantDetails.govId}</p>
                      <p>
                        Name of Owner: {order.powerPlantDetails.nameOfOwner}
                      </p>
                      <p>
                        Mobile Number: {order.powerPlantDetails.mobileNumber}
                      </p>
                      <p>Address: {order.powerPlantDetails.address}</p>
                      <p>Capacity: {order.powerPlantDetails.capacity} KW</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No orders found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
