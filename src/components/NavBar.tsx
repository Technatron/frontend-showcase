import { useEffect, useRef, useState } from "react"
import ButtonOne from "./ButtonOne";
import { TiLocationArrow } from "react-icons/ti";

const NavBar = () => {

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    const NavRef = useRef(null);
    const AudioRef = useRef<HTMLAudioElement>(null);

    //options on a navbar for an MMORPG website
    const navOptions = [
        {id: 1, title: 'Home'},
        {id: 2, title: 'Products'},
        {id: 3, title: 'Services'},
        {id: 4, title: 'About'},
        {id: 5, title: 'Contact'},
    ]

    const toggleAudioIndicator = () => {
        setIsAudioPlaying( prev => !prev);
        setIsIndicatorActive( prev => !prev);
    };

    useEffect(() => {
        if(isAudioPlaying){
            AudioRef.current?.play();
        }else{
            AudioRef.current?.pause();
        }
    }, [isAudioPlaying])
    

    return (
        <div
        ref={NavRef}
        className="fixed z-50 top-4 h-16 border-none transition-all duration-700 sm:inset-x-6 "
        >
            <header
            className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="logo" className="w-10" />
                        <ButtonOne
                        id="product-button"
                        title="Products"
                        containerClass= "bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        leftIcon={<TiLocationArrow/>}
                        />
                    </div>

                    <div 
                    className="flex h-full items-center">
                        <div className=" hidden md:block">
                            {navOptions.map( (item) => (
                                <a
                                className="nav-hover-btn"
                                key={item.id} 
                                href={`#${item.title.toLocaleLowerCase()}`}
                                >{item.title}</a>
                            ))}
                        </div>

                       <button
                       className="ml-10 flex  items-center space-x-0.5  px-4 py-1 "
                       onClick={toggleAudioIndicator}
                       >
                        <audio 
                        src="/audio/loop.mp3" 
                        ref={AudioRef}
                        className="hidden"
                        loop
                        />
                        {
                            // [1, 2, 3, 4].map( num => (
                            //     <div 
                            //     key={num}
                            //     className={`indicator-line ${isIndicatorActive? 'active': ""}`}
                            //     style={{animationDelay: `${num*0.1}s`}
                            //     }
                            //     >
                            //     </div>
                            // ))
                            [1, 2, 3, 4].map(num => (
                              <div
                                key={num}
                                className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                style={{ '--animation-order': `${num * 0.1}s` } as React.CSSProperties}
                              />
                            ))

                        }
                       </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default NavBar