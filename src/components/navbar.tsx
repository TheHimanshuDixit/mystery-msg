"use client";

import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;

  return (
    <nav className="p-4 shadow-md space-x-4">
      <div className="flex justify-between items-center space-x-4">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Mystery Message
        </Link>
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="mr-4">Welcome, {user?.username}!</span>
            <Button className="w-full md:m-auto" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:m-auto">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
