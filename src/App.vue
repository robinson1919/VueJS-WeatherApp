<template>
  <div id="app">
     <div class="location">
        <h1 class="location-timezone">{{timeZone}}</h1>
        <canvas id="icon" width="128" height="128"></canvas>
    </div>
    <div class="temperature">
        <div class="degree-section" @click="weatherMeasure = !weatherMeasure">
            <h2 class="temperature-degree" >{{temperature}}</h2>
            <span >{{symbol}}</span>
        </div>        
        <div class="temperature-description">{{summary}}</div>
    </div>
  </div>
</template>


<script>

import {Skycons} from '../skycons'
import HelloWorld from './components/HelloWorld'
import Location from './components/Location'
import Temperature from './components/Temperature'


export default {
  name: 'App',
  components: {
    HelloWorld,
    Location,
    Temperature
  },
  data(){
    return {
      long: '',
      lat: '',
      temperature: '',
      summary: '',
      timeZone: '',
      icon: '',
      weatherMeasure: true,
      symbol: 'F',
      meatCelcius: '',
      normalTemperature: ''
    }
  },
  created(){
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = proxy+'https://api.darksky.net/forecast/7c9e28760566395983085118a89b021f/'+this.lat+','+this.long;
        this.$http.get(api).then(response => {
          return response.json();
        }).then(data => {
          console.log(data)
          this.normalTemperature = Math.round(data.currently.temperature);
          this.temperature = this.normalTemperature;

          this.summary = data.currently.summary;
          this.icon = data.currently.icon;
          this.timeZone;
          var icon = data.currently.icon;
          
          //= data.timezone.replace(/_/g, " ");
          this.timeZone = data.timezone.replace(/_/g, " ")
          // if(data.timezone == 'America/Santo_Domingo'){
          //   this.timeZone = 'Santo Domingo';
          // }

          this.meatCelcius = (Math.round(data.currently.temperature) - 32) * (5 / 9);
          
          setIcons(icon, document.querySelector('#icon'));          

        });
        
        

        setInterval(()=>{
          this.long = position.coords.longitude;
          this.lat = position.coords.latitude;
          const proxy = 'https://cors-anywhere.herokuapp.com/';
          const api = proxy+'https://api.darksky.net/forecast/7c9e28760566395983085118a89b021f/'+this.lat+','+this.long;
          this.$http.get(api).then(response => {
            return response.json();
          }).then(data => {
            console.log(data)
            this.normalTemperature = Math.round(data.currently.temperature);
            this.temperature = this.normalTemperature;

            this.summary = data.currently.summary;
            this.icon = data.currently.icon;
            this.timeZone;
            var icon = data.currently.icon;
            
            //= data.timezone.replace(/_/g, " ");
            this.timeZone = data.timezone.replace(/_/g, " ")
            // if(data.timezone == 'America/Santo_Domingo'){
            //   this.timeZone = 'Santo Domingo';
            // }

            this.meatCelcius = (Math.round(data.currently.temperature) - 32) * (5 / 9);
            
            setIcons(icon, document.querySelector('#icon'));          

          });
            
        }, 600000);       
      });

      

      function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.toUpperCase().replace(/-/g, "_");
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
      }
    }
  },
  watch: {
    weatherMeasure(){
      if(this.weatherMeasure){
        this.symbol = "C";
        this.temperature = Math.round(this.meatCelcius);
      }else{
        this.symbol = "F";
        this.temperature = this.normalTemperature;
      }
    }
  }
  
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient( rgb(47, 150, 163), rgb(48, 62, 143));
  font-family: sans-serif;
  color: white;
}

  .temperature {
  height: 30vh;
  /* width: 50%; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.location {
  align-items: center;
  display: inline-flex;
}

/* .degree-section{
  align-items: center;
  display: inline-flex;
} */

.temperature {
  flex-direction: column;
}

.degree-section {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.location p{
  margin: 10px;
}

.degree-section span{
  margin: 10px;
  font-size: 30px;
}

.degree-section h2{
  font-size: 40px;
}
</style>
