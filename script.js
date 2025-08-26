const apiKey = "hoqJzUfK9U1IlVQPR6OEnYxM4fejdWOqcf1Drnlb";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const img = document.getElementById("apod");
    const link = document.getElementById("apod-link");
    const iframe = document.getElementById("apod-iframe");
    const video = document.getElementById("apod-video");
    const error = document.getElementById("error");

    if (data.media_type === "image") {
      // Show image
      link.style.display = "block";
      img.src = data.url;
      link.href = data.hdurl || data.url;
    } else if (data.media_type === "video") {
      // Check if it’s YouTube/Vimeo
      if (data.url.includes("youtube.com") || data.url.includes("vimeo.com")) {
        iframe.style.display = "block";
        iframe.src = data.url;
      } else {
        // Assume direct video file (e.g., MP4)
        video.style.display = "block";
        video.src = data.url;
      }
    } else {
      error.style.display = "block";
      error.textContent = "Unable to load today's NASA Picture of the Day.";
    }
  })
  .catch(err => {
    const error = document.getElementById("error");
    error.style.display = "block";
    error.textContent = "Error fetching the NASA Picture of the Day.";
    console.error(err);
  });
