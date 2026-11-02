import { lazy, Suspense } from 'react'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ArtistsSection from './components/ArtistsSection/ArtistsSection'
import LatestRelease from './components/LatestRelease/LatestRelease'
import AboutSection from './components/AboutSection/AboutSection'
import ServicesSection from './components/ServicesSection/ServicesSection'
import StoreSection from './components/StoreSection/StoreSection'
import DiscordBanner from './components/DiscordBanner/DiscordBanner'
import ContactCTA from './components/ContactCTA/ContactCTA'
import Footer from './components/Footer/Footer'
import ChapterRail from './components/Experience/ChapterRail'
import DioramasScroll from './components/Experience/DioramasScroll'

const DioramasWorld = lazy(() => import('./components/Experience/DioramasWorld'))

function App() {
  return (
    <div className="experience-shell relative min-h-screen bg-void">
      <Suspense fallback={null}>
        <DioramasWorld />
      </Suspense>
      <DioramasScroll />
      <Header />
      <ChapterRail />
      <main className="relative z-10">
        <Hero />
        <ArtistsSection />
        <LatestRelease />
        <AboutSection />
        <ServicesSection />
        <StoreSection />
        <DiscordBanner />
        <ContactCTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
