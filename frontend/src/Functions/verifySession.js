import axios from 'axios'

async function getUser(userId){
    const response = await axios.post('http://localhost:8000/logali/app/scheduling/selectUser', 
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

const isLoggedIn = function(){
    //TESTES
    window.localStorage.setItem('user', '{"name" : "aaa", "id" : 2}')
    //FIM-TESTES

    var user = window.localStorage.getItem('user')
    user ? JSON.parse(user).name === getUser(JSON.parse(user).id) ? true : false : false
}

export default isLoggedIn

