"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl mb-6 text-center">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <Button
          
          onClick={() => router.push('/admin/add-product')}
        >
          Add New Product
        </Button>
        <Button
          
          onClick={() => router.push('/admin/products')}
        >
          All Products
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;