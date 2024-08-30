let micBtn = document.querySelector(".user-mic-btn");
let inputBox = document.querySelector("#user-search");
let recorder;
let result;
let chunks = [];
micBtn.addEventListener("click", async () => {
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  recorder.onstop = async () => {
    let audioBlog = new Blob(chunks, { type: "audio/wav" });
    chunks = [];

    if (audioBlog) {
      let reader = new FileReader();
      reader.readAsDataURL(audioBlog);
      reader.addEventListener("load", async () => {
        result = reader.result.split(",")[1];

        const audio = {
          content: result,
        };
        // console.log(audio);
        const config = {
          encoding: "WEBM_OPUS",
          sampleRateHertz: 48000,
          languageCode: "pa-In",
        };
        const request = {
          audio,
          config,
        };
        try {
          let apiKey = "Your api key";
          let apiEndPoint = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;
          console.log(request);
          let response = await fetch(apiEndPoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          });
          if (!response.ok) {
            console.error("Error:", await response.text());
          } else {
            const data = await response.json();
            console.log(data);
            inputBox.value = data.results[0].alternatives[0].transcript;
          }
          // console.log(audio);
        } catch (e) {
          console.log(e.message);
        }
      });
    }
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
    console.log("recorder stopped");
  }, 5000);
});
