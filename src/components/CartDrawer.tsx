import { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  LocateFixed,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';
import { CartItem, OrderType, PaymentMethod } from '../types';
import { buildWhatsAppOrderUrl, formatPrice } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [gpsLink, setGpsLink] = useState('');
  const [locating, setLocating] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Pago Móvil');
  const [generalNotes, setGeneralNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Tu navegador no soporta ubicación GPS.');
      return;
    }

    setLocating(true);
    setGpsError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = `https://www.google.com/maps?q=${latitude.toFixed(
          6
        )},${longitude.toFixed(6)}`;
        setGpsLink(link);
        setLocating(false);
      },
      () => {
        setLocating(false);
        setGpsError(
          'No se pudo obtener tu GPS. Permite el acceso a ubicación o escribe tu dirección.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCheckout = () => {
    if (!customerName.trim()) {
      setError('Por favor ingresa tu nombre para identificar el pedido.');
      return;
    }
    if (orderType === 'delivery' && !address.trim() && !gpsLink) {
      setError(
        'Por favor indica tu zona/dirección o comparte tu ubicación GPS de Google Maps.'
      );
      return;
    }

    setError('');
    const url = buildWhatsAppOrderUrl(items, {
      customerName,
      orderType,
      address,
      reference,
      gpsLink,
      paymentMethod,
      generalNotes,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0E0E12]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/15 text-red-600 dark:bg-red-600/20 dark:text-red-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                Tu Pedido
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Envío directo a WhatsApp · {BUSINESS_INFO.displayPhone}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="h-24 w-24 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-white/10">
              <img
                src="/images/logo-mascot.jpg"
                alt="Kaizen Sushi Mascot"
                className="h-full w-full object-cover object-left"
              />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-zinc-900 dark:text-white">
              Tu pedido está vacío
            </h3>
            <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Explora nuestras Promos, Tendencias, Pokes y Rolls Especiales para armar tu pedido.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-500 cursor-pointer"
            >
              Ver Menú
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
              {/* Items list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Productos ({items.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs font-medium text-zinc-400 hover:text-red-500 cursor-pointer"
                  >
                    Vaciar todo
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-[#15151A]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                            {item.name}
                          </h4>
                          {item.selectedRolls && item.selectedRolls.length > 0 && (
                            <p className="mt-0.5 text-[11px] font-medium text-red-600 dark:text-red-300">
                              Rolls: {item.selectedRolls.join(', ')}
                            </p>
                          )}
                          {item.selectedSauce && (
                            <p className="mt-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                              Salsa: {item.selectedSauce}
                            </p>
                          )}
                          {item.notes && (
                            <p className="mt-0.5 text-[11px] italic text-zinc-500 dark:text-zinc-400">
                              “{item.notes}”
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartId)}
                          aria-label="Eliminar producto"
                          className="text-zinc-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-display text-sm font-extrabold text-zinc-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-white/10 dark:bg-black/40">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-zinc-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery / Pick Up Toggle */}
              <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-white/10">
                <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  1. Modalidad de Entrega
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition cursor-pointer ${
                      orderType === 'delivery'
                        ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-600/20 dark:text-white'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    <Truck className="h-4 w-4 text-red-500" />
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition cursor-pointer ${
                      orderType === 'pickup'
                        ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-600/20 dark:text-white'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    <Store className="h-4 w-4 text-red-500" />
                    Pick Up
                  </button>
                </div>

                {orderType === 'pickup' && (
                  <div className="flex items-start gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <div className="flex-1">
                      <p className="font-bold text-zinc-900 dark:text-white">
                        Punto de retiro:
                      </p>
                      <p>{BUSINESS_INFO.locationFull}</p>
                      <a
                        href={BUSINESS_INFO.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 font-bold text-red-600 hover:underline dark:text-red-400"
                      >
                        Ver en Google Maps
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Customer Info */}
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Tu nombre *"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-red-500 dark:border-white/10 dark:bg-black/50 dark:text-white dark:placeholder-zinc-500"
                  />

                  {orderType === 'delivery' && (
                    <>
                      {/* Direct Google Maps GPS Share Button */}
                      <div className="space-y-1.5">
                        <button
                          type="button"
                          onClick={handleGetGpsLocation}
                          disabled={locating}
                          className={`flex w-full items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
                            gpsLink
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                              : 'border-red-500/40 bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:text-red-300'
                          }`}
                        >
                          {locating ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Obteniendo ubicación GPS…
                            </>
                          ) : gpsLink ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Ubicación de Google Maps adjuntada
                            </>
                          ) : (
                            <>
                              <LocateFixed className="h-4 w-4" />
                              Adjuntar mi ubicación por Google Maps (GPS)
                            </>
                          )}
                        </button>
                        {gpsError && (
                          <p className="text-[11px] text-amber-600 dark:text-amber-400">
                            {gpsError}
                          </p>
                        )}
                      </div>

                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Zona y dirección (Ej: Costa Azul, Porlamar)"
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-red-500 dark:border-white/10 dark:bg-black/50 dark:text-white dark:placeholder-zinc-500"
                      />
                      <input
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Punto de referencia (opcional)"
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-red-500 dark:border-white/10 dark:bg-black/50 dark:text-white dark:placeholder-zinc-500"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2.5 border-t border-zinc-200 pt-4 dark:border-white/10">
                <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  2. Método de Pago
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {BUSINESS_INFO.paymentMethods.map((pm) => {
                    const active = paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`rounded-xl border px-3 py-2.5 text-left transition cursor-pointer ${
                          active
                            ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-600/20 dark:text-white'
                            : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs font-bold">{pm.label}</div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          {pm.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* General Notes */}
              <div className="border-t border-zinc-200 pt-4 dark:border-white/10">
                <input
                  type="text"
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Nota general: palitos extra, servilletas, cambio..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-red-500 dark:border-white/10 dark:bg-black/50 dark:text-white dark:placeholder-zinc-500"
                />
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-700 dark:text-red-300">
                  {error}
                </p>
              )}
            </div>

            {/* Footer Checkout */}
            <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-[#0A0A0D]">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Total estimado
                  </span>
                  {orderType === 'delivery' && (
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      *Costo de delivery se confirma por zona
                    </p>
                  )}
                </div>
                <span className="font-display text-2xl font-black text-zinc-900 dark:text-white">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar Pedido por WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
