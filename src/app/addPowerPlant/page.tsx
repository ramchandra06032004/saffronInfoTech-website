"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  govId: z.string().min(1, "Government ID is required"),
  nameOfOwner: z.string().min(1, "Name of Owner is required"),
  mobileNumber: z.string().min(1, "Mobile Number is required"),
  address: z.string().min(1, "Address is required"),
  capacity: z.string().min(1, "Capacity is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddPowerPlantPage = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
    const Router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/addPowerPlant", data);

      toast({
        title: "Power plant added",
        description: "The power plant has been added successfully.",
      });

      // Clear form fields
      form.reset();
      Router.push("/powerPlant");
    } catch (error: any) {
      toast({
        title: "Error adding power plant",
        description: error.response?.data?.message || "An error occurred while adding the power plant.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-3xl mb-6 text-center">Add New Power Plant</h1>
      <Card >
        <CardHeader>
          <CardTitle className="text-xl text-center ">Power Plant Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="govId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Government ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Government ID" {...field} className="w-80"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameOfOwner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Owner</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name of Owner" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Mobile Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-center">
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Power Plant"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPowerPlantPage;