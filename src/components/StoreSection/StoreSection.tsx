import Reveal from '../shared/Reveal'
import ProductCard from '../ProductCard/ProductCard'
import { products } from '../../data/products'

export default function StoreSection() {
  return (
    <section id="store" className="section-luxe relative">
      <div className="container-hm">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">06 — Higher Store</p>
              <h2 className="section-title">Higher Store</h2>
            </div>
            <p className="max-w-md font-body text-smoke md:col-span-4 md:pb-2">
              Herramientas sonoras diseñadas dentro del universo Higher.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="lg:col-span-7">
            <ProductCard product={products[0]} featured />
          </Reveal>

          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            {products.slice(1).map((product, index) => (
              <Reveal key={product.id} delay={index * 0.07}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
