"use client";

import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Menu, User as UserIcon, LogOut, LogIn, Home } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-lg top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide flex items-center space-x-2 hover:text-indigo-200 transition-colors">
            <Home className="w-6 h-6" />
            <span>Mystery Message</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <span className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>Welcome, {user?.username || "User"}!</span>
              </span>
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="flex items-center space-x-2 text-white bg-transparent border-white hover:bg-white hover:text-indigo-600 transition-all">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="flex items-center space-x-2 text-white bg-transparent border-white hover:bg-white hover:text-indigo-600 transition-all">
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
