export type CategoryId =
  | 'promos'
  | 'tendencias'
  | 'pokes'
  | 'clasicos'
  | 'autor'
  | 'vip';

export type FilterTag =
  | 'all'
  | 'crunchy'
  | 'sin-arroz'
  | 'salmon'
  | 'atun'
  | 'spicy';

export type PaymentMethod = 'Efectivo' | 'Pago Móvil' | 'Zelle' | 'Binance';

export type OrderType = 'delivery' | 'pickup';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  jp: string;
  subtitle: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<CategoryId, 'promos'>;
  price: number;
  description: string;
  image: string;
  tags: Exclude<FilterTag, 'all'>[];
  badge?: string;
  sauceOptions?: string[];
  pieces?: number;
}

export interface PromoItem {
  id: string;
  name: string;
  pieces: number;
  price: number;
  tagline: string;
  description: string;
  maxSelections: number;
  eligibleRolls: string[];
  image: string;
  badge: string;
  highlight?: boolean;
}

export interface CartItem {
  cartId: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  isPromo?: boolean;
  pieces?: number;
  selectedRolls?: string[];
  selectedSauce?: string;
  notes?: string;
  image: string;
}
