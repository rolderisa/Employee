import { logout } from '@/redux/slices/userReducer'
import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { MdDashboard } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='w-2/12 flex flex-col min-h-screen bg-slate-200/70 px-4 pt-14'>
            <span className='font-bold text-xl text-center'>Employee MS</span>
            <div className='my-4 flex flex-col'>
                <Link to={"/"} className='flex items-center rounded-lg p-3 hover:bg-slate-300/60'>
                    <MdDashboard size={23} className='text-slate-400' />
                    <span className='ml-2 text-lg text-slate-700'>Dashboard</span>
                </Link>
            </div>
            <button onClick={handleLogout} className='flex items-center rounded-lg p-3 hover:bg-slate-300/60'>
                <BiLogOut size={23} className='text-slate-400' />
                <span className='ml-2 text-lg text-slate-700'>Logout</span>
            </button>

        </div>
    )
}

export default Sidebar