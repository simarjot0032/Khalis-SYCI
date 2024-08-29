let micBtn = document.querySelector(".user-mic-btn");
let recorder;
let chunks = [];
micBtn.addEventListener("click", async () => {
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  recorder.onstop = () => {
    let audioBlog = new Blob(chunks, { type: "audio/mp3" });
    let apiEndPoint = "";
    let apiKey = "api key";
    let response = fetch(apiEndPoint, {
      method: "POST",
      headers: {},
    });
  };
});
