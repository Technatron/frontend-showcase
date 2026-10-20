import { FaGithubSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";


const Footer = () => {
    // Create An area of object each object contains URL and An icon From react icon library Full Add at least Object in the array
    const socialMediaLinks = [
        {
            url: "https://github.com",
            icon: <FaGithubSquare/>
        },
        {
            url: "https://twitter.com",
            icon: <FaTwitter/>
        },
        {
            url: "https://linkedin.com",
            icon: <BsLinkedin/>
        },
        {
            url: "https://instagram.com",
            icon: <IoLogoInstagram/>
        },
        {
            url: "https://facebook.com",
            icon: <FaFacebook/>
        },
    ]
    
    
  return (
    <footer className="w-screen py-4 bg-violet-600 text-black">
        <div className="container mx-auto flex  flex-col items-center justify-between gap-5 px-5 ">
            <p className="text-center text-sm md:text-left">&copy; 2024 Showcase. All rights reserved.</p>
            <div className="flex flex-row gap-2 justify-center">
                {socialMediaLinks.map( item => (
                    <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer " className="transition-colors ease-in-out duration-500 hover:text-white">{item.icon}</a>
                ))}
            </div>

            <a id="#end" className="text-center hover:underline transition-all ease-in-out duration-300"> Privacy policy</a>
        </div>
    </footer>
  )
}

export default Footer