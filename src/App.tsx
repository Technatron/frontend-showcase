import Hero from './components/Hero'
import About from './components/About'
import NavBar from './components/NavBar'
import Features from './components/Features'

const App = () => {
  return (
    <>
    <main className='relative min-h-min w-screen overflow-x-hidden'>
      <NavBar/>
      <Hero/>
      {/* <section className='z-0 min-h-screen'></section> */}
      <About/>
      <Features/>
    </main>
    </>
  )
}

export default App