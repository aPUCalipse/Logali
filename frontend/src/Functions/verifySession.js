import axios from 'axios'

async function getUser(userId){
    const response = await axios.post('http://localhost:8000/logali/app/user/selectUser', 
        {id: userId}
    )
      .then(function(response) {
        console.log("--USUÁRIO:-- " + response)
        return response;
      })
      .catch(function (error) {
        console.log(error.response)
      });
      console.log(response)
  }

export function isLoggedIn(){
    var user = window.localStorage.getItem('userData')
    if (user) {
        if (JSON.parse(user).isLoggedIn) {
        console.log("LOGADO")
        return true
      } else {console.log("Deslogado"); return false} 
    } else {console.log("NEM ACHOU"); return false}
    // return user ? JSON.parse(user).name === getUser(JSON.parse(user).id) ? true : false : false
}


