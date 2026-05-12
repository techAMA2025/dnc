import { NextResponse } from "next/server";
import { app } from "@/lib/firebase";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore/lite";

export async function POST(request: Request) {
  try {
    const liteDb = getFirestore(app);
    const body = await request.json();
    console.log("Received contact form data:", body);
    const { name, email, phone, services, budget, message } = body;



    if (!name || !email || !phone || !services || !budget) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Server-side validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(name)) {
      return NextResponse.json({ error: "Invalid name format" }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!phoneRegex.test(phone) || phone.length !== 10) {
      return NextResponse.json({ error: "Phone number must be exactly 10 digits" }, { status: 400 });
    }

    const docRef = await addDoc(collection(liteDb, "contacts"), {
      name,
      email,
      phone,
      services,
      budget,
      message: message || "",
      createdAt: serverTimestamp(),
    });


    return NextResponse.json(
      { message: "Form submitted successfully", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact form data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

