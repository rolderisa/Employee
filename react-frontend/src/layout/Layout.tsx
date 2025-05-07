import CreateEmployee from '@/components/CreateEmployee';
import { CommonContext } from '@/context';
import React, { useContext } from 'react';

const Layout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {

    const { showCreateEmployee } = useContext(CommonContext)

    return (
        <div className="w-full flex flex-col min-h-screen justify-between bg-[#f3f6fa]">
            {showCreateEmployee && <CreateEmployee />}
            {children}
        </div>
    )
}

export default Layout