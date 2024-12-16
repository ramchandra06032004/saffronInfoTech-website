"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/getUserData');
        if (response.status === 200) {
          setUserData(response.data);

          // Fetch orders data
          const ordersResponse = await axios.post('/api/getAllOrders', {
            orderIds: response.data.orders,
          });
          if (ordersResponse.status === 200) {
            setOrders(ordersResponse.data);
          } else {
            toast({
              title: 'Error',
              description: ordersResponse.data.error,
              
            });
          }
        } else {
          toast({
            title: 'Error',
            description: response.data.error,
            
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'An error occurred while fetching user data.',
          
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={userData?.profileImage || "https://github.com/shadcn.png"} />
              <AvatarFallback>{userData?.name?.charAt(0) || "CN"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{userData?.userName}</CardTitle>
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
                  <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p>Total Amount: ₹{order.totalAmount}</p>
                  <Button variant="outline" className="mt-2">View Details</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;