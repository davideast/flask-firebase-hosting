
export function loadFirebase() {
  return Promise.all([
    import('/__/firebase/6.3.3/firebase-app.js'),
    import('/__/firebase/6.3.3/firebase-firestore.js'),
  ]);
}

export function weatherChanges(app, callback) {
  const db = app.firestore();
  const ref = db.collection('weather').doc('SF');
  onSnapshotData(ref, callback);
}

function onSnapshotData(ref, callback) {
  ref.onSnapshot(doc => {
    callback({ id: doc.id, ...doc.data() });
  });
}

export function initializeApp(firebase) {
  return firebase.initializeApp({
    apiKey: "AIzaSyCKz9a5AGbSoL33z5bHn8o6ylV0z0ZwlBo",
    authDomain: "poison-map.firebaseapp.com",
    databaseURL: "https://poison-map.firebaseio.com",
    projectId: "poison-map",
    storageBucket: "poison-map.appspot.com",
    messagingSenderId: "414661558631",
    appId: "1:414661558631:web:ff1ffdfdc634780f"
  });
}