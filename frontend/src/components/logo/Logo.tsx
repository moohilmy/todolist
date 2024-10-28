import { useNavigate } from "react-router";
const Logo = ({ className , spanClass  } : { className: string; spanClass?: string }) => {
  const navigate = useNavigate()
  return <div onClick={() => navigate('/')} className={className}>To <span className={spanClass}>Do</span> List</div>
}

export default Logo
