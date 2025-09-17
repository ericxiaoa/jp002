import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  try {
    // 读取url.txt文件获取完整URL
    const filePath = path.join(process.cwd(), "public", "url.txt")

    // 读取文件内容
    let lineUrl = ""
    try {
      // 读取文件内容并去除空白
      const fileContent = fs.readFileSync(filePath, "utf8").trim()

      // 获取第一行作为URL
      const lines = fileContent.split("\n")
      if (lines.length > 0 && lines[0].trim()) {
        lineUrl = lines[0].trim()
      } else {
        throw new Error("URL文件为空或格式不正确")
      }
    } catch (fileError) {
      console.error("读取URL文件错误:", fileError)
      throw new Error("无法读取URL文件")
    }

    // 验证URL格式
    try {
      new URL(lineUrl)
    } catch (urlError) {
      console.error("URL格式错误:", urlError)
      throw new Error("URL格式不正确")
    }

    console.log("读取到的LINE URL:", lineUrl)

    return NextResponse.json({
      success: true,
      url: lineUrl,
    })
  } catch (error) {
    console.error("获取LINE URL错误:", error)

    // 返回错误响应
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "未知错误",
        message: "LINE URLを取得できませんでした",
      },
      { status: 500 },
    )
  }
}
