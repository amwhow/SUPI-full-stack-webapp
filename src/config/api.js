import axios from 'axios';

const supiAPI = axios.create({
  baseURL: 'http://localhost:3000'
})

export default supiAPI;