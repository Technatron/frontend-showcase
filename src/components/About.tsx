import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

const About = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(
        () => {
            const clipAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: "#clip",
                    start: "center center",
                    end: "+=800 center",
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true
                }
            })

            clipAnimation.to('.mask-clip-path', {
                width: '100vw',
                height: '100vh',
                borderRadius: 0
            })
        }
    );
  return (
    <div id='about' className='min-h-screen w-screen relative'>
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
            <h2 className="font-circular-web text-sm md:text-[17px]">Welcome to yourdigital haven</h2>
            
            <AnimatedTitle title={"Teamp-up <br /> Defeat the world boss <br /> with your friends "} containerClass={"text-black! text-center !text-5xl font-circular-web"}/>

            <div className="about-subtext">
                <p className="font-circular-web"> Talos: The Bronze Giant Automaton </p>
                <p className="font-circular-web text-2xl"> 
                    Forged from bronze by Hephaestus and gifted to King Minos of Crete by Zeus or Minos himself.
                </p>
            </div>
        </div>

        <div id="clip" className="h-dvh w-screen ">
            <div className="mask-clip-path about-image">
                <img 
                src={`${import.meta.env.BASE_URL}/img/boss.png`}
                alt="Background" 
                className="absolute left-0 top-0 size-full object-cover"
                />
            </div>
        </div>
    </div>
  )
}

export default About