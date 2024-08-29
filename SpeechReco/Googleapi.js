let micBtn = document.querySelector(".user-mic-btn");
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
    let audioFile = new File([audioBlog], "audio.wav");
    if (audioFile) {
      let reader = new FileReader();
      reader.readAsDataURL(audioBlog);
      reader.addEventListener("load", async () => {
        result = reader.result.split(",")[1];

        const audio = {
          content: result,
        };
        console.log(audio);
        const config = {
          encoding: "LINEAR16",
          sampleRateHertz: 48000,
          languageCode: "en-US",
        };
        const request = {
          audio,
          config,
        };
        try {
          let apiKey = "api key here";
          let apiEndPoint = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;
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
          }
          console.log(audio);
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
  }, 2000);
});
