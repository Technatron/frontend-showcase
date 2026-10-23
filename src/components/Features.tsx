import { useRef, useState } from "react";
import { RxCursorArrow } from "react-icons/rx";
import { TbSnowflake } from "react-icons/tb";


const CardTilted = ({ children, className = ''}) => {

    const [transformStyle, setTransformStyle] = useState("");
    const CardRef = useRef<HTMLDivElement>(null);

    const handleMouseIn = (e) => {
        if(!CardRef.current) return;

        setTransformStyle(
`perspective(900px) rotateX(${-(e.nativeEvent.offsetY - CardRef.current.clientHeight / 2) / 20}deg) rotateY(${(e.nativeEvent.offsetX - CardRef.current.clientWidth / 2) / 20}deg) scale3d(0.95 , 0.95, 0.95)`
        );
    }
    const handleMouseOut = () => setTransformStyle('');

    return(
        <div
        className={className} 
        ref={CardRef} 
        onMouseMove={handleMouseIn} 
        onMouseLeave={handleMouseOut}
        style={{transform: transformStyle}}
        >
            {children}
        </div>
    )
}


const BentoCardComponent = ({src, title, description, isComingSoon}) => {

    return(
        <div id="features" className="relative size-full text-white text-2xl">
            <video
            className="absolute size-full object-cover object-center top-0 left-0"
            autoPlay
            loop
            src={src}
            muted
            />
            <div className="z-50 absolute p-8 font-cedarville">
                <h1 className="">{title}</h1>
                {description && 
                <p className="text-lg opacity-50">{description}</p>
                }
            </div>
        </div>
    )
}

const Features = () => {
  return (
    <div
    className=" bg-black "
    >
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-8 py-32 md:px-1">
                <p className="text-white font-circular-web text-lg">

                </p>
                <p className="text-blue-50 max-w-xl font-circular-web text-lg opacity-50">
                    
                </p>

                <CardTilted className="border-hsla relative mt-10 mb-7 h-96 w-full overflow-hidden rounded-md  md:h-200">
                    <BentoCardComponent
                    src = {`${import.meta.env.BASE_URL}/videos/feature-1.mp4`}
                    title = {"Dashboard"}
                    description = {"Your personal Dashboard powered by React"}
                    isComingSoon
                    />
                </CardTilted>

                <div id="triple-card-container" className="
                h-200
                flex flex-col md:flex-row gap-5 
                overflow-hidden" 
                >
                    <CardTilted className="border-hsla rounded-md w-full md:w-1/2 h-64 md:h-auto">
                        <BentoCardComponent
                            src={`${import.meta.env.BASE_URL}/videos/feature-2.mp4`}
                            title={"Custom Avatar"}
                            description={""}
                            isComingSoon
                        />
                    </CardTilted>
                    <div className="flex flex-col w-full md:w-1/2 gap-5">
                        <CardTilted className=" border-hsla h-64 lg:h-1/2 w-full rounded-md overflow-hidden">
                            <BentoCardComponent
                                src={`${import.meta.env.BASE_URL}/videos/feature-3.mp4`}
                                title={"Join or make your own guild"}
                                description={""}
                                isComingSoon
                            />
                        </CardTilted>
                        <CardTilted className="border-hsla h-64 lg:h-1/2 w-full rounded-md overflow-hidden">
                            <BentoCardComponent
                                src={`${import.meta.env.BASE_URL}/videos/feature-4.mp4`}
                                title={"Choose your loyal Companion"}
                                description={""}
                                isComingSoon
                            />
                        </CardTilted>
                    </div>
                </div>

                <div className="feature-row min-h-70 mt-5 flex gap-5 ">
                    <CardTilted className="border-hsla w-1/2 rounded-md bg-purple-700 p-10 flex justify-between">
                        <p className="font-glitch max-w-0 text-3xl md:text-4xl lg:text-5xl"> Make your own rules</p>
                        <span  className="self-end text-blue-300 hover:rotate-360 hover:-translate-y-20 transition-all ease-in-out duration-900 opacity-0 md:opacity-100 md:size-25 lg:size-25">
                        <TbSnowflake size={"inherit"}/>
                        </span>
                    </CardTilted>
                    <CardTilted className="border-hsla w-1/2 rounded-md ">
                        <video src={`${import.meta.env.BASE_URL}/videos/feature-5.mp4`}
                        className="object-cover size-full object-center rounded-md"
                        autoPlay
                        loop
                        />
                    </CardTilted>
                </div>

            </div>  
        </div>
    </div>
  )
}

export default Features;