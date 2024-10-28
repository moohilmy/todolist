import { Logo } from "@commponents/index";
import ListItems from "@commponents/ListItems/ListItems";
import  { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { motion ,AnimatePresence} from "framer-motion"
import { useAppSelector } from "@store/hooks";
const ProfileLayout = () => {
  const [togleList, setTogleList] = useState(false);
  const {user} = useAppSelector(state => state.auth)

  const listHandler = () => {
    setTogleList((prev) => !prev);
  };
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const togleClass = togleList ? 'sm:col-span-9' : 'sm:col-span-12' 

  return (
    <div className="h-full">
      <header className="w-full z-50 border-b-black border-b-2 bg-lightblue p-3 flex item-center text-center">
        <i
          onClick={() => listHandler()}
          className="bi bi-list"
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></i>
        <div className="userInfo ml-4">
          <div>welcome, {user?.firstName}</div>
          <span className="text-gray-500 text-xs font-light block">
            {user?.userName}
          </span>
        </div>
      </header>
      <motion.main
      initial={{ opacity: 0 , x: -300}}
      animate={{ opacity: 1 , x: 0}}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.2, ease: "linear" }} 
      className=" grid grid-cols-12 h-[calc(100vh-70.600px)]">
      <AnimatePresence  mode="popLayout">
        {togleList && (
          <motion.div
          initial={width <= 640 ? { x: 0, y: -300 } : { x: -300, y: 0 }}
          animate={{ x: 0, y: 0  }}
          exit={width <= 640 ? { x: 0, y: -300 } : { x: -300, y: 0,}}
          transition={{ duration: .2, esae: "linear" }} className="sm:col-span-3 col-span-full px-5  bg-lightblue">
            <ul className="flex flex-col mx-2 pb-6">
              <Logo className="cursor-pointer font-bold text-3xl text-darkblue text-center my-6"
                spanClass="inline-block text-purple-800"
              />
              <ListItems />
            </ul>
          </motion.div>
        ) }
        </AnimatePresence>
        <div className={`${togleClass} col-span-12`}>
          <Outlet/>
        </div>
      </motion.main>
    </div>
  );
};

export default ProfileLayout;
