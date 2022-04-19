import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/tickets`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const ticketsService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value},
  buyTickets
};

function buyTickets(userData, carrito){
  return fetchWrapper.post(`${baseUrl}/buyTicket`, {userData, carrito})
    };
