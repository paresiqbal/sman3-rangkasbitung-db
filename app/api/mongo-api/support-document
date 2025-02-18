import { NextRequest, NextResponse } from "next/server";
import { Binary } from "mongodb";

import clientPromise from "../../../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const client = await clientPromise;
    const db = client.db("academic-documents");
    const collection = db.collection("support-documents");

    const result = await collection.insertOne({
      filename: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      content: new Binary(buffer),
    });

    console.log("File uploaded successfully:", result.insertedId);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Upload error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to upload file", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to upload file", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
