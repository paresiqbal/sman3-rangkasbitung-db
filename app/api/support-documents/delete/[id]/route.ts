import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("academic-documents");
    const collection = db.collection("support-documents");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Delete error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to delete file", details: errorMessage },
      { status: 500 }
    );
  }
}
