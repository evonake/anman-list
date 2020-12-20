import firebase from 'firebase';
import sha256   from 'js-sha256';

firebase.initializeApp({
  apiKey: "AIzaSyBeotHm7O-r4F2YUedhn9WMZrTI5U0Hs_M",
  authDomain: "anman-list.firebaseapp.com",
  databaseURL: "https://anman-list-default-rtdb.firebaseio.com",
  projectId: "anman-list",
  storageBucket: "anman-list.appspot.com",
  messagingSenderId: "763409917320",
  appId: "1:763409917320:web:6034f95cf87d62d8b9463d"
});
const db = firebase.database();


class server {
  newUser(username, password) {
    db.ref('passwords/').update({
      [username]: sha256(password)
    });
    return;
  }

  async userExists(username) {
    let exists;
    await db.ref(`passwords/${username}`).once('value', snapshot => {
      exists = snapshot.exists();
    });
    return exists
  }

  async verifyPassword(username, password) {
    let hash;
    await db.ref(`passwords/${username}`).once('value', snapshot => {
      hash = snapshot.val();
    });
    return sha256(password) === hash;
  }

  modifyPassword(username, oldPassword, newPassword) {
    return;
  }

  newManga(username, {name, link, chapter}) {
    return
  }

  modifyManga(username, {name, link, chapter}) {
    return;
  }

  removeManga(username, name) {
    return;
  }

  newAnime(username, {name, link, season, episode}) {
    return;
  }

  modifyAnime(username, {name, link, season, episode}) {
    return;
  }

  removeAnime(username, name) {
    return;
  }
}


const myServer = new server()
export default myServer;
