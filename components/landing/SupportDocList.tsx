"use client";

import { useState, useCallback } from "react";

// ui
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
import { useToast } from "@/hooks/use-toast";

// icons
import { Search } from "lucide-react";

interface File {
  _id: string;
  filename: string;
  size: number;
  uploadDate: string;
}

export function SupportDocList() {
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const searchFiles = useCallback(async () => {
    if (!searchQuery.trim()) {
      setFiles([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/support-documents/search?query=${encodeURIComponent(searchQuery)}`
      );

      if (response.ok) {
        const data = await response.json();
        setFiles(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to search files");
      }
    } catch (err) {
      console.error("Error searching files:", err);
      setError("An unexpected error occurred.");
    }
  }, [searchQuery]);

  const handleDownload = async (fileId: string, filename: string) => {
    try {
      const response = await fetch(`/api/support-documents/download/${fileId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast({
          title: "Download started",
          description: "Your file download has begun.",
        });
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Failed to download file:", errorData.error);
          toast({
            title: "Download failed",
            description: errorData.error || "Could not download file.",
            variant: "destructive",
          });
        } else {
          const text = await response.text();
          console.error(
            "Failed to download file, server responded with:",
            text
          );
          toast({
            title: "Download failed",
            description: "An unexpected response was received from the server.",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error("Error downloading file:", err);
      toast({
        title: "Download error",
        description: "An error occurred while downloading the file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search files..."
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
          <TableRow className="bg-zinc-200">
            <TableHead>Nama File</TableHead>
            <TableHead>Ukuran</TableHead>
            <TableHead>Tanggal Unggah</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file._id}>
              <TableCell>{file.filename}</TableCell>
              <TableCell>{Math.round(file.size / 1024)} KB</TableCell>
              <TableCell>
                {new Date(file.uploadDate).toLocaleString()}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Button onClick={() => handleDownload(file._id, file.filename)}>
                  Unduh
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
