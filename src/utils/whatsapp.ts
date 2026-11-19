import { BUSINESS_INFO } from '../data/menuData';
import { CartItem, OrderType, PaymentMethod } from '../types';

export interface CheckoutForm {
  customerName: string;
  orderType: OrderType;
  address: string;
  reference: string;
  gpsLink?: string;
  paymentMethod: PaymentMethod;
  generalNotes: string;
}

export function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export function buildWhatsAppOrderUrl(items: CartItem[], form: CheckoutForm): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const lines: string[] = [
    '🍣 *NUEVO PEDIDO — KAIZEN SUSHI* 🇯🇵',
    '────────────────────────',
    `👤 *Cliente:* ${form.customerName.trim() || 'No especificado'}`,
    `🛵 *Modalidad:* ${
      form.orderType === 'delivery'
        ? 'Delivery'
        : 'Pick Up (Retiro en Juanpizza · La Arboleda)'
    }`,
  ];

  if (form.orderType === 'delivery') {
    if (form.address.trim()) {
      lines.push(`📍 *Dirección:* ${form.address.trim()}`);
    }
    if (form.gpsLink && form.gpsLink.trim()) {
      lines.push(`🗺️ *Ubicación Google Maps:* ${form.gpsLink.trim()}`);
    }
    if (form.reference.trim()) {
      lines.push(`🧭 *Referencia:* ${form.reference.trim()}`);
    }
  }

  lines.push(`💳 *Método de Pago:* ${form.paymentMethod}`);
  lines.push('────────────────────────');
  lines.push('*📋 DETALLE DEL PEDIDO:*');
  lines.push('');

  items.forEach((item) => {
    const subtotal = formatPrice(item.price * item.quantity);
    const title = item.pieces
      ? `${item.name} (${item.pieces} pzas)`
      : item.name;
    lines.push(`▪ *${item.quantity}x ${title}* — ${subtotal}`);

    if (item.selectedRolls && item.selectedRolls.length > 0) {
      lines.push(`   ↳ Rolls: ${item.selectedRolls.join(', ')}`);
    }
    if (item.selectedSauce) {
      lines.push(`   ↳ Salsa: ${item.selectedSauce}`);
    }
    if (item.notes && item.notes.trim()) {
      lines.push(`   ↳ Nota: _${item.notes.trim()}_`);
    }
  });

  if (form.generalNotes.trim()) {
    lines.push('');
    lines.push(`📝 *Nota general:* ${form.generalNotes.trim()}`);
  }

  lines.push('');
  lines.push('────────────────────────');
  lines.push(`💰 *TOTAL ESTIMADO: ${formatPrice(total)}*`);
  lines.push('_Enviado desde el Menú Digital de Kaizen Sushi_');

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BUSINESS_INFO.whatsappPhone}?text=${text}`;
}

export function getStoreOpenStatus(): {
  isOpen: boolean;
  label: string;
  detail: string;
} {
  try {
    const now = new Date();
    // Convert to America/Caracas (UTC-4)
    const caracasString = now.toLocaleString('en-US', {
      timeZone: 'America/Caracas',
    });
    const caracasDate = new Date(caracasString);
    const day = caracasDate.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat
    const hour = caracasDate.getHours();

    // Closed on Tuesdays (day === 2)
    if (day === 2) {
      return {
        isOpen: false,
        label: 'Cerrado hoy (Martes)',
        detail: 'Abrimos mañana 3:00 PM',
      };
    }

    // Open Wed-Mon from 15:00 to 22:00
    if (hour >= 15 && hour < 22) {
      return {
        isOpen: true,
        label: 'Abierto ahora',
        detail: 'Hasta las 10:00 PM',
      };
    }

    if (hour < 15) {
      return {
        isOpen: false,
        label: 'Abre hoy 3:00 PM',
        detail: 'Puedes pre-ordenar por WhatsApp',
      };
    }

    return {
      isOpen: false,
      label: 'Cerrado ahora',
      detail: 'Mié a Lun · 3:00 PM – 10:00 PM',
    };
  } catch {
    return {
      isOpen: true,
      label: 'Mié a Lun · 3pm – 10pm',
      detail: 'Delivery y Pick Up',
    };
  }
}
