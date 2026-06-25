import RainEffect from './components/RainEffect'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import TodayPoem from './components/TodayPoem'
import Archive from './components/Archive'
import Mission from './components/Mission'
import Pricing from './components/Pricing'
import Subscribe from './components/Subscribe'
import Crisis from './components/Crisis'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a08] text-ink-100">
      <RainEffect intensity={18} />
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <TodayPoem />
        <Archive />
        <Mission />
        <Pricing />
        <Subscribe />
        <Crisis />
      </main>
      <Footer />
    </div>
  )
}
