import { useState, useEffect } from 'react';
import { Check, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { CartItem, MenuItem, PromoItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface ProductModalProps {
  menuItem: MenuItem | null;
  promoItem: PromoItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProductModal({
  menuItem,
  promoItem,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSauce, setSelectedSauce] = useState<string>('');
  const [selectedRolls, setSelectedRolls] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setQuantity(1);
    setNotes('');
    setSelectedRolls([]);
    if (menuItem?.sauceOptions && menuItem.sauceOptions.length > 0) {
      setSelectedSauce(menuItem.sauceOptions[0]);
    } else {
      setSelectedSauce('');
    }
  }, [menuItem, promoItem]);

  if (!menuItem && !promoItem) return null;

  const isPromo = Boolean(promoItem);
  const title = promoItem ? promoItem.name : menuItem!.name;
  const price = promoItem ? promoItem.price : menuItem!.price;
  const image = promoItem ? promoItem.image : menuItem!.image;
  const description = promoItem ? promoItem.description : menuItem!.description;

  const maxRolls = promoItem?.maxSelections ?? 0;
  const remainingRolls = maxRolls - selectedRolls.length;
  const canConfirm = !isPromo || selectedRolls.length === maxRolls;

  const handleAddRoll = (roll: string) => {
    if (selectedRolls.length < maxRolls) {
      setSelectedRolls((prev) => [...prev, roll]);
    }
  };

  const handleRemoveRoll = (roll: string) => {
    const idx = selectedRolls.lastIndexOf(roll);
    if (idx !== -1) {
      setSelectedRolls((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const getRollCount = (roll: string) =>
    selectedRolls.filter((r) => r === roll).length;

  const handleConfirm = () => {
    if (!canConfirm) return;

    const cartId = [
      promoItem ? promoItem.id : menuItem!.id,
      selectedRolls.slice().sort().join('|'),
      selectedSauce,
      notes.trim(),
    ].join('::');

    onAddToCart({
      cartId,
      itemId: promoItem ? promoItem.id : menuItem!.id,
      name: title,
      price,
      quantity,
      isPromo,
      pieces: promoItem?.pieces,
      selectedRolls: isPromo ? selectedRolls : undefined,
      selectedSauce: selectedSauce || undefined,
      notes: notes.trim() || undefined,
      image,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-zinc-200 bg-white shadow-2xl dark:border-white/15 dark:bg-[#121216] sm:rounded-3xl"
      >
        {/* Header Image */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-52">
          <img src={image} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/15" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition hover:bg-red-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>

          {promoItem && (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[11px] font-extrabold text-white shadow-lg">
              <Sparkles className="h-3 w-3" />
              {promoItem.pieces} PIEZAS
            </div>
          )}

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
            <h2 className="font-display text-2xl font-extrabold text-white">
              {title}
            </h2>
            <span className="rounded-xl border border-red-500/40 bg-black/80 px-3 py-1 font-display text-lg font-black text-white">
              {formatPrice(price)}
            </span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {description}
          </p>

          {/* Promo Roll Selector */}
          {promoItem && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Elige tus rolls ({selectedRolls.length}/{maxRolls})
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Puedes repetir el mismo roll si lo deseas
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    canConfirm
                      ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                      : 'border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  {canConfirm
                    ? '¡Listo!'
                    : `Falta${remainingRolls > 1 ? 'n' : ''} ${remainingRolls}`}
                </span>
              </div>

              <div className="space-y-2">
                {promoItem.eligibleRolls.map((roll) => {
                  const count = getRollCount(roll);
                  return (
                    <div
                      key={roll}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition ${
                        count > 0
                          ? 'border-red-500/50 bg-red-50 dark:bg-red-600/10'
                          : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-white/10 dark:bg-black/30 dark:hover:border-white/20'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleAddRoll(roll)}
                        className="flex flex-1 items-center gap-2 text-left text-sm font-medium text-zinc-800 dark:text-zinc-100 cursor-pointer"
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                            count > 0
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-zinc-300 text-transparent dark:border-white/20'
                          }`}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{roll}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {count > 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRoll(roll)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-700 hover:border-red-500 dark:border-white/15 dark:bg-black/60 dark:text-zinc-200 cursor-pointer"
                            aria-label={`Quitar ${roll}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {count > 0 && (
                          <span className="w-4 text-center text-xs font-bold text-zinc-900 dark:text-white">
                            {count}
                          </span>
                        )}
                        <button
                          type="button"
                          disabled={selectedRolls.length >= maxRolls}
                          onClick={() => handleAddRoll(roll)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/40 bg-red-600/15 text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 dark:text-red-400 cursor-pointer"
                          aria-label={`Agregar ${roll}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sauce Selector */}
          {menuItem?.sauceOptions && menuItem.sauceOptions.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Elige tu salsa incluida
                </h3>
                <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
                  Obligatorio · 1 opción
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {menuItem.sauceOptions.map((sauce) => {
                  const active = selectedSauce === sauce;
                  return (
                    <button
                      key={sauce}
                      type="button"
                      onClick={() => setSelectedSauce(sauce)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-bold transition cursor-pointer ${
                        active
                          ? 'border-red-600 bg-red-600 text-white shadow-md shadow-red-600/25'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-white/10 dark:bg-black/40 dark:text-zinc-300 dark:hover:border-white/25'
                      }`}
                    >
                      {active && <Check className="h-3.5 w-3.5" />}
                      {sauce}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label
              htmlFor="item-notes"
              className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Notas especiales (opcional)
            </label>
            <input
              id="item-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebollín, salsa aparte, extra jengibre..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-red-500 dark:border-white/10 dark:bg-black/50 dark:text-white dark:placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="flex items-center gap-3 border-t border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-[#0D0D10]">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-1 dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 cursor-pointer"
              aria-label="Reducir cantidad"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-sm font-extrabold text-zinc-900 dark:text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 cursor-pointer"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            disabled={!canConfirm}
            onClick={handleConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            {canConfirm
              ? `Agregar · ${formatPrice(price * quantity)}`
              : `Elige ${remainingRolls} roll${remainingRolls > 1 ? 's' : ''} más`}
          </button>
        </div>
      </div>
    </div>
  );
}
