import { Outlet } from 'react-router'

const AuthLayout = () => {
return (
    <div className='flex flex-col justify-center relative p-5 h-screen'>
        <Outlet/>
    </div>
)
}

export default AuthLayout
