"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AcademicForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      const filePath = `academic/${file.name}`;
      const { data, error } = await supabase.storage
        .from("academic-documents")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: true,
        });

      if (error) throw error;

      setUploadStatus("File berhasil diunggah!");
      console.log("File uploaded:", data);
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setUploadStatus(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file">Pilih file untuk diunggah</Label>
        <div className="flex gap-2">
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={uploading}
          />
          <Button type="submit" disabled={!file || uploading}>
            {uploading ? "Mengunggah..." : "Unggah"}
          </Button>
        </div>
      </div>

      {uploadStatus && <p className="text-sm font-medium">{uploadStatus}</p>}
    </form>
  );
}
