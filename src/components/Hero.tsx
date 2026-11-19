import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Truck,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

interface HeroProps {
  onExplorePromos: () => void;
  onExploreLocation: () => void;
}

export function Hero({ onExplorePromos, onExploreLocation }: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-zinc-200 bg-[#FAF8F5] text-zinc-900 transition-colors duration-300 dark:border-white/10 dark:bg-[#09090B] dark:text-white"
    >
      {/* Full-bleed atmospheric background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-sushi.jpg"
          alt="Kaizen Sushi Nikkei"
          className="h-full w-full scale-105 object-cover object-center opacity-20 dark:opacity-45 transition-opacity duration-300"
        />
        {/* Light mode overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/80 to-[#FAF8F5] dark:from-black/75 dark:via-black/60 dark:to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/75 to-transparent dark:from-black/90 dark:via-black/65 dark:to-transparent" />
      </div>

      {/* Decorative Japanese Kanji Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-6 hidden select-none font-jp text-[130px] font-black leading-none text-red-600/[0.08] dark:text-red-600/[0.12] lg:block"
      >
        改善
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Mascot Pill */}
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-red-500/35 bg-white/90 py-1.5 pl-2 pr-4 shadow-sm backdrop-blur-md dark:border-red-500/40 dark:bg-black/65">
              <div className="h-7 w-7 overflow-hidden rounded-full bg-white p-0.5 shadow-sm">
                <img
                  src="/images/logo-mascot.jpg"
                  alt="Mascota Kaizen Sushi"
                  className="h-full w-full object-cover object-left"
                />
              </div>
              <span className="text-xs font-semibold tracking-wide text-zinc-800 dark:text-zinc-100">
                <span className="text-red-600 dark:text-red-400">Isla de Margarita</span> ·{' '}
                {BUSINESS_INFO.handle}
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
              Sushi Nikkei &amp; Rolls Especiales{' '}
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent dark:from-red-500 dark:via-rose-400 dark:to-amber-300">
                hechos al momento
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-200 sm:text-base">
              Arma tus promos favoritas, personaliza tus salsas y envía tu pedido directo a nuestro
              WhatsApp en segundos con ubicación por Google Maps.
            </p>

            {/* Quick Info Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-700 dark:text-zinc-100">
              <button
                type="button"
                onClick={onExploreLocation}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md transition hover:border-red-500/60 dark:border-white/15 dark:bg-black/55 cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                <span>{BUSINESS_INFO.locationShort}</span>
              </button>
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-black/55">
                <Clock className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                <span>{BUSINESS_INFO.hoursShort}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-black/55">
                <Truck className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                <span>Delivery &amp; Pick Up</span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExplorePromos}
                className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500 active:scale-95 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                Ver Promos desde $7.99
              </button>

              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white/90 px-5 py-3.5 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur-md transition hover:border-red-500 hover:text-red-600 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-red-400 dark:hover:bg-red-600/20"
              >
                <MapPin className="h-4 w-4 text-red-600 dark:text-red-400" />
                Cómo llegar (Maps)
              </a>
            </div>

            {/* Highly Visible Social & Contact Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-zinc-200/80 pt-5 dark:border-white/10">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-pink-500/35 bg-gradient-to-r from-pink-600/15 to-purple-600/15 px-3.5 py-2 text-xs font-bold text-pink-700 backdrop-blur-md transition hover:from-pink-600/25 hover:to-purple-600/25 dark:border-pink-500/40 dark:from-pink-600/25 dark:to-purple-600/25 dark:text-white"
              >
                <Instagram className="h-4 w-4 text-pink-600 dark:text-pink-300" />
                {BUSINESS_INFO.handle}
              </a>

              <a
                href={BUSINESS_INFO.whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-600/15 px-3.5 py-2 text-xs font-bold text-emerald-700 backdrop-blur-md transition hover:bg-emerald-600/25 dark:border-emerald-500/40 dark:bg-emerald-600/25 dark:text-white"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                WhatsApp {BUSINESS_INFO.displayPhone}
              </a>

              <a
                href={`tel:${BUSINESS_INFO.whatsappPhone}`}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/90 px-3.5 py-2 text-xs font-semibold text-zinc-700 backdrop-blur-md transition hover:border-zinc-300 dark:border-white/15 dark:bg-white/10 dark:text-zinc-100 dark:hover:bg-white/20"
              >
                <Phone className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                Llamar
              </a>
            </div>
          </div>

          {/* Right Highlight Card (Mascot + Payment methods) */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-black/75 dark:shadow-2xl">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-600/15 blur-2xl dark:bg-red-600/25" />

              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-md animate-float-slow dark:border-white/20">
                  <img
                    src="/images/logo-mascot.jpg"
                    alt="Kaizen Chef Mascot"
                    className="h-full w-full object-cover object-left"
                  />
                </div>
                <div>
                  <span className="font-jp text-xs font-bold tracking-widest text-red-600 dark:text-red-400">
                    メニュー · MENÚ DIGITAL
                  </span>
                  <h2 className="mt-0.5 font-display text-lg font-bold text-zinc-900 dark:text-white">
                    Aceptamos todos los pagos
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-300">
                    Pide online y paga al confirmar
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {BUSINESS_INFO.paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold ${pm.accent}`}
                  >
                    <div>{pm.label}</div>
                    <div className="text-[10px] opacity-80">{pm.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
