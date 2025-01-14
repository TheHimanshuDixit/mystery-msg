"use client";

import MessageCard from "@/components/messageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, RefreshCcw, ClipboardCopy, Link2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch accept messages",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Messages refreshed",
            description: "Messages have been refreshed",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to fetch messages",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchMessages, fetchAcceptMessages]);

  const handleAcceptMessages = async () => {
    setIsSwitchLoading(true);
    try {
      await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: "Accept messages updated",
        description: `You are now ${acceptMessages ? "not accepting" : "accepting"} messages`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update accept messages",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    setMessages((prev) => prev.filter((m) => m._id !== messageId));
  };

  if (!session || !session.user)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );

  const { username } = session?.user;
  const baseurl = `${window.location.protocol}//${window.location.host}`;
  const profileurl = `${baseurl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileurl);
    toast({
      title: "Copied to clipboard",
      description: "Profile URL copied to clipboard",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-xl">
      <h1 className="text-4xl font-extrabold text-indigo-800 text-center mb-8">
        User Dashboard
      </h1>

      {/* Profile URL Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md mb-6">
        <Link2 className="w-6 h-6 text-indigo-500" />
        <input
          type="text"
          value={profileurl}
          disabled
          className="flex-grow p-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200 bg-indigo-50"
        />
        <Button onClick={copyToClipboard} variant="default">
          <ClipboardCopy className="mr-2" />
          Copy
        </Button>
      </motion.div>

      {/* Accept Messages Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleAcceptMessages}
          disabled={isSwitchLoading}
        />
        <span className="text-gray-800">
          Accept Messages: <strong>{acceptMessages ? "ON" : "OFF"}</strong>
        </span>
      </motion.div>

      <Separator className="my-6" />

      {/* Refresh and Message Cards */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => fetchMessages(true)}
          disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCcw className="w-4 h-4" />
          )}
          <span className="ml-2">Refresh Messages</span>
        </Button>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <motion.div
              key={message._id as string}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <MessageCard
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 col-span-full">
            No messages found
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Page;
