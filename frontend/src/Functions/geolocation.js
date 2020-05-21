export async function getLocation() {
    if (navigator.geolocation) {
      var coordinates = navigator.geolocation.getCurrentPosition(showPosition);
      
      return coordinates;
    } else {
      window.alert("O recurso de localização não é compatível com o seu browser ou está desativado.")
    }
  }
  
export async function showPosition(position) {
    var coordinates = [position.coords.latitude, position.coords.longitude]
    console.log("COORDS"+ coordinates)
    return coordinates;
}