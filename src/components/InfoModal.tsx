import {
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up w-full max-w-md overflow-hidden rounded-t-3xl border border-zinc-200 bg-white shadow-2xl dark:border-white/15 dark:bg-[#121216] sm:rounded-3xl"
      >
        {/* Top banner */}
        <div className="relative flex items-center gap-4 border-b border-zinc-200 bg-gradient-to-r from-red-50 via-white to-white p-5 dark:border-white/10 dark:from-red-950/60 dark:via-[#15151A] dark:to-[#121216]">
          <div className="h-16 w-16 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-md dark:border-white/15">
            <img
              src="/images/logo-mascot.jpg"
              alt="Kaizen Sushi"
              className="h-full w-full object-cover object-left"
            />
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-zinc-900 dark:text-white">
              KAIZEN <span className="text-red-600 dark:text-red-500">SUSHI</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Sushi Nikkei · Isla de Margarita
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar información"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-red-600 hover:text-white dark:border-white/10 dark:bg-black/50 dark:text-zinc-300 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {/* Horario */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              <Clock className="h-4 w-4" />
              Horario de Atención
            </div>
            <div className="space-y-1.5 text-sm">
              {BUSINESS_INFO.hoursDetail.map((row) => (
                <div
                  key={row.days}
                  className="flex items-center justify-between"
                >
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {row.days}
                  </span>
                  <span
                    className={`font-semibold ${
                      row.open
                        ? 'text-zinc-900 dark:text-white'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ubicación */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              <MapPin className="h-4 w-4" />
              Ubicación Exacta · Pick Up &amp; Delivery
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              {BUSINESS_INFO.locationFull}
            </p>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-red-500"
            >
              Abrir en Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Métodos de pago */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="mb-2.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Métodos de Pago Aceptados
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BUSINESS_INFO.paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold ${pm.accent}`}
                >
                  <div>{pm.label}</div>
                  <div className="text-[10px] font-normal opacity-80">
                    {pm.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={BUSINESS_INFO.whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white transition hover:bg-emerald-500"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 py-3 text-xs font-bold text-white transition hover:opacity-90"
            >
              <Instagram className="h-4 w-4" />
              {BUSINESS_INFO.handle}
            </a>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.whatsappPhone}`}
            className="flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            Llamar al {BUSINESS_INFO.displayPhone}
          </a>
        </div>
      </div>
    </div>
  );
}
