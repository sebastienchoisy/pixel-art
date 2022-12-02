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
  return axios.get('/user/count');
}

export async function getBoardsNb() {
  return axios.get('/pixelBoard/count');
}

export async function postBoard(boardData) {
  return axios.post('/pixelBoard', boardData);
}

export async function logout() {
  return axios.get('/user/logout');
}

export async function login(formData) {
  return axios.post('/user/login', formData);
}

export function signup(formData) {
  return axios.post('/user/signup', formData);
}

export async function getUserInfo() {
  return axios.get('/user/loginstatus');
}

export async function patchPixelFromBoard(idBoard, idPixel, patchData) {
  return axios.patch(`/pixelBoard/pixel?idBoard=${idBoard}&idPixel=${idPixel}`, patchData);
}

// TODO:Remove
export function modifyUser(formData) {
  console.log(`${formData.username} ${formData.email}`);
  return { success: true };
}

export function checkUsernameAvailability(username) {
  return { success: true, message: `${username} available` };
}

/*
export function createBoard(formBoard) {
  return { success: true, message: formBoard };
}
*/

export function checkBoardTitleAvailable(formBoard) {
  return { success: true, message: formBoard };
}
