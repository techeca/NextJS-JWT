import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { adminWrapper } from '../helpers';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/admin`;
const adminSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('admin')));

export const adminService = {
  admin: adminSubject.asObservable(),
  get adminValue () { return adminSubject.value},
  newTravel,
  loginadm,
  logoutadm,
  getTickets,
  getTravels,
  getUsers,
  getUsersById,
  getTicketsById
};

function loginadm(username, password) {
  return adminWrapper.postSn(`${baseUrl}/loginAdmin`, {username, password})
    .then(admin => {
      adminSubject.next(admin);
      localStorage.setItem('admin', JSON.stringify(admin));
      return admin;
    });
}

function logoutadm(){
  localStorage.removeItem('admin');
  adminSubject.next(null);
  Router.push('/');
}

function newTravel(datosViaje, semana){
  return adminWrapper.post(`${baseUrl}/newTravel`, {datosViaje, semana});
}

function getTickets(){
  return adminWrapper.get(`${baseUrl}/tickets`);
}

function getTravels(){
  return adminWrapper.get(`${baseUrl}/travels`);
}

function getUsers(){
  return adminWrapper.get(`${baseUrl}/users`);
}

function getTicketsById(idUser){
  return adminWrapper.post(`${baseUrl}/tickets`, {idUser});
}

function getUsersById(idUsers){
  return adminWrapper.post(`${baseUrl}/users`, {idUsers});
}
