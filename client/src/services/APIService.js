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

// FAKE API
export function login(email, pwd) {
  if (email === 'toto@gmail.com' && pwd === 'tata') {
    return { success: true, username: 'toto' };
  }
  return { success: false };
}

export function signin(email, pwd) {
  if (email === 'toto@gmail.com' && pwd === 'tata') {
    return { success: true, username: 'toto' };
  }
  return { success: false };
}

export function logout() {
  return { success: true, message: 'logout' };
}

export function getUserInfoWithCookie() {
  return {
    // on change la valeur de success pour changer l'état de connexion, true on est connecté
    success: true,
    user: {
      username: 'toto',
      inscriptionDate: '20/11/2022',
      boards: [5, 1, 6, 3],
      pixelsNb: 12,
      boardsNb: 4,
    },
  };
}
