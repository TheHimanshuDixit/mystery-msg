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
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleDeleteMessage = async (messageId: string) => {
    try {
      setIsLoading(true);
      // await deleteMessage(messageId);
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setMessages, setIsLoading]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

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
  if (!session || !session.user)
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  const { username } = session?.user as User;
  const baseurl = `${window.location.protocol}//${window.location.host}`;
  const profileurl = `${baseurl}/u/${username}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileurl);
    toast({
      title: "Copied to clipboard",
      description: "Profile URL copied to clipboard",
    });
  };

  if (!session || !session.user) return <div>Please Login</div>;

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded-lg shadow-lg max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileurl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleAcceptMessages}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "ON" : "OFF"}
        </span>
      </div>
      <Separator />
      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <RefreshCcw className="w-4 h-4" />
        )}
      </Button>
      <div
        className={`mt-4 grid grid-cols-1 md:${messages.length > 0 ? "grid-cols-2" : "grid-cols-1"} gap-6`}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No messages found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
