import { useState, useEffect, useCallback, useRef } from "react";

// ══════════════════════════════════════════════
// 定数・データ
// ══════════════════════════════════════════════
const SALE_END = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000);

const I18N = {
  ja:{
    shopName:"あかりshop ☆",tagline:"日本直送ショップ",
    hero1:"日本から、あなたのもとへ。",hero2:"厳選した宝物をお届けします",
    heroDesc:"レトロゲーム・限定フィギュア・和菓子まで、日本各地から集めたレアアイテムを世界中にお届けします。⭐ 丁寧梱包・追跡付き発送",
    searchBtn:"商品を探す",ebayBtn:"eBayで見る",viewAll:"すべて見る →",
    navHome:"🏠 ホーム",navShop:"🛍️ 商品",navWish:"❤️ リスト",navDash:"📊 管理",navAI:"🤖 AI",
    newArrivals:"新着・おすすめ商品 ⭐",whyUs:"安心してお買い物できる理由 💫",
    searchPlaceholder:"商品名・タグで検索",sortNew:"新着順",sortAsc:"価格：安い順",sortDesc:"価格：高い順",
    found:"件の商品",noResult:"😢 該当する商品が見つかりませんでした",
    wishEmpty:"ウィッシュリストは空です",wishFind:"商品を探す ⭐",wishBuy:"eBayでまとめて購入",wishSaved:"件保存済み",
    buyOnEbay:"eBayで購入",condition:"状態",stock:"在庫",pieces:"点",
    reviews:"お客様の声 ⭐",shipping:"送料計算機 ✈️",selectCountry:"発送先の国を選択",calcBtn:"計算する",
    estShipping:"目安の送料",days:"営業日",
    dashboard:"売上ダッシュボード 📊",dashDesc:"eBay API連携を想定した管理画面（デモデータ）",
    totalSales:"総売上",totalOrders:"注文数",wishAdds:"WL追加",pageViews:"ページ閲覧",
    popularItems:"人気商品ランキング",recentOrders:"最近の注文",
    notice:"🎉 新着情報：初音ミクフィギュア・PSP-3000 など希少アイテム入荷！数量限定。",noticeBtn:"詳しく見る →",
    ctaTitle:"今すぐあかりshopでお気に入りを！",ctaDesc:"世界中のバイヤーが選ぶ、日本の本物アイテム",
    trust:[["✈️","安心の日本発送","追跡番号付きで世界中にお届け。紛失保証付き。"],["📦","丁寧な梱包","プチプチ・エアキャップで商品をしっかり保護。"],["✅","100%本物保証","すべて正規品のみ取り扱い。偽物は一切なし。"]],
    cats:[{id:"all",label:"すべて",emoji:"⭐"},{id:"retro-game",label:"レトロゲーム",emoji:"🕹️"},{id:"figure",label:"フィギュア",emoji:"🎎"},{id:"sweets",label:"お菓子",emoji:"🍬"}],
    stats:["1,200+","★4.9","30+"],statsLabel:["販売実績","評価","発送先国"],
    modalClose:"閉じる",modalBuy:"eBayで購入する ⭐",
    toastAdd:"をウィッシュリストに追加！",toastRemove:"ウィッシュリストから削除しました",
    saleTitle:"⚡ 期間限定セール開催中！",saleDesc:"セール終了まで",
    faqTitle:"よくある質問 ❓",
    newsletter:"📧 ニュースレター登録",newsletterDesc:"新着商品・セール情報をいち早くお届けします",
    newsletterPlaceholder:"メールアドレスを入力",newsletterBtn:"無料で登録する",newsletterOk:"✅ 登録完了！ありがとうございます",
    shareTitle:"この商品をシェア",
    aiTitle:"🤖 AI商品説明ジェネレーター",aiDesc:"商品名・状態を入力するとeBay用の説明文（日本語・英語・中国語）を自動生成します",
    aiNameLabel:"商品名",aiCondLabel:"状態・特徴",aiGenBtn:"説明文を生成する",aiGenerating:"生成中…",aiResult:"生成された説明文",aiCopy:"コピー",aiCopied:"コピー済み！",
    aiNamePh:"例：スーパーファミコン 星のカービィ3",aiCondPh:"例：箱付き・説明書あり・動作確認済み・美品",
  },
  en:{
    shopName:"Akari Shop ☆",tagline:"Direct from Japan",
    hero1:"From Japan, to you.",hero2:"Curated treasures delivered worldwide",
    heroDesc:"Retro games, limited figures, Japanese sweets — rare items from Japan delivered worldwide. ⭐ Careful packing · Tracked shipping",
    searchBtn:"Browse Items",ebayBtn:"View on eBay",viewAll:"View all →",
    navHome:"🏠 Home",navShop:"🛍️ Shop",navWish:"❤️ Wishlist",navDash:"📊 Dashboard",navAI:"🤖 AI",
    newArrivals:"New & Featured ⭐",whyUs:"Why Shop With Us 💫",
    searchPlaceholder:"Search by name or tag",sortNew:"Newest",sortAsc:"Price: Low→High",sortDesc:"Price: High→Low",
    found:"items found",noResult:"😢 No items found",
    wishEmpty:"Your wishlist is empty",wishFind:"Browse Items ⭐",wishBuy:"Buy all on eBay",wishSaved:"items saved",
    buyOnEbay:"Buy on eBay",condition:"Condition",stock:"Stock",pieces:"pcs",
    reviews:"Customer Reviews ⭐",shipping:"Shipping Calculator ✈️",selectCountry:"Select destination",calcBtn:"Calculate",
    estShipping:"Est. Shipping",days:"business days",
    dashboard:"Sales Dashboard 📊",dashDesc:"eBay API-ready admin panel (demo data)",
    totalSales:"Total Sales",totalOrders:"Orders",wishAdds:"WL Adds",pageViews:"Page Views",
    popularItems:"Popular Items",recentOrders:"Recent Orders",
    notice:"🎉 New Arrivals: Hatsune Miku figure, PSP-3000 and more! Limited stock.",noticeBtn:"View →",
    ctaTitle:"Find your treasure at Akari Shop!",ctaDesc:"Authentic Japanese items loved worldwide",
    trust:[["✈️","Safe Japan Shipping","Tracked worldwide delivery with loss guarantee."],["📦","Careful Packing","Bubble wrap & air cushion for full protection."],["✅","100% Authentic","Only genuine products. No counterfeits, ever."]],
    cats:[{id:"all",label:"All",emoji:"⭐"},{id:"retro-game",label:"Retro Games",emoji:"🕹️"},{id:"figure",label:"Figures",emoji:"🎎"},{id:"sweets",label:"Sweets",emoji:"🍬"}],
    stats:["1,200+","★4.9","30+"],statsLabel:["Sales","Rating","Countries"],
    modalClose:"Close",modalBuy:"Buy on eBay ⭐",
    toastAdd:" added to wishlist!",toastRemove:"Removed from wishlist",
    saleTitle:"⚡ Limited-Time Sale!",saleDesc:"Sale ends in",
    faqTitle:"FAQ ❓",
    newsletter:"📧 Newsletter",newsletterDesc:"Get notified about new items & sales",
    newsletterPlaceholder:"Enter your email",newsletterBtn:"Subscribe Free",newsletterOk:"✅ Subscribed! Thank you",
    shareTitle:"Share this item",
    aiTitle:"🤖 AI Description Generator",aiDesc:"Enter item name & condition to auto-generate eBay descriptions in JP / EN / ZH",
    aiNameLabel:"Item Name",aiCondLabel:"Condition & Notes",aiGenBtn:"Generate",aiGenerating:"Generating…",aiResult:"Generated Description",aiCopy:"Copy",aiCopied:"Copied!",
    aiNamePh:"e.g. Super Famicom Kirby's Dream Land 3",aiCondPh:"e.g. With box, manual included, tested, near mint",
  },
  zh:{
    shopName:"小灯店 ☆",tagline:"日本直邮",
    hero1:"从日本，送到您手中。",hero2:"精选珍品，全球配送",
    heroDesc:"复古游戏、限定手办、日本零食——稀有商品送往全球。⭐ 精心包装 · 带追踪号",
    searchBtn:"浏览商品",ebayBtn:"在eBay查看",viewAll:"查看全部 →",
    navHome:"🏠 首页",navShop:"🛍️ 商品",navWish:"❤️ 收藏",navDash:"📊 管理",navAI:"🤖 AI",
    newArrivals:"新品推荐 ⭐",whyUs:"为什么选择我们 💫",
    searchPlaceholder:"搜索商品名或标签",sortNew:"最新",sortAsc:"价格从低到高",sortDesc:"价格从高到低",
    found:"件商品",noResult:"😢 未找到相关商品",
    wishEmpty:"收藏夹为空",wishFind:"浏览商品 ⭐",wishBuy:"在eBay一起购买",wishSaved:"件已收藏",
    buyOnEbay:"在eBay购买",condition:"状态",stock:"库存",pieces:"件",
    reviews:"客户评价 ⭐",shipping:"运费计算器 ✈️",selectCountry:"选择目的地国家",calcBtn:"计算",
    estShipping:"预估运费",days:"工作日",
    dashboard:"销售仪表盘 📊",dashDesc:"eBay API对接管理面板（演示数据）",
    totalSales:"总销售额",totalOrders:"订单数",wishAdds:"收藏数",pageViews:"浏览量",
    popularItems:"热门商品排名",recentOrders:"最近订单",
    notice:"🎉 新品到货：初音未来手办、PSP-3000等！数量有限。",noticeBtn:"查看 →",
    ctaTitle:"在小灯店找到您喜欢的商品！",ctaDesc:"全球买家选择的正品日本商品",
    trust:[["✈️","安心日本发货","带追踪号全球配送。"],["📦","精心包装","气泡膜全面保护商品。"],["✅","100%正品保证","绝无假货。"]],
    cats:[{id:"all",label:"全部",emoji:"⭐"},{id:"retro-game",label:"复古游戏",emoji:"🕹️"},{id:"figure",label:"手办",emoji:"🎎"},{id:"sweets",label:"零食",emoji:"🍬"}],
    stats:["1,200+","★4.9","30+"],statsLabel:["销售记录","评分","发货国"],
    modalClose:"关闭",modalBuy:"在eBay购买 ⭐",
    toastAdd:"已加入收藏！",toastRemove:"已从收藏夹移除",
    saleTitle:"⚡ 限时特卖！",saleDesc:"特卖结束倒计时",
    faqTitle:"常见问题 ❓",
    newsletter:"📧 订阅邮件",newsletterDesc:"第一时间获取新品和特卖信息",
    newsletterPlaceholder:"输入您的邮箱",newsletterBtn:"免费订阅",newsletterOk:"✅ 订阅成功！谢谢",
    shareTitle:"分享此商品",
    aiTitle:"🤖 AI商品描述生成器",aiDesc:"输入商品名称和状态，自动生成日/英/中三语eBay描述",
    aiNameLabel:"商品名称",aiCondLabel:"状态与特点",aiGenBtn:"生成描述",aiGenerating:"生成中…",aiResult:"生成的描述",aiCopy:"复制",aiCopied:"已复制！",
    aiNamePh:"例：超级任天堂 星之卡比3",aiCondPh:"例：含盒子、说明书，已测试，极美品",
  }
};

const ITEMS=[
  {itemId:"jp-001",title:{ja:"スーパーファミコン 星のカービィ3",en:"SNES Kirby's Dream Land 3",zh:"超任 星之卡比3"},category:"retro-game",price:3200,condition:{ja:"良好",en:"Good",zh:"良好"},stock:2,isNew:true,emoji:"🕹️",tags:["任天堂","RPG","レア"],desc:{ja:"スーパーファミコン用の人気アクションゲーム。日本語版・動作確認済み。箱・説明書付き。",en:"Popular SNES action game. Japanese version, fully tested. Includes box & manual.",zh:"超任人气动作游戏，日文版，测试可用，含盒子和说明书。"},sold:48,rating:4.9},
  {itemId:"jp-002",title:{ja:"ゲームボーイ ポケットモンスター赤",en:"Game Boy Pokémon Red",zh:"Game Boy 口袋妖怪红"},category:"retro-game",price:2800,condition:{ja:"美品",en:"Excellent",zh:"极美品"},stock:1,isNew:false,emoji:"👾",tags:["任天堂","レア"],desc:{ja:"初代ポケモンの赤バージョン。セーブデータ消去済み。動作確認済み。",en:"Original Pokémon Red. Save data cleared. Fully functional.",zh:"初代口袋妖怪红版，存档已清除，运行正常。"},sold:72,rating:5.0},
  {itemId:"jp-003",title:{ja:"初音ミク フィギュア 限定カラーver",en:"Hatsune Miku Figure Limited Color",zh:"初音未来手办 限定色"},category:"figure",price:8500,condition:{ja:"新品",en:"New",zh:"全新"},stock:3,isNew:true,emoji:"🎎",tags:["ボカロ","限定"],desc:{ja:"日本国内限定カラーの初音ミクフィギュア。未開封・箱あり。コレクターズアイテム。",en:"Japan-exclusive color Miku figure. Unopened in box. Collector's item.",zh:"日本限定色初音未来手办，未开封，收藏品。"},sold:31,rating:4.8},
  {itemId:"jp-004",title:{ja:"ワンピース ルフィ DXフィギュア",en:"One Piece Luffy DX Figure",zh:"海贼王路飞DX手办"},category:"figure",price:5200,condition:{ja:"美品",en:"Excellent",zh:"极美品"},stock:1,isNew:false,emoji:"🏴‍☠️",tags:["アニメ","人気"],desc:{ja:"バンダイ製DXフィギュア。ギア5ポーズ。美品。",en:"Bandai DX Figure. Gear 5 pose. Near mint.",zh:"万代DX手办，五档姿势，近全新。"},sold:55,rating:4.7},
  {itemId:"jp-005",title:{ja:"抹茶キットカット 24本セット",en:"Matcha KitKat Set 24pcs",zh:"抹茶奇巧24支套装"},category:"sweets",price:1800,condition:{ja:"新品",en:"New",zh:"全新"},stock:10,isNew:false,emoji:"🍫",tags:["お菓子","抹茶"],desc:{ja:"日本限定抹茶味キットカット。特別梱包でお届け。",en:"Japan-limited matcha KitKat. Special international packaging.",zh:"日本限定抹茶奇巧，国际发货专用包装。"},sold:210,rating:4.9},
  {itemId:"jp-006",title:{ja:"ポッキー＆プリッツ アソートBOX",en:"Pocky & Pretz Assorted Box",zh:"百奇&百力滋什锦礼盒"},category:"sweets",price:1500,condition:{ja:"新品",en:"New",zh:"全新"},stock:8,isNew:true,emoji:"🍬",tags:["お菓子","人気"],desc:{ja:"人気のポッキーとプリッツのアソートセット。",en:"Popular Pocky & Pretz assortment. Various flavors.",zh:"人气百奇与百力滋什锦装，多种口味。"},sold:180,rating:4.8},
  {itemId:"jp-007",title:{ja:"PlayStation Portable PSP-3000",en:"PlayStation Portable PSP-3000",zh:"PSP-3000"},category:"retro-game",price:12000,condition:{ja:"良好",en:"Good",zh:"良好"},stock:1,isNew:false,emoji:"🎮",tags:["ソニー","携帯機"],desc:{ja:"PSP-3000本体。バッテリー・充電ケーブル・メモリスティック付き。動作確認済み。",en:"PSP-3000 console. Battery, cable, memory stick included. Fully tested.",zh:"PSP-3000主机，含电池、充电线、记忆棒，已测试。"},sold:22,rating:4.6},
  {itemId:"jp-008",title:{ja:"進撃の巨人 リヴァイ超精密フィギュア",en:"Attack on Titan Levi Figure",zh:"进击的巨人利威尔手办"},category:"figure",price:9800,condition:{ja:"新品",en:"New",zh:"全新"},stock:2,isNew:true,emoji:"⚔️",tags:["アニメ","限定"],desc:{ja:"超精密塗装のリヴァイ兵長フィギュア。未開封。",en:"Ultra-detailed Levi figure. Sealed in box.",zh:"超精密利威尔手办，未开封。"},sold:39,rating:4.9},
  {itemId:"jp-009",title:{ja:"わさびのり たら 珍味セット",en:"Wasabi Nori & Dried Cod Set",zh:"山葵海苔鳕鱼干套装"},category:"sweets",price:980,condition:{ja:"新品",en:"New",zh:"全新"},stock:15,isNew:false,emoji:"🌿",tags:["珍味","和食"],desc:{ja:"日本のおつまみセット。わさびのりとたら珍味の詰め合わせ。",en:"Japanese snack set. Wasabi seaweed & dried cod.",zh:"日本下酒菜套装，山葵海苔与鳕鱼干组合。"},sold:95,rating:4.5},
];

const SHIP_TABLE=[
  {flag:"🇺🇸",name:{ja:"アメリカ",en:"USA",zh:"美国"},base:1800,days:"7-14"},
  {flag:"🇬🇧",name:{ja:"イギリス",en:"UK",zh:"英国"},base:2000,days:"8-16"},
  {flag:"🇩🇪",name:{ja:"ドイツ",en:"Germany",zh:"德国"},base:2100,days:"9-17"},
  {flag:"🇦🇺",name:{ja:"オーストラリア",en:"Australia",zh:"澳大利亚"},base:1900,days:"7-15"},
  {flag:"🇨🇦",name:{ja:"カナダ",en:"Canada",zh:"加拿大"},base:1900,days:"8-16"},
  {flag:"🇫🇷",name:{ja:"フランス",en:"France",zh:"法国"},base:2100,days:"9-17"},
  {flag:"🇰🇷",name:{ja:"韓国",en:"South Korea",zh:"韩国"},base:800,days:"3-7"},
  {flag:"🇨🇳",name:{ja:"中国",en:"China",zh:"中国"},base:900,days:"4-8"},
  {flag:"🇸🇬",name:{ja:"シンガポール",en:"Singapore",zh:"新加坡"},base:1200,days:"5-10"},
  {flag:"🇧🇷",name:{ja:"ブラジル",en:"Brazil",zh:"巴西"},base:2800,days:"14-25"},
];

const REVIEWS=[
  {name:"Mike T.",country:"🇺🇸",rating:5,text:{ja:"梱包が完璧でした！PSPは説明通りの状態で大満足。また利用します。",en:"Packaging was perfect! PSP was exactly as described. Will buy again.",zh:"包装完美！PSP和描述一致，非常满意。"},item:"PSP-3000",date:"2025-12"},
  {name:"Sophie L.",country:"🇫🇷",rating:5,text:{ja:"初音ミクのフィギュアが届きました！未開封で完璧な状態。迅速な発送に感謝！",en:"Got the Miku figure! Mint condition. Super fast shipping!",zh:"收到初音未来手办！全新状态，发货超快！"},item:"初音ミク",date:"2026-01"},
  {name:"陈志远",country:"🇨🇳",rating:5,text:{ja:"抹茶キットカットが新鮮で美味しかった！丁寧な梱包で安心。",en:"Matcha KitKat was fresh and delicious! Great packaging.",zh:"抹茶奇巧新鲜好吃！包装仔细。"},item:"抹茶KitKat",date:"2026-02"},
  {name:"James K.",country:"🇬🇧",rating:5,text:{ja:"本当に丁寧なショップ。梱包も商品も期待以上でした！",en:"Truly careful seller. Exceeded expectations!",zh:"真的很认真的卖家！超出预期。"},item:"リヴァイ図",date:"2026-03"},
];

const FAQS={
  ja:[
    {q:"海外への発送は対応していますか？",a:"はい！世界30カ国以上に発送可能です。追跡番号付きの国際郵便・EMS・DHLから選択できます。"},
    {q:"商品の状態はどのように確認できますか？",a:"各商品ページに詳細な状態説明と写真を掲載しています。不明点はeBayのメッセージ機能でお気軽にお問い合わせください。"},
    {q:"返品・返金はできますか？",a:"商品が説明と著しく異なる場合は、到着から14日以内に返品を受け付けます。eBayのバイヤー保護も適用されます。"},
    {q:"支払い方法は何が使えますか？",a:"PayPal・クレジットカード（Visa/Master/AMEX）・Apple Pay・Google Payに対応しています。"},
    {q:"まとめ買いで割引はありますか？",a:"2点以上のご購入で送料割引を承ります。eBayのメッセージでご相談ください。"},
    {q:"本物の商品ですか？偽物はありませんか？",a:"すべて日本国内で正規購入・仕入れた本物のみ取り扱っています。100%本物保証です。"},
  ],
  en:[
    {q:"Do you ship internationally?",a:"Yes! We ship to 30+ countries worldwide with tracked international mail, EMS, or DHL."},
    {q:"How can I check item condition?",a:"Each listing has detailed condition notes and photos. Feel free to message us on eBay for any questions."},
    {q:"Can I return or get a refund?",a:"If the item significantly differs from the description, returns are accepted within 14 days. eBay Buyer Protection also applies."},
    {q:"What payment methods are accepted?",a:"PayPal, credit cards (Visa/Master/AMEX), Apple Pay, and Google Pay are accepted."},
    {q:"Is there a discount for buying multiple items?",a:"Yes! We offer shipping discounts for 2+ items. Please message us on eBay to arrange."},
    {q:"Are all items authentic?",a:"Absolutely. All items are sourced from legitimate Japanese retailers. 100% authentic guaranteed."},
  ],
  zh:[
    {q:"可以发货到海外吗？",a:"可以！我们发货到全球30多个国家，提供带追踪号的国际邮便、EMS或DHL。"},
    {q:"如何确认商品状态？",a:"每个商品页面都有详细的状态说明和照片。有疑问请通过eBay消息联系我们。"},
    {q:"可以退货退款吗？",a:"如果商品与描述有重大差异，到货14天内可申请退货。eBay买家保护也适用。"},
    {q:"支持哪些支付方式？",a:"支持PayPal、信用卡（Visa/Master/AMEX）、Apple Pay、Google Pay。"},
    {q:"多件购买有折扣吗？",a:"是的！购买2件以上可享受运费优惠，请通过eBay消息与我们商量。"},
    {q:"商品都是正品吗？",a:"绝对是！所有商品均从日本正规渠道采购，100%正品保证。"},
  ]
};

const DASH={
  totalSales:1842500,totalOrders:312,wishAdds:894,pageViews:15230,
  monthly:[{month:"10月",sales:120000,orders:22},{month:"11月",sales:185000,orders:31},{month:"12月",sales:310000,orders:58},{month:"1月",sales:280000,orders:49},{month:"2月",sales:245000,orders:43},{month:"3月",sales:390000,orders:67},{month:"4月",sales:312500,orders:42}],
  recentOrders:[
    {id:"EB-9421",item:"PSP-3000",buyer:"Mike T. 🇺🇸",price:12000,status:"発送済"},
    {id:"EB-9420",item:"初音ミクフィギュア",buyer:"Sophie L. 🇫🇷",price:8500,status:"発送済"},
    {id:"EB-9419",item:"抹茶KitKat×24",buyer:"陈志远 🇨🇳",price:1800,status:"準備中"},
    {id:"EB-9418",item:"リヴァイフィギュア",buyer:"James K. 🇬🇧",price:9800,status:"発送済"},
    {id:"EB-9417",item:"ポッキーBOX",buyer:"Yuki M. 🇦🇺",price:1500,status:"完了"},
  ],
};

// ── 小部品 ─────────────────────────────────────
const StarIcon=({size=16,color="#FF9900",fill=true})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill?color:"none"} stroke={color} strokeWidth={fill?0:2}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const Stars=({rating})=>(
  <span style={{display:"inline-flex",gap:2}}>
    {[1,2,3,4,5].map(i=><StarIcon key={i} size={12} color="#FF9900" fill={i<=Math.round(rating)}/>)}
  </span>
);

// ── カウントダウン ──────────────────────────────
function useCountdown(target){
  const [left,setLeft]=useState(0);
  useEffect(()=>{
    const tick=()=>setLeft(Math.max(0,target-Date.now()));
    tick(); const id=setInterval(tick,1000);
    return()=>clearInterval(id);
  },[target]);
  const h=Math.floor(left/3600000);
  const m=Math.floor((left%3600000)/60000);
  const s=Math.floor((left%60000)/1000);
  const d=Math.floor(left/86400000);
  return{d,h:h%24,m,s,done:left===0};
}

// ══════════════════════════════════════════════
// メイン
// ══════════════════════════════════════════════
export default function App(){
  const[lang,setLang]=useState("ja");
  const[tab,setTab]=useState("home");
  const[query,setQuery]=useState("");
  const[cat,setCat]=useState("all");
  const[sort,setSort]=useState("new");
  const[wishlist,setWishlist]=useState([]);
  const[rate,setRate]=useState(149.5);
  const[notice,setNotice]=useState(true);
  const[scrolled,setScrolled]=useState(false);
  const[toast,setToast]=useState(null);
  const[modal,setModal]=useState(null);
  const[shipCountry,setShipCountry]=useState("");
  const[shipResult,setShipResult]=useState(null);
  const[shipItem,setShipItem]=useState(ITEMS[0]);
  const[newsletterEmail,setNewsletterEmail]=useState("");
  const[newsletterDone,setNewsletterDone]=useState(false);
  const t=I18N[lang];
  const countdown=useCountdown(SALE_END);

  useEffect(()=>{
    fetch("https://open.er-api.com/v6/latest/JPY")
      .then(r=>r.json()).then(d=>{if(d.rates?.USD)setRate(1/d.rates.USD);}).catch(()=>{});
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const jpy2usd=jpy=>(jpy/rate).toFixed(2);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2600);};
  const toggleWish=useCallback((id,item)=>{
    setWishlist(prev=>{
      const has=prev.includes(id);
      const title=typeof item.title==="object"?item.title[lang]:item.title;
      showToast(has?t.toastRemove:`「${title.slice(0,12)}…」${t.toastAdd}`);
      return has?prev.filter(x=>x!==id):[...prev,id];
    });
  },[lang,t]);
  const calcShipping=()=>{
    const c=SHIP_TABLE.find(s=>s.flag===shipCountry);
    if(!c)return;
    const w=shipItem.price>5000?1.2:0.5;
    const total=Math.round(c.base*w);
    setShipResult({cost:total,usd:(total/rate).toFixed(2),days:c.days,country:c.name[lang],flag:c.flag});
  };

  const filtered=ITEMS
    .filter(it=>cat==="all"||it.category===cat)
    .filter(it=>!query||it.title[lang].includes(query)||it.tags.some(tg=>tg.includes(query)))
    .sort((a,b)=>sort==="price-asc"?a.price-b.price:sort==="price-desc"?b.price-a.price:(b.isNew-a.isNew));

  const wishItems=ITEMS.filter(it=>wishlist.includes(it.itemId));
  const maxSales=Math.max(...DASH.monthly.map(m=>m.sales));

  return(
    <div style={{fontFamily:"'Segoe UI','Hiragino Sans',sans-serif",background:"#fffaf5",minHeight:"100vh",color:"#333",overflowX:"hidden"}}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(12deg)}}
        @keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes toastIn{from{transform:translateX(120%)}to{transform:translateX(0)}}
        @keyframes fadeIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,153,0,0.4)}50%{box-shadow:0 0 0 8px rgba(255,153,0,0)}}
        .hov-card:hover{transform:translateY(-5px)!important;box-shadow:0 14px 40px rgba(255,153,0,0.22)!important}
        .hov-btn:hover{opacity:0.88;transform:scale(1.04) translateY(-1px)}
        .tab-btn{border:none;background:none;cursor:pointer;padding:6px 12px;border-radius:50px;font-weight:700;font-size:12px;transition:all 0.2s;white-space:nowrap}
        .tab-btn.active{background:linear-gradient(135deg,#FF9900,#FF6600);color:white}
        .tab-btn:not(.active){color:#888}
        input:focus,select:focus,textarea:focus{outline:none;border-color:#FF9900!important;box-shadow:0 0 0 3px rgba(255,153,0,0.15)!important}
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:500;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease}
        .modal-box{background:white;border-radius:24px;padding:28px;max-width:500px;width:92%;max-height:88vh;overflow-y:auto;animation:fadeIn 0.25s ease;position:relative}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#FFB74D;border-radius:3px}
        .lang-btn{border:1.5px solid #FFE0B2;border-radius:50px;padding:3px 10px;font-size:11px;font-weight:700;cursor:pointer;background:white;color:#888;transition:all 0.2s}
        .lang-btn.active{background:#FF9900;color:white;border-color:#FF9900}
        .faq-item summary{cursor:pointer;list-style:none;padding:14px 0;font-weight:700;color:#333;font-size:14px;display:flex;justify-content:space-between;align-items:center}
        .faq-item summary::-webkit-details-marker{display:none}
        .faq-item[open] summary{color:#FF6600}
        .countdown-box{background:white;border-radius:12px;padding:10px 14px;text-align:center;min-width:52px;box-shadow:0 2px 10px rgba(255,153,0,0.2)}
      `}</style>

      {/* お知らせ */}
      {notice&&(
        <div style={{background:"linear-gradient(90deg,#FF9900,#FF5722)",color:"white",padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",animation:"slideDown 0.4s",fontSize:12,flexWrap:"wrap",gap:6}}>
          <span>{t.notice}</span>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" style={{color:"white",fontWeight:700,background:"rgba(255,255,255,0.25)",borderRadius:50,padding:"3px 12px",textDecoration:"none",fontSize:12}}>{t.noticeBtn}</a>
            <button onClick={()=>setNotice(false)} style={{background:"none",border:"none",color:"white",cursor:"pointer",fontSize:17}}>×</button>
          </div>
        </div>
      )}

      {/* ナビ */}
      <nav style={{position:"sticky",top:0,zIndex:200,background:scrolled?"rgba(255,250,245,0.96)":"rgba(255,250,245,0.85)",backdropFilter:"blur(12px)",borderBottom:scrolled?"2px solid #FFE0B2":"none",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,flexWrap:"wrap",transition:"all 0.3s"}}>
        <button onClick={()=>setTab("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
          <StarIcon size={17} color="#FF9900"/><span style={{fontWeight:900,fontSize:15,color:"#FF6600"}}>{t.shopName}</span>
        </button>
        <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
          {[["home",t.navHome],["shop",t.navShop],["wish",t.navWish],["dash",t.navDash],["ai",t.navAI]].map(([id,label])=>(
            <button key={id} className={`tab-btn${tab===id?" active":""}`} onClick={()=>setTab(id)} style={{position:"relative"}}>
              {label}
              {id==="wish"&&wishlist.length>0&&<span style={{position:"absolute",top:1,right:4,background:"#F44336",color:"white",borderRadius:50,fontSize:9,fontWeight:700,width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{wishlist.length}</span>}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:3}}>
            {[["ja","日"],["en","EN"],["zh","中"]].map(([l,label])=>(
              <button key={l} className={`lang-btn${lang===l?" active":""}`} onClick={()=>setLang(l)}>{label}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4,background:"#FFF3E0",border:"1.5px solid #FFB74D",borderRadius:50,padding:"4px 11px",fontSize:11}}>
            💱<span style={{fontWeight:800,color:"#E65100"}}>¥100≈${(100/rate).toFixed(2)}</span>
          </div>
        </div>
      </nav>

      {/* トースト */}
      {toast&&(
        <div style={{position:"fixed",bottom:20,right:16,zIndex:999,background:"#333",color:"white",borderRadius:16,padding:"10px 16px",fontSize:13,fontWeight:600,boxShadow:"0 6px 24px rgba(0,0,0,0.25)",animation:"toastIn 0.3s ease",maxWidth:270}}>{toast}</div>
      )}

      {/* モーダル */}
      {modal&&(
        <div className="overlay" onClick={()=>setModal(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:14,right:14,background:"#f0f0f0",border:"none",borderRadius:50,width:30,height:30,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
            <div style={{fontSize:60,textAlign:"center",marginBottom:10}}>{modal.emoji}</div>
            <h2 style={{fontWeight:900,color:"#BF360C",margin:"0 0 8px",fontSize:17}}>{modal.title[lang]}</h2>
            <p style={{color:"#666",lineHeight:1.7,fontSize:13,margin:"0 0 14px"}}>{modal.desc[lang]}</p>
            <div style={{display:"flex",gap:14,marginBottom:14,flexWrap:"wrap",fontSize:13}}>
              <span><span style={{color:"#aaa"}}>{t.condition}：</span><b>{modal.condition[lang]}</b></span>
              <span><span style={{color:"#aaa"}}>{t.stock}：</span><b style={{color:modal.stock<=1?"#F44336":"#4CAF50"}}>{modal.stock}{t.pieces}</b></span>
              <span style={{display:"flex",gap:4,alignItems:"center"}}><Stars rating={modal.rating}/><span style={{color:"#aaa",fontSize:12}}>{modal.rating}</span></span>
            </div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:14}}>
              {modal.tags.map(tg=><span key={tg} style={{background:"#FFF3E0",color:"#E65100",borderRadius:50,padding:"2px 10px",fontSize:10,fontWeight:700}}>{tg}</span>)}
            </div>
            {/* SNSシェア（モーダル内） */}
            <ShareButtons item={modal} lang={lang} t={t}/>
            <div style={{margin:"16px 0 14px",display:"flex",alignItems:"baseline",gap:8}}>
              <span style={{fontWeight:900,fontSize:24,color:"#FF6600"}}>¥{modal.price.toLocaleString()}</span>
              <span style={{fontSize:13,color:"#aaa"}}>≈ ${jpy2usd(modal.price)}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",gap:5,background:"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",borderRadius:50,padding:"12px",fontWeight:800,fontSize:13,textDecoration:"none"}}>
                ⭐ {t.modalBuy}
              </a>
              <button onClick={()=>toggleWish(modal.itemId,modal)} style={{border:`2px solid ${wishlist.includes(modal.itemId)?"#FF9900":"#FFE0B2"}`,background:wishlist.includes(modal.itemId)?"#FFF3E0":"white",borderRadius:50,padding:"12px 16px",cursor:"pointer",fontSize:17}}>
                {wishlist.includes(modal.itemId)?"❤️":"🤍"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ HOME ══ */}
      {tab==="home"&&(
        <>
          {/* セールバナー */}
          <div style={{background:"linear-gradient(90deg,#1a1a2e,#2d1b69)",color:"white",padding:"12px 20px",display:"flex",justifyContent:"center",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            <span style={{fontWeight:800,fontSize:14}}>{t.saleTitle}</span>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>{t.saleDesc}：</span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {[{v:countdown.d,u:"D"},{v:countdown.h,u:"H"},{v:countdown.m,u:"M"},{v:countdown.s,u:"S"}].map(({v,u})=>(
                <div key={u} className="countdown-box">
                  <div style={{fontSize:20,fontWeight:900,color:"#FF9900",lineHeight:1}}>{String(v).padStart(2,"0")}</div>
                  <div style={{fontSize:9,color:"#aaa",fontWeight:700}}>{u}</div>
                </div>
              ))}
            </div>
            <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer"
              style={{background:"#FF9900",color:"white",borderRadius:50,padding:"6px 18px",fontWeight:800,fontSize:12,textDecoration:"none",animation:"pulse 2s infinite"}}>
              Shop Now →
            </a>
          </div>

          {/* HERO */}
          <section style={{position:"relative",minHeight:440,display:"flex",alignItems:"center",overflow:"hidden",background:"linear-gradient(135deg,#FFF3E0 0%,#fffaf5 55%,#E3F2FD 100%)"}}>
            {[{t:"10%",l:"4%",d:"0s"},{t:"72%",l:"7%",d:"0.9s"},{t:"35%",l:"47%",d:"1.5s"},{t:"80%",l:"44%",d:"0.4s"}].map((p,i)=>(
              <div key={i} style={{position:"absolute",top:p.t,left:p.l,animation:`float 3s ease-in-out infinite`,animationDelay:p.d,pointerEvents:"none"}}>
                <StarIcon size={16} color="rgba(255,153,0,0.4)"/>
              </div>
            ))}
            <div style={{position:"relative",zIndex:2,flex:"0 0 auto",width:"clamp(260px,46%,500px)",padding:"36px clamp(12px,4vw,48px)"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"#FFF3E0",border:"2px solid #FFB74D",borderRadius:50,padding:"4px 13px",marginBottom:14,fontSize:11,fontWeight:700,color:"#E65100"}}>
                <StarIcon size={11} color="#FF9900"/> {t.tagline} <StarIcon size={11} color="#FF9900"/>
              </div>
              <h1 style={{fontSize:"clamp(18px,3vw,32px)",fontWeight:900,lineHeight:1.35,color:"#BF360C",margin:"0 0 10px"}}>
                {t.hero1}<br/><span style={{color:"#FF6600"}}>{t.hero2}</span>
              </h1>
              <p style={{fontSize:13,color:"#666",lineHeight:1.7,marginBottom:22}}>{t.heroDesc}</p>
              <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
                <button className="hov-btn" onClick={()=>setTab("shop")}
                  style={{background:"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",border:"none",borderRadius:50,padding:"10px 24px",fontWeight:800,fontSize:13,cursor:"pointer",boxShadow:"0 4px 16px rgba(255,153,0,0.4)",display:"flex",alignItems:"center",gap:5}}>
                  ⭐ {t.searchBtn}
                </button>
                <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" className="hov-btn"
                  style={{background:"white",color:"#FF6600",border:"2px solid #FF9900",borderRadius:50,padding:"10px 24px",fontWeight:800,fontSize:13,textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>
                  {t.ebayBtn} →
                </a>
              </div>
              <div style={{display:"flex",gap:18,marginTop:20}}>
                {t.stats.map((v,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div style={{fontSize:16,fontWeight:900,color:"#FF6600"}}>{v}</div>
                    <div style={{fontSize:10,color:"#999",fontWeight:600}}>{t.statsLabel[i]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{flex:1,minHeight:340}}>
              <svg viewBox="0 0 560 340" style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
                <defs><radialGradient id="hg" cx="45%" cy="50%" r="52%"><stop offset="0%" stopColor="#FFE082" stopOpacity="0.75"/><stop offset="100%" stopColor="#FFE0B2" stopOpacity="0"/></radialGradient></defs>
                <rect width="560" height="340" fill="url(#hg)"/>
                <g transform="translate(220,172)">{[0,36,72,108,144].map((a,i)=>(
                  <ellipse key={i} cx="0" cy="0" rx={120-i*16} ry={48-i*6} fill="none" stroke={i%2===0?"#FFB300":"#29B6F6"} strokeWidth="2.5" strokeOpacity="0.5" transform={`rotate(${a})`}/>
                ))}<circle cx="0" cy="0" r="19" fill="#FFD54F" opacity="0.9"/></g>
                {[[100,60],[295,47],[440,72],[148,282],[372,308],[488,162],[72,200]].map(([x,y],i)=>(
                  <polygon key={i} points={`${x},${y-8} ${x+3},${y-2} ${x+9},${y-2} ${x+4},${y+2} ${x+6},${y+9} ${x},${y+5} ${x-6},${y+9} ${x-4},${y+2} ${x-9},${y-2} ${x-3},${y-2}`}
                    fill={["#FF9800","#29B6F6","#AB47BC"][i%3]} opacity="0.6"/>
                ))}
                {[[62,238],[200,260],[338,222],[470,246]].map(([x,y],i)=>(
                  <g key={i} transform={`translate(${x},${y})`}>
                    <rect x="-26" y="-22" width="52" height="42" fill="#D4A017" rx="4"/>
                    <rect x="-26" y="-22" width="52" height="8" fill="#C69315" rx="4"/>
                    <text x="0" y="14" textAnchor="middle" fontSize="14">{["🕹️","🎎","🍬","📱"][i]}</text>
                  </g>
                ))}
                {[[80,108],[136,158],[190,102]].map(([x,y],i)=>(
                  <text key={i} x={x} y={y} fontSize="18" fill="#FF9800" opacity="0.6">{["♪","♫","🎵"][i]}</text>
                ))}
                <rect x="468" y="42" width="90" height="298" fill="#FFCC80" rx="8" opacity="0.55"/>
                <text x="513" y="84" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E65100">TOKYO HUB</text>
                <path d="M 70 318 Q 278 290 500 274" stroke="#29B6F6" strokeWidth="13" fill="none" strokeOpacity="0.22"/>
                {[[155,310],[286,298],[408,288]].map(([x,y],i)=>(
                  <polygon key={i} points={`${x},${y-6} ${x+15},${y} ${x},${y+6}`} fill="#FF9800" opacity="0.72"/>
                ))}
              </svg>
            </div>
          </section>

          {/* 新着 */}
          <section style={{padding:"48px clamp(12px,4vw,64px)",maxWidth:1100,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:8}}>
              <h2 style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:900,color:"#BF360C",margin:0}}>{t.newArrivals}</h2>
              <button onClick={()=>setTab("shop")} style={{background:"none",border:"2px solid #FF9900",color:"#FF6600",borderRadius:50,padding:"6px 18px",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.viewAll}</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:16}}>
              {ITEMS.filter(it=>it.isNew).map(it=>(
                <ItemCard key={it.itemId} item={it} lang={lang} jpy2usd={jpy2usd} wishlist={wishlist} toggleWish={toggleWish} setModal={setModal} t={t}/>
              ))}
            </div>
          </section>

          {/* レビュー */}
          <section style={{background:"linear-gradient(135deg,#FFF3E0,#E8F5E9)",padding:"52px clamp(12px,4vw,64px)"}}>
            <div style={{maxWidth:1100,margin:"0 auto"}}>
              <h2 style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:900,color:"#BF360C",marginBottom:24,textAlign:"center"}}>{t.reviews}</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:16}}>
                {REVIEWS.map((r,i)=>(
                  <div key={i} style={{background:"white",borderRadius:20,padding:20,border:"2px solid #FFE0B2",boxShadow:"0 4px 16px rgba(255,153,0,0.08)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#FF9900,#FF6600)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:"white"}}>{r.name[0]}</div>
                        <div>
                          <div style={{fontWeight:800,fontSize:12,color:"#333"}}>{r.name} <span style={{fontSize:14}}>{r.country}</span></div>
                          <div style={{fontSize:10,color:"#aaa"}}>{r.date}</div>
                        </div>
                      </div>
                      <Stars rating={r.rating}/>
                    </div>
                    <p style={{fontSize:12,color:"#555",lineHeight:1.65,margin:"0 0 8px"}}>"{r.text[lang]}"</p>
                    <span style={{background:"#FFF3E0",color:"#E65100",borderRadius:50,padding:"2px 10px",fontSize:10,fontWeight:700}}>📦 {r.item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 送料計算 */}
          <section style={{padding:"52px clamp(12px,4vw,64px)",maxWidth:780,margin:"0 auto"}}>
            <h2 style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:900,color:"#BF360C",marginBottom:20,textAlign:"center"}}>{t.shipping}</h2>
            <div style={{background:"white",borderRadius:24,padding:26,border:"2px solid #FFE0B2",boxShadow:"0 4px 20px rgba(255,153,0,0.1)"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,marginBottom:14}}>
                <div>
                  <label style={{fontSize:11,fontWeight:700,color:"#888",display:"block",marginBottom:5}}>{t.selectCountry}</label>
                  <select value={shipCountry} onChange={e=>{setShipCountry(e.target.value);setShipResult(null);}}
                    style={{width:"100%",padding:"9px 13px",borderRadius:50,border:"2px solid #FFE0B2",fontSize:13,fontWeight:600,background:"white",cursor:"pointer"}}>
                    <option value="">-- {t.selectCountry} --</option>
                    {SHIP_TABLE.map(c=><option key={c.flag} value={c.flag}>{c.flag} {c.name[lang]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:700,color:"#888",display:"block",marginBottom:5}}>商品</label>
                  <select value={shipItem.itemId} onChange={e=>setShipItem(ITEMS.find(it=>it.itemId===e.target.value))}
                    style={{width:"100%",padding:"9px 13px",borderRadius:50,border:"2px solid #FFE0B2",fontSize:13,fontWeight:600,background:"white",cursor:"pointer"}}>
                    {ITEMS.map(it=><option key={it.itemId} value={it.itemId}>{it.emoji} {it.title[lang].slice(0,18)}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={calcShipping} disabled={!shipCountry}
                style={{background:shipCountry?"linear-gradient(135deg,#FF9900,#FF6600)":"#ddd",color:"white",border:"none",borderRadius:50,padding:"10px 26px",fontWeight:800,fontSize:13,cursor:shipCountry?"pointer":"not-allowed",display:"flex",alignItems:"center",gap:6}}>
                ✈️ {t.calcBtn}
              </button>
              {shipResult&&(
                <div style={{marginTop:16,background:"#FFF3E0",borderRadius:16,padding:16,border:"2px solid #FFB74D",animation:"fadeIn 0.3s ease"}}>
                  <div style={{display:"flex",gap:22,flexWrap:"wrap"}}>
                    <div><div style={{fontSize:11,color:"#aaa",marginBottom:3}}>{t.estShipping}</div><div style={{fontWeight:900,fontSize:20,color:"#FF6600"}}>¥{shipResult.cost.toLocaleString()}</div><div style={{fontSize:11,color:"#888"}}>≈ ${shipResult.usd}</div></div>
                    <div><div style={{fontSize:11,color:"#aaa",marginBottom:3}}>📅 {t.days}</div><div style={{fontWeight:900,fontSize:20,color:"#29B6F6"}}>{shipResult.days}</div><div style={{fontSize:11,color:"#888"}}>{shipResult.flag} {shipResult.country}</div></div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* FAQ */}
          <section style={{background:"linear-gradient(135deg,#F3E5F5,#E8EAF6)",padding:"52px clamp(12px,4vw,64px)"}}>
            <div style={{maxWidth:780,margin:"0 auto"}}>
              <h2 style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:900,color:"#BF360C",marginBottom:24,textAlign:"center"}}>{t.faqTitle}</h2>
              {(FAQS[lang]||FAQS.ja).map((faq,i)=>(
                <details key={i} className="faq-item" style={{borderBottom:"1px solid #E8D5F0",marginBottom:0}}>
                  <summary>
                    <span>Q. {faq.q}</span>
                    <span style={{color:"#FF9900",fontSize:18,transition:"transform 0.2s"}}>＋</span>
                  </summary>
                  <div style={{padding:"0 0 14px 16px",fontSize:13,color:"#555",lineHeight:1.75}}>A. {faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* ニュースレター */}
          <section style={{padding:"52px clamp(12px,4vw,64px)",maxWidth:600,margin:"0 auto",textAlign:"center"}}>
            <div style={{background:"linear-gradient(135deg,#FFF3E0,#E3F2FD)",borderRadius:24,padding:"36px 28px",border:"2px solid #FFE0B2",boxShadow:"0 4px 20px rgba(255,153,0,0.1)"}}>
              <h2 style={{fontSize:"clamp(18px,3vw,22px)",fontWeight:900,color:"#BF360C",margin:"0 0 10px"}}>{t.newsletter}</h2>
              <p style={{color:"#888",fontSize:13,marginBottom:22}}>{t.newsletterDesc}</p>
              {newsletterDone?(
                <div style={{background:"#E8F5E9",border:"2px solid #4CAF50",borderRadius:50,padding:"12px 24px",fontWeight:800,color:"#2E7D32",fontSize:14}}>{t.newsletterOk}</div>
              ):(
                <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
                  <input type="email" value={newsletterEmail} onChange={e=>setNewsletterEmail(e.target.value)}
                    placeholder={t.newsletterPlaceholder}
                    style={{flex:"1 1 200px",padding:"11px 18px",borderRadius:50,border:"2px solid #FFE0B2",fontSize:13,minWidth:0}}/>
                  <button onClick={()=>{if(newsletterEmail.includes("@"))setNewsletterDone(true);}}
                    style={{background:"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",border:"none",borderRadius:50,padding:"11px 22px",fontWeight:800,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>
                    {t.newsletterBtn}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 信頼 */}
          <section style={{background:"linear-gradient(135deg,#FFF3E0,#E3F2FD)",padding:"48px clamp(12px,4vw,64px)"}}>
            <div style={{maxWidth:920,margin:"0 auto",textAlign:"center"}}>
              <h2 style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:900,color:"#BF360C",marginBottom:30}}>{t.whyUs}</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
                {t.trust.map(([ic,tl,dc])=>(
                  <div key={tl} style={{background:"white",borderRadius:20,padding:"24px 16px",border:"2px solid #FFE0B2"}}>
                    <div style={{fontSize:38,marginBottom:10}}>{ic}</div>
                    <h3 style={{color:"#E65100",fontWeight:800,margin:"0 0 6px",fontSize:14}}>{tl}</h3>
                    <p style={{color:"#777",fontSize:12,lineHeight:1.7,margin:0}}>{dc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{background:"linear-gradient(135deg,#FF9900,#FF5722)",padding:"48px clamp(12px,4vw,64px)",textAlign:"center"}}>
            <h2 style={{color:"white",fontSize:"clamp(18px,3.5vw,28px)",fontWeight:900,margin:"0 0 10px"}}>{t.ctaTitle}</h2>
            <p style={{color:"rgba(255,255,255,0.85)",marginBottom:24,fontSize:13}}>{t.ctaDesc}</p>
            <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer"
              style={{background:"white",color:"#FF6600",borderRadius:50,padding:"14px 38px",fontWeight:900,fontSize:15,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:10,boxShadow:"0 6px 28px rgba(0,0,0,0.18)"}}>
              ⭐ {t.ebayBtn} ⭐
            </a>
          </section>
        </>
      )}

      {/* ══ SHOP ══ */}
      {tab==="shop"&&(
        <section style={{maxWidth:1100,margin:"0 auto",padding:"36px clamp(12px,4vw,56px)"}}>
          <h2 style={{fontWeight:900,color:"#BF360C",fontSize:"clamp(18px,3vw,26px)",marginBottom:20}}>🛍️ Shop</h2>
          <div style={{position:"relative",marginBottom:14}}>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>🔍</span>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.searchPlaceholder}
              style={{width:"100%",boxSizing:"border-box",padding:"12px 14px 12px 42px",borderRadius:50,border:"2px solid #FFE0B2",fontSize:13,background:"white",transition:"all 0.2s"}}/>
            {query&&<button onClick={()=>setQuery("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#aaa"}}>×</button>}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {t.cats.map(c=>(
                <button key={c.id} onClick={()=>setCat(c.id)}
                  style={{border:`2px solid ${cat===c.id?"#FF9900":"#FFE0B2"}`,background:cat===c.id?"linear-gradient(135deg,#FF9900,#FF6600)":"white",color:cat===c.id?"white":"#888",borderRadius:50,padding:"6px 14px",fontWeight:700,fontSize:11,cursor:"pointer",transition:"all 0.2s"}}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
            <select value={sort} onChange={e=>setSort(e.target.value)}
              style={{border:"2px solid #FFE0B2",borderRadius:50,padding:"6px 13px",fontSize:11,fontWeight:700,color:"#666",background:"white",cursor:"pointer"}}>
              <option value="new">{t.sortNew}</option>
              <option value="price-asc">{t.sortAsc}</option>
              <option value="price-desc">{t.sortDesc}</option>
            </select>
          </div>
          <p style={{color:"#888",fontSize:12,marginBottom:16}}>{filtered.length} {t.found}</p>
          {filtered.length===0
            ?<div style={{textAlign:"center",padding:"60px 0",color:"#bbb",fontSize:14}}>{t.noResult}</div>
            :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(225px,1fr))",gap:16}}>
              {filtered.map(it=><ItemCard key={it.itemId} item={it} lang={lang} jpy2usd={jpy2usd} wishlist={wishlist} toggleWish={toggleWish} setModal={setModal} t={t}/>)}
            </div>}
        </section>
      )}

      {/* ══ WISH ══ */}
      {tab==="wish"&&(
        <section style={{maxWidth:1100,margin:"0 auto",padding:"36px clamp(12px,4vw,56px)"}}>
          <h2 style={{fontWeight:900,color:"#BF360C",fontSize:"clamp(18px,3vw,26px)",marginBottom:6}}>❤️ Wishlist</h2>
          <p style={{color:"#888",fontSize:12,marginBottom:22}}>{wishItems.length} {t.wishSaved}</p>
          {wishItems.length===0
            ?<div style={{textAlign:"center",padding:"60px 0"}}>
              <div style={{fontSize:48,marginBottom:12}}>🛒</div>
              <p style={{color:"#bbb",marginBottom:20,fontSize:14}}>{t.wishEmpty}</p>
              <button onClick={()=>setTab("shop")} style={{background:"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",border:"none",borderRadius:50,padding:"11px 26px",fontWeight:800,fontSize:13,cursor:"pointer"}}>{t.wishFind}</button>
            </div>
            :<>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(225px,1fr))",gap:16,marginBottom:24}}>
                {wishItems.map(it=><ItemCard key={it.itemId} item={it} lang={lang} jpy2usd={jpy2usd} wishlist={wishlist} toggleWish={toggleWish} setModal={setModal} t={t}/>)}
              </div>
              <div style={{textAlign:"center"}}>
                <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer"
                  style={{background:"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",borderRadius:50,padding:"13px 34px",fontWeight:900,fontSize:14,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:7}}>
                  ⭐ {t.wishBuy}
                </a>
              </div>
            </>}
        </section>
      )}

      {/* ══ DASHBOARD ══ */}
      {tab==="dash"&&<Dashboard t={t} lang={lang} DASH={DASH} maxSales={maxSales} jpy2usd={jpy2usd} ITEMS={ITEMS}/>}

      {/* ══ AI ══ */}
      {tab==="ai"&&<AIPage t={t} lang={lang} ITEMS={ITEMS}/>}

      {/* FOOTER */}
      <footer style={{background:"#1a1a2e",color:"#ccc",padding:"28px clamp(12px,4vw,56px)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:20,justifyContent:"space-between"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:7}}>
              <StarIcon size={16} color="#FF9900"/><span style={{fontWeight:900,fontSize:14,color:"#FF9900"}}>{t.shopName}</span>
            </div>
            <p style={{fontSize:11,color:"#555",maxWidth:200,lineHeight:1.7,margin:0}}>{t.tagline} — eBay</p>
          </div>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            {[["Link",["eBay Store","Shop","Wishlist"]],["Support",["Shipping","Returns","Contact"]]].map(([title,links])=>(
              <div key={title}>
                <div style={{fontWeight:700,color:"#FF9900",marginBottom:7,fontSize:12}}>{title}</div>
                {links.map(l=>(
                  <div key={l} style={{marginBottom:5}}>
                    <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer"
                      style={{color:"#555",textDecoration:"none",fontSize:11}} onMouseOver={e=>e.target.style.color="#FF9900"} onMouseOut={e=>e.target.style.color="#555"}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{maxWidth:1100,margin:"18px auto 0",borderTop:"1px solid #2a2a3e",paddingTop:14,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4,fontSize:10,color:"#444"}}>
          <span>© 2026 {t.shopName}. All rights reserved.</span>
          <span>Made with ⭐ from Japan 🇯🇵</span>
        </div>
      </footer>
    </div>
  );
}

// ══════════════════════════════════════════════
// SNSシェアボタン
// ══════════════════════════════════════════════
function ShareButtons({item,lang,t}){
  const title=encodeURIComponent(`${item.emoji} ${item.title[lang]} ¥${item.price.toLocaleString()} - あかりshop`);
  const url=encodeURIComponent("https://www.ebay.com");
  return(
    <div style={{marginBottom:4}}>
      <div style={{fontSize:11,color:"#aaa",marginBottom:7,fontWeight:700}}>{t.shareTitle}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {[
          {label:"𝕏 Twitter",color:"#000",bg:"#f0f0f0",href:`https://twitter.com/intent/tweet?text=${title}&url=${url}`},
          {label:"📘 Facebook",color:"white",bg:"#1877F2",href:`https://www.facebook.com/sharer/sharer.php?u=${url}`},
          {label:"📌 Pinterest",color:"white",bg:"#E60023",href:`https://pinterest.com/pin/create/button/?url=${url}&description=${title}`},
        ].map(({label,color,bg,href})=>(
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{background:bg,color,borderRadius:50,padding:"5px 13px",fontSize:11,fontWeight:700,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:4,border:"1px solid #eee"}}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// 商品カード
// ══════════════════════════════════════════════
function ItemCard({item,lang,jpy2usd,wishlist,toggleWish,setModal,t}){
  const isWished=wishlist.includes(item.itemId);
  return(
    <div className="hov-card" style={{background:"white",borderRadius:20,padding:16,border:"2px solid #FFE0B2",boxShadow:"0 4px 18px rgba(255,153,0,0.09)",transition:"transform 0.2s,box-shadow 0.2s",position:"relative",cursor:"pointer"}}
      onClick={()=>setModal(item)}>
      {item.isNew&&<div style={{position:"absolute",top:10,left:10,background:"linear-gradient(135deg,#FF9900,#FF5722)",color:"white",borderRadius:50,padding:"2px 9px",fontSize:9,fontWeight:800}}>NEW</div>}
      {item.stock<=1&&<div style={{position:"absolute",top:10,left:item.isNew?52:10,background:"#F44336",color:"white",borderRadius:50,padding:"2px 9px",fontSize:9,fontWeight:800}}>残{item.stock}</div>}
      <button onClick={e=>{e.stopPropagation();toggleWish(item.itemId,item);}}
        style={{position:"absolute",top:8,right:8,background:isWished?"#FF9900":"rgba(255,153,0,0.1)",border:`2px solid ${isWished?"#FF9900":"#FFE0B2"}`,borderRadius:50,width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"all 0.2s"}}>
        {isWished?"❤️":"🤍"}
      </button>
      <div style={{fontSize:44,textAlign:"center",margin:"6px 0 10px"}}>{item.emoji}</div>
      <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:6}}>
        {item.tags.map(tg=><span key={tg} style={{background:"#FFF3E0",color:"#E65100",borderRadius:50,padding:"1px 7px",fontSize:9,fontWeight:700}}>{tg}</span>)}
      </div>
      <h3 style={{margin:"0 0 4px",fontSize:12,fontWeight:800,color:"#333",lineHeight:1.4}}>{item.title[lang]}</h3>
      <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:9}}>
        <Stars rating={item.rating}/><span style={{fontSize:10,color:"#aaa"}}>{item.rating}</span>
      </div>
      <div style={{marginBottom:11}}>
        <span style={{fontWeight:900,fontSize:17,color:"#FF6600"}}>¥{item.price.toLocaleString()}</span>
        <span style={{fontSize:10,color:"#aaa",marginLeft:6}}>≈ ${jpy2usd(item.price)}</span>
      </div>
      <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
        style={{display:"flex",justifyContent:"center",alignItems:"center",gap:4,background:"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",borderRadius:50,padding:"8px",fontWeight:700,fontSize:11,textDecoration:"none"}}>
        ⭐ {t.buyOnEbay}
      </a>
    </div>
  );
}

// ══════════════════════════════════════════════
// ダッシュボード
// ══════════════════════════════════════════════
function Dashboard({t,lang,DASH,maxSales,jpy2usd,ITEMS}){
  const statusColor={"発送済":"#4CAF50","準備中":"#FF9900","完了":"#29B6F6"};
  return(
    <section style={{maxWidth:1100,margin:"0 auto",padding:"36px clamp(12px,4vw,56px)"}}>
      <h2 style={{fontWeight:900,color:"#BF360C",fontSize:"clamp(18px,3vw,26px)",marginBottom:5}}>{t.dashboard}</h2>
      <p style={{color:"#aaa",fontSize:11,marginBottom:24}}>{t.dashDesc}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginBottom:24}}>
        {[["💴",t.totalSales,`¥${DASH.totalSales.toLocaleString()}`,"#FF6600"],["📦",t.totalOrders,DASH.totalOrders+"件","#4CAF50"],["❤️",t.wishAdds,DASH.wishAdds+"回","#E91E63"],["👀",t.pageViews,DASH.pageViews.toLocaleString()+"PV","#29B6F6"]].map(([ic,label,val,color])=>(
          <div key={label} style={{background:"white",borderRadius:18,padding:18,border:"2px solid #FFE0B2",boxShadow:"0 4px 14px rgba(255,153,0,0.08)"}}>
            <div style={{fontSize:26,marginBottom:7}}>{ic}</div>
            <div style={{fontSize:10,color:"#aaa",marginBottom:3,fontWeight:600}}>{label}</div>
            <div style={{fontSize:18,fontWeight:900,color}}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{background:"white",borderRadius:20,padding:22,border:"2px solid #FFE0B2",boxShadow:"0 4px 14px rgba(255,153,0,0.08)",marginBottom:18}}>
        <h3 style={{fontWeight:800,color:"#BF360C",margin:"0 0 18px",fontSize:14}}>📈 月別売上グラフ</h3>
        <div style={{display:"flex",alignItems:"flex-end",gap:7,height:150}}>
          {DASH.monthly.map(m=>{
            const h=Math.round((m.sales/maxSales)*130);
            return(
              <div key={m.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{fontSize:9,color:"#FF6600",fontWeight:700}}>¥{(m.sales/1000).toFixed(0)}k</div>
                <div style={{width:"100%",height:h,background:"linear-gradient(180deg,#FF9900,#FF6600)",borderRadius:"5px 5px 0 0",minHeight:4}}/>
                <div style={{fontSize:9,color:"#888",whiteSpace:"nowrap"}}>{m.month}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
        <div style={{background:"white",borderRadius:20,padding:20,border:"2px solid #FFE0B2",boxShadow:"0 4px 14px rgba(255,153,0,0.08)"}}>
          <h3 style={{fontWeight:800,color:"#BF360C",margin:"0 0 14px",fontSize:14}}>🏆 {t.popularItems}</h3>
          {[...ITEMS].sort((a,b)=>b.sold-a.sold).slice(0,5).map((it,i)=>(
            <div key={it.itemId} style={{display:"flex",alignItems:"center",gap:9,padding:"7px 0",borderBottom:i<4?"1px solid #FFF3E0":"none"}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:i<3?"white":"#aaa"}}>{i+1}</div>
              <span style={{fontSize:17}}>{it.emoji}</span>
              <div style={{flex:1,fontSize:11,fontWeight:700,color:"#333"}}>{it.title[lang].slice(0,14)}…</div>
              <div style={{fontSize:11,color:"#FF6600",fontWeight:800}}>{it.sold}sold</div>
            </div>
          ))}
        </div>
        <div style={{background:"white",borderRadius:20,padding:20,border:"2px solid #FFE0B2",boxShadow:"0 4px 14px rgba(255,153,0,0.08)"}}>
          <h3 style={{fontWeight:800,color:"#BF360C",margin:"0 0 14px",fontSize:14}}>🕐 {t.recentOrders}</h3>
          {DASH.recentOrders.map((o,i)=>(
            <div key={o.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:7,padding:"7px 0",borderBottom:i<4?"1px solid #FFF3E0":"none"}}>
              <div>
                <div style={{fontSize:10,color:"#aaa",marginBottom:1}}>{o.id}</div>
                <div style={{fontSize:12,fontWeight:700,color:"#333"}}>{o.item}</div>
                <div style={{fontSize:10,color:"#888"}}>{o.buyer}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:12,fontWeight:900,color:"#FF6600"}}>¥{o.price.toLocaleString()}</div>
                <span style={{background:statusColor[o.status]||"#aaa",color:"white",borderRadius:50,padding:"2px 9px",fontSize:9,fontWeight:700}}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════
// AI商品説明ジェネレーター（Claude API）
// ══════════════════════════════════════════════
function AIPage({t,lang,ITEMS}){
  const[itemName,setItemName]=useState("");
  const[cond,setCond]=useState("");
  const[loading,setLoading]=useState(false);
  const[result,setResult]=useState(null);
  const[copiedLang,setCopiedLang]=useState(null);
  const[preset,setPreset]=useState("");

  const generate=async()=>{
    if(!itemName.trim())return;
    setLoading(true);setResult(null);
    const prompt=`あなたはeBayで日本のアイテムを販売するプロのセラーです。
以下の商品情報をもとに、eBay用の商品説明文を日本語・英語・中国語の3言語で生成してください。

商品名: ${itemName}
状態・特徴: ${cond||"記載なし"}

出力は必ず以下のJSON形式のみで返してください（説明文・前置き不要）:
{
  "ja": "日本語の説明文（3〜5文、魅力的でプロフェッショナルな文章）",
  "en": "English description (3-5 sentences, professional eBay style)",
  "zh": "中文描述（3〜5句，专业eBay风格）"
}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})
      });
      const data=await res.json();
      const text=data.content?.map(c=>c.text||"").join("");
      const clean=text.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      setResult(parsed);
    }catch(e){
      setResult({ja:"生成に失敗しました。再度お試しください。",en:"Generation failed. Please try again.",zh:"生成失败，请重试。"});
    }
    setLoading(false);
  };

  const copy=(text,l)=>{
    navigator.clipboard.writeText(text).then(()=>{
      setCopiedLang(l);setTimeout(()=>setCopiedLang(null),2000);
    });
  };

  const applyPreset=(itemId)=>{
    const it=ITEMS.find(i=>i.itemId===itemId);
    if(!it)return;
    setPreset(itemId);
    setItemName(it.title.ja);
    setCond(`${it.condition.ja}・${it.tags.join("・")}`);
    setResult(null);
  };

  const langLabels={ja:"🇯🇵 日本語",en:"🇺🇸 English",zh:"🇨🇳 中文"};

  return(
    <section style={{maxWidth:800,margin:"0 auto",padding:"36px clamp(12px,4vw,56px)"}}>
      <h2 style={{fontWeight:900,color:"#BF360C",fontSize:"clamp(18px,3vw,26px)",marginBottom:6}}>{t.aiTitle}</h2>
      <p style={{color:"#888",fontSize:13,marginBottom:24}}>{t.aiDesc}</p>

      {/* プリセット */}
      <div style={{marginBottom:18}}>
        <label style={{fontSize:11,fontWeight:700,color:"#888",display:"block",marginBottom:8}}>📦 登録商品からプリセット入力</label>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {ITEMS.slice(0,6).map(it=>(
            <button key={it.itemId} onClick={()=>applyPreset(it.itemId)}
              style={{background:preset===it.itemId?"linear-gradient(135deg,#FF9900,#FF6600)":"white",color:preset===it.itemId?"white":"#666",border:`2px solid ${preset===it.itemId?"#FF9900":"#FFE0B2"}`,borderRadius:50,padding:"5px 13px",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>
              {it.emoji} {it.title.ja.slice(0,10)}…
            </button>
          ))}
        </div>
      </div>

      <div style={{background:"white",borderRadius:24,padding:26,border:"2px solid #FFE0B2",boxShadow:"0 4px 20px rgba(255,153,0,0.1)",marginBottom:24}}>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,fontWeight:700,color:"#888",display:"block",marginBottom:6}}>{t.aiNameLabel} *</label>
          <input value={itemName} onChange={e=>setItemName(e.target.value)} placeholder={t.aiNamePh}
            style={{width:"100%",boxSizing:"border-box",padding:"11px 16px",borderRadius:12,border:"2px solid #FFE0B2",fontSize:13,transition:"all 0.2s"}}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:11,fontWeight:700,color:"#888",display:"block",marginBottom:6}}>{t.aiCondLabel}</label>
          <textarea value={cond} onChange={e=>setCond(e.target.value)} placeholder={t.aiCondPh} rows={2}
            style={{width:"100%",boxSizing:"border-box",padding:"11px 16px",borderRadius:12,border:"2px solid #FFE0B2",fontSize:13,resize:"vertical",fontFamily:"inherit",transition:"all 0.2s"}}/>
        </div>
        <button onClick={generate} disabled={loading||!itemName.trim()}
          style={{background:loading||!itemName.trim()?"#ddd":"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",border:"none",borderRadius:50,padding:"12px 28px",fontWeight:800,fontSize:14,cursor:loading||!itemName.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"}}>
          {loading?<><span style={{display:"inline-block",width:16,height:16,border:"2px solid rgba(255,255,255,0.4)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>{t.aiGenerating}</>:<>✨ {t.aiGenBtn}</>}
        </button>
      </div>

      {result&&(
        <div style={{animation:"fadeIn 0.4s ease"}}>
          <h3 style={{fontWeight:800,color:"#BF360C",marginBottom:14,fontSize:15}}>📄 {t.aiResult}</h3>
          {["ja","en","zh"].map(l=>(
            <div key={l} style={{background:"white",borderRadius:20,padding:20,border:"2px solid #FFE0B2",boxShadow:"0 4px 14px rgba(255,153,0,0.08)",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontWeight:800,color:"#FF6600",fontSize:13}}>{langLabels[l]}</span>
                <button onClick={()=>copy(result[l],l)}
                  style={{background:copiedLang===l?"#4CAF50":"linear-gradient(135deg,#FF9900,#FF6600)",color:"white",border:"none",borderRadius:50,padding:"5px 14px",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>
                  {copiedLang===l?t.aiCopied:t.aiCopy}
                </button>
              </div>
              <p style={{fontSize:13,color:"#444",lineHeight:1.8,margin:0}}>{result[l]}</p>
            </div>
          ))}
          <div style={{background:"#FFF3E0",borderRadius:16,padding:"12px 16px",fontSize:12,color:"#888",border:"1px solid #FFE0B2"}}>
            💡 生成された説明文はコピーしてeBayの商品ページに貼り付けてご利用ください。
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}
