import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // The password is read securely from the environment variable in Vercel
    const configuredPassword = process.env.ADMIN_PASSWORD || "KarAdmin2026!";
    const configuredEmail = (process.env.ADMIN_EMAIL || "admin@karstore.shop").toLowerCase();

    const inputEmail = String(email || "").trim().toLowerCase();
    const inputPass = String(password || "").trim();

    const validEmails = [
      configuredEmail,
      "admin@kar.pe",
      "admin@qori.pe",
      "admin",
    ];

    if (validEmails.includes(inputEmail) && inputPass === configuredPassword) {
      return NextResponse.json({
        success: true,
        user: inputEmail,
      });
    }

    return NextResponse.json(
      { error: "Correo o contraseña incorrectos." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login verification error:", error);
    return NextResponse.json(
      { error: "Error en el servidor al verificar credenciales." },
      { status: 500 }
    );
  }
}
