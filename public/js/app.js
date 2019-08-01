import { weatherChanges, loadFirebase, initializeApp } from '/js/firebase.js';
import { hyrdateView } from '/js/view.js';

// Do this ASAP
const eagerLoad = loadFirebase();
const statuses = window.__STATUSES__ || [];

async function streamWeatherChanges() {
  await eagerLoad;
  const app = initializeApp(firebase);
  const view = hyrdateView(document, statuses);
  weatherChanges(app, view.update);
}

streamWeatherChanges();
