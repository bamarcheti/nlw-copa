import axios from "axios";

export const api = axios.create({
  baseURL: 'http://10.100.4.107:3333'
})