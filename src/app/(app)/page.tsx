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
import { FaShieldAlt, FaUserFriends, FaMobileAlt } from "react-icons/fa";
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
    <div className="p-8 bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
          Connect Anonymously, Share Freely
        </h1>
        <p className="text-lg text-gray-600">
          Generate your unique link, share it, and start receiving anonymous
          messages today!
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg">
            <Link href="/dashboard">Get Started</Link>
            <FiArrowRight className="ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleGetStarted}
            className="hover:bg-gray-100 shadow">
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
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          What People Are Saying
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
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
            icon: <FaShieldAlt size={40} className="text-blue-600" />,
            title: "Secure & Anonymous",
            description:
              "Your messages are private, and anonymity is guaranteed.",
          },
          {
            icon: <FaUserFriends size={40} className="text-green-600" />,
            title: "Easy to Use",
            description:
              "Generate a link in seconds and start receiving messages.",
          },
          {
            icon: <FaMobileAlt size={40} className="text-purple-600" />,
            title: "Responsive Design",
            description: "Access your dashboard from any device, anytime.",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="p-6 shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center space-x-4">
              {feature.icon}
              <CardTitle className="text-xl font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
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
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Create your unique link now and explore the world of anonymous
          feedback.
        </p>
        <Button
          size="lg"
          className="bg-green-600 text-white hover:bg-green-700 shadow-lg">
          <Link href="/dashboard">Generate Your Link</Link>
        </Button>
      </motion.div>
    </div>
  );
}
