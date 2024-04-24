import { createCategory, getAllCategory } from "@/lib/controllers/categoryController"
import { verifyJwt } from "@/lib/jwt"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: NextResponse) => {
  // const accessToken = req.headers.get('Authorization')
  // const verify = accessToken && verifyJwt(accessToken!) || null
  // if (accessToken && verify?.role === "مدیر کل") {
  try {
    const categories = await getAllCategory(req)
    return NextResponse.json({ message: "Success", categories }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
  // } else {
  //   return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

  // }
}

export const POST = async (req: Request, res: NextResponse) => {
  const accessToken = req.headers.get('Authorization')
  const verify = accessToken && verifyJwt(accessToken!) || null
  if (accessToken && verify?.role === "مدیر کل") {
    try {
      const { data } = await req.json()
      console.log(data);

      const category = await createCategory(data)
      return NextResponse.json({ message: "Success", category }, { status: 201 })
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
  } else {
    return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

  }
}
