let micBtn = document.querySelector(".user-mic-btn");
let recorder;
let chunks = [];
micBtn.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  recorder.onstop = async () => {
    const audio = new Blob(chunks, { type: "audio/wav" });
    console.log(audio);

    chunks = [];
    try {
      const formData = new FormData();
      formData.append("file", audio, "recorded-audio.wav");
      formData.append("model", "whisper-1");
      formData.append("language", "pa");
      const transcript = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer  ",
          },
          body: formData,
        }
      );
      if (!transcript.ok) {
        console.log("error occured ");
      }
      const data = await transcript.json();
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };
  recorder.start();
  setTimeout(() => recorder.stop(), 5000);
});
