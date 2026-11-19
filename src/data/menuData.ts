import { CategoryInfo, MenuItem, PromoItem } from '../types';

export const BUSINESS_INFO = {
  name: 'KAIZEN SUSHI',
  handle: '@kaizen.mgta',
  instagramUrl: 'https://www.instagram.com/kaizen.mgta/',
  whatsappPhone: '584248750944',
  displayPhone: '0424-8750944',
  whatsappDirectLink: 'https://wa.me/message/JM7QHG2V76QGI1',
  locationShort: 'La Arboleda · Juanpizza',
  locationFull: 'Juanpizza, La Arboleda - Av. Francisco Esteban Gómez, Isla de Margarita',
  mapsUrl:
    'https://www.google.com/maps/place/Kaizen+Sushi+MGTA/@10.9743446,-63.8352202,20.04z/data=!4m9!1m2!2m1!1sLa+Arboleda+Av+Francisco+Esteban+Gomez+Isla+de+Margarita!3m5!1s0x8c318fe26ff5bdc9:0x398f82257416415a!8m2!3d10.9745479!4d-63.8350132!16s%2Fg%2F11y35pnb_9',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=10.9745479,-63.8350132+(Kaizen+Sushi+MGTA)&z=17&output=embed',
  hoursShort: 'Mié a Lun · 3:00pm – 10:00pm',
  hoursDetail: [
    { days: 'Miércoles a Lunes', hours: '3:00 PM – 10:00 PM', open: true },
    { days: 'Martes', hours: 'Cerrado', open: false },
  ],
  paymentMethods: [
    {
      id: 'Efectivo' as const,
      label: 'Efectivo',
      sub: 'Divisas USD',
      accent:
        'text-emerald-700 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400',
    },
    {
      id: 'Pago Móvil' as const,
      label: 'Pago Móvil',
      sub: 'Bolívares (Bs)',
      accent:
        'text-sky-700 border-sky-500/30 bg-sky-500/10 dark:text-sky-400',
    },
    {
      id: 'Zelle' as const,
      label: 'Zelle',
      sub: 'Transferencia USD',
      accent:
        'text-purple-700 border-purple-500/30 bg-purple-500/10 dark:text-purple-400',
    },
    {
      id: 'Binance' as const,
      label: 'Binance',
      sub: 'USDT Pay',
      accent:
        'text-amber-700 border-amber-500/30 bg-amber-500/10 dark:text-amber-400',
    },
  ],
};

export const BURGER_SAUCES = ['Salsa Anguila', 'Sweet Dragón', 'Salsa Fuji'];

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'promos',
    name: 'Promos',
    jp: 'お得',
    subtitle: 'Arma tu combo ideal y ahorra',
    image: '/images/promo-party-real.jpg',
  },
  {
    id: 'tendencias',
    name: 'Tendencias',
    jp: '始まり',
    subtitle: 'Sushi Burgers & Sushi Pizza virales',
    image: '/images/sushi-burger-real.jpg',
  },
  {
    id: 'pokes',
    name: 'Pokes & Ensaladas',
    jp: '新鮮',
    subtitle: 'Frescos, balanceados y llenos de sabor Nikkei',
    image: '/images/poke-bowl.jpg',
  },
  {
    id: 'clasicos',
    name: 'Rolls Clásicos',
    jp: '伝統',
    subtitle: 'Los favoritos de siempre, perfeccionados',
    image: '/images/classic-rolls.jpg',
  },
  {
    id: 'autor',
    name: 'Rolls Especiales',
    jp: '特製',
    subtitle: 'Creaciones exclusivas de la casa Kaizen',
    image: '/images/vip-rolls.jpg',
  },
  {
    id: 'vip',
    name: 'VIP Rolls',
    jp: '極上',
    subtitle: 'Selección premium con cortes selectos',
    image: '/images/vip-rolls.jpg',
  },
];

export const PROMO_ITEMS: PromoItem[] = [
  {
    id: 'promo-single',
    name: 'Promo Single',
    pieces: 10,
    price: 7.99,
    tagline: '10 Piezas · Elige 1 Roll',
    description:
      'Perfecta para matar el antojo. Elige 1 roll de nuestra selección clásica de 10 piezas.',
    maxSelections: 1,
    eligibleRolls: [
      'Peach Roll',
      'Sakana Roll',
      'Avocado Roll',
      'Kani Roll',
      'Dragón Roll',
      'Tentación Roll',
    ],
    image: '/images/classic-rolls.jpg',
    badge: 'INDIVIDUAL',
  },
  {
    id: 'promo-2pack',
    name: '2 Pack',
    pieces: 22,
    price: 13.99,
    tagline: '22 Piezas · Elige 2 Rolls',
    description:
      'Ideal para compartir en pareja o disfrutar doble sabor. Selecciona tus 2 opciones favoritas.',
    maxSelections: 2,
    eligibleRolls: [
      'Avocado Roll',
      'Sakana Roll',
      'Kani Roll',
      'Peach Roll',
      'Tentación Roll',
      'Dragón Roll',
      'Tropical Roll',
    ],
    image: '/images/vip-rolls.jpg',
    badge: 'MÁS PEDIDO',
    highlight: true,
  },
  {
    id: 'promo-party',
    name: 'Promo Party Roll',
    pieces: 34,
    price: 19.99,
    tagline: '34 Piezas · Elige 3 Rolls',
    description:
      'La bandeja perfecta para compartir entre amigos o familia. Elige 3 rolls de nuestra selección.',
    maxSelections: 3,
    eligibleRolls: [
      'Dragón Roll',
      'Kani Roll',
      'Avocado Roll',
      'Peach Roll',
      'Tropical Roll',
      'Sakana Roll',
      'Tentación Roll',
    ],
    image: '/images/promo-party-real.jpg',
    badge: 'PARA COMPARTIR',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // TENDENCIAS
  {
    id: 'sushi-burger',
    name: 'Sushi Burger',
    category: 'tendencias',
    price: 13.99,
    description:
      'Deliciosa hamburguesa rellena de camarones crocantes, pescado ahumado crunch en salsa nikkei dragón, queso crema, aguacate, cebollín y arroz japonés. Acompañada de 1 salsa de tu preferencia.',
    image: '/images/sushi-burger-real.jpg',
    tags: ['crunchy'],
    badge: 'Top Ventas',
    sauceOptions: BURGER_SAUCES,
  },
  {
    id: 'cangreburger',
    name: 'Cangreburger',
    category: 'tendencias',
    price: 13.99,
    description:
      'Una fórmula secreta: base de cangrejo en salsa nikkei dragón, camarones crunch, aguacate, queso crema, cebollín y arroz japonés. Acompañada de 1 salsa de tu preferencia.',
    image: '/images/sushi-burger-real.jpg',
    tags: ['crunchy'],
    badge: 'Fórmula Secreta',
    sauceOptions: BURGER_SAUCES,
  },
  {
    id: 'sushi-pizza',
    name: 'Sushi Pizza',
    category: 'tendencias',
    price: 13.99,
    description:
      'Base de arroz crocante, queso, ensalada de cangrejo y wakame en salsa dragón, cubierto con láminas de atún rojo y aguacate, bañado en salsa anguila y semillas de sésamo tostado.',
    image: '/images/sushi-pizza-real.jpg',
    tags: ['crunchy', 'atun'],
    badge: 'Favorita',
  },

  // POKES & ENSALADAS
  {
    id: 'poke-tuna',
    name: 'Poke Tuna',
    category: 'pokes',
    price: 13,
    description:
      'Dados de atún rojo marinados con salsa dragón, aguacate, wakame, pepino e hilos de cangrejo spicy con salsa anguila.',
    image: '/images/poke-bowl.jpg',
    tags: ['atun', 'spicy'],
    badge: 'Spicy',
  },
  {
    id: 'poke-sake',
    name: 'Poke Sake',
    category: 'pokes',
    price: 13,
    description:
      'Dados de salmón aderezado, melocotón, pepino, wakame, aguacate e hilos de cangrejo crocante con salsa anguila.',
    image: '/images/poke-bowl.jpg',
    tags: ['salmon', 'crunchy'],
  },
  {
    id: 'ensalada-neptuno',
    name: 'Ensalada Neptuno',
    category: 'pokes',
    price: 12,
    description:
      'Ensalada a base de algas marinas aderezadas y cangrejo en salsa nikkei dragón, con aguacate y camarones crunch bañados en salsa anguila.',
    image: '/images/poke-bowl.jpg',
    tags: ['crunchy', 'sin-arroz'],
  },
  {
    id: 'kaizen-salad',
    name: 'Kaizen Salad',
    category: 'pokes',
    price: 16,
    description:
      'Ensalada de cangrejo y wakame aderezado con salsa nikkei dragón con dados de salmón y atún rojo, coronado con camarones crunch, aguacate y melocotón bañado en anguila.',
    image: '/images/poke-bowl.jpg',
    tags: ['salmon', 'atun', 'crunchy', 'sin-arroz'],
    badge: 'Especialidad',
  },

  // ROLLS CLÁSICOS
  {
    id: 'avocado-roll',
    name: 'Avocado Roll',
    category: 'clasicos',
    price: 9,
    description:
      'Relleno de camarón tempura, cangrejo crocante, queso crema y cebollín, abrazado con láminas de aguacate bañado con salsa sweet dragón.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
    badge: 'Favorito',
  },
  {
    id: 'fuji-roll',
    name: 'Fuji Roll',
    category: 'clasicos',
    price: 12,
    description:
      'Relleno de camarones crocantes, queso crema, aguacate y cebollín con topping de camarones tempurizados bañados en salsa fuji.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
  },
  {
    id: 'tokyo-roll',
    name: 'Tokyo Roll',
    category: 'clasicos',
    price: 12,
    description:
      'Roll crunchy relleno de camarones crocantes, queso crema, aguacate y cebollín, con topping de camarones crunch en salsa dragón bañado en salsa fuji y anguila.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
  },
  {
    id: 'tiger-roll',
    name: 'Tiger Roll',
    category: 'clasicos',
    price: 14,
    description:
      'Roll tempurizado relleno de salmón, queso crema, aguacate y cebollín, con topping de ensalada dinamita, bañado en salsa anguila y semillas de sésamo.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy', 'salmon'],
    badge: 'Tempurizado',
  },
  {
    id: 'tuna-roll',
    name: 'Tuna Roll',
    category: 'clasicos',
    price: 12,
    description:
      'Uramaki relleno de atún rojo, cebollín, aguacate y queso crema con topping de puntos de salsa dragón y semillas de sésamo.',
    image: '/images/classic-rolls.jpg',
    tags: ['atun'],
  },
  {
    id: 'dinamita-roll',
    name: 'Dinamita Roll',
    category: 'clasicos',
    price: 12,
    description:
      'Relleno de ensalada de cangrejo y wakame, aguacate con topping de ensalada dinamita, bañado en salsa anguila y semillas de sésamo negro.',
    image: '/images/classic-rolls.jpg',
    tags: [],
  },
  {
    id: 'dragon-roll',
    name: 'Dragón Roll',
    category: 'clasicos',
    price: 10,
    description:
      'Relleno de pescado blanco crocante, queso crema, cebollín y aguacate, con topping de pescado crunch en salsa dragón y salsa anguila.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
  },
  {
    id: 'peach-roll',
    name: 'Peach Roll',
    category: 'clasicos',
    price: 9,
    description:
      'Relleno de melocotón, cangrejo tempurizado, queso crema y cebollín, bañado con salsa de parchita y semillas de sésamo.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
  },
  {
    id: 'tentacion-roll',
    name: 'Tentación Roll',
    category: 'clasicos',
    price: 10,
    description:
      'Roll tempurizado crunch relleno de pescado blanco crocante, plátano, cebollín y aguacate con topping de ensalada dinamita bañado en salsa anguila.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
  },
  {
    id: 'kani-roll',
    name: 'Kani Roll',
    category: 'clasicos',
    price: 9,
    description:
      'Uramaki relleno de cangrejo crunchy, aguacate, queso crema y cebollín con topping de ensalada dinamita y bañado en salsa anguila.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
  },
  {
    id: 'tropical-roll',
    name: 'Tropical Roll',
    category: 'clasicos',
    price: 9,
    description:
      'Relleno de pesca blanca cruda, cangrejo, queso crema, cebollín y aguacate con topping de semillas de sésamo tostado y salsa de parchita.',
    image: '/images/classic-rolls.jpg',
    tags: [],
  },
  {
    id: 'sakana-roll',
    name: 'Sakana Roll',
    category: 'clasicos',
    price: 9,
    description:
      'Uramaki relleno de camarones crocantes, cebollín, aguacate y queso crema, con topping de plátano y ensalada dinamita bañado en salsa anguila.',
    image: '/images/classic-rolls.jpg',
    tags: ['crunchy'],
  },

  // ROLLS DE AUTOR
  {
    id: 'sukuna-roll',
    name: 'Sukuna Roll',
    category: 'autor',
    price: 15,
    description:
      'Roll crocante sin arroz, envuelto en plátano, relleno de salmón, camarones crunch, queso crema, aguacate y cebollín con topping de pasta dinamita en salsa dragón, bañado en salsa anguila.',
    image: '/images/vip-rolls.jpg',
    tags: ['sin-arroz', 'crunchy', 'salmon'],
    badge: 'Sin Arroz',
  },
  {
    id: 'kyoto-roll',
    name: 'Kyoto Roll',
    category: 'autor',
    price: 14,
    description:
      'Relleno de atún rojo, camarones crocantes, cebollín y queso crema cubierto con láminas de aguacate, topping de ensalada dinamita spicy y bañado en salsa anguila.',
    image: '/images/vip-rolls.jpg',
    tags: ['atun', 'crunchy', 'spicy'],
    badge: 'Spicy',
  },
  {
    id: 'tao-roll',
    name: 'Tao Roll',
    category: 'autor',
    price: 13,
    description:
      'Roll crunchy relleno de salmón ahumado, pescado blanco crocante, queso crema, cebollín y aguacate con topping de pescado crunch en salsa dragón, bañado en salsa fuji y anguila.',
    image: '/images/vip-rolls.jpg',
    tags: ['crunchy', 'salmon'],
  },
  {
    id: 'sakura-roll',
    name: 'Sakura Roll',
    category: 'autor',
    price: 14,
    description:
      'Uramaki relleno de ensalada de wakame y cangrejo aderezado, aguacate, abrazado con láminas de salmón con puntos de salsa dragón nikkei.',
    image: '/images/vip-rolls.jpg',
    tags: ['salmon'],
  },
  {
    id: 'sakai-roll',
    name: 'Sakai Roll',
    category: 'autor',
    price: 15,
    description:
      'Relleno de salmón y atún rojo, queso crema y aguacate con topping de ensalada de wakame, cangrejo y cebollín en salsa nikkei bañado en salsa anguila.',
    image: '/images/vip-rolls.jpg',
    tags: ['salmon', 'atun'],
    badge: 'De la Casa',
  },

  // VIP ROLLS
  {
    id: 'geisha-roll',
    name: 'Geisha Roll',
    category: 'vip',
    price: 16,
    description:
      'Relleno de salmón ahumado, atún rojo, cangrejo crocante, queso crema y cebollín cubierto con láminas de aguacate con topping de camarones crunch y cangrejo en salsa nikkei dragón bañado en salsa anguila.',
    image: '/images/vip-rolls.jpg',
    tags: ['salmon', 'atun', 'crunchy'],
    badge: 'VIP',
  },
  {
    id: 'ryuko-roll',
    name: 'Ryuko Roll',
    category: 'vip',
    price: 15,
    description:
      'Relleno de salmón tempura, ensalada dinamita, queso crema y cebollín cubierto con aguacate y topping de camarones crunch en salsa dragón bañado en salsa anguila.',
    image: '/images/vip-rolls.jpg',
    tags: ['salmon', 'crunchy'],
    badge: 'VIP',
  },
  {
    id: 'keto-roll',
    name: 'Keto Roll',
    category: 'vip',
    price: 16,
    description:
      'Roll sin arroz, sobre una cama de cangrejo relleno con salmón, atún, pescado blanco, queso crema, aguacate y pepino, con un topping de finas algas marinas aderezadas.',
    image: '/images/vip-rolls.jpg',
    tags: ['sin-arroz', 'salmon', 'atun'],
    badge: 'Keto · Sin Arroz',
  },
  {
    id: 'spicy-tuna-roll',
    name: 'Spicy Tuna Roll',
    category: 'vip',
    price: 16,
    description:
      'Relleno de atún rojo marinado, aguacate y cebollín, con topping de dados de atún rojo en salsa dragón, wakame e hilos de cangrejo crocante.',
    image: '/images/vip-rolls.jpg',
    tags: ['atun', 'spicy', 'crunchy'],
    badge: 'VIP Spicy',
  },
  {
    id: 'nezuko-roll',
    name: 'Nezuko Roll',
    category: 'vip',
    price: 16,
    description:
      'Relleno de camarones crunch, salmón ahumado, queso crema, aguacate y cebollín. Abrazado con láminas de salmón, salsa dragón y anguila.',
    image: '/images/vip-rolls.jpg',
    tags: ['salmon', 'crunchy'],
    badge: 'VIP',
  },
];
