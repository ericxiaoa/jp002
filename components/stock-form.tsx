"use client"

import type React from "react"

import { useState, useEffect } from "react"

// 声明全局gtag函数
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    gtag_report_conversion: (url?: string) => boolean
  }
}

export default function StockForm() {
  const [stockCode, setStockCode] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [gifLoaded, setGifLoaded] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  // 预加载分析GIF
  useEffect(() => {
    const img = new Image()
    img.onload = () => setGifLoaded(true)
    img.onerror = () => {
      console.log("分析GIF加载失败，使用备用动画")
      setGifLoaded(false)
    }
    img.src = "/analyzing.gif"
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 检查股票代码是否为空
    if (!stockCode.trim()) {
      alert("株式コードを入力してください")
      return
    }

    console.log("开始分析流程...")

    // 开始显示分析GIF
    setIsAnalyzing(true)
    setShowResult(false)

    // 1秒后显示结果并隐藏原始描述文案
    setTimeout(() => {
      console.log("分析完成，显示结果")
      setIsAnalyzing(false)
      setShowResult(true)
      // 通知主页面隐藏原始内容
      window.dispatchEvent(new CustomEvent("analysisComplete"))
    }, 1000)
  }

  const handleRedirectToLine = async () => {
    if (isRedirecting) return // 防止重复点击

    setIsRedirecting(true)

    try {
      console.log("开始获取URL...")

      // 从API获取URL
      const response = await fetch("/api/line")

      if (!response.ok) {
        throw new Error(`服务器错误: ${response.status}`)
      }

      const data = await response.json()

      if (!data.success || !data.url) {
        throw new Error(data.error || "获取URL失败")
      }

      console.log("准备跳转到:", data.url)

      // 使用Google提供的转换函数
      if (typeof window !== "undefined" && window.gtag_report_conversion) {
        console.log("调用Google转换函数...")
        window.gtag_report_conversion(data.url)
        console.log("Google转换函数已调用")
      } else {
        console.log("gtag_report_conversion函数不可用，直接跳转")
        // 如果转换函数不可用，直接跳转
        window.location.href = data.url
      }
    } catch (error) {
      console.error("跳转错误:", error)
      alert(`跳转失败: ${error instanceof Error ? error.message : "未知错误"}`)
      setIsRedirecting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockCode(e.target.value)
  }

  // 如果分析完成，显示结果
  if (showResult) {
    return (
      <div className="mt-6">
        {/* 蓝色标题框 */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 mb-4 text-center text-white border-2 border-blue-300 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-blue-200"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-blue-200"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-300/10 to-transparent"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold relative z-10">2025年 AIによる株式データ分析サービス</h1>
        </div>

        {/* 主要内容框 */}
        <div className="bg-white bg-opacity-95 rounded-xl p-6 mb-6 border-2 border-blue-300 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-15">
            <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-blue-200"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-blue-200"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-blue-200 to-transparent"></div>
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-200 to-transparent"></div>
            <div className="absolute right-0 bottom-0 w-1 h-full bg-gradient-to-t from-blue-200 to-transparent"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 relative z-10">
            分析レポートが生成されました
          </h2>

          <div className="text-base md:text-lg text-center text-gray-700 leading-relaxed relative z-10">
            <p className="mb-4">
              AIによる解析結果の概要レポートを無料でご覧いただけ
              <br />
              ます。また、市場データに基づく参考情報リストも提供
              <br />
              しています。最新レポートと追加の情報はLINE公式アカ
              <br />
              ウント追加で受け取れます。
            </p>
            <p className="text-sm text-gray-600">
              ※本サービスは投資助言ではなく、情報提供のみを目的
              <br />
              としています。
            </p>
          </div>
        </div>

        {/* 跳转按钮 */}
        <button
          onClick={handleRedirectToLine}
          disabled={isRedirecting}
          className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 text-lg md:text-xl rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-cta relative overflow-hidden ${
            isRedirecting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {/* 闪动背景效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <span className="relative z-10">
            {isRedirecting ? "跳转中..." : "LINEを追加してAI分析レポートを受け取る"}
          </span>
        </button>
      </div>
    )
  }

  // 如果正在分析，显示GIF或备用动画
  if (isAnalyzing) {
    return (
      <div className="mt-6 py-4 flex flex-col items-center">
        {/* 显示分析GIF或备用动画 */}
        {gifLoaded ? (
          <img src="/analyzing.gif" alt="分析中..." className="w-full max-w-md rounded-lg shadow-lg" />
        ) : (
          // 备用CSS动画
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">分析中です...</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-100 rounded-lg p-3 animate-pulse">
                <div className="text-blue-800 font-semibold">市場分析</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 animate-pulse" style={{ animationDelay: "0.2s" }}>
                <div className="text-blue-800 font-semibold">チャート分析</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 animate-pulse" style={{ animationDelay: "0.4s" }}>
                <div className="text-blue-800 font-semibold">ニュース分析</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="mt-4 text-blue-700 font-bold text-lg animate-pulse">AI分析を実行中...</p>
      </div>
    )
  }

  // 初始表单状态
  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="会社名またはティッカーを入力してください"
          value={stockCode}
          onChange={handleInputChange}
          className="w-full py-4 px-6 text-lg rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={!stockCode.trim()}
        className={`w-full font-bold py-4 px-6 text-xl rounded-full transition-colors duration-300 transform hover:scale-105 ${
          !stockCode.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        分析を開始する
      </button>
    </form>
  )
}
