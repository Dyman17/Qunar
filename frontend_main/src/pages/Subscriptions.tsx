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

const Subscriptions = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-16">
      <section className="bg-hero-gradient">
        <div className="container py-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">
              Subscription model
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
              Подписка = аренда фермы
            </h1>
            <p className="text-lg text-muted-foreground">
              Вы арендуете место на нашей ферме на месяц, управляете растениями через платформу, а семена и растения покупаете отдельно.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/register">Подключиться</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:hello@qunar.farm">Связаться</a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-card shadow-elevated p-6 space-y-4">
            <h3 className="font-semibold text-lg">Что входит в подписку</h3>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div className="rounded-lg border p-4">Доступ к управлению фермерским участком.</div>
              <div className="rounded-lg border p-4">Сенсоры, аналитика и отчеты в реальном времени.</div>
              <div className="rounded-lg border p-4">AI-советы и автоматизации по тарифу.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50/70" id="pricing">
        <div className="container">
          <div className="flex flex-col gap-3 mb-8">
            <h2 className="text-3xl font-bold">Тарифы Qunar - аренда фермы по подписке</h2>
            <p className="text-muted-foreground">
              Растения и семена оплачиваются отдельно, подписка дает доступ к управлению и сервисам.
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
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Subscriptions;
