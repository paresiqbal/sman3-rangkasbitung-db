"use client";

import { AcademicForm } from "@/components/AcademicForm";
import { AcademicList } from "@/components/AcademicList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Academic() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-7xl">
      <h1 className="text-2xl font-bold">Dokumen Akademik</h1>
      <p className="mb-8">
        Nilai, Unggah raport, SKHUN (Surat Keterangan Hasil Ujian Nasional),
        Ijazah.
      </p>
      <div className="mb-8">
        <AcademicForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cari Dokumen</CardTitle>
          <CardDescription>List dokumen.</CardDescription>
        </CardHeader>
        <CardContent>
          <AcademicList />
        </CardContent>
      </Card>
    </div>
  );
}
