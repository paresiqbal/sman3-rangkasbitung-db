"use client";

import Image from "next/image";
import Link from "next/link";

// ui
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import SignIn from "@/components/sign-in";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-8 sm:p-20">
        <div className="max-w-6xl w-full mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              SMA Negeri 3 Rangkasbitung
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-prose mx-auto lg:mx-0">
              Cloud storage untuk dokumentasi sekolah dan tugas siswa. Akses
              mudah, aman, dan efisien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/landing">
                <Button className="w-full sm:w-auto">
                  Dashboard Siswa
                  <ArrowRightCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <SignIn />
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none ">
            <Image
              src="/assets/file.jpg"
              alt="File management illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </main>
      <footer className="border-t py-2 flex justify-center">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2023 SMA Negeri 3 Rangkasbitung. Hak cipta dilindungi undang-undang.
        </p>
      </footer>
    </div>
  );
}
