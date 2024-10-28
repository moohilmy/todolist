import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const BackBtn = ({massage ,className}: {massage: string , className: string }) => {
  let navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`cursor-pointer text-darkblue text-center text-xl  ${className}`}
      onClick={handleBackClick}
    >
      {massage}
    </motion.div>
  );
};

export default BackBtn;
