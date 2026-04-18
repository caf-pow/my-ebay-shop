import React, { useState, useEffect } from "react";

// 星のアイコン部品
const StarIcon = ({ size = 16, color = "#FF9900" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{display: 'inline-block'}}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: "#fffaf5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* ヘッダー */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", padding: "20px",
        backgroundColor: scrolled ? "rgba(255,250,245,0.9)" : "transparent",
        display: "flex", justifyContent: "space-between", z_index: 100
      }}>
        <div style={{ fontWeight: "bold", color: "#FF6600", fontSize: "20px" }}>
          <StarIcon size={24} /> あかりshop ☆
        </div>
      </nav>

      {/* メインコンテンツ */}
      <div style={{ pt: "100px", textAlign: "center", padding: "100px 20px" }}>
        <h1 style={{ color: "#BF360C", fontSize: "40px" }}>
          日本から、あなたのもとへ。
        </h1>
        <p style={{ color: "#666", fontSize: "18px", margin: "20px 0" }}>
          厳選した日本の宝物をお届けします
        </p>
        
        {/* テスト用メッセージ */}
        <div style={{ background: "#FF9900", color: "white", padding: "20px", borderRadius: "20px", display: "inline-block", marginTop: "30px" }}>
          <h2 style={{ margin: 0 }}>あかりshop 起動成功！</h2>
          <p>この画面が見えていれば、Reactは正常に動いています。</p>
        </div>
      </div>
    </div>
  );
}
