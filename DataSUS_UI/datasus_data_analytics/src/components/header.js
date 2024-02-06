import logo from '../images/datasuslogo.png'
import { useState } from "react"
import {
    LifeBuoy,
    Settings,
  } from "lucide-react"

const Header = () => {

    return(
        <header className="flex pr-2 pl-2 justify-between h-14 w-100 bg-green-100">
            <img
                src={logo}
                className="p-1"
                alt=""
            />
            <div className="border-t flex justify-between p-3 items-center min-w-32">
                <Settings size={20}/>
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