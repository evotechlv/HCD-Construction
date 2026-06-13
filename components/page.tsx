import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Reviews } from "@/components/reviews"
import { CTA } from "@/components/cta"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppFab } from "@/components/whatsapp-fab"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Projects />
      <Reviews />
      <CTA />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </main>
  )
}
