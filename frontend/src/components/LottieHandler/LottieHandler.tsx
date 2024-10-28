import notFound from '../../assets/lottieFiles/404Error.json'
import forbidden from '../../assets/lottieFiles/403Error.json'
import networkError from '../../assets/lottieFiles/networkError.json'
import loading from '../../assets/lottieFiles/loading.json'
import Lottie from 'lottie-react'
const lottieFilesMap = {
    notFound,
    forbidden,
    networkError,
    loading
}
type LottieHandleProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
    className?: string;
}
const LottieHandler = ({type, message , className}:LottieHandleProps ) => {
    const lottie = lottieFilesMap[type]
  return (
    <div className='h-screen'>
      <div className={` flex justify-center items-center flex-col h-full ${className}`}>
        <Lottie animationData={lottie} />
      {message && <h3 >{message}</h3>}
      </div>
    </div>
  )
}

export default LottieHandler
