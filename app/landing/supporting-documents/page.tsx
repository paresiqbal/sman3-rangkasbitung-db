"use client";

// components
import { SupportDocList } from "@/components/landing/SupportDocList";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SupportDocuments() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-7xl">
      <h1 className="text-2xl font-bold">Dokument Pendukung</h1>
      <p className="mb-8">Unggah dan cari dokumen pendukung yang tersedia.</p>
      <Card>
        <CardHeader>
          <CardTitle>Cari Surat - Surat</CardTitle>
          <CardDescription>Lis Surat yang tersedia.</CardDescription>
        </CardHeader>
        <CardContent>
          <SupportDocList />
        </CardContent>
      </Card>
    </div>
  );
}
