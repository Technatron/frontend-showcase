import Hero from './components/Hero'
import About from './components/About'
import NavBar from './components/NavBar'
import Features from './components/Features'
import ExperienceSection from './components/ExperienceSection'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <main className='relative min-h-min w-screen overflow-x-hidden'>
      <NavBar/>
      <Hero/>
      <About/>
      <Features/>
      <ExperienceSection/>
      <Contact/>
      <Footer/>
    </main>
    </>
  )
}

export default App