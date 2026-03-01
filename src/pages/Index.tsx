import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/893e78f8-86e7-4cb5-b61f-de9d8a895fc2/files/bace1d49-f581-42c4-836e-46af330e6c64.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "status", label: "Статус", icon: "Activity" },
  { id: "shop", label: "Магазин", icon: "ShoppingCart" },
  { id: "characters", label: "Персонажи", icon: "User" },
  { id: "balance", label: "Баланс", icon: "Wallet" },
  { id: "map", label: "Карта", icon: "Map" },
  { id: "guides", label: "Гайды", icon: "BookOpen" },
  { id: "rules", label: "Правила", icon: "Shield" },
  { id: "events", label: "События", icon: "Zap" },
  { id: "news", label: "Новости", icon: "Newspaper" },
  { id: "profile", label: "Профиль", icon: "UserCircle" },
];

const SHOP_ITEMS = [
  { id: 1, name: "AKM + магазин", category: "Оружие", price: 299, rarity: "Редкий", icon: "🔫" },
  { id: 2, name: "Ghillie Suite", category: "Броня", price: 199, rarity: "Обычный", icon: "🥷" },
  { id: 3, name: "Полный медкит", category: "Медицина", price: 99, rarity: "Обычный", icon: "🏥" },
  { id: 4, name: "Снайперская M4", category: "Оружие", price: 549, rarity: "Эпический", icon: "🎯" },
  { id: 5, name: "Тактический рюкзак", category: "Снаряжение", price: 149, rarity: "Обычный", icon: "🎒" },
  { id: 6, name: "Вертолёт (7 дней)", category: "Транспорт", price: 999, rarity: "Легендарный", icon: "🚁" },
  { id: 7, name: "База 5x5 (30 дней)", category: "База", price: 799, rarity: "Эпический", icon: "🏠" },
  { id: 8, name: "Набор выживальщика", category: "Наборы", price: 349, rarity: "Редкий", icon: "⚙️" },
];

const TOP_PLAYERS = [
  { rank: 1, name: "DeadShot_PRO", kills: 2841, deaths: 312, kd: "9.1", playtime: "1240ч", faction: "Мародёры" },
  { rank: 2, name: "ShadowWalker", kills: 2103, deaths: 289, kd: "7.3", playtime: "980ч", faction: "Выжившие" },
  { rank: 3, name: "NightHunter", kills: 1987, deaths: 401, kd: "5.0", playtime: "854ч", faction: "Мародёры" },
  { rank: 4, name: "Ghost_Z", kills: 1754, deaths: 198, kd: "8.9", playtime: "720ч", faction: "Одиночки" },
  { rank: 5, name: "BloodyMary", kills: 1621, deaths: 445, kd: "3.6", playtime: "670ч", faction: "Выжившие" },
  { rank: 6, name: "RaidBoss", kills: 1543, deaths: 267, kd: "5.8", playtime: "630ч", faction: "Мародёры" },
  { rank: 7, name: "Taktik_RU", kills: 1489, deaths: 321, kd: "4.6", playtime: "590ч", faction: "Выжившие" },
  { rank: 8, name: "ZoneRunner", kills: 1201, deaths: 289, kd: "4.2", playtime: "510ч", faction: "Одиночки" },
];

const GUIDES = [
  { title: "Начало игры — гайд для новичков", category: "Основы", views: 12400, icon: "🗺️" },
  { title: "Лучшие точки лута на Chernarus", category: "Лут", views: 8900, icon: "💎" },
  { title: "Система крафта и рецепты", category: "Крафт", views: 7200, icon: "⚙️" },
  { title: "Правила PvP зон и безопасные районы", category: "PvP", views: 11100, icon: "⚔️" },
  { title: "Строительство базы — полный гайд", category: "Базы", views: 9400, icon: "🏗️" },
  { title: "Транспорт: где найти и как починить", category: "Транспорт", views: 6800, icon: "🚗" },
];

const NEWS = [
  { date: "28 фев 2026", title: "Обновление 1.25 — новое оружие и патчи баланса", tag: "Обновление", icon: "🔄" },
  { date: "25 фев 2026", title: "Ивент выходного дня: x2 опыт и двойной лут", tag: "Событие", icon: "⚡" },
  { date: "20 фев 2026", title: "Новая карта Livonia добавлена на второй сервер", tag: "Карта", icon: "🗺️" },
  { date: "15 фев 2026", title: "Открытие рейтинга сезон 3 — призовой фонд 50 000₽", tag: "Рейтинг", icon: "🏆" },
];

const EVENTS = [
  { name: "Ночной рейд", status: "active", players: 48, reward: "1000 ZC", ends: "2ч 15м" },
  { name: "Турнир по PvP", status: "soon", players: 0, reward: "5000 ZC", ends: "Завтра 20:00" },
  { name: "Охота за головами", status: "active", players: 24, reward: "2500 ZC", ends: "4ч 30м" },
  { name: "Битва фракций", status: "soon", players: 0, reward: "10000 ZC", ends: "В выходные" },
];

const RULES = [
  { num: "01", title: "Уважение к игрокам", text: "Запрещены оскорбления, расизм, угрозы в чате и голосовом общении." },
  { num: "02", title: "Запрет читов и модов", text: "Любые программы, дающие нечестное преимущество — бан без предупреждения." },
  { num: "03", title: "Рейдинг баз", text: "Рейд разрешён только в дневное время (08:00–22:00). Ночные рейды запрещены." },
  { num: "04", title: "Зоны новичков", text: "Убийство игроков с < 10 часов игры в начальных зонах карается варном." },
  { num: "05", title: "Торговля", text: "Продажа игровых ценностей за реальные деньги через третьи сервисы — бан." },
  { num: "06", title: "Связь с администрацией", text: "Споры решаются только через тикет в Discord. Личные претензии не рассматриваются." },
];

const VEHICLES = [
  { id: 1, name: "Lada Niva", type: "Легковой", status: "Активен", expires: "15.03.2026", plate: "DZ-4821" },
  { id: 2, name: "UAZ 469", type: "Внедорожник", status: "Активен", expires: "22.03.2026", plate: "DZ-3317" },
];

const PURCHASES = [
  { date: "01.03.2026", item: "AKM + магазин", price: 299, status: "Выдан" },
  { date: "28.02.2026", item: "Ghillie Suite", price: 199, status: "Выдан" },
  { date: "25.02.2026", item: "Медкит x5", price: 245, status: "Выдан" },
];

const rarityColors: Record<string, string> = {
  "Обычный": "text-gray-400 border-gray-600",
  "Редкий": "#60a5fa",
  "Эпический": "#c084fc",
  "Легендарный": "#fbbf24",
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [balance, setBalance] = useState(1250);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const playerCount = 64;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) setCart([...cart, id]);
  };
  const removeFromCart = (id: number) => setCart(cart.filter(i => i !== id));
  const cartTotal = cart.reduce((sum, id) => sum + (SHOP_ITEMS.find(i => i.id === id)?.price || 0), 0);

  const purchase = () => {
    if (balance >= cartTotal) {
      setBalance(prev => prev - cartTotal);
      setCart([]);
      setCartOpen(false);
    }
  };

  return (
    <div className="min-h-screen font-ibm" style={{ background: 'var(--bg-deep)', color: 'var(--text-bright)' }}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(2,12,20,0.96)', borderBottom: '1px solid rgba(0,212,255,0.18)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto">
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center font-orbitron font-black text-xs" style={{ background: 'var(--neon)', color: 'var(--bg-deep)', boxShadow: '0 0 12px var(--neon)' }}>DZ</div>
            <span className="font-orbitron text-sm font-bold tracking-widest hidden sm:block animate-flicker" style={{ color: 'var(--neon)', textShadow: '0 0 10px var(--neon)' }}>DAYZ<span style={{ color: 'var(--text-dim)' }}>_</span>ZONE</span>
          </button>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div className="status-online" />
              <span className="font-mono-tech text-xs" style={{ color: 'var(--neon)' }}>ONLINE</span>
              <span className="font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>{playerCount}/128</span>
            </div>
            <span className="font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>{time.toLocaleTimeString('ru-RU')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab("balance")} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded font-mono-tech text-xs transition-all" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--neon)' }}>
              <Icon name="Coins" size={12} />{balance.toLocaleString()} ZC
            </button>
            <button onClick={() => { setNotifOpen(!notifOpen); setCartOpen(false); }} className="relative w-9 h-9 flex items-center justify-center rounded" style={{ border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-dim)' }}>
              <Icon name="Bell" size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--danger)', boxShadow: '0 0 4px var(--danger)' }} />
            </button>
            <button onClick={() => { setCartOpen(!cartOpen); setNotifOpen(false); }} className="relative w-9 h-9 flex items-center justify-center rounded" style={{ border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-dim)' }}>
              <Icon name="ShoppingCart" size={16} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold font-orbitron" style={{ background: 'var(--neon)', color: 'var(--bg-deep)' }}>{cart.length}</span>}
            </button>
            <button onClick={() => setActiveTab("profile")} className="btn-cyber-primary hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded">
              <Icon name="LogIn" size={12} />Steam
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded" style={{ border: '1px solid rgba(0,212,255,0.2)', color: 'var(--neon)' }}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={16} />
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center px-4 max-w-7xl mx-auto overflow-x-auto" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`nav-item flex items-center gap-1.5 ${activeTab === item.id ? "active" : ""}`}>
              <Icon name={item.icon} size={11} />{item.label}
            </button>
          ))}
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden grid grid-cols-4 gap-1 p-3" style={{ borderTop: '1px solid rgba(0,212,255,0.15)', background: 'rgba(6,15,26,0.98)' }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className="flex flex-col items-center gap-1 p-2 rounded transition-all"
                style={{ color: activeTab === item.id ? 'var(--neon)' : 'var(--text-dim)', background: activeTab === item.id ? 'rgba(0,212,255,0.08)' : 'transparent', border: activeTab === item.id ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent', fontSize: '0.55rem' }}>
                <Icon name={item.icon} size={14} /><span className="font-orbitron">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CART PANEL */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="w-full max-w-sm h-full flex flex-col" style={{ background: 'var(--bg-card)', borderLeft: '1px solid rgba(0,212,255,0.3)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid rgba(0,212,255,0.2)' }}>
              <h3 className="font-orbitron text-sm tracking-wider" style={{ color: 'var(--neon)' }}>КОРЗИНА</h3>
              <button onClick={() => setCartOpen(false)} style={{ color: 'var(--text-dim)' }}><Icon name="X" size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center py-8 text-sm" style={{ color: 'var(--text-dim)' }}>Корзина пуста</p>
              ) : cart.map(id => {
                const item = SHOP_ITEMS.find(i => i.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="flex items-center justify-between p-3 rounded" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs font-mono-tech" style={{ color: 'var(--neon)' }}>{item.price} ZC</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(id)} style={{ color: 'var(--danger)' }}><Icon name="Trash2" size={14} /></button>
                  </div>
                );
              })}
            </div>
            {cart.length > 0 && (
              <div className="p-4" style={{ borderTop: '1px solid rgba(0,212,255,0.2)' }}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--text-dim)' }}>Итого:</span>
                  <span className="font-orbitron font-bold" style={{ color: 'var(--neon)' }}>{cartTotal} ZC</span>
                </div>
                <div className="flex justify-between text-xs mb-4">
                  <span style={{ color: 'var(--text-dim)' }}>Ваш баланс:</span>
                  <span style={{ color: balance >= cartTotal ? 'var(--success)' : 'var(--danger)' }}>{balance} ZC</span>
                </div>
                <button onClick={purchase} disabled={balance < cartTotal} className="w-full py-2.5 font-orbitron text-xs tracking-widest uppercase transition-all rounded"
                  style={{ background: balance >= cartTotal ? 'var(--neon)' : 'rgba(0,212,255,0.1)', color: balance >= cartTotal ? 'var(--bg-deep)' : 'var(--text-dim)', border: '1px solid rgba(0,212,255,0.3)', cursor: balance >= cartTotal ? 'pointer' : 'not-allowed' }}>
                  {balance >= cartTotal ? "Купить и получить" : "Недостаточно средств"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {notifOpen && (
        <div className="fixed top-24 right-4 z-50 w-80 rounded" style={{ background: 'var(--bg-card)', border: '1px solid rgba(0,212,255,0.3)', boxShadow: '0 0 30px rgba(0,212,255,0.1)' }}>
          <div className="flex items-center justify-between p-3" style={{ borderBottom: '1px solid rgba(0,212,255,0.2)' }}>
            <h3 className="font-orbitron text-xs tracking-wider" style={{ color: 'var(--neon)' }}>УВЕДОМЛЕНИЯ</h3>
            <button onClick={() => setNotifOpen(false)} style={{ color: 'var(--text-dim)' }}><Icon name="X" size={14} /></button>
          </div>
          {[
            { icon: "Zap", msg: "Ивент «Ночной рейд» начался!", time: "2 мин назад", color: 'var(--warning)' },
            { icon: "ShoppingCart", msg: "Ваша покупка выдана на сервере", time: "1 час назад", color: 'var(--success)' },
            { icon: "Trophy", msg: "Вы вошли в ТОП-10 по киллам!", time: "3 часа назад", color: 'var(--neon)' },
            { icon: "MessageSquare", msg: "Новый ответ на ваш тикет #824", time: "вчера", color: 'var(--text-dim)' },
          ].map((n, i) => (
            <div key={i} className="flex items-start gap-3 p-3 cursor-pointer" style={{ borderBottom: '1px solid rgba(0,212,255,0.06)' }}>
              <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(0,212,255,0.08)', color: n.color }}>
                <Icon name={n.icon} size={14} />
              </div>
              <div>
                <p className="text-xs leading-snug">{n.msg}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MAIN */}
      <main className="pt-28 md:pt-24 pb-16 px-4 max-w-7xl mx-auto">

        {/* HOME */}
        {activeTab === "home" && (
          <div className="animate-fade-in-up">
            <div className="relative rounded overflow-hidden mb-8" style={{ height: '380px' }}>
              <img src={HERO_IMAGE} alt="DAYZ ZONE" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(2,12,20,0.92) 0%, rgba(2,12,20,0.35) 55%, rgba(2,12,20,0.8) 100%)' }} />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <p className="font-mono-tech text-xs mb-3" style={{ color: 'var(--neon)' }}>// ОФИЦИАЛЬНЫЙ СЕРВЕР · СЕЗОН 3</p>
                <h1 className="font-orbitron font-black text-4xl md:text-6xl mb-3 animate-glitch" style={{ color: 'white', textShadow: '0 0 25px rgba(0,212,255,0.5)' }}>
                  DAYZ<span style={{ color: 'var(--neon)' }}>_</span>ZONE
                </h1>
                <p className="text-sm md:text-base mb-6" style={{ color: 'rgba(200,240,255,0.65)', maxWidth: '420px' }}>
                  Постапокалиптический выживач нового поколения. Выживи. Доминируй. Победи.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab("status")} className="btn-cyber-primary px-5 py-2.5 rounded text-xs">Подключиться</button>
                  <button onClick={() => setActiveTab("shop")} className="btn-cyber px-5 py-2.5 rounded text-xs">Магазин</button>
                </div>
              </div>
              <div className="absolute top-3 right-3 font-mono-tech text-xs" style={{ color: 'var(--neon)', opacity: 0.6 }}>v1.25.0 // LIVE</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: "Игроков онлайн", value: `${playerCount}`, sub: "/128", icon: "Users", color: 'var(--neon)' },
                { label: "Карта", value: "Chernarus", icon: "Map", color: 'var(--success)' },
                { label: "Статус", value: "ONLINE", icon: "Activity", color: 'var(--success)' },
                { label: "Сезон", value: "3 / 2026", icon: "Trophy", color: 'var(--warning)' },
              ].map((s, i) => (
                <div key={i} className="cyber-card rounded p-4 corner-decoration">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{s.label}</span>
                    <Icon name={s.icon} size={14} style={{ color: s.color }} />
                  </div>
                  <p className="font-orbitron font-bold text-lg" style={{ color: s.color }}>
                    {s.value}<span className="text-sm" style={{ color: 'var(--text-dim)' }}>{s.sub || ""}</span>
                  </p>
                  {i === 0 && <div className="progress-cyber mt-2 rounded"><div className="progress-cyber-fill rounded" style={{ width: `${(playerCount / 128) * 100}%` }} /></div>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="cyber-card rounded p-4">
                <h3 className="section-title text-xs mb-4">Активные события</h3>
                <div className="space-y-2">
                  {EVENTS.filter(e => e.status === "active").map((ev, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}>
                      <div className="flex items-center gap-2"><div className="status-online" /><span className="text-sm">{ev.name}</span></div>
                      <div className="text-right">
                        <p className="text-xs font-mono-tech" style={{ color: 'var(--success)' }}>{ev.reward}</p>
                        <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{ev.ends}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setActiveTab("events")} className="text-xs mt-1" style={{ color: 'var(--neon)' }}>Все события →</button>
                </div>
              </div>

              <div className="cyber-card rounded p-4">
                <h3 className="section-title text-xs mb-4">Топ игроков</h3>
                <div className="space-y-2">
                  {TOP_PLAYERS.slice(0, 5).map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-orbitron text-xs w-5 text-right" style={{ color: i < 3 ? 'var(--warning)' : 'var(--text-dim)' }}>#{p.rank}</span>
                      <span className="flex-1 text-sm truncate">{p.name}</span>
                      <span className="font-mono-tech text-xs" style={{ color: 'var(--neon)' }}>{p.kills}☠</span>
                    </div>
                  ))}
                  <button onClick={() => setActiveTab("characters")} className="text-xs mt-1" style={{ color: 'var(--neon)' }}>Смотреть всех →</button>
                </div>
              </div>

              <div className="cyber-card rounded p-4">
                <h3 className="section-title text-xs mb-4">Последние новости</h3>
                <div className="space-y-3">
                  {NEWS.slice(0, 3).map((n, i) => (
                    <div key={i} className="flex gap-3 cursor-pointer group">
                      <span className="text-xl">{n.icon}</span>
                      <div>
                        <p className="text-xs leading-snug" style={{ color: 'var(--text-bright)' }}>{n.title}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{n.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Discord */}
            <div className="rounded overflow-hidden relative mb-4" style={{ background: 'linear-gradient(135deg, #1a1f3a 0%, #0e1326 100%)', border: '1px solid rgba(88,101,242,0.4)', boxShadow: '0 0 30px rgba(88,101,242,0.1)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 50%, rgba(88,101,242,0.15) 0%, transparent 60%)' }} />
              <div className="relative flex flex-col md:flex-row items-center justify-between p-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#5865F2', boxShadow: '0 0 20px rgba(88,101,242,0.5)' }}>
                    <svg width="28" height="22" viewBox="0 0 71 55" fill="white"><path d="M60.1 4.9A58.6 58.6 0 0 0 45.4.7a40.6 40.6 0 0 0-1.8 3.7 54.2 54.2 0 0 0-16.2 0A37.4 37.4 0 0 0 25.6.7 58.5 58.5 0 0 0 10.8 4.9C1.6 18.3-1 31.4.3 44.3a59 59 0 0 0 17.9 9.1 44.4 44.4 0 0 0 3.8-6.2 38.3 38.3 0 0 1-6-2.9l1.5-1.1a42.1 42.1 0 0 0 36 0l1.5 1.1a38.4 38.4 0 0 1-6 2.9 44.3 44.3 0 0 0 3.8 6.2 58.8 58.8 0 0 0 17.9-9c1.5-15.1-2.5-28-10.6-39.4ZM23.7 36.4c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 3.9-2.8 7.1-6.4 7.1Zm23.6 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 3.9-2.8 7.1-6.4 7.1Z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-white">Discord-сообщество</h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Более <strong className="text-white">5 200</strong> игроков уже с нами</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="text-center px-4"><p className="font-orbitron font-bold text-2xl text-white">5.2K</p><p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>участников</p></div>
                  <div className="text-center px-4"><p className="font-orbitron font-bold text-2xl" style={{ color: '#43b581' }}>342</p><p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>онлайн</p></div>
                  <a href="#" className="px-6 py-2.5 rounded font-orbitron text-xs tracking-wider text-white" style={{ background: '#5865F2', boxShadow: '0 0 15px rgba(88,101,242,0.4)' }}>Вступить</a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "ВКонтакте", icon: "Users", color: '#4a76a8' },
                { label: "Discord", icon: "MessageCircle", color: '#5865F2' },
                { label: "Telegram", icon: "Send", color: '#26A5E4' },
              ].map((s, i) => (
                <a key={i} href="#" className="flex items-center gap-2 px-4 py-2 rounded text-sm text-white" style={{ background: `${s.color}22`, border: `1px solid ${s.color}55` }}>
                  <Icon name={s.icon} size={14} style={{ color: s.color }} />{s.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* STATUS */}
        {activeTab === "status" && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="section-title text-xl">Статус сервера</h2>
              <div className="status-online" />
            </div>

            <div className="cyber-card rounded p-6 mb-4 corner-decoration">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="font-mono-tech text-xs mb-1" style={{ color: 'var(--text-dim)' }}>// ОСНОВНОЙ СЕРВЕР</p>
                  <h3 className="font-orbitron text-xl font-bold text-white">DAYZ ZONE | Vanilla+ | Chernarus</h3>
                  <p className="text-sm mt-1 font-mono-tech" style={{ color: 'var(--text-dim)' }}>91.234.56.78:2302</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)' }}>
                  <div className="status-online" />
                  <span className="font-orbitron text-sm font-bold" style={{ color: 'var(--success)' }}>ONLINE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Игроки", value: `${playerCount}/128`, icon: "Users" },
                  { label: "Карта", value: "Chernarus", icon: "Map" },
                  { label: "Время", value: "09:42", icon: "Clock" },
                  { label: "Рестарт через", value: "2ч 18м", icon: "RefreshCw" },
                ].map((s, i) => (
                  <div key={i} className="rounded p-3 text-center" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.12)' }}>
                    <Icon name={s.icon} size={18} className="mx-auto mb-1" style={{ color: 'var(--neon)' }} />
                    <p className="font-orbitron font-bold text-sm text-white">{s.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: 'var(--text-dim)' }}>Загрузка сервера</span>
                <span className="font-mono-tech" style={{ color: 'var(--neon)' }}>{playerCount}/128</span>
              </div>
              <div className="progress-cyber rounded"><div className="progress-cyber-fill rounded" style={{ width: `${(playerCount / 128) * 100}%` }} /></div>
            </div>

            <div className="cyber-card rounded p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-mono-tech text-xs mb-1" style={{ color: 'var(--text-dim)' }}>// ВТОРОЙ СЕРВЕР</p>
                  <h3 className="font-orbitron text-lg font-bold text-white">DAYZ ZONE | Livonia | PvE</h3>
                  <p className="text-sm font-mono-tech mt-1" style={{ color: 'var(--text-dim)' }}>91.234.56.79:2302</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)' }}>
                  <div className="status-online" />
                  <span className="font-orbitron text-sm font-bold" style={{ color: 'var(--success)' }}>ONLINE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[["32/64","Игроки"],["Livonia","Карта"],["PvE","Режим"],["5ч 00м","Рестарт"]].map(([v, l], i) => (
                  <div key={i} className="rounded p-3 text-center" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}>
                    <p className="font-orbitron font-bold text-sm text-white">{v}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cyber-card rounded p-5">
                <h3 className="section-title text-xs mb-4">Параметры сервера</h3>
                <div className="space-y-2">
                  {[["Версия DayZ","1.25.157365"],["Тип","Vanilla+"],["PvP/PvE","PvP"],["Рейдинг","Дневной (08-22)"],["Третье лицо","Выключено"],["Ночи","Ускоренные x3"],["Лут","x1.5"],["Спавн транспорта","x2"]].map(([k,v],i) => (
                    <div key={i} className="flex justify-between text-sm py-1.5" style={{ borderBottom: '1px solid rgba(0,212,255,0.08)' }}>
                      <span style={{ color: 'var(--text-dim)' }}>{k}</span>
                      <span className="font-mono-tech" style={{ color: 'var(--text-bright)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cyber-card rounded p-5">
                <h3 className="section-title text-xs mb-4">Расписание рестартов</h3>
                <div className="space-y-1.5">
                  {["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"].map((t, i) => {
                    const h = new Date().getHours();
                    const rh = parseInt(t);
                    const isNext = rh > h && (i === 0 || [0,3,6,9,12,15,18,21][i-1] <= h);
                    return (
                      <div key={i} className="flex items-center justify-between p-2 rounded" style={{ background: isNext ? 'rgba(0,212,255,0.08)' : 'transparent', border: isNext ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent' }}>
                        <span className="font-mono-tech text-sm" style={{ color: isNext ? 'var(--neon)' : rh < h ? 'var(--text-dim)' : 'var(--text-bright)' }}>{t}</span>
                        {isNext && <span className="text-xs" style={{ color: 'var(--neon)' }}>← следующий</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SHOP */}
        {activeTab === "shop" && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title text-xl">Магазин</h2>
                <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>Автоматическая выдача товаров на сервере</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tech text-sm" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--neon)' }}>
                <Icon name="Wallet" size={14} />{balance} ZC
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Все","Оружие","Броня","Медицина","Снаряжение","Транспорт","База","Наборы"].map((cat, i) => (
                <button key={cat} className="px-3 py-1 rounded text-xs font-orbitron tracking-wide" style={{ background: i === 0 ? 'var(--neon)' : 'rgba(0,212,255,0.05)', color: i === 0 ? 'var(--bg-deep)' : 'var(--text-dim)', border: '1px solid rgba(0,212,255,0.2)' }}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {SHOP_ITEMS.map(item => {
                const rc = rarityColors[item.rarity];
                const inCart = cart.includes(item.id);
                return (
                  <div key={item.id} className="shop-item rounded flex flex-col">
                    <div className="h-28 flex items-center justify-center text-6xl" style={{ background: 'rgba(0,212,255,0.04)' }}>{item.icon}</div>
                    <div className="p-3 flex flex-col gap-2 flex-1">
                      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{item.category}</p>
                      <p className="text-sm font-medium leading-tight" style={{ color: 'var(--text-bright)' }}>{item.name}</p>
                      <span className="badge-cyber self-start text-xs" style={{ color: rc, borderColor: rc }}>{item.rarity}</span>
                      <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                        <span className="font-orbitron font-bold text-sm" style={{ color: 'var(--neon)' }}>{item.price} ZC</span>
                        <button onClick={() => inCart ? removeFromCart(item.id) : addToCart(item.id)}
                          className="text-xs px-2.5 py-1.5 rounded font-orbitron transition-all"
                          style={{ background: inCart ? 'rgba(255,51,85,0.15)' : 'rgba(0,212,255,0.1)', color: inCart ? 'var(--danger)' : 'var(--neon)', border: `1px solid ${inCart ? 'var(--danger)' : 'rgba(0,212,255,0.3)'}` }}>
                          {inCart ? "Убрать" : "В корзину"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cyber-card rounded p-5">
              <h3 className="section-title text-xs mb-4">История покупок</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,212,255,0.15)' }}>
                    {["Дата","Товар","Сумма","Статус"].map(h => <th key={h} className="text-left pb-2 pr-4 font-orbitron text-xs" style={{ color: 'var(--text-dim)' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {PURCHASES.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(0,212,255,0.06)' }}>
                      <td className="py-2.5 pr-4 font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>{p.date}</td>
                      <td className="py-2.5 pr-4 text-sm">{p.item}</td>
                      <td className="py-2.5 pr-4 font-orbitron text-xs" style={{ color: 'var(--neon)' }}>{p.price} ZC</td>
                      <td className="py-2.5"><span className="badge-cyber text-xs" style={{ color: 'var(--success)', borderColor: 'var(--success)' }}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CHARACTERS */}
        {activeTab === "characters" && (
          <div className="animate-fade-in-up">
            <h2 className="section-title text-xl mb-6">Персонажи и рейтинг</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 cyber-card rounded overflow-hidden">
                <div className="p-4" style={{ borderBottom: '1px solid rgba(0,212,255,0.15)' }}>
                  <h3 className="section-title text-xs">Топ игроков сезона 3</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: 'rgba(0,212,255,0.04)', borderBottom: '1px solid rgba(0,212,255,0.15)' }}>
                        {["#","Игрок","Киллы","Смерти","K/D","Время","Фракция"].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 font-orbitron text-xs" style={{ color: 'var(--text-dim)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TOP_PLAYERS.map((p, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(0,212,255,0.06)', background: i < 3 ? 'rgba(255,170,0,0.02)' : 'transparent' }}>
                          <td className="px-4 py-3 font-orbitron font-bold text-xs" style={{ color: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'var(--text-dim)' }}>
                            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${p.rank}`}
                          </td>
                          <td className="px-4 py-3 font-medium text-sm">{p.name}</td>
                          <td className="px-4 py-3 font-mono-tech text-xs" style={{ color: 'var(--danger)' }}>{p.kills}</td>
                          <td className="px-4 py-3 font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>{p.deaths}</td>
                          <td className="px-4 py-3 font-orbitron text-xs font-bold" style={{ color: parseFloat(p.kd) > 5 ? 'var(--neon)' : 'var(--text-bright)' }}>{p.kd}</td>
                          <td className="px-4 py-3 font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>{p.playtime}</td>
                          <td className="px-4 py-3"><span className="badge-cyber text-xs" style={{ color: 'var(--neon)', borderColor: 'rgba(0,212,255,0.3)' }}>{p.faction}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-4">
                <div className="cyber-card rounded p-5 text-center">
                  <h3 className="section-title text-xs mb-4">Мой персонаж</h3>
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl" style={{ background: 'rgba(0,212,255,0.08)', border: '2px solid rgba(0,212,255,0.3)' }}>🧟</div>
                  <p className="font-orbitron font-bold text-white mb-1">Авторизуйтесь</p>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>через Steam для просмотра</p>
                  <button className="btn-cyber-primary w-full py-2 rounded text-xs">Войти через Steam</button>
                </div>
                <div className="cyber-card rounded p-5">
                  <h3 className="section-title text-xs mb-3">Фракции</h3>
                  {[["Мародёры", 1240, 'var(--danger)'],["Выжившие", 980, 'var(--success)'],["Одиночки", 560, 'var(--text-dim)']].map(([name, count, color], i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: color as string }}>{name}</span>
                        <span style={{ color: 'var(--text-dim)' }}>{(count as number)} игроков</span>
                      </div>
                      <div className="progress-cyber rounded"><div className="progress-cyber-fill rounded" style={{ width: `${((count as number) / 1240) * 100}%`, background: color as string, boxShadow: `0 0 8px ${color}` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BALANCE */}
        {activeTab === "balance" && (
          <div className="animate-fade-in-up max-w-2xl mx-auto">
            <h2 className="section-title text-xl mb-6">Баланс и пополнение</h2>
            <div className="cyber-card rounded p-6 mb-6 corner-decoration" style={{ background: 'linear-gradient(135deg, var(--bg-card2) 0%, var(--bg-card) 100%)' }}>
              <p className="font-mono-tech text-xs mb-2" style={{ color: 'var(--text-dim)' }}>// ИГРОВОЙ БАЛАНС</p>
              <div className="flex items-end gap-3 mb-2">
                <span className="font-orbitron font-black text-5xl" style={{ color: 'var(--neon)', textShadow: '0 0 20px var(--neon)' }}>{balance.toLocaleString()}</span>
                <span className="font-orbitron text-xl mb-1" style={{ color: 'var(--neon-dim)' }}>ZC</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Zone Credits — внутриигровая валюта</p>
            </div>
            <div className="cyber-card rounded p-5 mb-6">
              <h3 className="section-title text-xs mb-4">Пополнить баланс</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { amount: 250, price: "199₽" }, { amount: 600, price: "449₽", popular: true },
                  { amount: 1500, price: "999₽" }, { amount: 3500, price: "2199₽" },
                  { amount: 8000, price: "4799₽" }, { amount: 20000, price: "9999₽" },
                ].map((pack, i) => (
                  <button key={i} className="relative py-3 px-2 rounded text-center transition-all"
                    style={{ background: pack.popular ? 'rgba(0,212,255,0.12)' : 'rgba(0,212,255,0.04)', border: pack.popular ? '1px solid var(--neon)' : '1px solid rgba(0,212,255,0.2)', boxShadow: pack.popular ? '0 0 12px rgba(0,212,255,0.2)' : 'none' }}>
                    {pack.popular && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-orbitron px-2 py-0.5 rounded-full" style={{ background: 'var(--neon)', color: 'var(--bg-deep)' }}>ХИТ</span>}
                    <p className="font-orbitron font-bold text-sm" style={{ color: 'var(--neon)' }}>{pack.amount.toLocaleString()}</p>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>ZC</p>
                    <p className="text-xs font-bold mt-1 text-white">{pack.price}</p>
                  </button>
                ))}
              </div>
              <button className="btn-cyber-primary w-full py-3 rounded text-sm">Пополнить через ЮKassa</button>
            </div>
            <div className="cyber-card rounded p-5">
              <h3 className="section-title text-xs mb-4">История транзакций</h3>
              {[
                { type: "Пополнение", amount: "+600", date: "01.03.2026", method: "ЮKassa" },
                { type: "Покупка", amount: "-299", date: "01.03.2026", method: "Магазин" },
                { type: "Покупка", amount: "-199", date: "28.02.2026", method: "Магазин" },
                { type: "Пополнение", amount: "+1500", date: "25.02.2026", method: "ЮKassa" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid rgba(0,212,255,0.08)' }}>
                  <div>
                    <p className="text-sm">{t.type}</p>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{t.date} · {t.method}</p>
                  </div>
                  <span className="font-orbitron font-bold text-sm" style={{ color: t.amount.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>{t.amount} ZC</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAP */}
        {activeTab === "map" && (
          <div className="animate-fade-in-up">
            <h2 className="section-title text-xl mb-6">Карта сервера</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="cyber-card rounded overflow-hidden relative" style={{ height: '500px', background: 'linear-gradient(135deg, #020c14 0%, #061525 50%, #020c14 100%)' }}>
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center z-10">
                      <Icon name="Map" size={52} className="mx-auto mb-3" style={{ color: 'rgba(0,212,255,0.25)' }} />
                      <p className="font-orbitron text-sm" style={{ color: 'var(--text-dim)' }}>Интерактивная карта</p>
                      <p className="text-xs mt-1 mb-4" style={{ color: 'var(--text-dim)' }}>Chernarus 225km²</p>
                      <a href="https://dayz.ginfo.ru" target="_blank" rel="noreferrer" className="btn-cyber inline-block rounded text-xs px-4 py-2">Открыть полную карту</a>
                    </div>
                  </div>
                  {[
                    { x: '20%', y: '30%', name: 'Военная база', c: 'var(--warning)' },
                    { x: '50%', y: '45%', name: 'Черногорск', c: 'var(--neon)' },
                    { x: '70%', y: '25%', name: 'Аэропорт', c: 'var(--warning)' },
                    { x: '35%', y: '65%', name: 'Электрозаводск', c: 'var(--neon)' },
                    { x: '80%', y: '60%', name: 'Выброс', c: 'var(--danger)' },
                  ].map((pin, i) => (
                    <div key={i} className="absolute" style={{ left: pin.x, top: pin.y, transform: 'translate(-50%,-50%)' }} title={pin.name}>
                      <div className="w-3 h-3 rounded-full cursor-pointer" style={{ background: pin.c, boxShadow: `0 0 8px ${pin.c}`, animation: 'pulse-green 2s infinite' }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="cyber-card rounded p-4">
                  <h3 className="section-title text-xs mb-3">Легенда</h3>
                  {[['var(--neon)','Города'],['var(--warning)','Военные объекты'],['var(--danger)','Опасные зоны'],['var(--success)','Безопасные зоны']].map(([c,l],i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: c, boxShadow: `0 0 4px ${c}` }} />
                      <span className="text-xs">{l}</span>
                    </div>
                  ))}
                </div>
                <div className="cyber-card rounded p-4">
                  <h3 className="section-title text-xs mb-3">Ключевые точки</h3>
                  <div className="space-y-2 text-xs">
                    {[["Северо-западный аэропорт","Топ лут"],["Военные базы (NWAF, NEAF)","Оружие"],["Черногорск","Торговля"],["Башни в Электро","Снайперы"],["Лесные поляны","Лагеря"]].map(([place,tag],i) => (
                      <div key={i} className="flex justify-between gap-2">
                        <span style={{ color: 'var(--text-bright)' }}>{place}</span>
                        <span className="badge-cyber flex-shrink-0" style={{ color: 'var(--neon)', borderColor: 'rgba(0,212,255,0.3)' }}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GUIDES */}
        {activeTab === "guides" && (
          <div className="animate-fade-in-up">
            <h2 className="section-title text-xl mb-6">Гайды по серверу</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {GUIDES.map((g, i) => (
                <div key={i} className="cyber-card rounded p-5 cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{g.icon}</span>
                    <div>
                      <span className="badge-cyber text-xs mb-2 inline-block" style={{ color: 'var(--neon)', borderColor: 'rgba(0,212,255,0.3)' }}>{g.category}</span>
                      <h3 className="text-sm font-medium leading-snug" style={{ color: 'var(--text-bright)' }}>{g.title}</h3>
                      <p className="text-xs mt-2 flex items-center gap-1" style={{ color: 'var(--text-dim)' }}>
                        <Icon name="Eye" size={11} />{g.views.toLocaleString()} просмотров
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cyber-card rounded p-6 text-center">
              <Icon name="BookOpen" size={32} className="mx-auto mb-3" style={{ color: 'var(--neon)' }} />
              <p className="font-orbitron text-sm mb-2 text-white">Есть вопрос?</p>
              <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>Задай его в нашем Discord — опытные игроки помогут!</p>
              <button className="btn-cyber px-6 py-2 rounded text-xs">Задать вопрос</button>
            </div>
          </div>
        )}

        {/* RULES */}
        {activeTab === "rules" && (
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <h2 className="section-title text-xl mb-2">Правила сервера</h2>
            <p className="text-xs mb-6" style={{ color: 'var(--text-dim)' }}>Нарушение правил ведёт к предупреждению, кику или бану в зависимости от степени нарушения.</p>
            <div className="space-y-3 mb-6">
              {RULES.map((r, i) => (
                <div key={i} className="cyber-card rounded p-5 flex gap-4">
                  <span className="font-orbitron font-black text-2xl flex-shrink-0 leading-none mt-0.5" style={{ color: 'rgba(0,212,255,0.2)' }}>{r.num}</span>
                  <div>
                    <h3 className="font-orbitron text-sm font-bold mb-1.5 text-white">{r.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded p-4 flex items-start gap-3" style={{ background: 'rgba(255,51,85,0.06)', border: '1px solid rgba(255,51,85,0.3)' }}>
              <Icon name="AlertTriangle" size={18} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-xs" style={{ color: 'rgba(255,150,150,0.9)' }}>Администрация оставляет за собой право изменять правила без предупреждения. Незнание правил не освобождает от ответственности.</p>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <div className="animate-fade-in-up">
            <h2 className="section-title text-xl mb-6">События</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EVENTS.map((ev, i) => (
                <div key={i} className="cyber-card rounded p-5 corner-decoration">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-orbitron font-bold text-base text-white">{ev.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <div className={ev.status === "active" ? "status-online" : "status-offline"} />
                      <span className="font-orbitron text-xs" style={{ color: ev.status === "active" ? 'var(--success)' : 'var(--warning)' }}>
                        {ev.status === "active" ? "ИДЁТ" : "СКОРО"}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center mb-4">
                    <div><p className="font-orbitron font-bold text-sm" style={{ color: 'var(--neon)' }}>{ev.players || "—"}</p><p className="text-xs" style={{ color: 'var(--text-dim)' }}>Участников</p></div>
                    <div><p className="font-orbitron font-bold text-sm" style={{ color: 'var(--warning)' }}>{ev.reward}</p><p className="text-xs" style={{ color: 'var(--text-dim)' }}>Награда</p></div>
                    <div><p className="font-orbitron font-bold text-sm text-white">{ev.ends}</p><p className="text-xs" style={{ color: 'var(--text-dim)' }}>Осталось</p></div>
                  </div>
                  <button className="w-full py-2 rounded font-orbitron text-xs tracking-wider"
                    style={{ background: ev.status === "active" ? 'var(--neon)' : 'rgba(0,212,255,0.06)', color: ev.status === "active" ? 'var(--bg-deep)' : 'var(--text-dim)', border: '1px solid rgba(0,212,255,0.2)' }}>
                    {ev.status === "active" ? "Участвовать" : "Напомнить"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS */}
        {activeTab === "news" && (
          <div className="animate-fade-in-up">
            <h2 className="section-title text-xl mb-6">Новости</h2>
            <div className="space-y-4">
              {NEWS.map((n, i) => (
                <div key={i} className="cyber-card rounded p-5 flex gap-4 cursor-pointer group">
                  <span className="text-4xl flex-shrink-0">{n.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-cyber text-xs" style={{ color: 'var(--neon)', borderColor: 'rgba(0,212,255,0.3)' }}>{n.tag}</span>
                      <span className="font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>{n.date}</span>
                    </div>
                    <h3 className="font-orbitron font-bold text-sm leading-snug" style={{ color: 'var(--text-bright)' }}>{n.title}</h3>
                    <button className="text-xs mt-2" style={{ color: 'var(--neon)' }}>Читать далее →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="animate-fade-in-up max-w-2xl mx-auto">
            <h2 className="section-title text-xl mb-6">Профиль</h2>
            <div className="cyber-card rounded p-8 text-center mb-6">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl" style={{ background: 'rgba(0,212,255,0.08)', border: '2px solid rgba(0,212,255,0.3)', boxShadow: '0 0 20px rgba(0,212,255,0.12)' }}>👤</div>
              <p className="font-orbitron font-bold text-xl text-white mb-1">Войдите через Steam</p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-dim)' }}>Для доступа к профилю, статистике и истории покупок</p>
              <button className="btn-cyber-primary px-8 py-3 rounded text-sm inline-flex items-center gap-2">
                <Icon name="LogIn" size={16} />Авторизация через Steam
              </button>
            </div>
            <div className="cyber-card rounded p-5 mb-4">
              <h3 className="section-title text-xs mb-4">Регистрация транспорта</h3>
              <div className="space-y-2 mb-4">
                {VEHICLES.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚗</span>
                      <div>
                        <p className="text-sm font-medium">{v.name}</p>
                        <p className="font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>{v.plate} · {v.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="badge-cyber text-xs" style={{ color: 'var(--success)', borderColor: 'rgba(0,255,136,0.3)' }}>{v.status}</span>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>до {v.expires}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-cyber w-full py-2 rounded text-xs">+ Зарегистрировать транспорт</button>
            </div>
            <div className="cyber-card rounded p-5">
              <h3 className="section-title text-xs mb-4">Регистрация базы</h3>
              <div className="rounded p-4 mb-4 text-center" style={{ background: 'rgba(0,212,255,0.04)', border: '1px dashed rgba(0,212,255,0.2)' }}>
                <Icon name="Home" size={28} className="mx-auto mb-2" style={{ color: 'rgba(0,212,255,0.25)' }} />
                <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Базы не зарегистрированы</p>
              </div>
              <button className="btn-cyber w-full py-2 rounded text-xs">+ Зарегистрировать базу</button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t py-8 px-4" style={{ background: 'rgba(2,12,20,0.95)', borderColor: 'rgba(0,212,255,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded flex items-center justify-center font-orbitron font-black text-xs" style={{ background: 'var(--neon)', color: 'var(--bg-deep)' }}>DZ</div>
                <span className="font-orbitron text-sm font-bold" style={{ color: 'var(--neon)' }}>DAYZ ZONE</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-dim)' }}>Официальный портал сервера DayZ Standalone.</p>
            </div>
            <div>
              <h4 className="font-orbitron text-xs mb-3" style={{ color: 'var(--neon)' }}>НАВИГАЦИЯ</h4>
              {["Главная","Магазин","Карта","Гайды","Правила"].map(l => (
                <p key={l} className="text-xs mb-1.5 cursor-pointer" style={{ color: 'var(--text-dim)' }}>{l}</p>
              ))}
            </div>
            <div>
              <h4 className="font-orbitron text-xs mb-3" style={{ color: 'var(--neon)' }}>СООБЩЕСТВО</h4>
              {[["Users","ВКонтакте"],["MessageCircle","Discord"],["Send","Telegram"]].map(([ic,l]) => (
                <div key={l} className="flex items-center gap-2 text-xs mb-1.5 cursor-pointer" style={{ color: 'var(--text-dim)' }}>
                  <Icon name={ic} size={12} style={{ color: 'var(--neon)' }} />{l}
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-orbitron text-xs mb-3" style={{ color: 'var(--neon)' }}>ПОДДЕРЖКА</h4>
              {["Открыть тикет","Подать жалобу","Вопрос-ответ","Связаться с адм."].map(l => (
                <p key={l} className="text-xs mb-1.5 cursor-pointer" style={{ color: 'var(--text-dim)' }}>{l}</p>
              ))}
            </div>
          </div>
          <div className="cyber-divider mb-4" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="font-mono-tech text-xs" style={{ color: 'var(--text-dim)' }}>© 2026 DAYZ ZONE. Все права защищены.</p>
            <p className="text-xs" style={{ color: 'var(--text-dim)' }}>DayZ является торговой маркой Bohemia Interactive.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
