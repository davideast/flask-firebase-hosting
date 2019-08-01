import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

const app = firebase.initializeApp(functions.config().firebase);

function toggle(value: any) {
  return !!parseInt(value, 10) ? 0 : 1;
}

export const changeStatus = functions.pubsub.schedule('every 15 seconds').onRun(async context => {
  const db = app.firestore();
  const sfRef = db.collection('weather').doc('SF');
  const snap = await sfRef.get();
  const data = snap.data()!;
  console.log(data);
  const status = toggle(data.status);
  console.log('===== updating =====');
  return sfRef.update({ status });
});
