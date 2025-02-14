"use client";

import { login } from "@/lib/authAction";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <div>
      <Button onClick={() => login()}>Masuk dengan Google</Button>
    </div>
  );
}
