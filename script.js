const apiKey = "hoqJzUfK9U1IlVQPR6OEnYxM4fejdWOqcf1Drnlb";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("NASA APOD response:", data);

    const img = document.getElementById("apod");
    const link = document.getElementById("apod-link");
    const iframe = document.getElementById("apod-iframe");
    const video = document.getElementById("apod-video");
    const error = document.getElementById("error");
    const title = document.getElementById("title");
    const explanation = document.getElementById("explanation");

    // Always show title + explanation
    title.textContent = data.title || "Astronomy Picture of the Day";
    explanation.textContent = data.explanation || "";

    if (data.media_type === "image") {
      link.style.display = "block";
      img.src = data.url;
      link.href = data.hdurl || data.url;

    } else if (data.media_type === "video") {
      if (data.url.includes("youtube.com") || data.url.includes("vimeo.com")) {
        iframe.style.display = "block";
        iframe.src = data.url;
      } else if (data.url.endsWith(".mp4")) {
        video.style.display = "block";
        video.src = data.url;
      } else {
        error.style.display = "block";
        error.innerHTML = `Today's APOD is a video.<br>
                           <a href="${data.url}" target="_blank" style="color:#4da6ff;">
                             Click here to watch it on NASA APOD
                           </a>`;
      }

    } else {
      // Handle "other" or unknown cases
      error.style.display = "block";
      error.innerHTML = `Today's APOD is not a standard image or video.<br>
                         <a href="${data.url}" target="_blank" style="color:#4da6ff;">
                           Click here to view it on NASA APOD
                         </a>`;
    }
  })
  .catch(err => {
    const error = document.getElementById("error");
    error.style.display = "block";
    error.textContent = "Error fetching the NASA Picture of the Day.";
    console.error(err);
  });
