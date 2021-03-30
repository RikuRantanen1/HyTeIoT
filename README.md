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
  ### Komponentit
  ####Kuulevat sensorit.
  Toiminta perustuu ilmanpaineen vaihteluun.
  Voidaan tunistaa ja tallentaa ääniä,esim aseen ääni,sanallinen agressio jne. Uhkaavista äänistä voi antaa hälytyksen/varoituksen vartialle esimerkiksi vankilassa. 
  Hoivakodissa voidaan mikrofonilla seurata esim unenlaatua.
  Eleintarhassa melusensori mittaa melutasoa.
  K Ilmastointilaitteen toimintaa voitaisiin myös seurata ääntä analysoimalla.
  
  ####Tuntevat sensorit:
  Tuntevat sensorit voivat aistia esimerkiksi lämpöä,liikettä,valoisuutta ja kosteutta.
  kosteussenrorilla voi mitata ja huomata talon rakentaissa kosteusvauriot ja antaa varoituksia suoraan kättäjälle.
  Liikesensorilla voidaan seurata esimerkiksi rahtikontteja.
  Lämpötila mittauksilla voidaan seurata kylmäketjuja tai vaikka talon lämptilaa ja automatisoida lämmön säätely.
  Valosensoreilla voidaan mitata vaikka huoneen valoisuutta ja automatisoida esim lamppujen toimintaa.

  ####Haistavat sensorit:
  Haistavilla sensoreilla voidaan tehdä ilmanlaadun mittauksia tai vaikkapa pakokaasumittauksia.
  Lääketieteessä voidaan haistavia sensoreita käyttää diagnisointi työkaluna. Hengitystä "haistelemalla" voidaan todentaa useita sairauksia.

  ####Näkevät sensorit: 
  Perustuu valon ja värien mittaamiseen.
  Liiketunnistimella voidaan automatisoida valoja.
  Kameraa ja tekoälyä voidaan käyttää tuotantolinjoissa laadunvalvonnassa tai vaikkapa seurata/mitata rahtikontin täyttöastetta.
  Robotti-imurit käyttävät näkösensoreita ymmärtääkseen huoneen missä se toimii. 
  Konenäkö on parhaimillaan erittäin tarkoissa mittaus hommissa jotka ihmissilmälle ei olisi mahdollista tai olisi aikaa vievää.

  ####DHT-11 anturi:
  ![dht-11](/Dht11.png)
   DHT-anturit ovat yksinkertaisia ja edullisialämpötila-ja kosteusantureita. Niitä ei ole tarkoitettu tarkkoihin vaativiin mittaukseen, sillä ne eivät ole kovin nopeita ja tarkkoja, mutta soveltuvat moneen yksinkertaiseen mittaukseen. Sensoreissa on siru, joka muuntaa analogisen signaalin digitaaliseksi, jolloin dataa on helppo lukea miltei millä vain yhteensopivalla laitteella. 

  dht-11 anturin kaavio:
  ![dht-11 kaavio](/Hum-sch.png)





    

  ### Palvelut
  ### Ohjelmointi
  ### Toiminta

## Käytetyt kehitysympäristöt

## Termihakemisto

## Viitteet
https://www.empirica.fi/iot/
https://www.dna.fi/yrityksille/aistien-internet-podcast
https://www.theseus.fi/bitstream/handle/10024/150796/Vuorela_Jonne.pdf?sequence=1&isAllowed=y