import {useRef, useState, useEffect, useCallback} from 'react';
import {ChevronLeft, ChevronRight, Film} from 'lucide-react';
import {CarouselSlot} from '../data/products';

interface LookbookCarouselProps {
  slots: CarouselSlot[];
}

export function LookbookCarousel({slots}: LookbookCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const interactionTimeoutRef = useRef<number | null>(null);
  const skipScrollSyncUntilRef = useRef<number>(0);

  const totalSlides = slots.length;

  const pauseTemporarily = useCallback((durationMs = 5000) => {
    setIsPaused(true);
    if (interactionTimeoutRef.current !== null) {
      window.clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, durationMs);
  }, []);

  const scrollToSlide = useCallback(
    (index: number, manual = false) => {
      const container = trackRef.current;
      if (!container) return;

      const wrappedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      const slideEl = container.children[wrappedIndex] as HTMLElement | undefined;
      if (!slideEl) return;

      skipScrollSyncUntilRef.current = Date.now() + 600;
      const targetLeft = slideEl.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
      setActiveIndex(wrappedIndex);

      if (manual) {
        pauseTemporarily(5000);
      }
    },
    [totalSlides, pauseTemporarily]
  );

  // Sync activeIndex cleanly when user swipes/scrolls manually
  const handleScroll = useCallback(() => {
    if (Date.now() < skipScrollSyncUntilRef.current) return;

    const container = trackRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;

    const scrollLeft = container.scrollLeft;
    let closestIdx = 0;
    let minDiff = Number.POSITIVE_INFINITY;

    children.forEach((child, idx) => {
      const diff = Math.abs(child.offsetLeft - container.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  // Auto-advance every 5 seconds when idle
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      const container = trackRef.current;
      if (container) {
        const atEnd =
          Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth - 8;
        if (atEnd && activeIndex < totalSlides - 1) {
          // If already scrolled to the right edge on wide screens, step indicator or loop cleanly
          scrollToSlide(0, false);
          return;
        }
      }
      scrollToSlide(activeIndex + 1, false);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, totalSlides, scrollToSlide]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current !== null) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="galeria"
      aria-label="Galería de prendas puestas"
      className="py-12 sm:py-16 border-b border-white/[0.08]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
        {/* Header with numeric indicator & arrows (NO DOTS) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Así Quedan Puestas
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA]">
              Desliza horizontalmente o pulsa para recorrer la galería.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-semibold text-[#A1A1AA] tabular-nums tracking-wider">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(totalSlides).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToSlide(activeIndex - 1, true)}
                aria-label="Imagen anterior"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.14] bg-[#161616] text-white hover:border-white/35 active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSlide(activeIndex + 1, true)}
                aria-label="Siguiente imagen"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.14] bg-[#161616] text-white hover:border-white/35 active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Swipeable Track — NO pagination dots underneath */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onTouchStart={() => pauseTemporarily(6000)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slots.map((slot, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={slot.id}
                onClick={() => scrollToSlide(idx, true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToSlide(idx, true);
                  }
                }}
                aria-label={`Ver imagen ${slot.indexLabel}: ${slot.title}`}
                className={`snap-start shrink-0 w-[82%] sm:w-[54%] lg:w-[39%] rounded-2xl overflow-hidden bg-[#161616] border transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] ${
                  isActive ? 'border-white/30' : 'border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Vertical Portrait Frame */}
                <div
                  className={`relative aspect-[4/5] w-full flex flex-col justify-between p-5 border-b border-white/[0.06] ${
                    slot.mediaSrc ? 'bg-[#F4F3EE]' : 'bg-[#111111]'
                  }`}
                >
                  {slot.mediaSrc ? (
                    slot.mediaType === 'video' ? (
                      <video
                        src={slot.mediaSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    ) : (
                      <img
                        src={slot.mediaSrc}
                        alt={slot.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    )
                  ) : (
                    <>
                      {/* Top row inside clean reserved slot */}
                      <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                        <span className="font-display font-bold tracking-widest tabular-nums text-white/70">
                          {slot.indexLabel}
                        </span>
                        <span className="text-[11px] text-[#A1A1AA]">
                          Foto / Clip
                        </span>
                      </div>

                      {/* Center clean empty placeholder */}
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-white/[0.16] bg-[#161616] text-[#A1A1AA]">
                          <Film className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-medium text-white/80">
                          Espacio disponible
                        </span>
                        <span className="mt-1 text-[11px] text-[#A1A1AA]">
                          Listo para cargar tu foto o video
                        </span>
                      </div>

                      {/* Bottom subtle framing indicator */}
                      <div className="flex items-center justify-between text-[11px] text-[#A1A1AA]/75">
                        <span>NOVA Lookbook</span>
                        <span>9:16 / 4:5</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Slot Caption */}
                <div className="p-4 space-y-1">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white truncate">
                    {slot.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] truncate">
                    {slot.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
    }
