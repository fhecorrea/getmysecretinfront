import axios from "axios";
import { decode as base64_decode } from 'base-64';

export default function client (method, url, headers={}, data=null, withCredentials=false) {

  let settings = {
    method,
    url,
    baseURL: process.env.REACT_APP_BASE_API_URL
  };

  if (data !== null) settings['data'] = data;
  if (headers !== {}) settings['headers'] = headers;

  if (withCredentials && (sessionStorage.getItem("current_user") !== null)) {

    const accessToken = JSON.parse(base64_decode(sessionStorage.getItem("current_user"))).accessToken;
    
    settings['headers'] = { 
      ...settings['headers'],
      "Authorization": `Bearer ${accessToken}`
    };
  }

  return axios(settings);
}