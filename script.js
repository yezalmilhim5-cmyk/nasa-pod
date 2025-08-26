const apiKey = "hoqJzUfK9U1IlVQPR6OEnYxM4fejdWOqcf1Drnlb";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("NASA APOD response:", data);  // 👈 log the full object

    const img = document.getElementById("apod");
    const link = document.getElementById("apod-link");
    const iframe = document.getElementById("apod-iframe");
    const video = document.getElementById("apod-video");
    const error = document.getElementById("error");

    if (data.media_type === "image") {
      link.style.display = "block";
      img.src = data.url;
      link.href = data.hdurl || data.url;
    } else if (data.media_type === "video") {
      if (data.url.includes("youtube.com") || data.url.includes("vimeo.com")) {
        iframe.style.display = "block";
        iframe.src = data.url;
      } else {
        video.style.display = "block";
        video.src = data.url;
      }
    } else {
      error.style.display = "block";
      error.textContent = "Unknown media type: " + data.media_type;
    }
  })
  .catch(err => {
    const error = document.getElementById("error");
    error.style.display = "block";
    error.textContent = "Error fetching the NASA Picture of the Day.";
    console.error(err);
  });
