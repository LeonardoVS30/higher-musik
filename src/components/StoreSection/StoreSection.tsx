import Reveal from '../shared/Reveal'
import ProductCard from '../ProductCard/ProductCard'
import { products } from '../../data/products'

export default function StoreSection() {
  return (
    <section id="store" className="relative py-12 md:py-16">
      <div className="container-hm">
        <Reveal>
          <p className="eyebrow mb-4">06 — Higher Store</p>
          <h2 className="display-huge text-4xl sm:text-5xl md:text-6xl">Higher Store</h2>
          <p className="mt-4 max-w-md font-body text-smoke">
            Sonidos hechos para el próximo tema.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-12 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
