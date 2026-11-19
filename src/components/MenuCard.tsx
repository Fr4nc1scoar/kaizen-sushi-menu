import { Flame, Plus, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export function MenuCard({ item, onSelect, onQuickAdd }: MenuCardProps) {
  const needsCustomization = Boolean(
    item.sauceOptions && item.sauceOptions.length > 0
  );

  return (
    <article
      onClick={() => onSelect(item)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-red-500/50 hover:shadow-lg dark:border-white/10 dark:bg-[#131317] dark:hover:border-red-500/45 dark:hover:bg-[#17171C] dark:hover:shadow-black/40 cursor-pointer"
    >
      <div className="flex gap-3.5">
        {/* Text Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-1.5">
            {item.badge && (
              <span
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  item.badge.includes('VIP')
                    ? 'border border-amber-500/35 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                    : item.badge.includes('Spicy')
                    ? 'border border-orange-500/35 bg-orange-500/15 text-orange-700 dark:text-orange-300'
                    : item.badge.includes('Sin Arroz') ||
                      item.badge.includes('Keto')
                    ? 'border border-emerald-500/35 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                    : 'border border-red-500/35 bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400'
                }`}
              >
                {item.badge.includes('Spicy') && (
                  <Flame className="h-2.5 w-2.5" />
                )}
                {item.badge.includes('VIP') && (
                  <Sparkles className="h-2.5 w-2.5" />
                )}
                {item.badge}
              </span>
            )}
            {item.tags.includes('sin-arroz') &&
              !item.badge?.includes('Sin Arroz') && (
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                  Sin Arroz
                </span>
              )}
          </div>

          <h3 className="mt-1.5 font-display text-base font-bold text-zinc-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 sm:text-lg">
            {item.name}
          </h3>

          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>
        </div>

        {/* Thumbnail */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-black sm:h-28 sm:w-28">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Footer: Price & Quick Add */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-white/5">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-lg font-extrabold text-zinc-900 dark:text-white">
            {formatPrice(item.price)}
          </span>
          {needsCustomization && (
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
              · +1 salsa incluida
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (needsCustomization) {
              onSelect(item);
            } else {
              onQuickAdd(item);
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-600/10 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white active:scale-95 dark:bg-red-600/15 dark:text-red-400 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          {needsCustomization ? 'Elegir Salsa' : 'Agregar'}
        </button>
      </div>
    </article>
  );
}
