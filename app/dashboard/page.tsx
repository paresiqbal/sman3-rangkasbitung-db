"use server";

import { auth } from "@/auth";
import SignIn from "@/components/sign-in";

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudIcon } from "lucide-react";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CloudIcon className="h-12 w-12 text-purple-600" />
          </div>
          <CardTitle className="text-4xl font-bold">
            Selamat datang di{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Cloud Database
            </span>
          </CardTitle>
          <CardDescription className="text-xl">
            SMA Negeri 3 Rangkasbitung
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {session?.user?.name ? (
            <div className="space-y-4">
              <p className="text-lg">
                Halo, <span className="font-semibold">{session.user.name}</span>
                !
              </p>
              <p>Selamat datang kembali ke sistem Cloud Database kami.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>Silakan masuk untuk mengakses sistem Cloud Database.</p>
              <SignIn />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
