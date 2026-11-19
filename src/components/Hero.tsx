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
      className="relative overflow-hidden border-b border-zinc-200 bg-[#111114] text-white dark:border-white/10 dark:bg-[#09090B]"
    >
      {/* Full-bleed atmospheric background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-sushi.jpg"
          alt="Kaizen Sushi Nikkei"
          className="h-full w-full object-cover object-center opacity-45 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-transparent" />
      </div>

      {/* Decorative Japanese Kanji Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-6 hidden select-none font-jp text-[130px] font-black leading-none text-red-600/[0.12] lg:block"
      >
        改善
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Mascot Pill */}
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-red-500/40 bg-black/65 py-1.5 pl-2 pr-4 backdrop-blur-md">
              <div className="h-7 w-7 overflow-hidden rounded-full bg-white p-0.5">
                <img
                  src="/images/logo-mascot.jpg"
                  alt="Mascota Kaizen Sushi"
                  className="h-full w-full object-cover object-left"
                />
              </div>
              <span className="text-xs font-semibold tracking-wide text-zinc-100">
                <span className="text-red-400">Isla de Margarita</span> · {BUSINESS_INFO.handle}
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Sushi Nikkei &amp; Rolls Especiales{' '}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                hechos al momento
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-200 sm:text-base">
              Arma tus promos favoritas, personaliza tus salsas y envía tu pedido directo a nuestro
              WhatsApp en segundos con ubicación por Google Maps.
            </p>

            {/* Quick Info Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-100">
              <button
                type="button"
                onClick={onExploreLocation}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-md transition hover:border-red-500/60 cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                <span>{BUSINESS_INFO.locationShort}</span>
              </button>
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-md">
                <Clock className="h-3.5 w-3.5 text-red-400" />
                <span>{BUSINESS_INFO.hoursShort}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-md">
                <Truck className="h-3.5 w-3.5 text-red-400" />
                <span>Delivery &amp; Pick Up</span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExplorePromos}
                className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/30 transition hover:bg-red-500 active:scale-95 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                Ver Promos desde $7.99
              </button>

              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-red-400 hover:bg-red-600/20"
              >
                <MapPin className="h-4 w-4 text-red-400" />
                Cómo llegar (Maps)
              </a>
            </div>

            {/* Highly Visible Social & Contact Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-5">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-pink-500/40 bg-gradient-to-r from-pink-600/25 to-purple-600/25 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md transition hover:from-pink-600/40 hover:to-purple-600/40"
              >
                <Instagram className="h-4 w-4 text-pink-300" />
                {BUSINESS_INFO.handle}
              </a>

              <a
                href={BUSINESS_INFO.whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/25 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md transition hover:bg-emerald-600/40"
              >
                <MessageCircle className="h-4 w-4 text-emerald-300" />
                WhatsApp {BUSINESS_INFO.displayPhone}
              </a>

              <a
                href={`tel:${BUSINESS_INFO.whatsappPhone}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-100 backdrop-blur-md transition hover:bg-white/20"
              >
                <Phone className="h-3.5 w-3.5 text-amber-300" />
                Llamar
              </a>
            </div>
          </div>

          {/* Right Highlight Card (Mascot + Payment methods) */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/75 p-5 shadow-2xl backdrop-blur-xl">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-600/25 blur-2xl" />

              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white p-1 shadow-lg animate-float-slow">
                  <img
                    src="/images/logo-mascot.jpg"
                    alt="Kaizen Chef Mascot"
                    className="h-full w-full object-cover object-left"
                  />
                </div>
                <div>
                  <span className="font-jp text-xs font-bold tracking-widest text-red-400">
                    メニュー · MENÚ DIGITAL
                  </span>
                  <h2 className="mt-0.5 font-display text-lg font-bold text-white">
                    Aceptamos todos los pagos
                  </h2>
                  <p className="text-xs text-zinc-300">
                    Pide online y paga al confirmar
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {BUSINESS_INFO.paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white"
                  >
                    <div>{pm.label}</div>
                    <div className="text-[10px] text-zinc-300">{pm.sub}</div>
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
