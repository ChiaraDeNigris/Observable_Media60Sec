import { ajax } from "rxjs/ajax";
import { Observable, interval } from "rxjs";

const apiKey = "d32186b009af06ebb1a0470a906835d5";
const URL =
  "https://api.openweathermap.org/data/2.5/weather?APPID=" +
  apiKey +
  "&units=metric&q=";
var cityElems = document.getElementsByClassName("citta");
console.log(cityElems);
const tick = interval(100);

//Costruisco l'observable
const temp = new Observable(subscriber =>
  tick.subscribe({
    next(n) {
      for (var city in cityElems) {
        
        fetch(URL + city.innerHTML)
          .then(response => response.json())
          .then(data => {
            subscriber.next(data.main.temp);
          });
      }
    }
  })
);

// Due subscriber
temp.subscribe({
  next(x) {
    console.log(x);
  }
});
temp.subscribe({
  next(x) {
    var media = 0;
    for (city in cityElems) {
      media += x / cityElems.length;
    }
    document.getElementById("output").innerHTML += media + "<br>";
  }
});
