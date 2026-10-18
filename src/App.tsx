import Hero from './components/Hero'
import About from './components/About'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <>
    <main className='relative min-h-min w-screen overflow-x-hidden'>
      <NavBar/>
      <Hero/>
      {/* <section className='z-0 min-h-screen'></section> */}
      <About/>
    </main>
    </>
  )
}

export default App