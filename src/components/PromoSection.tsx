import { Flame, Plus, Sparkles } from 'lucide-react';
import { PROMO_ITEMS } from '../data/menuData';
import { PromoItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface PromoSectionProps {
  onSelectPromo: (promo: PromoItem) => void;
}

export function PromoSection({ onSelectPromo }: PromoSectionProps) {
  return (
    <section id="section-promos" className="scroll-mt-36 py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500">
            <Flame className="h-3.5 w-3.5" />
            <span>Combos Especiales</span>
            <span className="font-jp text-zinc-400 dark:text-zinc-500">· お得</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-zinc-900 dark:text-white sm:text-3xl">
            Promos Kaizen
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
            Toca cualquier promo para elegir tus rolls favoritos
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PROMO_ITEMS.map((promo) => (
          <article
            key={promo.id}
            onClick={() => onSelectPromo(promo)}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 cursor-pointer ${
              promo.highlight
                ? 'border-red-500/60 bg-gradient-to-b from-red-50 via-white to-white shadow-xl shadow-red-900/10 hover:border-red-500 dark:from-red-950/35 dark:via-[#141418] dark:to-[#111115] dark:shadow-red-950/30 dark:hover:border-red-400'
                : 'border-zinc-200 bg-white shadow-sm hover:border-red-500/50 hover:shadow-md dark:border-white/10 dark:bg-[#131317] dark:hover:border-red-500/40'
            }`}
          >
            {/* Image Header */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={promo.image}
                alt={promo.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              {/* Top Badge */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wider ${
                    promo.highlight
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/40'
                      : 'border border-white/15 bg-black/75 text-zinc-100 backdrop-blur-md'
                  }`}
                >
                  {promo.highlight && <Sparkles className="h-3 w-3" />}
                  {promo.badge}
                </span>
                <span className="rounded-full border border-amber-400/25 bg-black/75 px-2.5 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-md">
                  {promo.pieces} PIEZAS
                </span>
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-3 right-3 rounded-2xl border border-red-500/40 bg-black/85 px-3.5 py-1.5 backdrop-blur-md">
                <span className="font-display text-xl font-black text-white">
                  {formatPrice(promo.price)}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div>
                <h3 className="font-display text-xl font-extrabold text-zinc-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
                  {promo.name}
                </h3>
                <p className="mt-0.5 text-xs font-bold text-red-600 dark:text-red-400">
                  {promo.tagline}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {promo.description}
                </p>

                {/* Preview chips of eligible rolls */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {promo.eligibleRolls.slice(0, 4).map((roll) => (
                    <span
                      key={roll}
                      className="rounded-lg border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                    >
                      {roll}
                    </span>
                  ))}
                  {promo.eligibleRolls.length > 4 && (
                    <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                      +{promo.eligibleRolls.length - 4} más
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-2.5 text-xs font-bold text-white shadow-md shadow-red-600/20 transition group-hover:bg-red-500"
              >
                <Plus className="h-4 w-4" />
                Elegir {promo.maxSelections}{' '}
                {promo.maxSelections === 1 ? 'Roll' : 'Rolls'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
