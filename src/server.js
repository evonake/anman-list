import firebase from 'firebase';
import sha256 from 'js-sha256';

firebase.initializeApp({
  apiKey: 'AIzaSyBeotHm7O-r4F2YUedhn9WMZrTI5U0Hs_M',
  authDomain: 'anman-list.firebaseapp.com',
  databaseURL: 'https://anman-list-default-rtdb.firebaseio.com',
  projectId: 'anman-list',
  storageBucket: 'anman-list.appspot.com',
  messagingSenderId: '763409917320',
  appId: '1:763409917320:web:6034f95cf87d62d8b9463d'
});
const db = firebase.database();


export function newUser(username, password) {
  db.ref('passwords/').update({
    [username]: sha256(password)
  });
  return;
}

export async function userExists(username) {
  let exists;
  await db.ref(`passwords/${username}`).once('value', snapshot => {
    exists = snapshot.exists();
  });
  return exists
}

export async function verifyPassword(username, password) {
  let hash;
  await db.ref(`passwords/${username}`).once('value', snapshot => {
    hash = snapshot.val();
  });
  return sha256(password) === hash;
}

export function modifyPassword(username, oldPassword, newPassword) {
  return;
}

export async function generateToken(username) {
  let currentToken;
  await db.ref(`tokens/${username}`).once('value', snapshot => {
    currentToken = snapshot.val();
  });
  if (currentToken) {
    return currentToken;
  }

  let token = '';
  const key32 = window.crypto.getRandomValues(new Uint32Array(4));
  for (let i = 0; i < key32.length; i++) {
    token += (i > 0) ? '-' : '';
    token += key32[i].toString(16);
  }

  db.ref('tokens/').update({
    [username]: token
  });
  return token;
}

export async function verifyToken(username, token) {
  if (!username) {
    return false;
  }

  let realToken;
  await db.ref(`tokens/${username}`).once('value', snapshot => {
    realToken = snapshot.val();
  });

  return realToken === token;
}

export function destroyToken(username) {
  db.ref('tokens/').update({
    [username]: null
  });
}

export function newManga(username, type, title, data) {
  db.ref(`${username}/mangas/${type}`).update({
    [title]: data,
  });
}

export function modifyManga(username, { title, link, chapter }) {
  return;
}

export function removeManga(username, title) {
  return;
}

export function newAnime(username, type, title, data) {
  db.ref(`${username}/animes/${type}`).update({
    [title]: data,
  });
}

export function modifyAnime(username, type, title, data) {
  db.ref(`${username}/animes/${type}/${title}`).update(data);
}

export function removeAnime(username, title) {
  return;
}

export async function getUserData(username, mediaType, type) {
  let data;
  await db.ref(`${username}/${mediaType}s/${type}`).once('value', snapshot => {
    data = snapshot.val();
  });
  return data;
}
