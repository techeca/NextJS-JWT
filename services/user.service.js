import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value},
  login,
  logout,
  getAll
};

function login(username, password) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, {username, password})
    .then(user => {
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function logout(){
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/login');
}

function getAll(data){
  //const tmp = parseToken(data);
  return fetchWrapper.get(baseUrl, data);
}
