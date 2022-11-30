// export function login(emailInput, pwdInput) {
//   return axios.post('/user/login', { email: emailInput, pwd: pwdInput });
// }
//
// export function logout() {
//   return axios.get('/user/logout');
//   return { success: true, message: 'logout' };
// }
//
// export function getUserInfoWithCookie() {
//   return axios.get('/user/info');
// }

import axios from 'axios';

export async function getBoard(id) {
  return axios.get(`/pixelBoard?id=${id}`);
}

export function getBoards() {
  return axios.get('/pixelBoard');
}

export async function getRecentBoards() {
  return axios.get('/pixelBoard/lastcreated');
}

export async function getClosedBoards() {
  return axios.get('/pixelBoard/lastclosed');
}

export async function getPopularBoards() {
  return axios.get('/pixelBoard/populars');
}

export async function getUsersNb() {
  return axios.get('/user/statCount');
}

export async function getBoardsNb() {
  return axios.get('/pixelBoard/statCount');
}

export async function postBoard(boardData) {
  return axios.post('/pixelBoard', boardData);
}

// FAKE API
export function login(formData) {
  if (formData.email === 'toto@gmail.com' && formData.password === 'tata') {
    return { success: true, username: 'toto' };
  }
  return { success: false };
}

export function signup(formData) {
  console.log(`${formData.username} ${formData.email} ${formData.password}`);
  return { success: true, username: 'toto' };
}

export function logout() {
  return { success: true, message: 'logout' };
}

export function modifyUser(formData) {
  console.log(`${formData.username} ${formData.email}`);
  return { success: true };
}

export function checkUsernameAvailability(username) {
  return { success: true, message: `${username} available` };
}

export async function getUserInfo() {
  return {
    // on change la valeur de success pour changer l'état de connexion, true on est connecté
    success: true,
    user: {
      username: 'toto',
      email: 'test@test.fr',
      inscriptionDate: '20/11/2022',
      boards: [5, 1, 6, 3],
      pixelsNb: 12,
    },
  };
}
/*
export function createBoard(formBoard) {
  return { success: true, message: formBoard };
}
*/

export function checkBoardTitleAvailable(formBoard) {
  return { success: true, message: formBoard };
}
