
import React from 'react';
import axios from 'axios';
export async function getLocation() {
    if (navigator.geolocation) {
      var coordinates = navigator.geolocation.getCurrentPosition(function(position){
        var coordinates1 = {geoLocX:position.coords.latitude, geoLocY:position.coords.longitude}
        console.log("COORDS" + coordinates1)
        const userData = JSON.parse(localStorage.getItem("userData"))
        if(userData && userData.isLogged && userData.typeUser === '2'){
        const response = axios.post('http://localhost:8000/logali/app/scheduling/saveTecLoc', {
          "workerId" : userData.idUser,
          "geoLocX": coordinates1.geoLocX,
          "geoLocY": coordinates1.geoLocY,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response);
        });
        return coordinates1;
      }},
      function(){
        console.log("callback de erro")
      },
      {interval:10000}
      );
      return coordinates;
    } else {
      window.alert("O recurso de localização não é compatível com o seu browser ou está desativado.")
    }
  }
  
// export async function showPosition(position) {
//     var coordinates = [position.coords.latitude, position.coords.longitude]
//     console.log("COORDS"+ coordinates)
//     return coordinates;
// }
