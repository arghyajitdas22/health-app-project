import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";

export async function POST(request: Request) {
  const body = await request.json();

  const { specialization } = body;
  const doctors = await prisma.doctor.findMany({
    where: {
      specialization: {
        has: specialization,
      },
    },
  });
  console.log("Response", doctors);

  return NextResponse.json(doctors);
}
