"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import {
  FaShieldAlt,
  FaUserFriends,
  FaMobileAlt,
  FaRocket,
  FaSmile,
  FaGlobe,
} from "react-icons/fa";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Welcome!",
      description: "Navigate to your dashboard to start receiving messages.",
    });
  };

  return (
    <div className="p-8 bg-gradient-to-b from-yellow-200 via-pink-300 to-purple-400 min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h1 className="text-5xl font-extrabold mb-4 text-white">
          Connect Anonymously, Share Freely
        </h1>
        <p className="text-lg text-white opacity-80">
          Generate your unique link, share it, and start receiving anonymous
          messages today!
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
            <Link href="/dashboard">Get Started</Link>
            <FiArrowRight className="ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleGetStarted}
            className="hover:bg-white hover:text-gray-800 shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
            Learn More
          </Button>
        </div>
      </motion.div>

      {/* Carousel Section */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          What People Are Saying
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {[
              "If you could travel anywhere in the world right now, where would you go?",
              "What’s your go-to comfort food on a rainy day?",
              "If you could have any animal, real or imaginary, as a pet, what would it be?",
              "What’s the most unusual talent you have?",
              "If you could switch lives with anyone for a day, who would it be?",
            ].map((question, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <Card className="bg-indigo-600 text-white shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">{question}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>

      <Separator className="mb-16" />

      {/* Features Section */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}>
        {[
          {
            icon: <FaShieldAlt size={40} className="text-green-500" />,
            title: "Secure & Anonymous",
            description:
              "Your messages are private, and anonymity is guaranteed.",
          },
          {
            icon: <FaUserFriends size={40} className="text-orange-500" />,
            title: "Easy to Use",
            description:
              "Generate a link in seconds and start receiving messages.",
          },
          {
            icon: <FaMobileAlt size={40} className="text-purple-500" />,
            title: "Responsive Design",
            description: "Access your dashboard from any device, anytime.",
          },
          {
            icon: <FaRocket size={40} className="text-yellow-500" />,
            title: "Fast & Efficient",
            description: "Instantly get your anonymous messages, no delays.",
          },
          {
            icon: <FaSmile size={40} className="text-pink-500" />,
            title: "Fun & Engaging",
            description: "A fun way to connect with people anonymously.",
          },
          {
            icon: <FaGlobe size={40} className="text-teal-500" />,
            title: "Global Reach",
            description: "Share your link and connect with people worldwide.",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="p-6 shadow-md hover:shadow-xl transition-shadow hover:scale-105 transform duration-200 ease-in-out">
            <CardHeader className="flex items-center space-x-4">
              {feature.icon}
              <CardTitle className="text-xl font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h2 className="text-4xl font-bold mb-4 text-white">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-white mb-6 opacity-80">
          Create your unique link now and explore the world of anonymous
          feedback.
        </p>
        <Button
          size="lg"
          className="bg-pink-600 text-white hover:bg-pink-700 shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
          <Link href="/dashboard">Generate Your Link</Link>
        </Button>
      </motion.div>
    </div>
  );
}
