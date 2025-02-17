"use client";

import { SopForm } from "@/components/SopForm";
import { SopList } from "@/components/SopList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SopDocument() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-7xl">
      <h1 className="text-2xl font-bold">Dokumen Karyawan</h1>
      <p className="mb-8">
        Dokumen Standart Operasional Prosedur (SOP) perusahaan.
      </p>
      <div className="mb-8">
        <SopForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cari Dokumen</CardTitle>
          <CardDescription>List dokumen.</CardDescription>
        </CardHeader>
        <CardContent>
          <SopList />
        </CardContent>
      </Card>
    </div>
  );
}
