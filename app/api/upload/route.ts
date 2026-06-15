import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Forward the file to ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", image);

    const apiKey = process.env.IMGBB_API_KEY;
    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbFormData,
    });

    const data = await imgbbRes.json();

    if (data.success) {
      return NextResponse.json({ url: data.data.url });
    } else {
      throw new Error("ImgBB rejection");
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}