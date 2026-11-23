export type ProductCategory = 'todas' | 'oversize' | 'manga-larga';

export interface ProductImage {
  src: string;
  alt: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Exclude<ProductCategory, 'todas'>;
  categoryLabel: string;
  sizes: ('M' | 'L')[];
  price: number;
  fitNote: string;
  images: ProductImage[];
}

export interface CarouselSlot {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  mediaSrc: string | null;
  mediaType?: 'image' | 'video';
}

export const WHATSAPP_NUMBER = '59163886148';

export const GENERAL_WHATSAPP_URL =
  'https://wa.me/59163886148?text=Hola%20NOVA%2C%20quiero%20consultar%20por%20las%20prendas%20disponibles.';

export function getProductWhatsAppUrl(name: string, price: number): string {
  const message = `Hola NOVA, me interesa comprar la ${name} de ${price} Bs`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getCustomWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const HERO_LOOKBOOK_IMAGE =
  '/assets/aistudio/display-the-layered-t-shirt-combination-_lKkwRtI4V4O-8EFc1bVWpw_8UGdWVnaRNe7JpMVGBpScA_626a8574.jpg';

/**
 * Ranuras reservadas para el carrusel horizontal tipo video.
 * Reemplaza `mediaSrc: null` con la ruta de tu foto o video real cuando lo desees.
 */
export const CAROUSEL_SLOTS: CarouselSlot[] = [
  {
    id: 'slot-01',
    indexLabel: '01',
    title: 'Polera Oversize "Los Angeles" Blanca',
    subtitle: 'Cómo queda puesta · Tallas M / L · 70 Bs',
    mediaSrc: '/assets/aistudio/IMG-20261123-WA7503_3d7ea6b8.jpg',
    mediaType: 'image',
  },
  {
    id: 'slot-02',
    indexLabel: '02',
    title: 'Polera Oversize "Los Angeles" Negra',
    subtitle: 'Cómo queda puesta · Tallas M / L · 70 Bs',
    mediaSrc: '/assets/aistudio/IMG-20261123-WA1025_67c556cf.jpg',
    mediaType: 'image',
  },
  {
    id: 'slot-03',
    indexLabel: '03',
    title: 'Polera Básica Negra Manga Larga',
    subtitle: 'Calce suelto de algodón · Tallas M / L · 85 Bs',
    mediaSrc: '/assets/aistudio/IMG-20261122-WA5553_3bdea974.jpg',
    mediaType: 'image',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'los-angeles-blanca',
    name: 'Polera Oversize "Los Angeles" Blanca',
    description: 'Cuello con detalle gótico y estampado frontal',
    category: 'oversize',
    categoryLabel: 'Oversize',
    sizes: ['M', 'L'],
    price: 70,
    fitNote: 'Hombros caídos, cuello ribeteado negro con tipografía bordada y estampado frontal de alto contraste.',
    images: [
      {
        src: '/assets/aistudio/1795402161324_196b9079.jpg',
        alt: 'Polera Oversize Los Angeles Blanca vista frontal',
        label: 'Vista frontal',
      },
      {
        src: '/assets/aistudio/1795397483594_1481fe71.jpg',
        alt: 'Detalle del cuello gótico y estampado de la Polera Los Angeles Blanca',
        label: 'Detalle cuello y estampado',
      },
    ],
  },
  {
    id: 'los-angeles-negra',
    name: 'Polera Oversize "Los Angeles" Negra',
    description: 'Cuello con detalle gótico y estampado frontal',
    category: 'oversize',
    categoryLabel: 'Oversize',
    sizes: ['M', 'L'],
    price: 70,
    fitNote: 'Algodón negro profundo con cuello y puños tejidos con tipografía gótica en contraste blanco.',
    images: [
      {
        src: '/assets/aistudio/1795403056066_3132873c.jpg',
        alt: 'Polera Oversize Los Angeles Negra vista frontal',
        label: 'Vista frontal',
      },
      {
        src: '/assets/aistudio/1795403065948_32080005.jpg',
        alt: 'Detalle del cuello gótico y estampado de la Polera Los Angeles Negra',
        label: 'Detalle cuello y estampado',
      },
    ],
  },
  {
    id: 'basica-negra-manga-larga',
    name: 'Polera Básica Negra Manga Larga',
    description: 'Corte suelto de algodón',
    category: 'manga-larga',
    categoryLabel: 'Manga Larga',
    sizes: ['M', 'L'],
    price: 85,
    fitNote: 'Prenda esencial de algodón suave ideal para uso individual o en capas debajo de poleras oversize.',
    images: [
      {
        src: '/assets/aistudio/1795403149525_be3a4697.jpg',
        alt: 'Polera Básica Negra Manga Larga de algodón',
        label: 'Prenda principal',
      },
      {
        src: '/assets/aistudio/display-the-layered-t-shirt-combination-_lKkwRtI4V4O-8EFc1bVWpw_8UGdWVnaRNe7JpMVGBpScA_626a8574.jpg',
        alt: 'Combinación urbana en capas con polera manga larga negra',
        label: 'Estilo en capas',
      },
    ],
  },
  {
    id: 'blanca-diseno-espalda',
    name: 'Polera Blanca con diseño en la espalda',
    description: 'Corte oversize con estampado posterior',
    category: 'oversize',
    categoryLabel: 'Oversize',
    sizes: ['M', 'L'],
    price: 90,
    fitNote: 'Silueta oversize amplia con diseño gráfico en la espalda y caída pesada.',
    images: [],
  },
];
