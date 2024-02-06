import { ChevronFirst, ChevronLast } from "lucide-react"
import React, { createContext, useContext, useState } from "react"

const SidebarContext = createContext()
const SidebarItemContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    const [activeItem, setActiveItem] = useState(null);

    return(
        <aside className="h-svh flex flex-col">
            <nav className="h-screen flex-grow flex flex-col bg-white border-r shadow-sm">
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 max-w-72 overflow-y-auto">{React.Children.map(children, (child, index) =>
                            React.cloneElement(child, {
                                isActive: activeItem === index,
                                setActiveItem: () => setActiveItem(index),
                            })
                        )}</ul>
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

export function SidebarItem({ icon1, icon2, text, alert, isActive, children, setActiveItem, onClick}) {
    const {expanded} = useContext(SidebarContext)
    const [active, setActive] = useState(false)
    // const [activeItem, setActiveItem] = useState(null);
    const [clicked, setClicked] = useState(true)
    const activeItem = (true)

    return (
        
        <div className="flex flex-col max-w-72 relative">{/*onClick={() => {handleClick(); setClicked(curr => !curr)}} */}
             <li onClick={onClick}
                 className={`
                    relative flex items-center py-2 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    hover:bg-green-50 text-gray-600 transition-all
                    sticky
                 `}
            >
                {icon1}
                {icon2}
                <span
                    className={`overflow-hidden transition-all ${
                        expanded ? "w-52 ml-3" : "w-0"
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
            <SidebarItemContext.Provider value={{ clicked }}>
                <ul className="flex-1 flex-col px-3">{React.Children.map(children, (child, index) =>
                        React.cloneElement(child, {
                            isActive: activeItem === index,
                            setActiveItem: () => setActiveItem(index),
                        })
                    )}
                </ul>
            </SidebarItemContext.Provider>
        </div>
        
    )
};

export function SidebarSubItem({ icon, text, isActive, setActiveItem }) {
    const {expanded} = useContext(SidebarContext)
    const {clicked} = useContext(SidebarItemContext)
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActiveItem();
        setActive(curr => !curr)
    };


    return (
        <li onClick={handleClick}
            className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${
                    expanded
                        ? "w-64"
                        : "w-0 h-0"
                }
            `}
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

        </li>
    )
};