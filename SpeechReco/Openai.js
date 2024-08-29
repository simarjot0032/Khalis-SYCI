let micBtn = document.querySelector(".user-mic-btn");
let recorder;
let chunks = [];

micBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: "audio/mp3" });
      const audioStream = audioBlob.stream();
      chunks = [];

      const api = "https://api.openai.com/v1/audio/transcriptions";
      const Key = "api key here";
      const formData = new FormData();
      formData.append("model", "whisper-1");
      formData.append("file", audioBlob, "recording.mp3");
      formData.append("prompt", "give output in indian punjabi");
      formData.append(" response_format", "verbose_json");
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Key}`,
          },
          body: formData,
        });

        if (!response.ok) {
          console.error(response.status);
        } else {
          const data = await response.json();
          console.log(data);
        }
      } catch (e) {
        console.error("Fetch error:", e.message);
      }
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 2000);
  } catch (err) {
    console.error("Error accessing media devices:", err);
  }
});
