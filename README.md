# Sää-Asema
## IoT
  IoT tarkoittaa asioiden internettiä. Kun joku laitteisto liitetään internettiin siitä voidaan kerätä dataa tai vaikkapa ohjata etänä.
  Internetin välityksellä laitteet voivat jakaa ja vastaanottaa tietoa. Tiedon perusteella laitteet voivat toimia itsenäisesti tai osana laajempaa ympäristöä.
  Esimerkiksi sää-asema joka kerää mittauksia ja esittää ne internetin välityksellä, on osa IoT:tä.
  Teollisuudessa samasta asiasta käytetään nimitystä IIoT(industrial internet of things).

## IoT kiinteistöhallinnassa
  Voidaan valvoa ja hallita kiinteistöä etänä. Sillä voidaan automatisoida toimintoja, esimerkiksi sulkea vedentulo vesivahingon sattuessa, valvoa ilmankosteutta tai vaikkapa säätää lämpötiloja.

## Sääasemajärjestelmän toimintakaavio
### Kuva sääaseman rakenteesta

  ![sää-asema](/Kaavio.png)
  ### IoT-järjestelmän rakenne:

- Anturit
	  Keräävät ja tuottavat mittaus dataa.

- Tietoliikenne
	  Kerätty data viedään pilvialustaan

- Tietovarastot ja pilvialustat
    Tieto varastoidaan ja välitetään eteenpäin käyttäjälle
	
- Analytiikka
    Tallennettu data hyödynnetään


	

  ### Laitteistot
  **Particle Photon Wi-Fi module**
![Particle](/particle.png)
  
 - Broadcom BCM43362 Wi-Fi chip
 - 802.11b/g/n Wi-Fi
 - STM32F205RGY6 120Mhz ARM Cortex M3
 - 1MB flash, 128KB RAM
 - On-board chip antenna (external antenna IPEX U.FL optional)
 - On-board RGB status LED (ext. drive provided)    
 - Mixed-signal GPIO and advanced peripherals
  - Open source design
  - Real-time operating system (FreeRTOS)
  - Soft AP setup
  - FCC, CE ja IC certified

  ### Komponentit
  **Kuulevat sensorit:**
  Toiminta perustuu ilmanpaineen vaihteluun.
  Voidaan tunistaa ja tallentaa ääniä,esim aseen ääni,sanallinen agressio jne. Uhkaavista äänistä voi antaa hälytyksen/varoituksen vartialle esimerkiksi vankilassa. 
  Hoivakodissa voidaan mikrofonilla seurata esim unenlaatua.
  Eleintarhassa melusensori mittaa melutasoa.
  K Ilmastointilaitteen toimintaa voitaisiin myös seurata ääntä analysoimalla.
  
  **Tuntevat sensorit:**
  Tuntevat sensorit voivat aistia esimerkiksi lämpöä,liikettä,valoisuutta ja kosteutta.
  kosteussenrorilla voi mitata ja huomata talon rakentaissa kosteusvauriot ja antaa varoituksia suoraan kättäjälle.
  Liikesensorilla voidaan seurata esimerkiksi rahtikontteja.
  Lämpötila mittauksilla voidaan seurata kylmäketjuja tai vaikka talon lämptilaa ja automatisoida lämmön säätely.
  Valosensoreilla voidaan mitata vaikka huoneen valoisuutta ja automatisoida esim lamppujen toimintaa.

  **Haistavat sensorit:**
  Haistavilla sensoreilla voidaan tehdä ilmanlaadun mittauksia tai vaikkapa pakokaasumittauksia.
  Lääketieteessä voidaan haistavia sensoreita käyttää diagnisointi työkaluna. Hengitystä "haistelemalla" voidaan todentaa useita sairauksia.

  **Näkevät sensorit:** 
  Perustuu valon ja värien mittaamiseen.
  Liiketunnistimella voidaan automatisoida valoja.
  Kameraa ja tekoälyä voidaan käyttää tuotantolinjoissa laadunvalvonnassa tai vaikkapa seurata/mitata rahtikontin täyttöastetta.
  Robotti-imurit käyttävät näkösensoreita ymmärtääkseen huoneen missä se toimii. 
  Konenäkö on parhaimillaan erittäin tarkoissa mittaus hommissa jotka ihmissilmälle ei olisi mahdollista tai olisi aikaa vievää.

  **DHT-11 anturi:**
  ![dht-11](/Dht11.png)
   DHT-anturit ovat yksinkertaisia ja edullisialämpötila-ja kosteusantureita. Niitä ei ole tarkoitettu tarkkoihin vaativiin mittaukseen, sillä ne eivät ole kovin nopeita ja tarkkoja, mutta soveltuvat moneen yksinkertaiseen mittaukseen. Sensoreissa on siru, joka muuntaa analogisen signaalin digitaaliseksi, jolloin dataa on helppo lukea miltei millä vain yhteensopivalla laitteella. 

  dht-11 anturin kaavio:
  ![dht-11 kaavio](/Hum-sch.png)



  ### Palvelut
  Sääasema käyttää Microsoft Azure pilvipalveluja.

  Pilvipalvelujen hyötyjä ovat datan helppo saatavuus ja jakaminen.
  Melkein kaikki isommat nettipalvelut perustuvat pilvipalveluiden käyttämiseen( netflix,gmail,facebook jne)
  Huonona puolena voisi pitää tietoturvariskejä ja yksityisyydensuojan riskejä.
  
  ### Ohjelmointi
  Particle Web IDE:llä ladataan piiriin tarvittavat kirjastot ja ohjelmoidaan piiri mittaaman lämpöä ja kosteutta,sekä lähettämään mittaustulokset eteenpäin.
  ![particlekoodi](/pkoodi1.png)
  ![particlekoodi](/pkoodi2.png)

ParticlePhotoninkonsolista tehdään Webhookkutsu Azuren triggerille 

    #r "Newtonsoft.Json" 
    using System; 
    using System.Net; 
    using System.Threading.Tasks;
    using Newtonsoft.Json; 

    public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, ICollector<DeviceDataWrapper> outputTable, TraceWriter log)
    {
    string deviceId = req.GetQueryNameValuePairs() 
    .FirstOrDefault(q => string.Compare(q.Key, "deviceid", true) == 0)
    .Value;
    string devData = req.GetQueryNameValuePairs() 
    .FirstOrDefault(q => string.Compare(q.Key, "data", true) == 0)
    .Value;
    devData = WebUtility.UrlDecode(devData); 
    devData = devData.Replace("()", ""); 
    devData = devData.Replace("(°C)", ""); 

    DeviceDataWrapper deviceData = JsonConvert.DeserializeObject<DeviceDataWrapper>(devData); 
    deviceData.DeviceId = deviceId; 

    deviceData.PartitionKey = deviceId; 
    log.Info("deviceData: " + deviceData); 
    Guid id = Guid.NewGuid(); 
    deviceData.RowKey = id.ToString(); 
    outputTable.Add(
    deviceData 
    );

    return req.CreateResponse(HttpStatusCode.OK, "Hello "); 
    }
    public class DeviceDataWrapper {
    public string PartitionKey { get; set; }
    public string DeviceId { get; set; }
    public string RowKey { get; set; }
    public string Hum { get; set; }
    public string Temp { get; set; }
    }
Trigger tallentaa Webhookilla tulleen datan Tablestorageen pilvipalvelussa. 
    #r "Newtonsoft.Json"
    #r "Microsoft.WindowsAzure.Storage"
    using Microsoft.WindowsAzure.Storage.Table;
    using System.Net;
    using System.Text;
    using Newtonsoft.Json;

    public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, [Table("IoTData", "DeviceData")] IQueryable<IotData> inputTable, TraceWriter log)
    { 
    log.Info("C# HTTP trigger function processed a request.");
    string amount = req.GetQueryNameValuePairs()
    .FirstOrDefault(q => string.Compare(q.Key, "amount", true) == 0)
    .Value;
    int max = 0;
    Int32.TryParse(amount, out max); //muutetaan amount integeriksi
    log.Info("määrä: " + max);
    string deviceId = req.GetQueryNameValuePairs()
    .FirstOrDefault(q => string.Compare(q.Key, "deviceId", true) == 0)
    .Value;

    
    List<IotData> iotDatas = new List<IotData>();
    List<IotData> orderedDatas = inputTable.Where(p => p.PartitionKey == deviceId).ToList(); 
    log.Info("count: " + orderedDatas.Count);
    int count = 1;
    foreach (IotData row in orderedDatas.OrderByDescending(o => o.Timestamp))
    {
    iotDatas.Add(row);
    if (max > 0 && count++ >= max) 
    {
    break;
    }
    }

    string jsonRet = JsonConvert.SerializeObject(iotDatas); 
    return new HttpResponseMessage(HttpStatusCode.OK) { 
    Content = new StringContent(jsonRet, Encoding.UTF8, "application/json")
    };
    }

    public class IotData : TableEntity
    {
    public string DeviceId { get; set; }
    public string Hum {get; set;}
    public string Temp {get; set;}

    }


![Datastorage](/datastorage2.png)

Käyttöliittymä tehtiin Reactilla Replit.com palvelussa

    import React, { useState } from 'react';
    import './App.css';
    import Chart from "react-google-charts";
    import Header from './components/layout/Header';
    import Footer from './components/layout/Footer';
    import Portfolio from './components/Portfolio';
    import Toivomukset from './components/Toivomukset';
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
      <Route path="/Toivomukset">
        <Toivomukset />
        </Route> 
        <Route path="/portfolio">
          <Portfolio />
        </Route>
        <Route path="/">
    
      {rows()}
      <div className="kaavio">
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
    <div className="kaavio2">

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


 

## Käytetyt kehitysympäristöt
Particle console ja Particle Web IDE
Microsoft Azure
Replit
Github


## Viitteet
https://www.empirica.fi/iot/
https://www.dna.fi/yrityksille/aistien-internet-podcast
https://www.theseus.fi/bitstream/handle/10024/150796/Vuorela_Jonne.pdf?sequence=1&isAllowed=y