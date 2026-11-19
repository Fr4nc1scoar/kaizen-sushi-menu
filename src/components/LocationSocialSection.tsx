import {
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export function LocationSocialSection() {
  return (
    <section id="section-ubicacion" className="scroll-mt-36 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1.5 rounded-full bg-red-600" />
          <h2 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white sm:text-3xl">
            Ubicación y Redes Sociales
          </h2>
          <span className="font-jp text-lg font-bold text-red-600/70 dark:text-red-500/70">
            場所
          </span>
        </div>
        <p className="mt-1 pl-3.5 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
          Visítanos para Pick Up en La Arboleda o pide Delivery en toda la isla
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Interactive Google Maps Card */}
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#131317] lg:col-span-7">
          <div className="relative h-64 w-full sm:h-80">
            <iframe
              title="Ubicación exacta Kaizen Sushi MGTA"
              src={BUSINESS_INFO.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-500" />
              <div>
                <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                  Kaizen Sushi MGTA · Juanpizza
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  La Arboleda - Av. Francisco Esteban Gómez, Isla de Margarita
                </p>
              </div>
            </div>

            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-red-600/20 transition hover:bg-red-500"
            >
              Abrir en Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Social Media, Hours & Payments Card */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#131317] lg:col-span-5">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-white/15">
                <img
                  src="/images/logo-mascot.jpg"
                  alt="Kaizen Sushi"
                  className="h-full w-full object-cover object-left"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-extrabold text-zinc-900 dark:text-white">
                  Conecta con Kaizen
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Síguenos para promos diarias y novedades
                </p>
              </div>
            </div>

            {/* Big Social Buttons */}
            <div className="grid gap-2.5">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 px-4 py-3 text-white shadow-md transition hover:opacity-95"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5" />
                  <div>
                    <div className="text-xs font-extrabold">Instagram Oficial</div>
                    <div className="text-[11px] text-white/85">
                      {BUSINESS_INFO.handle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 opacity-85" />
              </a>

              <a
                href={BUSINESS_INFO.whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-md transition hover:bg-emerald-500"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5" />
                  <div>
                    <div className="text-xs font-extrabold">WhatsApp Directo</div>
                    <div className="text-[11px] text-white/85">
                      {BUSINESS_INFO.displayPhone} · Delivery &amp; Pick Up
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 opacity-85" />
              </a>

              <a
                href={`tel:${BUSINESS_INFO.whatsappPhone}`}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 transition hover:border-red-500/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100"
              >
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <div>
                    <div className="text-xs font-bold">Llamada Directa</div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {BUSINESS_INFO.displayPhone}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Hours + Payment Summary */}
          <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span>Miércoles a Lunes: 3:00 PM – 10:00 PM (Martes cerrado)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {BUSINESS_INFO.paymentMethods.map((pm) => (
                <span
                  key={pm.id}
                  className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold ${pm.accent}`}
                >
                  {pm.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
