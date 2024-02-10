import { useState, useEffect } from 'react'
import LineChartAIDS from './lineGraph'

const AidsDataRequest = () => {
  const  [data, setData] = useState([])

  useEffect(() => {
      fetch('http://localhost:4000/data')
        .then(response => response.json())
        .then(data => {
          setData(data)
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

export default AidsDataRequest