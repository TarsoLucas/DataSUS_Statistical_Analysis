import logo from '../images/datasuslogo.png'
import { useState } from "react"
import {
    LifeBuoy,
    Sun,
    Moon
  } from "lucide-react"

const Header: React.FC = () => {

    let dark: boolean = false;

    return(
        <header className="flex pr-2 pl-2 justify-between h-14 bg-emerald-200">
            <img
                src={logo}
                className="p-1 max-w-40"
                alt=""
            />
            <div className="border-t flex justify-between p-3 items-center min-w-32">
                {dark ? <Moon size={20}/> : <Sun size={20} />}
                
                
                <LifeBuoy size={20}/>
                <img
                    src="https://ui-avatars.com/api/?name=John+Doe"
                    alt=""
                    className="w-10 h-10 rounded-full"
                />
            </div>            
        </header>
    )
}

export default Header;