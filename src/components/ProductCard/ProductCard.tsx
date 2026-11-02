import type { Product } from '../../types'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const buyable = Boolean(product.checkoutUrl)

  if (featured) {
    return (
      <article className="glass-panel group relative min-h-[620px] overflow-hidden md:min-h-[760px]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover grayscale-[18%] transition-all duration-1000 ease-editorial group-hover:scale-[1.025] group-hover:grayscale-0"
          onError={(event) => {
            ;(event.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 md:p-8">
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone/70">
            Featured · {product.category}
          </span>
          <span className="font-mono text-sm text-bone">
            {buyable ? `${product.price} ${product.currency}` : ''}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/50">
            {product.producer}
          </p>
          <h3 className="mt-4 font-display text-[clamp(4rem,9vw,9rem)] uppercase leading-[0.82] tracking-tightest">
            {product.name}
          </h3>
          <div className="mt-7 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end">
            <p className="max-w-md font-body text-smoke">{product.description}</p>
            {buyable ? (
              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="link-underline font-mono text-[10px] uppercase tracking-widest2 text-bone"
              >
                Comprar ahora →
              </a>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone/[0.55]">
                Próximamente
              </span>
            )}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="premium-card group grid grid-cols-[minmax(118px,38%)_1fr] gap-5 border-t border-white/[0.12] pt-5 sm:grid-cols-[minmax(150px,38%)_1fr]">
      <div className="media-frame relative aspect-square overflow-hidden bg-ink">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[15%] transition-all duration-1000 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest2 text-smoke">
          {product.category}
        </span>
      </div>

      <div className="flex min-w-0 flex-col justify-center py-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest2 text-bone/40">
              {product.category}
            </p>
            <h3 className="mt-3 font-display text-2xl uppercase leading-none sm:text-3xl">
              {product.name}
            </h3>
          </div>
          <span className="whitespace-nowrap font-mono text-xs text-bone">
            {buyable ? `${product.price} ${product.currency}` : ''}
          </span>
        </div>
        <p className="mt-4 line-clamp-2 font-body text-sm leading-relaxed text-smoke">
          {product.description}
        </p>
        {buyable ? (
          <a
            href={product.checkoutUrl}
            target="_blank"
            rel="noreferrer"
            className="link-underline mt-5 w-fit font-mono text-[9px] uppercase tracking-widest2 text-bone"
          >
            Comprar ahora →
          </a>
        ) : (
          <span className="mt-5 font-mono text-[9px] uppercase tracking-widest2 text-bone/[0.45]">
            Próximamente
          </span>
        )}
      </div>
    </article>
  )
}
