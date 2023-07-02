import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";

// export async function POST(request: Request) {
//   const body = await request.json();

//   const { name, specialization, location, fees, rating } = body;

//   const doctor = await prisma.doctor.create({
//     data: {
//       name,
//       specialization,
//       location,
//       fees,
//       rating,
//     },
//   });

//   return NextResponse.json(doctor);
// }

export async function POST(request: Request) {
  const body = await request.json();

  const { specialization } = body;
  const doctors = await prisma.doctor.findMany({
    // where: {
    //   specialization: {
    //     has: specialization,
    //   },
    // },
  });
  console.log("Response", doctors);

  return NextResponse.json(doctors);
}
