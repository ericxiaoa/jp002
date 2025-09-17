"use client"

import { useState, useEffect } from "react"
import StockForm from "@/components/stock-form"

export default function Home() {
  const [showOriginalContent, setShowOriginalContent] = useState(true)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)

  // 监听分析完成事件
  useEffect(() => {
    const handleAnalysisComplete = () => {
      setShowOriginalContent(false)
    }

    window.addEventListener("analysisComplete", handleAnalysisComplete)

    return () => {
      window.removeEventListener("analysisComplete", handleAnalysisComplete)
    }
  }, [])

  // 预加载背景图片
  useEffect(() => {
    const img = new Image()
    img.onload = () => setBackgroundLoaded(true)
    img.onerror = () => {
      console.log("背景图片加载失败，使用备用背景")
      setBackgroundLoaded(true)
    }
    img.src = "/background.gif"
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* 背景 - 使用CSS渐变作为备用 */}
      <div className="fixed inset-0 z-0">
        {backgroundLoaded ? (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/background.gif')",
              backgroundSize: "100% 100%",
            }}
          />
        ) : (
          // 备用背景 - 蓝色科技风格渐变
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 relative">
            {/* 添加一些科技风格的装饰 */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-400 rounded-full"></div>
              <div className="absolute top-20 right-20 w-24 h-24 border-2 border-blue-500 rounded-lg rotate-45"></div>
              <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-blue-300 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-28 h-28 border-2 border-blue-400 rounded-lg rotate-12"></div>
            </div>
          </div>
        )}
      </div>

      {/* 主内容区 */}
      <div className="max-w-2xl w-full z-10 px-4 mt-[300px]">
        {/* 标题框 */}
        <div className="bg-blue-500 bg-opacity-80 rounded-xl p-4 mb-4 text-center text-white border-2 border-blue-300 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-blue-200"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-blue-200"></div>
          </div>
          <h1 className="text-4xl font-bold mb-2 relative z-10">2025年最強AI株価予測</h1>
        </div>

        {/* 内容框 */}
        <div className="bg-white bg-opacity-90 rounded-xl p-6 mb-6 border-2 border-blue-300 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-blue-200"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-blue-200"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-blue-200 to-transparent"></div>
          </div>

          {/* 只在显示原始内容时显示这些文案 */}
          {showOriginalContent && (
            <>
              <h2 className="text-3xl font-bold text-center text-blue-800 mb-4 relative z-10">
                予測精度は99.8%に達します
              </h2>

              <p className="text-lg text-center mb-4 relative z-10">
                下記にお持ちの株式コードまたは興味のある株式コード
                <br />
                を入力すると、AIシステムが1.5秒以内で分析を完了します。
                <br />
                現在、<span className="text-red-600 font-bold">20,301</span>人が無料で完全レポートを閲覧しています！
              </p>
            </>
          )}

          <div className="relative z-10">
            <StockForm />
          </div>
        </div>
      </div>
    </div>
  )
}
