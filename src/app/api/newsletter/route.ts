import { supabaseAdmin } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Using public schema (default, but explicit for clarity)
    const { data, error } = await supabaseAdmin
      .from("newsletter")
      .insert([{ email: email.trim().toLowerCase() }])
      .select();

    if (error) {
      console.error("Supabase error:", error);

      // Handle duplicate email error gracefully
      if (error.code === "23505" || error.message.includes("duplicate")) {
        return NextResponse.json(
          { error: "This email is already registered" },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: error.message || "Failed to save email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
