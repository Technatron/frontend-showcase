import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

const ExperienceSection = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current || !contentRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width * -25;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height * -25;
        contentRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.08)`;
        contentRef.current.style.transition = 'none';
    }

    const handleMouseOut = () => {
        if (!contentRef.current) return;
        contentRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
        contentRef.current.style.transition = 'transform 0.6s ease';
    }

    return (
        <section className="min-h-dvh w-screen bg-black">
            <div className="flex size-full flex-col items-center py-10 pb-30 text-blue-50 ">
                <p className=" font-general uppercase text-sm md:text-lg max-w-60 sm:max-w-100  md:max-w-300"></p>

                <div className="relative size-full">
                    <AnimatedTitle 
                    title={" The precursor to the beginning"} 
                    containerClass="mt-9 pointer-events-none mix-blend-difference relative z-10 font-glitch"
                    />

                    <div className="story-img-container" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseOut}>
                        <div className="story-img-mask">
                            <div className="story-img-content" ref={contentRef}>
                                <img
                                    className="object-contain"
                                    src={`${import.meta.env.BASE_URL}/img/entrance.webp`} alt="experience"
                                />
                            </div>
                        </div>
                    </div>

                    <div></div>
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection;
