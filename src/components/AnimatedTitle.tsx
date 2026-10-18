import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger);
const AnimatedTitle = ({title, containerClass}) => {


    const containerRef = useRef(null);

    // useEffect(() => {
    //     const ctx  = gsap.context(()=>{
    //         gsap.set('.animated-word', {
    //             opacity: 0,
    //             transform: 'translate3d(0, 100px, -100px) rotateY(-60deg) rotateX(60deg)',
    //         });
    //         const titleAnimation = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: containerRef.current,
    //                 start: '100 bottom',
    //                 end: 'center bottom',
    //                 toggleActions: 'play none none reverse'                    
    //             }
            
    //         })
    //         titleAnimation.to('.animated-word', {
    //             opacity: 1,
    //             transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
    //             ease: 'power1.inOut',
    //             stagger: 0.02
    //         })
    //     }, containerRef);
    //     return () => ctx.revert(); 
    // }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray('.animated-word') as HTMLElement[];

            gsap.fromTo(words,
                {
                    opacity: 0,
                    x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
                    y: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
                    rotation: () => (Math.random() - 0.5) * 360,
                    scale: () => Math.random() * 2 + 0.5,
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    ease: 'power3.out',
                    duration: 2,
                    stagger: {
                        amount: 0.8,
                        from: 'random',
                    },
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: '50 bottom',
                        end: 'center bottom',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    
  return (
    <div 
    ref={containerRef}
    className={`animated-title ${containerClass} `}>
        {
            title.split('<br />').map( (item, index) => (
                <div key={index} className="flex-center  max-w-full flex-wrap gap-2 px-10 md:gap-3">
                    {item.split(' ').map((word, i) => (
                        <span key={i} className="animated-word" dangerouslySetInnerHTML={{ __html: word}} />
                    ))}
                </div>
            ))
        }
    </div>
  )
}

export default AnimatedTitle