import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Note that you no longer need to explicitly type `params`
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const { id } = params;

    const client = await clientPromise;
    const db = client.db("academic-documents");
    const collection = db.collection("support-documents");

    const file = await collection.findOne({ _id: new ObjectId(id) });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (!file.content || !("buffer" in file.content)) {
      return NextResponse.json(
        { error: "File content is missing or invalid" },
        { status: 500 }
      );
    }

    // Convert MongoDB Binary to Buffer
    const buffer = file.content.buffer;

    const headers = new Headers();
    headers.set(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );
    headers.set("Content-Type", file.type || "application/octet-stream");
    headers.set("Content-Length", buffer.length.toString());

    return new NextResponse(buffer, { headers });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Download error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to download file", details: errorMessage },
      { status: 500 }
    );
  }
}
