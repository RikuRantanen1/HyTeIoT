import React, { useState } from 'react';
import './App.css';
import Chart from "react-google-charts";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Portfolio from './components/Portfolio';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App() {

  const initWeather = [];

  const [weather, setWeather] = useState(initWeather);

 function convertUTCDateToLocalDate(date) {
  new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
  return date;
}

let chartHumData = [
      ['Aika', '%',],
      ['Loading..', 0]
     
];
let chartTempData = [
      ['Aika', 'Celsius'],
      ['Loading..', 0]
      
    ];

  fetch('https://oppilas-5.azurewebsites.net/api/HttpTriggerCSharp2?code=9Ii7LRHZamJjN9KpyStW1VZfWYcpBmHQQ/PQaZQF4VMEbBYBeP38pQ==&deviceId=2c0031001947393035313138&amount=10')
    .then(response => response.json())
    .then (json => setWeather([...json]));

  let humtempkey = 1;
  const rows = () => weather.map(temphum => {

    if(chartHumData[1][0] === 'Loading..'){
      chartHumData.pop();
    }
     if(chartTempData[1][0] === 'Loading..'){
      chartTempData.pop();
    }

    chartHumData.push([String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4], parseInt(temphum.Hum)])

    chartTempData.push([String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4], parseInt(temphum.Temp)])
    
    return <div key={humtempkey++}> 
    
    <b>Klo</b> {String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4]} <b>Lämpötila</b> {temphum.Temp}°C <b>Ilmankosteus</b> {temphum.Hum}% 
    </div>
  })
  


  return (
  <Router>
    <div className="App">
    
      <Header />
        <Switch>
        <Route path="/portfolio">
          <Portfolio />
        </Route>
        <Route path="/">
    
      {rows()}
      <div>
  <Chart
    width={'100%'}
    height={300}
    chartType="ColumnChart"
    loader={<div>Loading Chart</div>}
    data={chartHumData}
    options={{
      title: 'Ilmankosteus',
      chartArea: { width: '50%' },
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
    width={'100%'}
    height={300}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={chartTempData}
    options={{
      chartArea: { width: '50%' },
      title: 'Lämpötila',
      vAxis: { minValue: 0 },
      
    }}
  />
  </div>
  </Route>
  </Switch>
  <Footer />
    
  </div>
</Router>
    
  );
  
}

export default App;
