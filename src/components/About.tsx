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
                    // markers: true
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
            <h2 className="font-circular-web text-sm md:text-[10px]">Welcome to the digital haven</h2>
            
            <AnimatedTitle title={"Teamp-up <br /> Defeat the world boss <br /> with your friends "} containerClass={"mt-5 text-black! text-center !text-5xl "}/>

            <div className="about-subtext ">
                <p className="font-dancing"> Your adventure begins </p>
                <p className="font-dancing"> Meet fellow adventurers <br /> from all over the world </p>
            </div>
        </div>

        <div id="clip" className="h-dvh w-screen ">
            <div className="mask-clip-path about-image">
                <img 
                src="img/about.webp"
                alt="Background" 
                className="absolute left-0 top-0 size-full object-cover"
                />
            </div>
        </div>
    </div>
  )
}

export default About