"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Selamat Datang di Cloud Database SMA Negeri 3 Rangkasbitung
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Halaman Siswa</CardTitle>
            <CardDescription>
              Cari tugas, Kumpulkan Tugas, dan Lihat Nilai.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student-task">
              <Button>Cari dan kumpulkan tugas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Halaman Umum</CardTitle>
            <CardDescription>
              Dokumen sekolah, peraturan, keuangan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/supporting-document">
              <Button>Cari dokumen umum</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
