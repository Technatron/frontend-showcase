import ButtonOne from "./ButtonOne"

const ImageClipper = ({src, styleClass}) => {

    return(
        <div className={styleClass}>
            <img src={src} alt="contact  " />
        </div>
    )
}


const Contact = () => {
  return (
    <div 
    id="contact"
    className="my-20 min-h-96  w-screen px-10"
    >
        <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden min-h-120">
            <div className="absolute -left-20 top-0 hidden h-full sm:block lg:left-20 lg: w-96">
            
                <ImageClipper src={`${import.meta.env.BASE_URL}/img/contact-1.webp`} styleClass={"contact-clip-path-1 absolute -left-20 top-0 hidden h-full w-72  overflow-hidden  sm:block lg:left-20 lg: w-96"}/>
                <ImageClipper src={`${import.meta.env.BASE_URL}/img/contact-2.webp`} styleClass={"contact-clip-path-2 lg:translate-y-40 translate-y-60"}/>
            </div>
            <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
                <ImageClipper src={`${import.meta.env.BASE_URL}/img/swordman-partial.webp`} styleClass={" absolute md:scale-125"}/>
                <ImageClipper src={`${import.meta.env.BASE_URL}/img/swordman.webp`} styleClass={"sword-man-clip-path md:scale-125"}/>
            </div>

            <div className="flex flex-col items-center text-center">
                <p className="font-general text-[10px] uppercase">Innovation</p>
                <p className="font-bold mt-10 w-full font-general text-5xl z-10 leading-[0.9] md:text-[5rem]"> Let's collaborate and solve real <br /> world problems</p>

                <ButtonOne 
                id={"contact-button"}
                containerClass={"mt-10 cursor-pointer "} 
                title={"CONTACT US"}
                leftIcon={""}
                />
            </div>

        </div>
    </div>
  )
}

export default Contact