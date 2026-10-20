import { useRef, useState } from "react";
import { RxCursorArrow } from "react-icons/rx";
import { TbSnowflake } from "react-icons/tb";


const CardTilted = ({ children, className = ''}) => {

    const [transformStyle, setTransformStyle] = useState("");
    const CardRef = useRef<HTMLDivElement>(null);

    const handleMouseIn = (e) => {
        if(!CardRef.current) return;

        setTransformStyle(
`perspective(900px) rotateX(${-(e.nativeEvent.offsetY - CardRef.current.clientHeight / 2) / 20}deg) rotateY(${(e.nativeEvent.offsetX - CardRef.current.clientWidth / 2) / 20}deg) scale3d(0.97, 0.97, 0.97)`
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
        <div className="relative size-full text-white text-2xl">
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
                <p className="text-white font-circular-web text-lg">Saransh leveraged the following technologies to design, develop and maintain these projects</p>
                <p className="text-blue-50 max-w-xl font-circular-web text-lg opacity-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores est molestias aliquam iste veritatis nam illum, quis temporibus tenetur accusantium magnam recusandae nisi aut iure praesentium ipsum, aspernatur suscipit? Quaerat.</p>

                <CardTilted className="border-hsla relative mt-10 mb-7 h-96 w-full overflow-hidden rounded-md  md:h-[65vh]">
                    <BentoCardComponent
                    src = {`${import.meta.env.BASE_URL}/videos/feature-1.mp4`}
                    title = {"Dashboard"}
                    description = {"Your personal Dashboard powered by React"}
                    isComingSoon
                    />
                </CardTilted>

                {/* <div className=" overflow-hidden  h-120 flex flex-col  lg:flex-row md:min-h-fit gap-1">
                    <div className="border-hsla rounded-md bento-left object-cover lg:w-[50%] sm:w-full h-[100%]">
                        <BentoCardComponent
                        src={"/videos/feature-2.mp4"}
                        title={"Beyond Excelence"}
                        description={""}
                        isComingSoon
                        />
                    </div>
                    <div className="bento-right  bg-slate-600 lg:w-[50%] sm:w-full min-h-min flex flex-col">
                        <div className="bento-right-one h-full w-full bg-amber-700 md:h-[50%] sm:w-full"></div>
                        <div className="bento-right-two h-full w-full bg-amber-300 md:h-[50%] sm:w-full"></div>
                    </div>
                </div> */}

                <div className="flex flex-col md:flex-row overflow-hidden gap-3" style={{ height: 'auto', minHeight: '400px' }}>
                    <CardTilted className="border-hsla rounded-md w-full md:w-1/2 h-64 md:h-auto">
                        <BentoCardComponent
                            src={`${import.meta.env.BASE_URL}/videos/feature-2.mp4`}
                            title={"Beyond Excellence"}
                            description={""}
                            isComingSoon
                        />
                    </CardTilted>
                    <div className="flex flex-col w-full md:w-1/2 gap-2">
                        <CardTilted className=" border-hsla h-64 lg:h-1/2 w-full rounded-md overflow-hidden">
                            <BentoCardComponent
                                src={`${import.meta.env.BASE_URL}/videos/feature-3.mp4`}
                                title={"Title Two"}
                                description={""}
                                isComingSoon
                            />
                        </CardTilted>
                        <CardTilted className="border-hsla h-64 lg:h-1/2 w-full rounded-md overflow-hidden">
                            <BentoCardComponent
                                src={`${import.meta.env.BASE_URL}/videos/feature-4.mp4`}
                                title={"Title Three"}
                                description={""}
                                isComingSoon
                            />
                        </CardTilted>
                    </div>
                </div>

                <div className="feature-row min-h-70 mt-10 flex gap-5 ">
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