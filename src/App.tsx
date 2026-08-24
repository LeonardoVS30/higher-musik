import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ArtistsSection from './components/ArtistsSection/ArtistsSection'
import LatestRelease from './components/LatestRelease/LatestRelease'
import AboutSection from './components/AboutSection/AboutSection'
import VisualGallery from './components/VisualGallery/VisualGallery'
import ServicesSection from './components/ServicesSection/ServicesSection'
import StoreSection from './components/StoreSection/StoreSection'
import DiscordBanner from './components/DiscordBanner/DiscordBanner'
import SocialLinks from './components/SocialLinks/SocialLinks'
import PlaylistSection from './components/PlaylistSection/PlaylistSection'
import ContactCTA from './components/ContactCTA/ContactCTA'
import Footer from './components/Footer/Footer'
import ChapterRail from './components/Experience/ChapterRail'

function App() {
  return (
    <div className="experience-shell relative min-h-screen bg-void">
      <Header />
      <ChapterRail />
      <main className="relative z-10">
        <Hero />
        <ArtistsSection />
        <LatestRelease />
        <AboutSection />
        <VisualGallery />
        <ServicesSection />
        <StoreSection />
        <DiscordBanner />
        <SocialLinks />
        <PlaylistSection />
        <ContactCTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
