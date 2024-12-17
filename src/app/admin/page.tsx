"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl mb-6 text-center">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <Link href="/admin/add-product">
          <Button>Add New Product</Button>
        </Link>
        <Link href="/admin/products">
          <Button>All Products</Button>
        </Link>
        <Link href="/admin/orders">
          <Button>All Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
