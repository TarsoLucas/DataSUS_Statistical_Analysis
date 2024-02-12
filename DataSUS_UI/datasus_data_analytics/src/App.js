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
import { 
 sectionToArray
} from'./assets/optionsArrays'
import DataRequest from './components/dataRequest';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSubItems, setShowSubItems] = useState(true);
  const [selectedSection, setSelectedSection] = useState(true);
  const [DataRequestSubOptionName, setDataRequestSubOptionName] = useState('')
  const [callDataRequest, setCallDataRequest] = useState(false);

  const HandleItemClick = (section) => {
    setSelectedItem(section)
    setShowSubItems(showSubItems);
  };

  function GetDataRequestSubOptionName(subOptionName) {
    setDataRequestSubOptionName(subOptionName)
  }

  function GetCallDataRequest(call) {
    setCallDataRequest(call)
  }

  const renderSidebarItems = () => {
    if (selectedItem) {
      return (
        <SidebarItem
          icon={<ChevronLeft size={20} />}
          text="Voltar"
          onClick={() => {
            setSelectedItem(null)
            setCallDataRequest(false)}
          }
        >
          {showSubItems ? (
            selectedSection ? (
              sectionToArray[selectedItem].map((item) => (
                <SidebarSubItem
                  icon={<Cross size={10} />}
                  key={item.key}
                  text={item.value}
                  getSubOptionName={GetDataRequestSubOptionName}
                  callDataRequest={GetCallDataRequest}
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
          onClick={() => HandleItemClick("Indicadores de Saúde e Pactuações")}
        ></SidebarItem>
        <SidebarItem
          icon={<Handshake size={20} />}
          text="Assistência à Saúde"
          onClick={() => HandleItemClick("Assistência à Saúde")}
        ></SidebarItem>
        <SidebarItem 
          icon={<ActivitySquare size={20} />} 
          text="Epidemiológicas e Morbidade"
          onClick={() => HandleItemClick("Epidemiológicas e Morbidade")}
        ></SidebarItem>
        <SidebarItem 
          icon={<Share2 size={20} />} 
          text="Rede Assistencial"
          onClick={() => HandleItemClick("Rede Assistencial")}
        ></SidebarItem>
        <SidebarItem 
          icon={<BarChart2 size={20} />} 
          text="Estatísticas Vitais"
          onClick={() => HandleItemClick("Estatísticas Vitais")}
        ></SidebarItem>
        <SidebarItem
          icon={<MapPinned size={20} />}
          text="Demográficas e Socioeconômicas"
          onClick={() => HandleItemClick("Demográficas e Socioeconômicas")}
        ></SidebarItem>
        <SidebarItem
          icon={<NotepadText size={20} />}
          text="Inquéritos e Pesquisas"
          onClick={() => HandleItemClick("Inquéritos e Pesquisas")}
        ></SidebarItem>
        <SidebarItem 
          icon={<Landmark size={20} />}
          text="Informações Financeiras"
          onClick={() => HandleItemClick("Informações Financeiras")}
        ></SidebarItem>
      </>
    );
  };

  return (
    <div className="overflow-hidden">
      <div className="h-screen flex flex-row scrollbar-thin scrollbar-webkit overflow-auto">
      <Sidebar>
        {renderSidebarItems()}
      </Sidebar>
      
      <div className="flex flex-col w-full">
        <Header />
        <div className={`${callDataRequest ? "opacity-100 transition-opacity duration-200" : "opacity-0"}`}>
          {callDataRequest && 
            <DataRequest DataRequestSubOptionName={DataRequestSubOptionName} />
          }
        </div>
      </div>
      </div>
    </div>
  );
}