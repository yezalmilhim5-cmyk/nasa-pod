const apiKey = "hoqJzUfK9U1IlVQPR6OEnYxM4fejdWOqcf1Drnlb";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const img = document.getElementById("apod");
    const link = document.getElementById("apod-link");
    const error = document.getElementById("error");

    if (data.media_type === "image") {
      img.src = data.url;
      link.href = data.hdurl || data.url; // click opens HD image in new tab
    } else if (data.media_type === "video") {
      // Show a message and link to video
      img.style.display = "none";
      error.style.display = "block";
      error.innerHTML = `Today's APOD is a video.<br>
                         <a href="${data.url}" target="_blank" style="color: #4da6ff;">Click here to watch it</a>`;
    } else {
      img.style.display = "none";
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
