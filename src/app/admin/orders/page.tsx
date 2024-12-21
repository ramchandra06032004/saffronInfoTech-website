"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const AdminOrdersPage = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/getAllOrdersAdmin");
        if (response.status === 200) {
          const ordersData = response.data.orders;

          // Fetch user and power plant data for each order one by one
          const ordersWithDetails = await Promise.all(
            ordersData.map(async (order: any) => {
              const userResponse = await axios.post("/api/getUsers", {
                userId: [order.user],
              });
              const powerPlantResponse = await axios.post(
                "/api/getPowerPlant",
                { powerPlantIds: [order.powerPlant] }
              );

              if (
                userResponse.status === 200 &&
                powerPlantResponse.status === 200
              ) {
                const user = userResponse.data;
                const powerPlant = powerPlantResponse.data[0];

                return {
                  ...order,
                  user,
                  powerPlant,
                };
              } else {
                throw new Error("Failed to fetch user or power plant data");
              }
            })
          );

          setOrders(ordersWithDetails);
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
            error.message || "An error occurred while fetching orders",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.orderStatus === filterStatus)
      );
    }
  }, [filterStatus, orders]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await axios.post("/api/changeStatusOfOrder", {
        orderId,
        newStatus,
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Order status updated successfully",
        });

        // Update the order status in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
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
          error.message || "An error occurred while updating the order status",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "accepted":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-3xl mb-6 text-center">Admin Orders</h1>
      <div className="mb-4 ">
        <Select onValueChange={setFilterStatus}>
          <SelectTrigger >
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <Card key={order._id} className="flex flex-col mb-4 ">
            <CardHeader>
              <CardTitle className="text-1xl">Order ID: {order._id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                Preferred Date:{" "}
                {new Date(order.preferedDate).toLocaleDateString()}
              </p>
              <p>Amount: ₹{order.amount}</p>
              <p>Type: {order.type}</p>
              <p>Payment Mode: {order.paymentMode}</p>
              <h3 className="font-bold mt-4">User Details</h3>
              <p>Name: {order.user.userName}</p>
              <p>Email: {order.user.email}</p>
              <h3 className=" font-bold mt-4">Power Plant Details</h3>
              <p>Government ID: {order.powerPlant.govId}</p>
              <p>Name of Owner: {order.powerPlant.nameOfOwner}</p>
              <p>Mobile Number: {order.powerPlant.mobileNumber}</p>
              <p>Address: {order.powerPlant.address}</p>
              <p>Capacity: {order.powerPlant.capacity} KW</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-2">
                <div
                  className={`p-2 rounded  ${getStatusColor(order.orderStatus)}`}
                >
                  <p>Status: {order.orderStatus}</p>
                </div>
                <Select
                  onValueChange={(value) =>
                    handleStatusChange(order._id, value)
                  }
                >
                  <SelectTrigger>Change Status</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AdminOrdersPage;

