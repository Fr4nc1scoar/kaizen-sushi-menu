import { Info, Moon, ShoppingBag, Sun } from 'lucide-react';
import { getStoreOpenStatus } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenInfo: () => void;
}

export function Header({
  cartCount,
  isDark,
  onToggleTheme,
  onOpenCart,
  onOpenInfo,
}: HeaderProps) {
  const status = getStoreOpenStatus();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#09090B]/88">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-red-600/30 bg-black shadow-md transition-transform duration-300 group-hover:scale-105 dark:border-red-600/40 dark:shadow-red-950/30">
            <img
              src="/images/logo-dark.jpg"
              alt="Kaizen Sushi"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-bold tracking-wider text-zinc-900 dark:text-white sm:text-lg">
                KAIZEN <span className="text-red-600 dark:text-red-500">SUSHI</span>
              </span>
              <span className="hidden rounded border border-red-500/30 bg-red-500/10 px-1.5 py-0.5 font-jp text-[10px] text-red-600 dark:text-red-400 sm:inline-block">
                改善
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  status.isOpen
                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                    : 'bg-amber-500'
                }`}
              />
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {status.label}
              </span>
              <span className="hidden text-zinc-400 dark:text-zinc-500 sm:inline">
                · {status.detail}
              </span>
            </div>
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Light / Dark Toggle */}
          <button
            onClick={onToggleTheme}
            type="button"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-100/80 px-2.5 py-2 text-xs font-semibold text-zinc-700 transition hover:border-red-500/40 hover:bg-zinc-200/70 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10 cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span className="hidden md:inline">Claro</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-zinc-700" />
                <span className="hidden md:inline">Oscuro</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenInfo}
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-100/80 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-red-500/40 hover:bg-zinc-200/70 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10 cursor-pointer"
            aria-label="Información del local"
          >
            <Info className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="hidden sm:inline">Horario y Pagos</span>
          </button>

          <button
            onClick={onOpenCart}
            type="button"
            className="relative flex items-center gap-2 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 active:scale-95 cursor-pointer sm:px-4 sm:text-sm"
            aria-label="Abrir carrito de pedido"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Mi Pedido</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-extrabold text-red-600">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
