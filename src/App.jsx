import RainEffect from './components/RainEffect'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import TodayPoem from './components/TodayPoem'
import Shortform from './components/Shortform'
import Archive from './components/Archive'
import Community from './components/Community'
import Mission from './components/Mission'
import Roadmap from './components/Roadmap'
import Pricing from './components/Pricing'
import Subscribe from './components/Subscribe'
import Crisis from './components/Crisis'
import Footer from './components/Footer'
import AmbientToggle from './components/AmbientToggle'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a08] text-ink-100">
      <RainEffect intensity={18} />
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <TodayPoem />
        <Shortform />
        <Archive />
        <Community />
        <Mission />
        <Roadmap />
        <Pricing />
        <Subscribe />
        <Crisis />
      </main>
      <Footer />
      <AmbientToggle />
    </div>
  )
}
