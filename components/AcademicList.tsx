"use client";

import { useState, useEffect, useCallback } from "react";
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

  const fetchFiles = useCallback(async (query = "") => {
    try {
      // Fetch all files from the storage bucket
      const { data, error } = await supabase.storage
        .from("academic-documents")
        .list("academic");

      if (error) throw error;

      if (data) {
        // Map data to our File interface
        const mappedFiles = data.map((file) => ({
          name: file.name,
          size: file.metadata?.size || 0,
          lastModified: file.updated_at || new Date().toISOString(),
        }));

        // If the query is not empty, filter the results
        const filteredFiles = query
          ? mappedFiles.filter((file) =>
              file.name.toLowerCase().includes(query.toLowerCase())
            )
          : mappedFiles;

        setFiles(filteredFiles);
      }
    } catch (err: unknown) {
      console.error("Error fetching files:", err);
      setError("Failed to fetch files. Please try again later.");
    }
  }, []);

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // This function will be triggered by the search button.
  const searchFiles = useCallback(async () => {
    fetchFiles(searchQuery);
  }, [fetchFiles, searchQuery]);

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
