"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Signout() {
  return (
    <Button
      className="flex items-center"
      variant={"outline"}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
