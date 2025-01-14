"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      const response = axios.isAxiosError(error) ? error.response : null;
      toast({
        title: "Verification Error",
        description: response?.data?.message || "Error verifying",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <ShieldCheck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 lg:text-5xl mb-4">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            Enter the code sent to your email to verify your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold flex items-center">
                    <Mail className="mr-2 text-blue-500" /> Verification Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your code"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none rounded-lg">
              Verify
            </Button>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default Page;
