let micBtn = document.querySelector(".user-mic-btn");
let transcriptor = new webkitSpeechRecognition();
transcriptor.lang = "pa-GURU-IN";
console.log(transcriptor);
let searchBox = document.querySelector("#user-search");
micBtn.addEventListener("click", () => {
  transcriptor.start();
  transcriptor.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    searchBox.value = transcript;
  };
});
