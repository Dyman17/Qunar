import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Sprout,
  Droplets,
  Monitor,
  Bot,
  Activity,
  Camera,
  BookOpen,
  BarChart3,
  Zap,
  FileText,
  BadgeCheck,
  Cpu,
  LineChart,
  Truck,
  Building2,
  Clock3,
  ShieldAlert,
  TrendingUp,
  Globe2,
  Leaf,
  Gamepad2,
  ArrowRight,
} from "lucide-react";

const Feature = ({
  icon: Icon,
  children,
  tone = "default",
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  tone?: "default" | "light";
}) => {
  const iconClass = tone === "light" ? "text-emerald-100" : "text-emerald-600";
  const textClass = tone === "light" ? "text-emerald-50" : "text-muted-foreground";
  return (
    <li className={`flex items-start gap-2 ${textClass}`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} />
      <span>{children}</span>
    </li>
  );
};

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-16">
      <section className="bg-hero-gradient">
        <div className="container py-24 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">
              Агротех + Игры + ПродТех
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary">
              Qunar - Выращивай настоящую еду через игру
            </h1>
            <p className="text-lg text-muted-foreground">
              Управляй реальным садом с телефона. Сажай семена, поливай урожай, отслеживай рост и получай урожай домой.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/register">Попробовать демо</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="#demo">Смотреть видео</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#waitlist">Присоединиться</a>
              </Button>
            </div>
          </div>
          <div className="bg-card shadow-elevated rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-lg">How it feels</h3>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div className="rounded-lg border p-4">Play a farming game that controls a real greenhouse.</div>
              <div className="rounded-lg border p-4">Sensors and cameras stream live data into your dashboard.</div>
              <div className="rounded-lg border p-4">Harvest is delivered to your home.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="problem">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 text-xs px-3 py-1">
                Problem
              </div>
              <h2 className="text-3xl font-bold">Why growing food became difficult</h2>
              <p className="text-muted-foreground">
                Cities grew faster than gardens. Time shrank, and transparency disappeared.
              </p>
              <div className="grid gap-4">
                <div className="rounded-2xl bg-card shadow-card p-4 flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">No land in cities</div>
                    <p className="text-sm text-muted-foreground">People live in cities and have no land to grow food.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-card shadow-card p-4 flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">No time for farming</div>
                    <p className="text-sm text-muted-foreground">Modern life leaves no time for hands-on care.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-card shadow-card p-4 flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">No transparency</div>
                    <p className="text-sm text-muted-foreground">Users want to know how their food is produced.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-emerald-600 text-white p-6 shadow-elevated">
                <div className="text-xs uppercase text-emerald-100">Macro trends</div>
                <div className="text-lg font-semibold">Three signals prove the timing is right.</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    Market growth
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Smart agriculture market is growing fast.</p>
                </div>
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Globe2 className="h-4 w-4" />
                    Urbanization
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Urbanization is increasing globally.</p>
                </div>
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Leaf className="h-4 w-4" />
                    Organic demand
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Demand for organic, traceable food keeps rising.</p>
                </div>
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <BadgeCheck className="h-4 w-4" />
                    Trust gap
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Consumers want verified data and transparency.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50/70" id="solution">
        <div className="container grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 text-emerald-700 text-xs px-3 py-1">
              Solution
            </div>
            <h2 className="text-3xl font-bold">Qunar connects the digital world with real farming</h2>
            <p className="text-muted-foreground">
              Users grow real vegetables remotely through a game interface. Every action in the game controls real hardware.
            </p>
            <div className="rounded-2xl bg-white/80 border border-emerald-100 p-4 text-sm text-muted-foreground">
              Аренда фермы дает доступ к управлению, а семена и растения покупаются отдельно.
            </div>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-5 top-2 bottom-2 w-px bg-emerald-200" />
            <div className="space-y-4">
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">1</div>
                <div className="rounded-2xl bg-white shadow-card border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Sprout className="h-4 w-4" />
                    Plant seeds in the app
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Choose crops and start your remote plot.</p>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">2</div>
                <div className="rounded-2xl bg-white shadow-card border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Droplets className="h-4 w-4" />
                    Water plants through the game
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Automations and manual actions sync with hardware.</p>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">3</div>
                <div className="rounded-2xl bg-white shadow-card border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Activity className="h-4 w-4" />
                    Sensors monitor the environment
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Soil and climate data stream into your dashboard.</p>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">4</div>
                <div className="rounded-2xl bg-white shadow-card border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Camera className="h-4 w-4" />
                    Camera shows plant growth
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Live photos and time-lapses prove progress.</p>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">5</div>
                <div className="rounded-2xl bg-white shadow-card border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Truck className="h-4 w-4" />
                    Harvest delivered to your home
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Fresh, traceable produce shipped to you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="technology">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
            <h2 className="text-3xl font-bold">How the technology works</h2>
            <div className="text-sm text-muted-foreground">Hardware, software, and AI in one loop.</div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-card shadow-card p-6 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Cpu className="h-5 w-5" />
                IoT Farm
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                ESP32 sensors, soil moisture, temperature, automated irrigation.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 text-xs text-muted-foreground">
                <span className="rounded-full bg-emerald-50 px-2 py-1">ESP32</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Moisture</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Irrigation</span>
              </div>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-6 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Gamepad2 className="h-5 w-5" />
                Game Platform
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Unity 3D simulation, notifications, interactive planting.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 text-xs text-muted-foreground">
                <span className="rounded-full bg-emerald-50 px-2 py-1">Unity 3D</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Gameplay</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Alerts</span>
              </div>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-6 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Bot className="h-5 w-5" />
                AI Assistant
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Plant care advice, tips, and gamified NPC guidance.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 text-xs text-muted-foreground">
                <span className="rounded-full bg-emerald-50 px-2 py-1">Recommendations</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Forecasts</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Guidance</span>
              </div>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-6 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Camera className="h-5 w-5" />
                Live Monitoring
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Camera stream, growth photos, sensor charts.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 text-xs text-muted-foreground">
                <span className="rounded-full bg-emerald-50 px-2 py-1">Live feed</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Charts</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">History</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-white" id="game">
        <div className="container space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl bg-card shadow-card p-6 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Gamepad2 className="h-5 w-5" />
                Game Experience
              </div>
              <p className="text-muted-foreground mt-3">Play, grow, and monitor your crops like a real farmer.</p>
              <div className="grid gap-3 mt-5 text-sm">
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                  <Sprout className="h-4 w-4 text-emerald-600" />
                  Buy your garden plot
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  Plant seeds and track growth
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                  <Droplets className="h-4 w-4 text-emerald-600" />
                  Water plants through gameplay
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                  Monitor temperature and soil moisture
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                  <Bot className="h-4 w-4 text-emerald-600" />
                  Chat with an AI gardener
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5 text-xs text-muted-foreground">
                <span className="rounded-full bg-emerald-50 px-2 py-1">Unity 3D</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Live feedback</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1">Gamified tasks</span>
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-600 text-white shadow-elevated p-6">
              <div className="flex items-center gap-2 text-emerald-100 font-semibold">
                <Cpu className="h-5 w-5" />
                Real Farm System
              </div>
              <p className="text-emerald-50 mt-3">
                Our physical prototype includes soil moisture sensors, temperature sensors, an irrigation pump, phytolamp, and camera monitoring.
              </p>
              <div className="grid gap-3 mt-5 text-sm">
                <div className="rounded-xl bg-emerald-500/40 p-3">Soil moisture sensor</div>
                <div className="rounded-xl bg-emerald-500/40 p-3">Temperature sensor</div>
                <div className="rounded-xl bg-emerald-500/40 p-3">Irrigation pump + phytolamp</div>
                <div className="rounded-xl bg-emerald-500/40 p-3">Camera monitoring</div>
              </div>
              <div className="mt-5 rounded-xl bg-white/15 p-4 text-sm text-emerald-50">
                Connected to cloud server and the game platform for real-time control.
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/90 border border-emerald-100 p-6">
            <div className="text-sm text-muted-foreground mb-3">End-to-end flow</div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-emerald-50 px-3 py-1">Player</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
              <span className="rounded-full bg-emerald-50 px-3 py-1">Unity / AI</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
              <span className="rounded-full bg-emerald-50 px-3 py-1">Cloud</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
              <span className="rounded-full bg-emerald-50 px-3 py-1">Greenhouse</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
              <span className="rounded-full bg-emerald-50 px-3 py-1">Data + Harvest</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50/70" id="business">
        <div className="container">
          <div className="flex flex-col gap-3 mb-8">
            <h2 className="text-3xl font-bold">Тарифы Qunar - аренда фермы по подписке</h2>
            <p className="text-muted-foreground">
              Принцип: вы арендуете место на нашей ферме на месяц, управляете растениями через платформу, а семена и растения покупаете отдельно.
            </p>
            <div className="rounded-xl bg-white/70 border border-emerald-100 p-4 text-sm text-muted-foreground">
              Важно: растения и семена оплачиваются отдельно от подписки.
            </div>
          </div>
          <div className="md:hidden space-y-4">
            <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Simple</div>
                  <div className="text-lg font-semibold">4 990 ₸ / мес</div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-2 py-1">Entry</span>
              </div>
              <p className="text-sm text-muted-foreground">Малые эксперименты</p>
              <ul className="space-y-2 text-sm">
                <Feature icon={Sprout}>Аренда до 3 культур</Feature>
                <Feature icon={Droplets}>Базовые датчики: влажность и температура</Feature>
                <Feature icon={Monitor}>Онлайн-мониторинг</Feature>
                <Feature icon={Bot}>AI-советы по уходу</Feature>
              </ul>
              <Button className="w-full" asChild>
                <Link to="/register">Подключиться</Link>
              </Button>
            </div>

            <div className="rounded-2xl bg-emerald-600 text-white p-5 shadow-elevated space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase text-emerald-100">Standard</div>
                  <div className="text-xl font-semibold">9 990 ₸ / мес</div>
                </div>
                <span className="rounded-full bg-white text-emerald-700 text-xs px-2 py-1">Best value</span>
              </div>
              <p className="text-sm text-emerald-100">Активные пользователи</p>
              <ul className="space-y-2 text-sm">
                <Feature icon={Sprout} tone="light">Аренда до 4 культур</Feature>
                <Feature icon={Activity} tone="light">Расширенные датчики</Feature>
                <Feature icon={Camera} tone="light">Фотораспознавание болезней</Feature>
                <Feature icon={BookOpen} tone="light">Дневник роста и графики</Feature>
                <Feature icon={BarChart3} tone="light">Аналитика температуры и влажности</Feature>
                <Feature icon={Bot} tone="light">AI-советы и прогноз урожая</Feature>
                <Feature icon={Zap} tone="light">1 автоматизация (автополив)</Feature>
              </ul>
              <Button className="w-full" variant="secondary" asChild>
                <Link to="/register">Подключиться</Link>
              </Button>
            </div>

            <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Premium</div>
                  <div className="text-lg font-semibold">19 990 ₸ / мес</div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-2 py-1">Advanced</span>
              </div>
              <p className="text-sm text-muted-foreground">Крупные участки</p>
              <ul className="space-y-2 text-sm">
                <Feature icon={Sprout}>Аренда до 5 культур</Feature>
                <Feature icon={Activity}>Расширенные датчики</Feature>
                <Feature icon={FileText}>История данных и отчеты</Feature>
                <Feature icon={Zap}>2 автоматизации</Feature>
                <Feature icon={Bot}>AI-советы и прогноз урожая</Feature>
                <Feature icon={BadgeCheck}>Приоритетная поддержка</Feature>
              </ul>
              <Button className="w-full" asChild>
                <Link to="/register">Подключиться</Link>
              </Button>
            </div>

            <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Pro</div>
                  <div className="text-lg font-semibold">39 990 ₸ / мес</div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-2 py-1">Pro farms</span>
              </div>
              <p className="text-sm text-muted-foreground">Профессиональные фермеры</p>
              <ul className="space-y-2 text-sm">
                <Feature icon={Sprout}>Неограниченно культур</Feature>
                <Feature icon={Cpu}>Полный набор датчиков</Feature>
                <Feature icon={LineChart}>AI-аналитика и прогноз рисков</Feature>
                <Feature icon={FileText}>Детальные отчеты</Feature>
                <Feature icon={Zap}>Автоматизация без лимита</Feature>
                <Feature icon={Truck}>Бесплатная доставка оборудования</Feature>
              </ul>
              <Button className="w-full" asChild>
                <Link to="/register">Подключиться</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[980px] border-separate border-spacing-0">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="text-left p-4">Тариф</th>
                  <th className="text-left p-4">Цена / мес</th>
                  <th className="text-left p-4">Подходит для</th>
                  <th className="text-left p-4">Основные функции</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-4 align-top border-t">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Simple</span>
                      <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-2 py-1">Entry</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Малые эксперименты</div>
                  </td>
                  <td className="p-4 align-top border-t">
                    <div className="text-xl font-bold">4 990 ₸</div>
                    <Button size="sm" className="mt-3" asChild>
                      <Link to="/register">Подключиться</Link>
                    </Button>
                  </td>
                  <td className="p-4 align-top border-t text-muted-foreground">Дешевый вход в продукт.</td>
                  <td className="p-4 align-top border-t">
                    <ul className="space-y-2 text-sm">
                      <Feature icon={Sprout}>Аренда до 3 культур</Feature>
                      <Feature icon={Droplets}>Базовые датчики: влажность и температура</Feature>
                      <Feature icon={Monitor}>Онлайн-мониторинг</Feature>
                      <Feature icon={Bot}>AI-советы по уходу</Feature>
                    </ul>
                  </td>
                </tr>

                <tr className="bg-emerald-600 text-white">
                  <td className="p-4 align-top border-t border-emerald-500/40">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Standard</span>
                      <span className="rounded-full bg-white text-emerald-700 text-xs px-2 py-1">Best value</span>
                    </div>
                    <div className="text-sm text-emerald-100">Активные пользователи</div>
                  </td>
                  <td className="p-4 align-top border-t border-emerald-500/40">
                    <div className="text-2xl font-bold">9 990 ₸</div>
                    <Button size="sm" variant="secondary" className="mt-3" asChild>
                      <Link to="/register">Подключиться</Link>
                    </Button>
                  </td>
                  <td className="p-4 align-top border-t border-emerald-500/40 text-emerald-100">
                    Реальная аналитика и контроль.
                  </td>
                  <td className="p-4 align-top border-t border-emerald-500/40">
                    <ul className="space-y-2 text-sm">
                      <Feature icon={Sprout} tone="light">Аренда до 4 культур</Feature>
                      <Feature icon={Activity} tone="light">Расширенные датчики</Feature>
                      <Feature icon={Camera} tone="light">Фотораспознавание болезней</Feature>
                      <Feature icon={BookOpen} tone="light">Дневник роста и графики</Feature>
                      <Feature icon={BarChart3} tone="light">Аналитика температуры и влажности</Feature>
                      <Feature icon={Bot} tone="light">AI-советы и прогноз урожая</Feature>
                      <Feature icon={Zap} tone="light">1 автоматизация (автополив)</Feature>
                    </ul>
                  </td>
                </tr>

                <tr className="bg-white">
                  <td className="p-4 align-top border-t">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Premium</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Крупные участки</div>
                  </td>
                  <td className="p-4 align-top border-t">
                    <div className="text-xl font-bold">19 990 ₸</div>
                    <Button size="sm" className="mt-3" asChild>
                      <Link to="/register">Подключиться</Link>
                    </Button>
                  </td>
                  <td className="p-4 align-top border-t text-muted-foreground">Почти полный контроль.</td>
                  <td className="p-4 align-top border-t">
                    <ul className="space-y-2 text-sm">
                      <Feature icon={Sprout}>Аренда до 5 культур</Feature>
                      <Feature icon={Activity}>Расширенные датчики</Feature>
                      <Feature icon={FileText}>История данных и отчеты</Feature>
                      <Feature icon={Zap}>2 автоматизации</Feature>
                      <Feature icon={Bot}>AI-советы и прогноз урожая</Feature>
                      <Feature icon={BadgeCheck}>Приоритетная поддержка</Feature>
                    </ul>
                  </td>
                </tr>

                <tr className="bg-white">
                  <td className="p-4 align-top border-t">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Pro</span>
                      <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-2 py-1">Pro farms</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Профессиональные фермеры</div>
                  </td>
                  <td className="p-4 align-top border-t">
                    <div className="text-xl font-bold">39 990 ₸</div>
                    <Button size="sm" className="mt-3" asChild>
                      <Link to="/register">Подключиться</Link>
                    </Button>
                  </td>
                  <td className="p-4 align-top border-t text-muted-foreground">Полный контроль и масштаб.</td>
                  <td className="p-4 align-top border-t">
                    <ul className="space-y-2 text-sm">
                      <Feature icon={Sprout}>Неограниченно культур</Feature>
                      <Feature icon={Cpu}>Полный набор датчиков</Feature>
                      <Feature icon={LineChart}>AI-аналитика и прогноз рисков</Feature>
                      <Feature icon={FileText}>Детальные отчеты</Feature>
                      <Feature icon={Zap}>Автоматизация без лимита</Feature>
                      <Feature icon={Truck}>Бесплатная доставка оборудования</Feature>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-2xl bg-white/80 border border-emerald-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <h3 className="text-xl font-semibold">Как это работает</h3>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 text-xs px-3 py-1">
                <BadgeCheck className="h-4 w-4" />
                Аренда фермы + семена отдельно
              </div>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-emerald-200" />
              <div className="grid gap-4 md:grid-cols-5 text-sm">
                <div className="relative rounded-2xl bg-white p-4 shadow-card border border-emerald-100">
                  <div className="absolute -top-3 left-4 rounded-full bg-emerald-600 text-white text-xs font-bold px-2 py-1 shadow-card">
                    1
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <BadgeCheck className="h-4 w-4" />
                    Выбор тарифа
                  </div>
                  <p className="mt-2 text-muted-foreground">Вы выбираете тариф и арендуете место на ферме.</p>
                </div>
                <div className="relative rounded-2xl bg-white p-4 shadow-card border border-emerald-100">
                  <div className="absolute -top-3 left-4 rounded-full bg-emerald-600 text-white text-xs font-bold px-2 py-1 shadow-card">
                    2
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Sprout className="h-4 w-4" />
                    Покупка семян
                  </div>
                  <p className="mt-2 text-muted-foreground">Покупаете семена или саженцы через сервис.</p>
                </div>
                <div className="relative rounded-2xl bg-white p-4 shadow-card border border-emerald-100">
                  <div className="absolute -top-3 left-4 rounded-full bg-emerald-600 text-white text-xs font-bold px-2 py-1 shadow-card">
                    3
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Monitor className="h-4 w-4" />
                    Управление в игре
                  </div>
                  <p className="mt-2 text-muted-foreground">Контролируете растения через игру или Unity-интерфейс.</p>
                </div>
                <div className="relative rounded-2xl bg-white p-4 shadow-card border border-emerald-100">
                  <div className="absolute -top-3 left-4 rounded-full bg-emerald-600 text-white text-xs font-bold px-2 py-1 shadow-card">
                    4
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <LineChart className="h-4 w-4" />
                    Отчеты и прогнозы
                  </div>
                  <p className="mt-2 text-muted-foreground">Получаете отчеты, фото и прогнозы роста.</p>
                </div>
                <div className="relative rounded-2xl bg-white p-4 shadow-card border border-emerald-100">
                  <div className="absolute -top-3 left-4 rounded-full bg-emerald-600 text-white text-xs font-bold px-2 py-1 shadow-card">
                    5
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Truck className="h-4 w-4" />
                    Доставка урожая
                  </div>
                  <p className="mt-2 text-muted-foreground">Урожай доставляется к вам домой.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="market">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 text-xs px-3 py-1">
                Market Opportunity
              </div>
              <h2 className="text-3xl font-bold">Smart agriculture meets gaming scale</h2>
              <p className="text-muted-foreground">
                Smart agriculture is growing, the game industry keeps expanding, and demand for transparent food is rising.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-200 px-3 py-1 text-xs text-muted-foreground">Agrotech</span>
                <span className="rounded-full border border-emerald-200 px-3 py-1 text-xs text-muted-foreground">Gaming</span>
                <span className="rounded-full border border-emerald-200 px-3 py-1 text-xs text-muted-foreground">FoodTech</span>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-emerald-600 text-white p-6 shadow-elevated">
                <div className="text-xs uppercase text-emerald-100">Position</div>
                <div className="text-lg font-semibold">Qunar sits between Agrotech, Gaming, and FoodTech.</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <LineChart className="h-4 w-4" />
                    Growth
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Rising demand for smart agriculture and automation.</p>
                </div>
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Activity className="h-4 w-4" />
                    Engagement
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Gaming habits make remote farming intuitive.</p>
                </div>
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <BadgeCheck className="h-4 w-4" />
                    Transparency
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Consumers want real data about their food.</p>
                </div>
                <div className="rounded-xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Sprout className="h-4 w-4" />
                    Access
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Urban users can grow food without land.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50/70" id="roadmap">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
            <h2 className="text-3xl font-bold">Roadmap</h2>
            <div className="text-sm text-muted-foreground">From prototype to global farming network.</div>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative space-y-6">
              <div className="absolute left-5 top-2 bottom-2 w-px bg-emerald-200" />
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">1</div>
                <div className="rounded-2xl bg-white/90 border border-emerald-100 p-4 shadow-card">
                  <div className="text-xs uppercase text-emerald-700">Stage 1</div>
                  <div className="font-semibold">MVP greenhouse</div>
                  <p className="text-sm text-muted-foreground mt-1">Sensors, irrigation, and live camera prototype.</p>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">2</div>
                <div className="rounded-2xl bg-white/90 border border-emerald-100 p-4 shadow-card">
                  <div className="text-xs uppercase text-emerald-700">Stage 2</div>
                  <div className="font-semibold">Web dashboard</div>
                  <p className="text-sm text-muted-foreground mt-1">Full control center for farms, plants, and sensors.</p>
                </div>
              </div>
            </div>
            <div className="relative space-y-6">
              <div className="absolute left-5 top-2 bottom-2 w-px bg-emerald-200" />
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">3</div>
                <div className="rounded-2xl bg-white/90 border border-emerald-100 p-4 shadow-card">
                  <div className="text-xs uppercase text-emerald-700">Stage 3</div>
                  <div className="font-semibold">Full farm network</div>
                  <p className="text-sm text-muted-foreground mt-1">Multiple farms connected with unified analytics.</p>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">4</div>
                <div className="rounded-2xl bg-white/90 border border-emerald-100 p-4 shadow-card">
                  <div className="text-xs uppercase text-emerald-700">Stage 4</div>
                  <div className="font-semibold">Global remote farming</div>
                  <p className="text-sm text-muted-foreground mt-1">Worldwide access to real farms via the platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="team">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold">Team</h2>
              <p className="text-muted-foreground">Core founders driving Qunar forward.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 text-xs px-3 py-1">
              Founding team
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-card shadow-card p-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">GZ</div>
                <div>
                  <div className="font-semibold">Gulnur Zhumakhan</div>
                  <div className="text-sm text-muted-foreground">Co-founder</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">FT</div>
                <div>
                  <div className="font-semibold">Fariza Turebayeva</div>
                  <div className="text-sm text-muted-foreground">Co-founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50/70" id="waitlist">
        <div className="container text-center space-y-4">
          <h2 className="text-3xl font-bold">Start Growing Your Own Food</h2>
          <p className="text-muted-foreground">Join the beta and get early access to Qunar.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/register">Join Beta</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:hello@qunar.farm">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Index;
