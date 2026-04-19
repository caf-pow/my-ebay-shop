import React, { useState, useEffect } from "react";
// さきほど作ったShopPageを読み込む
import ShopPage from './ShopPage';

const StarIcon = ({ size = 16, color = "#FF9900" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const FloatingStar = ({ style }) => (
  <div style={{ position: "absolute", animation: "float 3s ease-in-out infinite", ...style }}>
    <StarIcon size={20} color="rgba(255,153,0,0.5)" />
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  // 【重要】LPとショップを切り替えるための「旗」
  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // もし showShop が true なら、LPを隠してショップ画面を表示
  if (showShop) {
    return <ShopPage onBack={() => setShowShop(false)} />;
  }

  // それ以外（通常時）はLPを表示
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fffaf5", color: "#333", overflowX: "hidden" }}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .nav { position: sticky; top: 0; z-index: 100; background: ${scrolled ? "rgba(255,255,255,0.9)" : "transparent"}; padding: 12px 32px; display: flex; justify-content: space-between; align-items: center; transition: 0.3s; }
        .ebay-btn { background: linear-gradient(135deg, #FF9900, #FF6600); color: white; border: none; border-radius: 50px; padding: 16px 40px; font-size: 18px; font-weight: 800; cursor: pointer; text-decoration: none; }
      `}</style>

      {/* ナビゲーション */}
      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StarIcon size={22} color="#FF9900" />
          <span style={{ fontWeight: 800, fontSize: 18, color: "#FF6600" }}>あかりshop ☆</span>
        </div>
        <button 
          onClick={() => setShowShop(true)}
          style={{ background: "#FF9900", color: "white", border: "none", borderRadius: 50, padding: "8px 22px", fontWeight: 700, cursor: "pointer" }}>
          🛍️ ショップを開く
        </button>
      </nav>

      {/* ヒーローセクション */}
      <section style={{ padding: "100px 50px", textAlign: "center", background: "linear-gradient(135deg, #FFF3E0, #fffaf5)" }}>
        <h1 style={{ fontSize: "40px", color: "#BF360C" }}>日本から、あなたのもとへ。</h1>
        <p style={{ marginBottom: "30px" }}>厳選した日本の宝物をお届けします。</p>
        
        {/* このボタンを押すとショップに切り替わる */}
        <button onClick={() => setShowShop(true)} className="ebay-btn">
          ⭐ 商品一覧を見る
        </button>
      </section>

      {/* フッター */}
      <footer style={{ padding: "40px", textAlign: "center", color: "#888" }}>
        © 2026 あかりshop
      </footer>
    </div>
  );
}
