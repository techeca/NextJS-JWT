import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
//URL+api+customURl ex: localhost/api/travels
const baseUrl = `${publicRuntimeConfig.apiUrl}/travels`;

export const travelsService = {
  getAllTravelsName,
  getAllTravels
}

function getAllTravelsName(){
  return fetchWrapper.get(`${baseUrl}/travelsInfo`)
}

function getAllTravels(origen, destino, fecha){
  return fetchWrapper.postSn(`${baseUrl}/travelsInfo`, {origen, destino, fecha})
}
