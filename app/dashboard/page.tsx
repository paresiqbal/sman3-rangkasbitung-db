"use server";

import { auth } from "@/auth";
import Signout from "@/components/sign-out";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{session?.user?.name}</p>
      <Signout />
    </div>
  );
}
