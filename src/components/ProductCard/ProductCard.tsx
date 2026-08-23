import type { Product } from '../../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const buyable = Boolean(product.checkoutUrl)

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-ink">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover brightness-95 transition-all duration-700 ease-editorial group-hover:scale-[1.04] group-hover:brightness-105"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest2 text-smoke">
          {product.category}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display uppercase text-xl leading-none">{product.name}</h3>
          <p className="mt-2 font-mono text-xs text-smoke">{product.producer}</p>
        </div>
        <span className="font-mono text-sm text-bone">
          ${product.price} {product.currency}
        </span>
      </div>

      <p className="mt-3 font-body text-sm text-smoke">{product.description}</p>

      <a
        href={buyable ? product.checkoutUrl : undefined}
        target={buyable ? '_blank' : undefined}
        rel={buyable ? 'noreferrer' : undefined}
        aria-disabled={!buyable}
        className={`link-underline eyebrow mt-4 inline-flex w-fit translate-y-0 opacity-90 transition-all duration-300 ${
          buyable
            ? 'text-bone/80 hover:text-bone hover:opacity-100'
            : 'pointer-events-none text-smoke/60'
        }`}
      >
        {buyable ? 'Comprar ahora →' : 'Próximamente'}
      </a>
    </div>
  )
}
