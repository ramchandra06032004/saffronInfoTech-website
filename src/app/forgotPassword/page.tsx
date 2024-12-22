"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/findUserByEmail", { email });
            
            
            if (response.status === 200) {
                const data = response.data;
                toast({
                    title: "Success",
                    description: data.message,
                });
                router.push(`/setPassword/${data.id}`);
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                });
            }
        } catch (error: any) {
            console.error("Error:", error);
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Card className="w-full max-w-md p-8">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
