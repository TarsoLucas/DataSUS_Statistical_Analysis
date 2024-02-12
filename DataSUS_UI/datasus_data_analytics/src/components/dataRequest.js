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

function DataRequest({ DataRequestSubOptionName }) {
  const  [data, setData] = useState([])

  let indexParenthesis = DataRequestSubOptionName.indexOf("(")
  let SlicedName = DataRequestSubOptionName.slice(0, indexParenthesis)
  let queryUrl = SlicedName.toLowerCase().replaceAll(" ","")
  let backendPath = 'http://localhost:4000/'
  let backendURL = backendPath.concat(queryUrl)


  useEffect(() => {
      fetch(backendURL)
        .then(response => response.json())
        .then(data => {
          setData(data)
          console.log('request made')
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
  }, [])

  return(
    <div className="flex flex-col items-center mt-10">
      <label htmlFor="aidsChart">Casos de AIDS x Anos (1980-2023)</label>
      <LineChartAIDS id="aidsChart" data={data} />
    </div>
  )

}

export default DataRequest