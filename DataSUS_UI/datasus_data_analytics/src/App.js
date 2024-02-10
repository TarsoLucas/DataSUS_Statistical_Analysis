import Sidebar, { SidebarItem, SidebarSubItem } from './components/sidebar';
import {
  LandPlot,
  ActivitySquare,
  AreaChart,
  Handshake,
  Share2,
  BarChart2,
  MapPinned,
  NotepadText,
  Landmark,
  Cross
} from "lucide-react"
import { ChevronLeft } from "lucide-react"
import './App.css';
import Header from './components/header';
import { useState } from "react";
import AidsDataRequest from './components/dataRequest';
const { 
  morbities, 
  states, 
  indicators, 
  healthAssist, 
  assistNet, 
  vitalStats, 
  demographic, 
  researches, 
  financial 
} = require('./assets/optionsArrays')

export default function App() {
  const [subItem, setSubItem] = useState({})
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSubItems, setShowSubItems] = useState(true);
  const [selectedSection, setSelectedSection] = useState(true);

  const handleItemClick = (section) => {
    setSelectedItem(section)
    setShowSubItems(showSubItems);
  };

  const sectionToArray = {
    "Indicadores de Saúde e Pactuações": indicators,
    "Epidemiológicas e Morbidade": morbities,
    "Assistência à Saúde": healthAssist,
    "Rede Assistencial": assistNet,
    "Estatísticas Vitais": vitalStats,
    "Demográficas e Socioeconômicas": demographic,
    "Inquéritos e Pesquisas": researches,
    "Informações Financeiras": financial
  };

  const renderSidebarItems = () => {
    if (selectedItem) {
      return (
        <SidebarItem
          icon={<ChevronLeft size={20} />}
          text="Voltar"
          onClick={() => setSelectedItem(null)}
        >
          {showSubItems ? (
            selectedSection ? (
              sectionToArray[selectedItem].map((item) => (
                <SidebarSubItem
                  icon={<Cross size={10} />}
                  key={item.key}
                  text={item.value}
                />
              ))
            ) : (null)
          ) : (
            null
          )}
        </SidebarItem>
      );
    }

    return (
      <>
        <SidebarItem
          icon={<AreaChart size={20} />}
          text="Indicadores de Saúde e Pactuações"
          onClick={() => handleItemClick("Indicadores de Saúde e Pactuações")}
        ></SidebarItem>
        <SidebarItem
          icon={<Handshake size={20} />}
          text="Assistência à Saúde"
          onClick={() => handleItemClick("Assistência à Saúde")}
        ></SidebarItem>
        <SidebarItem 
          icon={<ActivitySquare size={20} />} 
          text="Epidemiológicas e Morbidade"
          onClick={() => handleItemClick("Epidemiológicas e Morbidade")}
        >
        </SidebarItem>
        <SidebarItem 
          icon={<Share2 size={20} />} 
          text="Rede Assistencial"
          onClick={() => handleItemClick("Rede Assistencial")}
        ></SidebarItem>
        <SidebarItem 
          icon={<BarChart2 size={20} />} 
          text="Estatísticas Vitais"
          onClick={() => handleItemClick("Estatísticas Vitais")}
        ></SidebarItem>
        <SidebarItem
          icon={<MapPinned size={20} />}
          text="Demográficas e Socioeconômicas"
          onClick={() => handleItemClick("Demográficas e Socioeconômicas")}
        ></SidebarItem>
        <SidebarItem
          icon={<NotepadText size={20} />}
          text="Inquéritos e Pesquisas"
          onClick={() => handleItemClick("Inquéritos e Pesquisas")}
        ></SidebarItem>
        <SidebarItem 
          icon={<Landmark size={20} />}
          text="Informações Financeiras"
          onClick={() => handleItemClick("Informações Financeiras")}
        ></SidebarItem>
      </>
    );
  };

  return (
    <div className="overflow-hidden bg-gray-800">
      <div className="h-screen flex flex-row scrollbar-thin scrollbar-webkit overflow-auto">
      <Sidebar>
    {/* <SidebarItem icon={<AreaChart size={20} />} text="Indicadores de Saúde e Pactuações"></SidebarItem>
        <SidebarItem icon={<Handshake size={20} />} text="Assistência à Saúde"></SidebarItem>
        <SidebarItem icon={<ActivitySquare size={20} />} text="Epidemiológicas e Morbidade"></SidebarItem>
        <SidebarItem icon={<Share2 size={20} />} text="Rede Assistencial"></SidebarItem>
        <SidebarItem icon={<BarChart2 size={20} />} text="Estatísticas Vitais"></SidebarItem>
        <SidebarItem icon={<MapPinned size={20} />} text="Demográficas e Socioeconômicas"></SidebarItem>
        <SidebarItem icon={<NotepadText size={20} />} text="Inquéritos e Pesquisas"></SidebarItem>
        <SidebarItem icon={<Landmark size={20} />} text="Informações Financeiras"></SidebarItem> */}
        {renderSidebarItems()}
      </Sidebar>
      
      <div className="flex flex-col w-full">
        <Header />
        <AidsDataRequest />
      </div>
      </div>
    </div>
  );
}