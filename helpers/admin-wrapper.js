import getConfig from 'next/config';
import { adminService } from '@services/index';

const { publicRuntimeConfig } = getConfig();

export const adminWrapper = {
  get,
  post,
  put,
  delete: _delete
};

function get(url){
  //const tmp = parseToken(data);
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    credentials: 'include',
    body: JSON.stringify(body)
  };

  //console.log(requestOptions)
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body){
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    body: JSON.stringify(body)
  };
  //console.log(requestOptions)
  return fetch(url, requestOptions).then(handleResponse);
}

function _delete(){
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(url)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

//help function
function authHeader(url) {
  const user = adminService.adminValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if(isLoggedIn && isApiUrl) {
    return {Authorization: `Bearer ${user.token}`};
  }else {
    return {};
  }
}

function handleResponse(response){
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if(!response.ok){
      if([401, 403].includes(response.status) && adminService.adminValue){
        adminService.logoutadm();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
