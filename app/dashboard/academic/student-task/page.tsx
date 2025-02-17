"use client";

import { StudentTaskForm } from "@/components/StudentTaskForm";
import { StudentTaskList } from "@/components/StudentTaskList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StudentTask() {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-7xl">
      <h1 className="text-2xl font-bold">Tugas Siswa</h1>
      <p className="mb-8">
        Tugas Praktik, Pekerjaan Rumah, Ulangan Harian dan Tugas Harian.
      </p>
      <div className="mb-8">
        <StudentTaskForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cari Dokumen</CardTitle>
          <CardDescription>List dokumen.</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentTaskList />
        </CardContent>
      </Card>
    </div>
  );
}
