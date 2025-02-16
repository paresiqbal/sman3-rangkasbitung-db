"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/lib/supabase";
import { Search, Trash } from "lucide-react";

interface File {
  name: string;
  size: number;
  lastModified: string;
}

export function AcademicList() {
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const searchFiles = useCallback(async () => {
    if (!searchQuery.trim()) {
      setFiles([]);
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("student-documents")
        .list("academic-documents");

      if (error) throw error;

      if (data) {
        const filteredFiles = data
          .filter((file) =>
            file.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((file) => ({
            name: file.name,
            size: file.metadata?.size || 0,
            lastModified: file.updated_at || new Date().toISOString(),
          }));
        setFiles(filteredFiles);
      }
    } catch (err: unknown) {
      console.error("Error searching files:", err);
      setError("Failed to fetch files. Please try again later.");
    }
  }, [searchQuery]);

  const handleDownload = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("task")
        .createSignedUrl(`uploads/${fileName}`, 60);

      if (error) throw error;

      if (data?.signedUrl) {
        const link = document.createElement("a");
        link.href = data.signedUrl;
        link.download = fileName;
        link.click();
      }
    } catch (err: unknown) {
      console.error("Error downloading file:", err);
      setError("Failed to download file. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Cari tugas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={searchFiles}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama File</TableHead>
            <TableHead>Ukuran</TableHead>
            <TableHead>Terakhir Diubah</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell>{file.name}</TableCell>
              <TableCell>{Math.round(file.size / 1024)} KB</TableCell>
              <TableCell>
                {new Date(file.lastModified).toLocaleString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button onClick={() => handleDownload(file.name)}>
                  Download
                </Button>
                <Button>
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
