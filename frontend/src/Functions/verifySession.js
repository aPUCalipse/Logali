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
    //TESTES
    window.localStorage.setItem('user', '{"name" : "Luiz Henrique Silva Jesus", "id" : 1}')
    //FIM-TESTES

    var user = window.localStorage.getItem('user')
    if(user){
      if(JSON.parse(user).name === getUser(JSON.parse(user).id)){
        console.log("LOGADO")
        return true
      } else {console.log("NEM ACHOU"); return false} 
    } else {console.log("NEM ACHOU 2"); return false}
    // return user ? JSON.parse(user).name === getUser(JSON.parse(user).id) ? true : false : false
}


