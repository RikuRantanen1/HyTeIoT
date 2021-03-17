import React, { useState } from 'react';
import './App.css';
import Chart from "react-google-charts";


function App() {

  const initWeather = [];

  const [weather, setWeather] = useState(initWeather);

  fetch('https://oppilas-5.azurewebsites.net/api/HttpTriggerCSharp2?code=9Ii7LRHZamJjN9KpyStW1VZfWYcpBmHQQ/PQaZQF4VMEbBYBeP38pQ==&deviceId=2c0031001947393035313138&amount=10')
    .then(response => response.json())
    .then (json => setWeather([...json]));

  let humtempkey = 1;
  const rows = () => weather.map(temphum => {
    return <div key={humtempkey++}> 
    <b>Klo</b> {temphum.Timestamp} <b>lämpötila</b> {temphum.Temp} <b>Ilmankosteus</b> {temphum.Hum} 
    </div>
  })


  return (
    <div className="App">
      {rows()}
      <div>
  <Chart
    width={1000}
    height={300}
    chartType="ColumnChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Aika', '%',],
      ['10:00', 40],
      ['11:00', 43],
      ['12:00', 20],
      ['13:00', 33],
      ['14:00', 38],
      ['15:00', 15],
      ['16:00', 44],
      ['17:00', 55],
      ['18:00', 40],
    ]}
    options={{
      title: 'Ilmankosteus',
      
      hAxis: {
        title: 'Mittausaika',
        minValue: 0,
      },
      vAxis: {
        title: '',
      },
    }}
    
  />
  </div>
  <div style={{ display: 'flex',}}>

  <Chart
    width={1000}
    height={300}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Aika', 'Celsius'],
      ['10:00', 10],
      ['11:00', 11],
      ['12:00', 18],
      ['13:00', 19],
      ['14:00', 22],
      ['15:00', 22],
      ['16:00', 19],
      ['17:00', 18],
    ]}
    options={{
      title: 'Lämpötila',
      vAxis: { minValue: 0 },
      
    }}
  />
</div>
    </div>
  );
}

export default App;
