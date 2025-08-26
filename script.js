const apiKey = "hoqJzUfK9U1IlVQPR6OEnYxM4fejdWOqcf1Drnlb";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

async function fetchAPOD() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const container = document.getElementById("apod-container");
    container.innerHTML = ""; // Clear previous content

    if (data.media_type === "image") {
      const img = document.createElement("img");
      img.src = data.url;
      img.alt = data.title || "NASA Astronomy Picture of the Day";
      container.appendChild(img);
    } else {
      // Fallback for video/unsupported types
      const message = document.createElement("p");
      message.innerHTML = `Unable to load today's media. 
        <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank" rel="noopener noreferrer">
          View it on APOD
        </a>`;
      container.appendChild(message);
    }

  } catch (error) {
    console.error("Error fetching APOD:", error);
    const container = document.getElementById("apod-container");
    container.innerHTML = `<p>Unable to load today's media. 
      <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank" rel="noopener noreferrer">
        View it on APOD
      </a></p>`;
  }
}

fetchAPOD();
