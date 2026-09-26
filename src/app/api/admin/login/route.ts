import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // The password is read strictly from the environment variable in Vercel
    const configuredPassword = process.env.ADMIN_PASSWORD;
    const configuredEmail = (process.env.ADMIN_EMAIL || "admin@karstore.shop").toLowerCase();

    if (!configuredPassword) {
      console.error("ADMIN_PASSWORD environment variable is not set");
      return NextResponse.json(
        { error: "Error de configuración en el servidor (falta ADMIN_PASSWORD)." },
        { status: 500 }
      );
    }

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
