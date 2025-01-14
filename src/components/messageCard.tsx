"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { X, Calendar, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Message } from "@/model/User";
import { motion } from "framer-motion";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/delete-message/${message._id}`);
      if (response.status === 200) {
        toast({
          title: "Message deleted",
          description: response.data.message,
        });
        onMessageDelete(message._id as string);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete message",
        description: "An error occurred while deleting the message",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}>
      <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg border">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              <MessageCircle className="inline-block text-blue-500 mr-2" />
              {message.content}
            </CardTitle>
            <CardDescription className="text-gray-600">
              <Calendar className="inline-block text-blue-500 mr-2" />
              {message.createdAt
                ? new Date(message.createdAt).toDateString()
                : ""}
            </CardDescription>
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors duration-200">
                <X className="w-5 h-5 text-white" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-bold">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default MessageCard;
