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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showSubItems, setShowSubItems] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<boolean>(true);
  const [DataRequestSubOptionName, setDataRequestSubOptionName] = useState<string>('')
  const [callDataRequest, setCallDataRequest] = useState<boolean>(false);

  const HandleItemClick = (section: string) => {
    setSelectedItem(section)
    setShowSubItems(showSubItems);
  };

  function GetDataRequestSubOptionName(subOptionName: string) {
    setDataRequestSubOptionName(subOptionName)
  }

  function GetCallDataRequest(call: boolean) {
    setCallDataRequest(call)
  }

  interface Item {
    key: any
    value: any
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
              sectionToArray[selectedItem].map((item: Item) => (
                <SidebarSubItem
                  icon={<Cross size={10} />}
                  key={item.key}
                  text={item.value}
                  isClicked={true}
                  setClickedItem={() => {}}
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
          alert
        ></SidebarItem>
        <SidebarItem
          icon={<Handshake size={20} />}
          text="Assistência à Saúde"
          onClick={() => HandleItemClick("Assistência à Saúde")}
          alert
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
          alert
        ></SidebarItem>
        <SidebarItem 
          icon={<BarChart2 size={20} />} 
          text="Estatísticas Vitais"
          onClick={() => HandleItemClick("Estatísticas Vitais")}
          alert
        ></SidebarItem>
        <SidebarItem
          icon={<MapPinned size={20} />}
          text="Demográficas e Socioeconômicas"
          onClick={() => HandleItemClick("Demográficas e Socioeconômicas")}
          alert
        ></SidebarItem>
        <SidebarItem
          icon={<NotepadText size={20} />}
          text="Inquéritos e Pesquisas"
          onClick={() => HandleItemClick("Inquéritos e Pesquisas")}
          alert
        ></SidebarItem>
        <SidebarItem 
          icon={<Landmark size={20} />}
          text="Informações Financeiras"
          onClick={() => HandleItemClick("Informações Financeiras")}
          alert
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
        {callDataRequest && 
          <div className={`${callDataRequest ? "opacity-100 transition-opacity duration-200" : "opacity-0"}`}>
            <DataRequest DataRequestSubOptionName={DataRequestSubOptionName} />
          </div>
        }
        {!callDataRequest &&
            <div className='w-1/2 absolute bottom-64 left-1/4 text-xl border-double border-green-300 border-4 rounded-lg p-4'>
              <h1>Nota: </h1>
              <p className='mt-5'>
              Este sistema se encontra em desenvolvimento.
              Note a presença de avisos vermelhos - estes indicam que esta ferramenta não se encontra em estado mínimo de uso.

              Este sistema oferece a visualização gráfica dos dados coletados pelo DataSUS.
              
              Em futuras atualizações serão disponibilizados os dados faltates.

              </p>
              <p className='mt-10'>Features a serem adicionadas incluem:</p>
                <ul className='mt-2 list-disc ml-8'>
                  <li>análise percentual por comparação</li>
                  <li>variação instantânea</li>
                  <li>média</li>
                  <li>regressão linear</li>
                  <li>dark mode</li>
                </ul>

              <p className='mt-10'>
                Com o auxílio de pesquisadores da área de saúde também podem ser realizados estudos mais avançados, desde que considerada a plausibilidade de diversos fatores, utilizando modelagem mateática avançada.
              </p>
              <div style={{marginTop:"30px"}}>
              <span className="loader" style={{marginLeft:"430px"}}></span>
              <p style={{marginLeft:"390px", opacity:"0.6"}}>Em construção...</p>
              </div>

            </div>
        }
      </div>
      </div>
    </div>
  );
}