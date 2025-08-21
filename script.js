const apiKey = "hoqJzUfK9U1IlVQPR6OEnYxM4fejdWOqcf1Drnlb"; // replace with your NASA API key
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const img = document.getElementById("apod");
    if (data.media_type === "image") {
      img.src = data.url;
    } else {
      img.alt = "Today's APOD is a video. Visit NASA APOD.";
    }
  })
  .catch(err => console.error(err));
