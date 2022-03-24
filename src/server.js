import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref, child, update } from 'firebase/database';
import sha256 from 'js-sha256';


const app = initializeApp({
  apiKey: 'AIzaSyBeotHm7O-r4F2YUedhn9WMZrTI5U0Hs_M',
  authDomain: 'anman-list.firebaseapp.com',
  databaseURL: 'https://anman-list-default-rtdb.firebaseio.com',
  projectId: 'anman-list',
  storageBucket: 'anman-list.appspot.com',
  messagingSenderId: '763409917320',
  appId: '1:763409917320:web:6034f95cf87d62d8b9463d'
});
const db = getDatabase(app);
const dbRef = ref(db);

export function newUser(username, password) {
  update(child(dbRef, 'passwords/'), { [username]: sha256(password) });
  return;
}

export async function userExists(username) {
  let exists;
  await get(child(dbRef, `passwords/${username}`))
    .then(snapshot => {
      exists = snapshot.exists();
    })
  return exists
}

export async function verifyPassword(username, password) {
  let hash;
  await get(child(dbRef, `passwords/${username}`))
    .then(snapshot => {
      hash = snapshot.val();
    })
  return sha256(password) === hash;
}

export function modifyPassword(username, oldPassword, newPassword) {
  return;
}

export async function generateToken(username) {
  let currentToken;
  await get(child(dbRef, `tokens/${username}`))
    .then(snapshot => {
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

  update(child(dbRef, 'tokens/'), { [username]: token });
  return token;
}

export async function verifyToken(username, token) {
  if (!username) {
    return false;
  }

  let realToken;
  await get(child(dbRef, `tokens/${username}`))
    .then(snapshot => {
      realToken = snapshot.val();
    })

  return realToken === token;
}

export function destroyToken(username) {
  update(child(dbRef, 'tokens/'), { [username]: null } );
}

export function newManga(username, status, data) {
  update(child(dbRef, `${username}/mangas/${status}`), { [data.title]: data });
}

export function modifyManga(username, { title, link, chapter }) {
  return;
}

export function removeManga(username, title) {
  return;
}

export function newAnime(username, status, data) {
  update(child(dbRef, `${username}/animes/${status}`), { [data.title]: data });
}

export function modifyAnime(username, status, title, data) {
  update(child(dbRef, `${username}/animes/${status}/${title}`), data)
}

export function removeAnime(username, title) {
  return;
}

export async function getUserData(username, mediaType, status) {
  let data;
  await get(child(dbRef, `${username}/${mediaType}s/${status}`))
    .then(snapshot => {
      data = snapshot.val();
    });
  return data;
}
