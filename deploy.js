const fs = require('fs');
const util = require('util');
const firebase = require('firebase');

global.XMLHttpRequest = require('xhr2');

require('firebase/storage');
require('dotenv').config();

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'javascript-9cdb9.firebaseapp.com',
  databaseURL: 'https://javascript-9cdb9.firebaseio.com',
  projectId: 'javascript-9cdb9',
  storageBucket: 'javascript-9cdb9.appspot.com',
  messagingSenderId: '593134678665',
  appId: '1:593134678665:web:b3dd9b4d842295aa4c4c58',
  measurementId: 'G-83DM989VK5',
};

const app = firebase.initializeApp(firebaseConfig);
app.auth().signInWithEmailAndPassword(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD).then(processFiles);

async function processFiles() {
  const fileExtensions = ['.exe', '.dmg', '.AppImage'];
  const files = [];
  const filesName = [];

  try {
    const dist = await readDir('./dist');

    dist.forEach(fileName => {
      if (fileExtensions.some(ext => fileName.endsWith(ext))) {
        files.push(readFile('./dist/' + fileName));
        filesName.push(fileName);
      }
    });

    const filesData = await Promise.all(files);

    deployToFirebase(filesName, filesData);
  } catch {}
}

async function deployToFirebase(filesName, filesData) {
  try {
    console.log(`${getCurrentTime()} - Start deploying to firebase...`);

    // Deploy files
    const deployedFiles = await Promise.all(
      filesData.map((data, idx) => app.storage().ref().child(filesName[idx]).put(data)),
    );

    // Get download URLS
    const downloadUrls = await Promise.all(deployedFiles.map(file => file.ref.getDownloadURL()));

    // Save download urls in butlerUrls collection (firestore)
    await Promise.all(
      downloadUrls.map((downloadUrl, idx) =>
        app.firestore().collection('butlerUrls').doc(getDocName(filesName[idx])).set({ downloadUrl }),
      ),
    );

    console.log(`${getCurrentTime()} - Files successfully deployed`);

    process.exit();
  } catch (error) {
    console.log(error);
  }
}

function getDocName(fileName) {
  if (fileName.includes('.exe')) {
    return 'windows';
  }

  if (fileName.includes('.dmg')) {
    return 'macOS';
  }

  if (fileName.includes('.AppImage')) {
    return 'linux';
  }
}

function getCurrentTime() {
  return new Date().toLocaleTimeString();
}
