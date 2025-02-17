"use client";

import { EmployeeForm } from "@/components/EmployeeForm";
import { EmployeeList } from "@/components/EmployeeList";
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
      <h1 className="text-2xl font-bold">Dokumen Karyawan</h1>
      <p className="mb-8">
        Dokumen karyawan, seperti SK, KTP, NPWP, dan lain-lain.
      </p>
      <div className="mb-8">
        <EmployeeForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cari Dokumen</CardTitle>
          <CardDescription>List dokumen.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeList />
        </CardContent>
      </Card>
    </div>
  );
}
