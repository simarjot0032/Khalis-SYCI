let micBtn = document.querySelector(".user-mic-btn");
let transcriptor = new webkitSpeechRecognition();
transcriptor.lang = "pa-GURU-IN";
let outputArray = [];
console.log(transcriptor);
let searchBox = document.querySelector("#user-search");
micBtn.addEventListener("click", () => {
  transcriptor.start();
  transcriptor.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    searchBox.value = transcript;
    outputArray.push(transcript);
  };
});
window.addEventListener("beforeunload", () => {
  let outputFile = document.createElement("a");
  let outputBlob = new Blob([outputArray], { type: "text/plain" });
  let outputBlobLink = URL.createObjectURL(outputBlob);
  outputFile.href = outputBlobLink;
  outputFile.setAttribute("download", "Webkit");
  outputFile.click();
});
