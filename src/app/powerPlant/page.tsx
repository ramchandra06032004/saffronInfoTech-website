"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SkeletonComp from "@/components/SkeletonCompBody";
import { fetchData } from "./Service/fetData";
import { PowerPlant } from "@/types/customTypes";
import { useToast } from "@/hooks/use-toast";
const PowerPlantPage = () => {
  const [powerPlants, setPowerPlants] = useState<PowerPlant[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPowerPlant, setSelectedPowerPlant] = useState<
    string | undefined
  >(undefined);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    const fetchPowerPlants = async () => {
      setLoading(true);
      try {
        await fetchData(setPowerPlants);
        
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPowerPlants();
  }, []);

  const handleSelect = (value: string) => {
    setSelectedPowerPlant(value);
  };

  const handleCheckout = () => {
    if (selectedPowerPlant) {
      router.push(`/checkout/${selectedPowerPlant}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-3xl mb-6 text-center">Power Plants</h1>
      {loading ? (
        <p>
          <SkeletonComp />
        </p>
      ) : (
        <div>
          <RadioGroup value={selectedPowerPlant} onValueChange={handleSelect}>
            {powerPlants.map((powerPlant) => (
              <Card key={powerPlant._id} className="m-4 py-4">
                <CardContent>
                  <p>Government ID: {powerPlant.govId}</p>
                  <p>Name of Owner: {powerPlant.nameOfOwner}</p>
                  <p>Mobile Number: {powerPlant.mobileNumber}</p>
                  <p>Address: {powerPlant.address}</p>
                  <p>Capacity: {powerPlant.capacity} KW</p>
                  <div className="flex items-center space-x-2 mt-4">
                    <RadioGroupItem
                      value={powerPlant._id}
                      id={powerPlant._id}
                    />
                    <Label htmlFor={powerPlant._id}>Select</Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>
      )}

      <CardFooter className="gap-4">
        <Button disabled={!selectedPowerPlant} onClick={handleCheckout}>
          Select Power Plant
        </Button>
        <Button>
          <Link href="/addPowerPlant">Add Power Plant</Link>
        </Button>
      </CardFooter>
    </div>
  );
};

export default PowerPlantPage;
