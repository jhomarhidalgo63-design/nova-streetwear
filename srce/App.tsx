import {useState, useMemo} from 'react';
import {ArrowDown, Truck, QrCode, Layers, MapPin, Instagram} from 'lucide-react';
import {
  PRODUCTS,
  CAROUSEL_SLOTS,
  Product,
  ProductCategory,
  HERO_LOOKBOOK_IMAGE,
  GENERAL_WHATSAPP_URL,
} from './data/products';
import {Navbar} from './components/Navbar';
import {LookbookCarousel} from './components/LookbookCarousel';
import {ProductCard} from './components/ProductCard';
import {ProductModal} from './components/ProductModal';
import {OrderDrawer, InquiryItem} from './components/OrderDrawer';
import {NovaLogo} from './components/NovaLogo';
import {WhatsAppIcon} from './components/WhatsAppIcon';

const CATEGORIES: {id: ProductCategory; label: string}[] = [
  {id: 'todas', label: 'Todas (4)'},
  {id: 'oversize', label: 'Oversize'},
  {id: 'manga-larga', label: 'Manga Larga'},
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todas');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todas') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const totalInquiryCount = useMemo(
    () => inquiryItems.reduce((sum, item) => sum + item.quantity, 0),
    [inquiryItems]
  );

  const handleAddToInquiry = (product: Product, size: 'M' | 'L') => {
    setInquiryItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {...next[idx], quantity: next[idx].quantity + 1};
        return next;
      }
      return [...prev, {product, size, quantity: 1}];
    });
  };

  const handleUpdateQty = (productId: string, size: 'M' | 'L', delta: number) => {
    setInquiryItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? {...item, quantity: item.quantity + delta}
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: 'M' | 'L') => {
    setInquiryItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  return (
    <div id="inicio" className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <Navbar
        inquiryCount={totalInquiryCount}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Copy & Primary Actions */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <p className="text-xs sm:text-sm font-medium tracking-wider text-[#A1A1AA]">
                  NOVA Streetwear · Cochabamba, Bolivia
                </p>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.06] [text-wrap:balance]">
                  CATÁLOGO DE ROPA A BUEN PRECIO Y BUENA CALIDAD
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                  Entregas en toda Cochabamba • Tallas M y L • Pagas por QR o al recibir
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#catalogo"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 min-h-[46px] text-sm font-bold text-[#0A0A0A] hover:bg-white/90 active:scale-[0.98] transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  >
                    <span>Ver Catálogo</span>
                    <ArrowDown className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href={GENERAL_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 min-h-[46px] text-sm font-bold text-[#0A0A0A] hover:bg-[#22c35e] active:scale-[0.98] transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#A1A1AA]">
                  <span>Corte oversize y básico</span>
                  <span aria-hidden="true">/</span>
                  <span>Stock limitado</span>
                  <span aria-hidden="true">/</span>
                  <span>Desde 70 Bs</span>
                </div>
              </div>

              {/* Right Column: Clean Editorial Garment Lookbook */}
              <div className="lg:col-span-5 flex">
                <div className="relative w-full overflow-hidden rounded-2xl bg-[#F4F3EE] border border-white/[0.08] aspect-[4/5] lg:aspect-auto lg:h-full min-h-[340px]">
                  <img
                    src={HERO_LOOKBOOK_IMAGE}
                    alt="Combinación urbana NOVA: Polera Oversize Los Angeles Blanca sobre polera manga larga negra"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-white/80 font-medium">
                        Drop Actual
                      </p>
                      <p className="text-sm font-semibold text-white">
                        Estilo Urbano Oversize
                      </p>
                    </div>
                    <a
                      href="#catalogo"
                      className="text-xs font-semibold text-white underline underline-offset-4 hover:text-[#25D366] transition-colors whitespace-nowrap"
                    >
                      Ver prendas
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carrusel Horizontal Tipo Video (Sin puntos) */}
        <LookbookCarousel slots={CAROUSEL_SLOTS} />

        {/* Catálogo de Productos */}
        <section id="catalogo" className="py-14 sm:py-20 border-b border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Catálogo Disponible
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1AA]">
                  Elige tu polera y pide directo por WhatsApp al +591 63886148.
                </p>
              </div>

              {/* Interactive Category Filter */}
              <div
                role="tablist"
                aria-label="Filtrar prendas por categoría"
                className="inline-flex items-center gap-1 rounded-lg bg-[#161616] p-1 border border-white/[0.08] self-start sm:self-auto"
              >
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#0A0A0A]'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onInspect={setInspectedProduct}
                  onAddToInquiry={handleAddToInquiry}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Envíos y Pagos */}
        <section id="envios" className="py-14 sm:py-20 border-b border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Entregas y Pagos
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA]">
                Compra rápida y directa en toda Cochabamba, sin trámites ni registros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-[#161616] border border-white/[0.08] p-6 space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-white">
                  <Truck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Entregas en toda Cochabamba
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Llevamos tu pedido a domicilio en toda Cochabamba. Coordinamos ubicación y hora por WhatsApp.
                </p>
              </div>

              <div className="rounded-xl bg-[#161616] border border-white/[0.08] p-6 space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-white">
                  <QrCode className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  QR o Efectivo Contra Entrega
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Pagas por Código QR o en efectivo al momento de recibir tu polera.
                </p>
              </div>

              <div className="rounded-xl bg-[#161616] border border-white/[0.08] p-6 space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-white">
                  <Layers className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Buen Precio y Buena Calidad
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Prendas de algodón seleccionadas en tallas M y L, pensadas para uso diario con corte urbano.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="ubicacion" className="bg-[#0A0A0A] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <NovaLogo showSublabel size="md" />
            <p className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Cochabamba, Bolivia · Entregas en toda Cochabamba</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#A1A1AA]">
            <a
              href={GENERAL_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp (+591 63886148)</span>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.28z" />
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#A1A1AA]/75">
          <span>© 2026 NOVA Streetwear. Todos los derechos reservados.</span>
          <span>Tallas M / L · Pago QR o contra entrega</span>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href={GENERAL_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar por WhatsApp a NOVA Streetwear"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 min-h-[48px] text-sm font-bold text-[#0A0A0A] shadow-lg shadow-black/50 hover:bg-[#22c35e] hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
      </a>

      {/* Quick View Modal */}
      <ProductModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToInquiry={handleAddToInquiry}
      />

      {/* Multi-item Inquiry Drawer */}
      <OrderDrawer
        isOpen={drawerOpen}
        items={inquiryItems}
        onClose={() => setDrawerOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClear={() => setInquiryItems([])}
      />
    </div>
  );
}
