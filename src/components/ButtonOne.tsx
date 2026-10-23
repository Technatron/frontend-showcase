
const ButtonOne = ({id, title, leftIcon, containerClass}) => {
  return (
    <>
    <div>
        <button id={id} className= {` group relative z-10 w-fit cursor-pointer overflow-hidden bg-violet-50 rounded-full px-7 py-3 text-black ${containerClass}`} >
          {leftIcon}
          <span className="relative incline-flex overflow-hidden font-cedarville font-bold text-xs ">{title}</span>  
        </button>
    </div>
    </>
  )
}

export default ButtonOne