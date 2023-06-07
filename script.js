import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-champions-app-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsDB = ref(database, "endorsements");

const textareaEl = document.getElementById("textarea-el");
const btnEl = document.getElementById("btn-el");
const messageEl = document.getElementById("message-el");

btnEl.addEventListener("click", () => {
  let textareaValue = textareaEl.value;
  clearTextarea();
  if (textareaValue) {
    push(endorsementsDB, textareaValue);
  }
});

onValue(endorsementsDB, function (snapshot) {
  if (snapshot.exists()) {
    let endorsementsArray = Object.entries(snapshot.val());
    messageEl.innerHTML = "";
    for (let i = 0; i < endorsementsArray.length; i++) {
      appendMessage(endorsementsArray[i]);
    }
  } else {
    messageEl.innerHTML = "<p>No endorsments yet!...</p>";
  }
});

function appendMessage(message) {
  let messageID = message[0];
  let messageValue = message[1];
  let newEl = document.createElement("div");
  newEl.textContent = messageValue;
  messageEl.append(newEl);

  newEl.addEventListener("dblclick", function () {
    let exactLocationDB = ref(database, `endorsements/${messageID}`);
    remove(exactLocationDB);
  });
}

function clearTextarea() {
  textareaEl.value = "";
}
