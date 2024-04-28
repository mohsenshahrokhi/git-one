import { settingSchema } from "@/ZSchemas"
import { createCategory, getAllCategory } from "@/lib/controllers/categoryController"
import { verifyJwt } from "@/lib/jwt"
// import { settingSchema } from "@/type"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: NextResponse) => {
  /* const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }  */
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
      const result = settingSchema.safeParse(data)
      console.log('result', result);


      const category = await createCategory(data)
      return NextResponse.json({ message: "Success", category }, { status: 201 })
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
  } else {
    return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

  }
}
