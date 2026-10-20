import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

const ExperienceSection = () => {

    const expRef = useRef(null);

    const handleMouseIn = (e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 10;
        const moveY = (y - centerY) / 10;

        target.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${moveY}deg)`;

    }
    const handleMouseOut = () => {}


    return (
        <section className="min-h-dvh w-screen bg-black">
            <div className="flex size-full flex-col items-center py-10 pb-30 text-blue-50 ">
                <p className=" font-general uppercase text-sm md:text-lg max-w-60 sm:max-w-100  md:max-w-300">A journey of making mistakes, learning and professional growth</p>

                <div className="relative size-full">
                    <AnimatedTitle 
                    title={" The precursor to the beginning"} 
                    containerClass="mt-9 pointer-events-none mix-blend-difference relative z-10 font-glitch"
                    />

                    <div className="story-img-container">
                        <div className="story-img-mask">
                            <div className="story-img-content">
                                <img
                                    ref={expRef}
                                    className="object-contain "
                                    src={"/img/entrance.webp"} alt="experience"
                                    onMouseMove={handleMouseIn}
                                    onMouseLeave={handleMouseOut}
                                    onMouseUp={handleMouseOut}
                                    onMouseDown={handleMouseOut}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div>
                        <div className="absolute bottom-10 left-0 right-0 mx-auto w-max rounded-full border border-blue-50 bg-transparent p-1 text-blue-50 backdrop-blur-sm">
                            <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-8.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div> */}

                    <div></div>
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection;