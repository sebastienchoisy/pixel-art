import axios from 'axios';

export function getBoard(id) {
  return axios.get(`/pixelBoard?id=${id}`);
}

export function getBoards() {
  return axios.get('/pixelBoard');
}

export function getRecentBoards() {
  return axios.get('/pixelBoard/lastcreated');
}

export function getClosedBoards() {
  return axios.get('/pixelBoard/lastclosed');
}

export function getPopularBoards() {
  return axios.get('/pixelBoard/populars');
}

export function getUsersNb() {
  return axios.get('/user/count');
}

export function getBoardsNb() {
  return axios.get('/pixelBoard/count');
}

export function postBoard(boardData) {
  return axios.post('/pixelBoard', boardData);
}

export function logout() {
  return axios.get('/user/logout');
}

export function login(userData) {
  return axios.post('/user/login', userData);
}

export function signup(userData) {
  return axios.post('/user/signup', userData);
}

export function getUserInfo() {
  return axios.get('/user/loginstatus');
}

export function patchPixelFromBoard(idBoard, idPixel, patchData) {
  return axios.patch(`/pixelBoard/pixel?idBoard=${idBoard}&idPixel=${idPixel}`, patchData);
}

export function modifyUser(userData) {
  return axios.patch('/user', userData);
}

export function checkUsernameAvailability(username) {
  return axios.get(`user/usernameavail?username=${username}`);
}

/*
export function createBoard(formBoard) {
  return { success: true, message: formBoard };
}
*/

export function checkBoardTitleAvailable(formBoard) {
  return { success: true, message: formBoard };
}
