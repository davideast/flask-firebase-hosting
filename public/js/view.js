
function updateStatus(element, change) {
  element.textContent = change.title;
}

function updateEmoji(element, change) {
  element.textContent = change.emoji;
}

function updateTextColor(element, change, lastChange) {
  if(lastChange){
    element.classList.remove(lastChange.textClass);
  }
  element.classList.add(change.textClass);
}

function fadeBackground(document) {
  const SELECTOR_TEXT = '.bg-weather::before';
  const rules = Array.from(document.styleSheets[1].rules);
  const pseudoElementRule = rules.find(r => r.selectorText === SELECTOR_TEXT);
  return change => {
    pseudoElementRule.style.opacity = change.status;
  }
}

export function hyrdateView(document, statuses) {
  const statusElement = document.querySelector('#status');
  const emojiElement = document.querySelector('#emoji');
  const body = document.querySelector('body');
  const fader = fadeBackground(document);
  let lastChange = null;
  return { 
    update(data) {
      const change = statuses[data.status];
      updateStatus(statusElement, change);
      updateEmoji(emojiElement, change);
      updateTextColor(body, change, lastChange);
      fader(change);
      lastChange = change;
    }
  };
}
