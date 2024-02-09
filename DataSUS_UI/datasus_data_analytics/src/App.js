import Sidebar, { SidebarItem, SidebarSubItem } from './components/sidebar';
import {
  LandPlot,
  ActivitySquare
} from "lucide-react"
import { ChevronLeft } from "lucide-react"
import './App.css';
import Header from './components/header';
import { useState } from "react";

const states = [
  {key: "ac", name: "Acre"},
  {key: "al", name: "Alagoas"},
  {key: "ap", name: "Amapá"},
  {key: "am", name: "Amazonas"},
  {key: "ba", name: "Bahia"},
  {key: "ce", name: "Ceará"},
  {key: "df", name: "Distrito Federal"},
  {key: "es", name: "Espírito Santo"},
  {key: "go", name: "Goiás"},
  {key: "ma", name: "Maranhão"},
  {key: "mt", name: "Mato Grosso"},
  {key: "ms", name: "Mato Grosso do Sul"},
  {key: "mg", name: "Minas Gerais"},
  {key: "pa", name: "Pará"},
  {key: "pb", name: "Paraíba"},
  {key: "pr", name: "Paraná"},
  {key: "pe", name: "Pernambuco"},
  {key: "pi", name: "Piauí"},
  {key: "rj", name: "Rio de Janeiro"},
  {key: "rn", name: "Rio Grande do Norte"},
  {key: "rs", name: "Rio Grande do Sul"},
  {key: "ro", name: "Rondônia"},
  {key: "rr", name: "Roraima"},
  {key: "sc", name: "Santa Catarina"},
  {key: "sp", name: "São Paulo"},
  {key: "se", name: "Sergipe"},
  {key: "to", name: "Tocantins"}
  
];

export default function App() {
  const [currentItem, setCurrentItem] = useState({
    icon1: <ActivitySquare size={20} />,
    text: "Epidemiológicas e Morbidade"
  });

  const handleItemClick = () => {
    if (currentItem.text === "Epidemiológicas e Morbidade") {
      setCurrentItem({
        icon1: <ChevronLeft />,
        icon2: <LandPlot size={20} />,
        text: "Estado"
      });
    } else {
      setCurrentItem({
        icon1: <ActivitySquare size={20} />,
        text: "Epidemiológicas e Morbidade"
      });
    }
  };



  return (
    <body className="App h-screen">
      <Header />
      <div className="flex flex-row flex-1">
        <Sidebar className="flex flex-row flex-1">
          <SidebarItem 
            icon1={currentItem.icon1}
            icon2={currentItem.icon2}
            text={currentItem.text} 
            onClick={handleItemClick}
          >
            {states.map((state) => (
                <SidebarSubItem 
                  key={state.key}
                  text={state.name}
                />
            ))}
          </SidebarItem>
        </Sidebar>
        <div className="w-scren">datagoeshereaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </body>
  );
}

// function App() {
//   return (
//     <body className="App h-screen">
//       <Header />
//       <div className='flex flex-row'>
//         <Sidebar>
//           <SidebarItem 
//             icon={<ActivitySquare size={20} />} text="Epidemiológicas e Morbidade" 
//           >
//             {/* <SidebarSubItem 
//               icon={<LandPlot size={20} />} text="Estado"
//             >
//             </SidebarSubItem> */}
//           </SidebarItem>
//         </Sidebar>
//       </div>
//     </body>
//   );
// }

// export default App;
