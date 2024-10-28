import { Logo } from "@commponents/index"
import { useEffect } from 'react';
import anime from 'animejs';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Home = () => {
    useEffect(()=>{
        anime({
            targets: ".button",
            opacity: [0, 1],
            delay: 1110,
            duration: 1000,
    
        })
    },[anime])
    const mainText  = "Welcom e to your to-do list app! <br/> Just add tasks to your list and mark them as  completed when you're done."
    useEffect(() => {
        if (mainText) {
            anime({
                targets: ".char",
                opacity: [0, 1],
                duration: 100,
                delay: anime.stagger(10)
            })
        }
    }, [mainText])
return (
    <div className="h-screen flex justify-center items-center flex-col mr-3 ml-3 relative">
        <motion.div className=" absolute">
        </motion.div>
        <Logo className={"text-6xl mb-10 font-bold text-darkblue "} spanClass={"inline-block text-purple-800"}/>
        <div id="enter-text" className="block text-center mb-4"
                 dangerouslySetInnerHTML={{
                     __html: mainText
                         .split(/(<br\s*\/?>)/g)
                         .map((part) =>
                             part.match(/<br\s*\/?>/)
                                 ? part
                                 : [...part].map((char) => `<span class="char">${char}</span>`).join("")
                         )
                         .join("")
                 }}>
            </div>
        <div className="button mt-3">
            <Link to="/user" className="p-3 rounded-xl bg-sky-600 text-white">
                Get Started
            </Link>
        </div>
    </div>
)
}

export default Home 
