import React, { useEffect, useRef, useState } from "react"
import ButtonOne from "./ButtonOne";
import { TiLocationArrow } from "react-icons/ti";
import { BsEmojiDizzy } from "react-icons/bs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Hero = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        if(loadedVideos === totalVideos-1){
            setIsLoading(false);
        }
    }, [loadedVideos])
    

    useGSAP( () => {
        if(hasClicked){
            gsap.set('#next-video', {visibility: 'visible'});

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                duration: 1,
                ease: 'power1.inOut',
                width: '100%',
                height: '100%',
                onStart: () => nextVideoRef.current?.play() 
            });
            
            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            });
        }
    }, {dependencies: [currentIndex], revertOnUpdate: true});
    
    useGSAP(
        () => {
            gsap.set('#video-frame', {
                clipPath: 'polygon(99.75% 16.3%, 74.53% 58.96%, 99.75% 99.75%, 0% 37.31%, 0% 0%)',
                borderRadius: '40% 40% 10% 50%'
            })

            gsap.from('#video-frame', {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                borderRadius: '0 0 0 0 ',
                // duration: '0.5',
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '#video-frame',
                    start: 'center center',
                    end: 'bottom center',
                    scrub: true
                }
            })
        },
        // {dependencies: [loadedVideos], revertOnUpdate: true}
    );

    const totalVideos = 4;
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(prev => ((prev+1)%totalVideos));
        console.log(currentIndex);
    }

    const getVideoUrl = (index:number) => `/videos/hero-${index}.mp4`;


    const handleVideoLoad = () => {
        setLoadedVideos((prev) => (prev+1)%totalVideos);
    }

    return (
        <div id="home" className='relative h-dvh  w-screen overflow-x-hidden'>
            {/* {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )} */}
            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75'>
                <div>
                    <div className='flex justify-center items-center mask-clip-path absolute-center z-50 size-80 cursor-pointer overflow-hidden rounded-lg  vid-player-holder'>
                        <div onClick={handleMiniVideoClick} className="origin-center">

                            <video
                            id= "current-video"
                            src={getVideoUrl((currentIndex+1)%totalVideos) }
                            ref={nextVideoRef} 
                            className="size-64 origin-center object-cover scale-50 opacity-0 transition-all duration-400 ease-in hover:scale-100 hover:opacity-100"
                            loop
                            autoPlay
                            muted
                            onLoadedData={handleVideoLoad}
                            />

                        </div>
                    </div>

                    <video 
                    id="next-video"
                    // id= "current-video"
                    ref={nextVideoRef}
                    src={getVideoUrl(currentIndex) } 
                    loop autoPlay muted
                    className="absolute-center absolute z-20 object-cover object-center size-64 invisible"
                    />
                    
                    <video 
                    // id="current-video"
                    src={getVideoUrl(currentIndex) } 
                    loop 
                    // autoPlay 
                    muted
                    className="absolute left-0 top-0 size-full object-cover object-center ease-in-out duration-400"
                    onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 className="font-glitch text-5xl z-40 absolute bottom-5 right-5 text-blue-75 ">
                    Explore
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-20 px-5 sm:px-10">
                        <h1 className="text-5xl font-glitch text-blue-75">CONQUER <BsEmojiDizzy/></h1>
                        <p className="text-blue-75">Stand amongst the ashes of a <br /> trillion dead souls and ask the ghosts <br /> if honor matters. The silence is your answer."</p>
                        <ButtonOne id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass="bg-yellow-300 flex-center gap-1"/>
                    </div>
                </div>
            </div>

            <h1 className="font-glitch text-5xl absolute bottom-5 right-5 text-black ">
                    Explore
            </h1>

        </div>
    )
}

export default Hero