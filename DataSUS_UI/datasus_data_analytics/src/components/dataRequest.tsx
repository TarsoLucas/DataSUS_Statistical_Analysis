import { useState, useEffect } from 'react'
import LineChartAIDS from './lineGraph'
import { 
  morbities, 
  states, 
  indicators, 
  healthAssist, 
  assistNet, 
  vitalStats, 
  demographic, 
  researches, 
  financial 
} from'../assets/optionsArrays'

function DataRequest({ DataRequestSubOptionName }: {DataRequestSubOptionName: string}) {
  const  [data, setData] = useState<any[]>([])

  let indexParenthesis = DataRequestSubOptionName.indexOf("(")
  let SlicedName = DataRequestSubOptionName.slice(0, indexParenthesis)
  let queryUrl = SlicedName.toLowerCase().replaceAll(" ","")
  let removeAccentuation =  queryUrl.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let backendPath = 'http://localhost:4000/'
  let backendURL = backendPath.concat(removeAccentuation)

  console.log(backendURL)


  useEffect(() => {
      fetch(backendURL)
        .then(response => response.json())
        .then(data => {
          setData(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
  }, [backendURL])

  return(
    <div className="flex flex-col items-center mt-10">
      <label htmlFor="aidsChart">{DataRequestSubOptionName}</label>
      <LineChartAIDS id="aidsChart" data={data} />
    </div>
  )

}

export default DataRequest