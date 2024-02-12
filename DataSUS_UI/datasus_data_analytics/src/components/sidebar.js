import { ChevronFirst, ChevronLast } from "lucide-react"
import React, { createContext, useContext, useState } from "react"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)

    return(
        <aside className="h-screen">
            <nav className="h-full max-h-dvh flex-grow flex flex-col bg-white border-r shadow-sm">
                <SidebarContext.Provider value={{ expanded }}> 
                    <ul className="flex-1 px-3">
                        {React.Children.map(children, (child, index) =>
                            React.cloneElement(child)
                        )}
                    </ul>
                </SidebarContext.Provider>
                <div className="p-4 pb-2 flex items-center">
                    <button
                        onClick={() => setExpanded(curr => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-auto">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
            </nav>

        </aside>
    )
};

export function SidebarItem({ icon, text, alert, children, onClick }) {
    const {expanded} = useContext(SidebarContext)
    const [clicked, setClicked] = useState(true)
    const [clickedItem, setClickedItem] = useState(null)

    return (
        
        <div className="flex flex-col relative" style={{maxHeight: "93vh"}}>
            <li onClick={onClick}
                 className={`
                    relative flex items-center py-2 pl-2 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    hover:bg-green-100 text-gray-600 transition-all max-h-24
                 `}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${
                        expanded ? "w-32 ml-3" : "w-0"
                    }`}
                >
                    {text}
                </span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-green-400 ${expanded ? "":"top-2"}`} />
                )}
                {!expanded && (
                    <div
                    className={`
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-green-100 text-gray-600 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}
                    >
                    {text}
                    </div>
                )}
            </li>
                <ul 
                    onClick={() => setClicked(curr => !curr)}
                    className="flex-1 flex-col px-3 overflow-auto overflow-x-hidden scrollbar-thin scrollbar-webkit"
                >
                    {React.Children.map(children, (child, index) =>
                        React.cloneElement(child, {
                        isClicked: clickedItem === index,
                        setClickedItem: () => setClickedItem(index),
                        })
                    )}
                </ul>
        </div>
    )
};

export function SidebarSubItem({ icon, text, isClicked, setClickedItem, getSubOptionName, callDataRequest }) {
    const {expanded} = useContext(SidebarContext)

    const handleClick = () => {
        setClickedItem(curr => !curr)
        getSubOptionName(text)
        callDataRequest(true);
    };

    return (
        expanded && (
            <li 
                className={`
                    relative flex items-center py-2 px-2 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors text-gray-600 transition-all max-h-24
                    ${
                        isClicked ? "bg-green-300" : "hover:bg-green-100"
                    }
                `}
                onClick={handleClick}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all 
                    ${
                        expanded ? "w-52 ml-3" : "w-0"
                    }`}
                >
                    {text}
                </span>
                {/* {!expanded && (
                    <div
                        className="fixed 
                        bg-green-100 rounded-md px-2 py-1 ml-14
                        text-gray-600 text-sm max-w-40
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0" 
                    >
                        {text}
                    </div>
                )} */}
        </li>
        )
    )
};