"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [suggestMessage, setSuggestMessage] = useState<string>("");
  const { toast } = useToast();
  const form = useForm<{ content: string }>({
    resolver: zodResolver(messageSchema),
  });
  const { register } = form;

  const fetchUsername = () => {
    const path = window.location.pathname;
    return path.split("/").pop();
  };

  const onSubmit = async (data: { content: string }) => {
    if (isSubmitting) return;
    const { content } = data;
    const username = fetchUsername();
    const message = { username, message: content };
    setIsSubmitting(true);
    try {
      await axios.post("/api/send-message", message);
      setContent("");
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully!",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/suggest-messages");
      setSuggestMessage(response.data.message);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to fetch suggested messages",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestedMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoToDashboard = () => {
    router.replace("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white">
      <div className="bg-white text-gray-900 rounded-lg p-8 shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Send a Message
        </h1>
        <p className="text-center text-lg mb-6">
          Send a message to the user on their public profile.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Textarea
            {...register("content")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message here."
            className="w-full p-4 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <Button
            type="submit"
            className={`w-full py-2 text-white rounded-md ${isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} transition duration-200`}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
        <Separator className="my-6" />

        {isLoading ? (
          <div className="flex justify-center mt-4">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          suggestMessage && (
            <div className="mt-6">
              <Button
                onClick={fetchSuggestedMessages}
                className="flex items-center gap-2 mb-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 px-4 transition duration-200">
                <RefreshCcw className="w-4 h-4" />
                Refresh Suggestions
              </Button>
              <h2 className="text-md font-semibold mb-3">
                Click on any message below to select it.
              </h2>
              <div className="space-y-2">
                {suggestMessage.split("||").map((message, index) => (
                  <div
                    key={index}
                    onClick={() => setContent(message)}
                    className="bg-gray-100 p-4 rounded-md shadow-md hover:bg-gray-200 cursor-pointer transition duration-200">
                    <p>{message}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        <Separator className="my-6" />
        <div>
          <p className="text-center text-sm">Want to manage your messages? </p>
          <Button
            onClick={handleGoToDashboard} // Go to dashboard button
            className="mt-6 w-full py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200">
            Create your account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
