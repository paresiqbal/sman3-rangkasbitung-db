"use client";

import { login } from "@/lib/authAction";

export default function SignIn() {
  return (
    <div>
      <button onClick={() => login()}>Signin with Google</button>
    </div>
  );
}
