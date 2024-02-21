import { ChevronFirst, ChevronLast } from "lucide-react"
import React, { createContext, useContext, useState } from "react"


interface SidebarContextProps {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({expanded: true,});

export default function Sidebar({ children }: { children: React.ReactNode }
    ) {
    const [expanded, setExpanded] = useState<boolean>(true)

    return(
        <aside className="h-screen">
            <nav className={
                `h-full max-h-dvh flex-grow flex flex-col bg-white border-r shadow-sm
                ${expanded ? "min-w-52" : ""}
                `}>
                <SidebarContext.Provider value={{ expanded }}> 
                    <ul className="flex-1 px-3">
                        {React.Children.map(children, (child, index) =>
                            React.cloneElement(child as React.ReactElement)
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

export function SidebarItem({ icon, text, alert, children, onClick }: { icon: React.ReactNode, text: string, alert?: boolean, children?: React.ReactNode, onClick: () => void }) {
    const {expanded} = useContext(SidebarContext)
    const [clicked, setClicked] = useState<boolean>(true)
    const [clickedItem, setClickedItem] = useState<number | null>(null)

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
                    <div className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${expanded ? "":"top-2"}`} />
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
                    React.cloneElement(child as React.ReactElement, {
                    isClicked: clickedItem === index,
                    setClickedItem: () => setClickedItem(index),
                    })
                )}
            </ul>
        </div>
    )
};

export function SidebarSubItem({ icon, text, isClicked, setClickedItem, getSubOptionName, callDataRequest, alert }: 
    { icon: React.ReactNode, text: string, isClicked: boolean, setClickedItem: () => void, getSubOptionName: (name: string) => void, callDataRequest: (call: boolean) => void, alert?: boolean }) {
    
    const {expanded} = useContext(SidebarContext)

    const handleClick = () => {
        setClickedItem()
        getSubOptionName(text)
        callDataRequest(true);
    };

    return (
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
                {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${expanded ? "":"top-2"}`} />
                )}
                {!expanded && (
                    <div
                        className="
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-green-100 text-gray-600 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                    >
                        {text}
                    </div>
                )}
        </li>
        )
};