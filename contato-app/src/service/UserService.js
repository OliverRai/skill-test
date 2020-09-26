import axios from 'axios';

const api_url_pessoas = 'http://localhost:8080/api/';

class UserService{

    getUsers(){
       return axios.get(api_url_pessoas);
    }

}

export default new UserService();