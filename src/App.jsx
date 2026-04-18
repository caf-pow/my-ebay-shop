import React, { useState, useEffect } from "react";

import { useState, useEffect } from "react";

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

const products = [
  {
    emoji: "🕹️",
    name: "レトロゲームソフト",
    desc: "スーパーファミコン・ゲームボーイなど、状態良好な希少タイトルを厳選！",
    price: "$24.99〜",
    tag: "レトロ",
  },
  {
    emoji: "🎎",
    name: "限定フィギュア",
    desc: "日本国内限定・コミケ限定など、海外では手に入らないレアアイテム多数！",
    price: "$39.99〜",
    tag: "限定品",
  },
  {
    emoji: "🍬",
    name: "日本のお菓子セット",
    desc: "ポッキー・抹茶キットカット・おしるこなど、本場の味をお届けします！",
    price: "$12.99〜",
    tag: "人気No.1",
  },
];

const features = [
  { icon: "✈️", title: "安心の日本発送", desc: "追跡番号付きで世界中にお届け。紛失保証付き。" },
  { icon: "📦", title: "丁寧な梱包", desc: "プチプチ・エアキャップで商品をしっかり保護してお送りします。" },
  { icon: "✅", title: "100%本物保証", desc: "すべて正規品・純正品のみ取り扱い。偽物は一切ありません。" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "#fffaf5", color: "#333", overflowX: "hidden" }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
        @keyframes pulse-btn {
          0%, 100% { box-shadow: 0 6px 24px rgba(255,153,0,0.5); }
          50% { box-shadow: 0 10px 36px rgba(255,153,0,0.8); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .ebay-btn {
          background: linear-gradient(135deg, #FF9900, #FF6600);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 16px 40px;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          animation: pulse-btn 2s ease-in-out infinite;
          transition: transform 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          letter-spacing: 0.5px;
        }
        .ebay-btn:hover { transform: scale(1.06) translateY(-2px); }
        .card { background: white; border-radius: 24px; padding: 28px; box-shadow: 0 4px 24px rgba(255,153,0,0.12); transition: transform 0.2s, box-shadow 0.2s; border: 2px solid #FFE0B2; }
        .card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(255,153,0,0.25); }
        .feat-card { background: white; border-radius: 24px; padding: 28px 24px; text-align: center; box-shadow: 0 4px 20px rgba(255,153,0,0.1); border: 2px solid #FFE0B2; }
        .nav { position: sticky; top: 0; z-index: 100; background: ${scrolled ? "rgba(255,250,245,0.95)" : "transparent"}; backdrop-filter: ${scrolled ? "blur(10px)" : "none"}; transition: all 0.3s; padding: 12px 32px; display: flex; justify-content: space-between; align-items: center; border-bottom: ${scrolled ? "2px solid #FFE0B2" : "none"}; }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StarIcon size={22} color="#FF9900" />
          <span style={{ fontWeight: 800, fontSize: 18, color: "#FF6600" }}>あかりshop ☆</span>
        </div>
        <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer"
          style={{ background: "#FF9900", color: "white", borderRadius: 50, padding: "8px 22px", fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <span>🛒</span> eBayで買う
        </a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "520px", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(135deg, #FFF3E0 0%, #fffaf5 50%, #E3F2FD 100%)" }}>
        {/* BG deco */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <FloatingStar style={{ top: "10%", left: "5%", animationDelay: "0s" }} />
          <FloatingStar style={{ top: "70%", left: "8%", animationDelay: "0.8s" }} />
          <FloatingStar style={{ top: "30%", left: "48%", animationDelay: "1.4s" }} />
          <FloatingStar style={{ top: "80%", left: "45%", animationDelay: "0.5s" }} />
        </div>

        {/* LEFT: Text */}
        <div style={{ position: "relative", zIndex: 2, flex: "0 0 auto", width: "clamp(300px, 45%, 560px)", padding: "48px 32px 48px clamp(20px, 5vw, 64px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF3E0", border: "2px solid #FFB74D", borderRadius: 50, padding: "6px 16px", marginBottom: 20 }}>
            <StarIcon size={14} color="#FF9900" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#E65100" }}>日本直送ショップ</span>
            <StarIcon size={14} color="#FF9900" />
          </div>

          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 900, lineHeight: 1.3, color: "#BF360C", margin: "0 0 16px" }}>
            日本から、あなたのもとへ。<br />
            <span style={{ color: "#FF6600" }}>厳選した宝物</span>をお届けします
          </h1>

          <p style={{ fontSize: "clamp(13px, 1.5vw, 16px)", color: "#666", lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
            レトロゲーム・限定フィギュア・和菓子まで、日本各地から集めたレアアイテムを世界中にお届けします。⭐️ 丁寧梱包・追跡付き発送
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" className="ebay-btn">
              <span>⭐</span> eBayストアを見る
            </a>
          </div>

          <div style={{ display: "flex", gap: 24, marginTop: 28 }}>
            {[["1,200+", "販売実績"], ["★4.9", "評価"], ["30+", "発送先国"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#FF6600" }}>{val}</div>
                <div style={{ fontSize: 11, color: "#999", fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image */}
        <div style={{ flex: 1, position: "relative", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <img
            src="images/hero.png"
            alt="hero"
            style={{ display: "none" }}
          />
          {/* Illustrated placeholder matching the uploaded image style */}
          <div style={{ position: "relative", width: "100%", height: "460px", overflow: "hidden" }}>
            <svg viewBox="0 0 700 460" style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
              {/* Background gradient */}
              <defs>
                <radialGradient id="glow" cx="45%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE082" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#FFE0B2" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="swirl" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFD54F"/>
                  <stop offset="100%" stopColor="#FF9800"/>
                </radialGradient>
              </defs>
              <rect width="700" height="460" fill="url(#glow)" rx="0"/>
              {/* Swirl */}
              <g transform="translate(280,230)">
                {[0,30,60,90,120].map((a,i)=>(
                  <ellipse key={i} cx="0" cy="0" rx={140-i*20} ry={60-i*8}
                    fill="none" stroke={i%2===0?"#FFB300":"#29B6F6"} strokeWidth="3" strokeOpacity="0.6"
                    transform={`rotate(${a})`}/>
                ))}
                <circle cx="0" cy="0" r="24" fill="#FFD54F" opacity="0.9"/>
              </g>
              {/* Stars scattered */}
              {[[120,80],[350,60],[500,90],[180,350],[420,380],[560,200],[90,260],[470,150]].map(([x,y],i)=>(
                <polygon key={i} points={`${x},${y-10} ${x+4},${y-3} ${x+11},${y-3} ${x+5},${y+3} ${x+7},${y+11} ${x},${y+6} ${x-7},${y+11} ${x-5},${y+3} ${x-11},${y-3} ${x-4},${y-3}`}
                  fill={i%3===0?"#FF9800":i%3===1?"#29B6F6":"#AB47BC"} opacity="0.7"/>
              ))}
              {/* Boxes */}
              {[[80,310],[260,340],[430,290],[590,330]].map(([x,y],i)=>(
                <g key={i} transform={`translate(${x},${y})`}>
                  <rect x="-35" y="-30" width="70" height="55" fill="#D4A017" rx="4"/>
                  <rect x="-35" y="-30" width="70" height="12" fill="#C69315" rx="4"/>
                  <rect x="-4" y="-30" width="8" height="12" fill="#B8860B"/>
                  <text x="0" y="18" textAnchor="middle" fontSize="18">{["🕹️","🎎","🍬","📱"][i]}</text>
                </g>
              ))}
              {/* Music notes */}
              {[[100,140],[160,200],[220,130]].map(([x,y],i)=>(
                <text key={i} x={x} y={y} fontSize="22" fill="#FF9800" opacity="0.7">{["♪","♫","🎵"][i]}</text>
              ))}
              {/* Building right side */}
              <rect x="580" y="60" width="120" height="400" fill="#FFCC80" rx="8" opacity="0.7"/>
              <rect x="590" y="80" width="100" height="50" fill="#FFB74D" rx="4" opacity="0.8"/>
              <text x="640" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#E65100">TOKYO HUB</text>
              <polygon points="640,70 655,85 625,85" fill="#FF7043" opacity="0.8"/>
              {/* Arrow ribbon */}
              <path d="M 100 400 Q 350 370 600 350" stroke="#29B6F6" strokeWidth="18" fill="none" strokeOpacity="0.3"/>
              {/* Orange arrows */}
              {[[200,390],[350,375],[480,360]].map(([x,y],i)=>(
                <polygon key={i} points={`${x},${y-8} ${x+20},${y} ${x},${y+8}`} fill="#FF9800" opacity="0.8"/>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* WAVE */}
      <div style={{ marginTop: -2, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" style={{ width: "100%", display: "block" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#FF9900" opacity="0.15"/>
          <path d="M0,50 C480,20 960,70 1440,50 L1440,60 L0,60 Z" fill="#FF9900" opacity="0.1"/>
        </svg>
      </div>

      {/* PRODUCTS */}
      <section style={{ padding: "60px clamp(16px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <StarIcon size={18} color="#FF9900" />
            <span style={{ fontWeight: 800, color: "#FF6600", fontSize: 14, letterSpacing: 2 }}>FEATURED ITEMS</span>
            <StarIcon size={18} color="#FF9900" />
          </div>
          <h2 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 900, color: "#BF360C", margin: 0 }}>
            人気商品ピックアップ ⭐
          </h2>
          <p style={{ color: "#888", marginTop: 10, fontSize: 15 }}>厳選されたアイテムをあなたにお届けします</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24 }}>
          {products.map((p) => (
            <div key={p.name} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ fontSize: 52 }}>{p.emoji}</div>
                <span style={{ background: "linear-gradient(135deg,#FF9900,#FF6600)", color: "white", borderRadius: 50, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>{p.tag}</span>
              </div>
              <h3 style={{ margin: "0 0 8px", color: "#BF360C", fontWeight: 800, fontSize: 18 }}>{p.name}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>{p.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 900, fontSize: 20, color: "#FF6600" }}>{p.price}</span>
                <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer"
                  style={{ background: "#FF9900", color: "white", borderRadius: 50, padding: "8px 20px", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                  <span>⭐</span> 詳しく見る
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section style={{ background: "linear-gradient(135deg, #FFF3E0, #E3F2FD)", padding: "70px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <StarIcon size={18} color="#FF9900" />
              <span style={{ fontWeight: 800, color: "#FF6600", fontSize: 14, letterSpacing: 2 }}>WHY CHOOSE US</span>
              <StarIcon size={18} color="#FF9900" />
            </div>
            <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, color: "#BF360C", margin: 0 }}>
              安心してお買い物できる理由 💫
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} className="feat-card">
                <div style={{ fontSize: 48, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ margin: "0 0 10px", color: "#E65100", fontWeight: 800, fontSize: 17 }}>{f.title}</h3>
                <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg, #FF9900, #FF5722)", padding: "60px clamp(16px,5vw,80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[[10,20],[80,70],[20,80],[90,30],[50,90],[5,50]].map(([lp,tp],i)=>(
            <div key={i} style={{ position:"absolute", left:`${lp}%`, top:`${tp}%`, animation:`float ${2+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.3}s` }}>
              <StarIcon size={16+i*4} color="rgba(255,255,255,0.25)" />
            </div>
          ))}
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ color: "white", fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, margin: "0 0 16px" }}>
            今すぐあかりshopで<br />お気に入りを見つけよう！
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, marginBottom: 32 }}>世界中のバイヤーが選ぶ、日本の本物アイテム</p>
          <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer"
            style={{ background: "white", color: "#FF6600", border: "none", borderRadius: 50, padding: "18px 48px", fontSize: 18, fontWeight: 900, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 6px 30px rgba(0,0,0,0.2)" }}>
            <span>⭐</span> eBayストアを見る <span>⭐</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a2e", color: "#ccc", padding: "40px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <StarIcon size={20} color="#FF9900" />
              <span style={{ fontWeight: 800, fontSize: 18, color: "#FF9900" }}>あかりshop ☆</span>
            </div>
            <p style={{ fontSize: 13, color: "#888", maxWidth: 260, lineHeight: 1.6, margin: 0 }}>日本から世界へ。厳選した日本のレアアイテムをお届けするeBayショップです。</p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, color: "#FF9900", marginBottom: 12, fontSize: 14 }}>リンク</div>
              {["eBayストア", "商品一覧", "お気に入り", "フィードバック"].map(l=>(
                <div key={l} style={{ marginBottom: 8 }}>
                  <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" style={{ color: "#888", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                    onMouseOver={e=>e.target.style.color="#FF9900"} onMouseOut={e=>e.target.style.color="#888"}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#FF9900", marginBottom: 12, fontSize: 14 }}>サポート</div>
              {["配送について", "返品ポリシー", "お問い合わせ", "よくある質問"].map(l=>(
                <div key={l} style={{ marginBottom: 8 }}>
                  <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" style={{ color: "#888", textDecoration: "none", fontSize: 13 }}
                    onMouseOver={e=>e.target.style.color="#FF9900"} onMouseOut={e=>e.target.style.color="#888"}>{l}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "32px auto 0", borderTop: "1px solid #333", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 12, color: "#555" }}>
          <span>© 2026 あかりshop. All rights reserved.</span>
          <span>Powered by ⭐ with love from Japan 🇯🇵</span>
        </div>
      </footer>
    </div>
  );
}
