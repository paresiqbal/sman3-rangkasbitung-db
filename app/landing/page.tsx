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
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Tasks</CardTitle>
            <CardDescription>
              Manage your academic responsibilities
            </CardDescription>
          </CardHeader>
          <Link href="/student/tasks">
            <Button>Cari dan kumpulkan tugas</Button>
          </Link>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Users</CardTitle>
            <CardDescription>Quick actions and information</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student/tasks">
              <Button>Cari dan kumpulkan tugas</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
