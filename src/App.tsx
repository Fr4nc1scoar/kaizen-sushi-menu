import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Instagram,
  MapPin,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromoSection } from './components/PromoSection';
import { MenuCard } from './components/MenuCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { InfoModal } from './components/InfoModal';
import { LocationSocialSection } from './components/LocationSocialSection';
import { BUSINESS_INFO, CATEGORIES, MENU_ITEMS } from './data/menuData';
import { CartItem, CategoryId, FilterTag, MenuItem, PromoItem } from './types';
import { formatPrice } from './utils/whatsapp';

const FILTER_CHIPS: { id: FilterTag; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'crunchy', label: 'Crunchy / Tempura' },
  { id: 'sin-arroz', label: 'Sin Arroz / Keto' },
  { id: 'salmon', label: 'Salmón' },
  { id: 'atun', label: 'Atún Rojo' },
  { id: 'spicy', label: 'Picante' },
];

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('kaizen-theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return false; // Default to clean Light Zen theme
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('kaizen-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  const [activeCategory, setActiveCategory] = useState<CategoryId>('promos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<FilterTag>('all');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );
  const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === newItem.cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === newItem.cartId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
    showToast(`${newItem.name} agregado al pedido`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart({
      cartId: `${item.id}::::`,
      itemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleScrollToCategory = (catId: CategoryId) => {
    setActiveCategory(catId);
    const el = document.getElementById(`section-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToLocation = () => {
    const el = document.getElementById('section-ubicacion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesTag = activeTag === 'all' || item.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [searchQuery, activeTag]);

  const isFiltering = searchQuery.trim().length > 0 || activeTag !== 'all';

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const menuCategories = CATEGORIES.filter((c) => c.id !== 'promos');

  return (
    <div className="min-h-screen bg-[#FAF8F5] bg-seigaiha text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-[#F5F2EB]">
      <Header
        cartCount={cartCount}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      <Hero
        onExplorePromos={() => handleScrollToCategory('promos')}
        onExploreLocation={handleScrollToLocation}
      />

      {/* Sticky Category Navigation + Search */}
      <div className="sticky top-[69px] z-30 border-b border-zinc-200/80 bg-white/92 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#09090B]/92">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          {/* Categories horizontal scroll */}
          <nav
            aria-label="Categorías del menú"
            className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleScrollToCategory(cat.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'border-red-600 bg-red-600 text-white shadow-md shadow-red-600/25'
                      : 'border-zinc-200 bg-zinc-100/80 text-zinc-700 hover:border-red-500/40 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`font-jp text-[10px] ${
                      isActive
                        ? 'text-red-100'
                        : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                  >
                    {cat.jp}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleScrollToLocation}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-4 py-2 text-xs font-bold text-zinc-700 transition hover:border-red-500/40 hover:text-red-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:text-red-400 cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5 text-red-500" />
              <span>Ubicación</span>
            </button>
          </nav>

          {/* Search & Dietary Filter Chips */}
          <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar roll o ingrediente (salmón, aguacate, plátano, atún...)"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-9 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-red-500 focus:bg-white dark:border-white/10 dark:bg-[#131317] dark:text-white dark:placeholder-zinc-500 sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
              {FILTER_CHIPS.map((chip) => {
                const active = activeTag === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActiveTag(chip.id)}
                    className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition cursor-pointer ${
                      active
                        ? 'border-red-500/60 bg-red-600/10 text-red-700 dark:bg-red-500/15 dark:text-red-300'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Promos Section */}
        {!isFiltering && (
          <PromoSection onSelectPromo={(promo) => setSelectedPromo(promo)} />
        )}

        {/* Menu Sections */}
        {filteredItems.length === 0 ? (
          <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-[#121216]">
            <Sparkles className="h-8 w-8 text-red-500" />
            <h3 className="mt-3 font-display text-lg font-bold text-zinc-900 dark:text-white">
              No encontramos platos con ese filtro
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Intenta buscar otro ingrediente o vuelve a ver toda la carta.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTag('all');
              }}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 cursor-pointer"
            >
              Ver todo el menú
            </button>
          </div>
        ) : (
          menuCategories.map((category) => {
            const categoryItems = filteredItems.filter(
              (item) => item.category === category.id
            );
            if (categoryItems.length === 0) return null;

            return (
              <section
                key={category.id}
                id={`section-${category.id}`}
                className="scroll-mt-44 py-7"
              >
                <div className="mb-5 flex items-end justify-between border-b border-zinc-200 pb-3 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-1.5 rounded-full bg-red-600" />
                      <h2 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white sm:text-3xl">
                        {category.name}
                      </h2>
                      <span className="font-jp text-lg font-bold text-red-600/70 dark:text-red-500/70">
                        {category.jp}
                      </span>
                    </div>
                    <p className="mt-1 pl-3.5 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                      {category.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {categoryItems.length}{' '}
                    {categoryItems.length === 1 ? 'opción' : 'opciones'}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {categoryItems.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onSelect={(i) => setSelectedMenuItem(i)}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}

        {/* Dedicated Location & Social Section */}
        <LocationSocialSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-10 pb-28 transition-colors dark:border-white/10 dark:bg-[#070709] sm:pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-dark.jpg"
                alt="Kaizen Sushi"
                className="h-10 w-10 rounded-xl border border-zinc-200 object-cover dark:border-white/10"
              />
              <div>
                <div className="font-display text-base font-extrabold text-zinc-900 dark:text-white">
                  KAIZEN <span className="text-red-600 dark:text-red-500">SUSHI</span>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {BUSINESS_INFO.handle} · Isla de Margarita
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 hover:border-red-500/40 hover:text-red-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
              >
                <MapPin className="h-3.5 w-3.5 text-red-500" />
                Google Maps
              </a>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 hover:border-pink-500/40 hover:text-pink-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
              >
                <Instagram className="h-3.5 w-3.5 text-pink-500" />
                Instagram
              </a>
              <a
                href={BUSINESS_INFO.whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                {BUSINESS_INFO.displayPhone}
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-100 pt-5 text-center text-[11px] text-zinc-400 dark:border-white/5 dark:text-zinc-500">
            © {new Date().getFullYear()} Kaizen Sushi Margarita · Menú Digital Interactivo
          </div>
        </div>
      </footer>

      {/* Floating Bottom Cart Bar */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-lg animate-slide-up">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex w-full items-center justify-between rounded-2xl border border-red-400/40 bg-red-600 px-5 py-3.5 text-white shadow-2xl shadow-red-950/40 transition hover:bg-red-500 active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 min-w-7 items-center justify-center rounded-xl bg-white px-2 text-xs font-black text-red-600">
                {cartCount}
              </span>
              <span className="text-sm font-bold">Ver mi pedido</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-black">
                {formatPrice(cartTotal)}
              </span>
              <ShoppingBag className="h-4 w-4" />
            </div>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 animate-slide-up">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-zinc-900/95 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <ProductModal
        menuItem={selectedMenuItem}
        promoItem={selectedPromo}
        onClose={() => {
          setSelectedMenuItem(null);
          setSelectedPromo(null);
        }}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}
