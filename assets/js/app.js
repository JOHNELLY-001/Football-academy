document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('events-container');

  if (!container) {
    console.error('Error: #events-container not found in the DOM.');
    return;
  }

  fetch('https://football-backend-h6ss.onrender.com/api/media/news')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(events => {
      container.innerHTML = ''; // Clear existing content

      if (!Array.isArray(events) || events.length === 0) {
        container.innerHTML = '<p>No events found.</p>';
        return;
      }

      events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'news-card fade-in';

        const imageSrc = `event.url`;
        const createdAt = new Date(event.created_at);
        const formattedDate = createdAt.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });

        card.innerHTML = `
          <div class="image-container">
            <img src="${imageSrc}" class="card-image" alt="${event.title}">
            <div class="image-overlay"></div>
            <span class="time-ago" data-posted="${event.created_at}">${formattedDate}</span>
          </div>
          <div class="card-content">
            <h3 class="news-title">${event.title}</h3>
            <p class="news-excerpt">${event.description}</p>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading events:", err);
      container.innerHTML = '<p style="color:red;">Failed to load events. Try again later.</p>';
    });
});


document.addEventListener("DOMContentLoaded", () => {
  // Load hero video dynamically
  const videoElement = document.querySelector(".hero-video");
  const sourceElement = videoElement.querySelector("source");
  const defaultSrc = videoElement.getAttribute("data-default-src");

  fetch('https://football-backend-h6ss.onrender.com/api/media/home-video')
    .then(response => {
      if (!response.ok) throw new Error("Failed to load video metadata");
      return response.json();
    })
    .then(video => {
      if (video && video.filename) {
        sourceElement.src = `video.url`;
      } else {
        sourceElement.src = defaultSrc;
      }
      videoElement.load(); // Reload video with new source
    })
    .catch(error => {
      console.error("Error loading hero video:", error);
      sourceElement.src = defaultSrc;
      videoElement.load();
    });
});


// fetchFounder.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("founder-container");
  const info = document.getElementById("founder-info");

  fetch("https://football-backend-h6ss.onrender.com/api/media/founders") // Update this if your backend route differs
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch founder data");
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const founder = data[0]; // Only showing first founder

        // Show image
        const img = document.createElement("img");
        img.src = `founder.url`;
        img.alt = founder.name;
        img.className = "img-fluid";
        container.appendChild(img);

        // Show info
        info.innerHTML = `
          <h4>${founder.name}</h4>
          <span>Founder</span>
          <p>${founder.bio}</p>
        `;
      } else {
        container.innerHTML = "<p>No founder data found.</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching founder:", error);
      container.innerHTML = "<p>Failed to load founder data.</p>";
    });
});


// fetchCoach.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("coaches-container");
  const info = document.getElementById("coach-info");

  fetch("https://football-backend-h6ss.onrender.com/api/media/coaches") // Make sure this route matches your backend
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch coach data");
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const coach = data[0]; // Display first coach only

        // Show image
        const img = document.createElement("img");
        img.src = `coach.url`;
        img.alt = coach.name;
        img.className = "img-fluid";
        container.appendChild(img);

        // Show info
        info.innerHTML = `
          <h4>${coach.name}</h4>
          <span>${coach.title}</span>
          <p>Skilled in technical training, tactics, and fitness development.</p>
        `;
      } else {
        container.innerHTML = "<p>No coach data found.</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching coach:", error);
      container.innerHTML = "<p>Failed to load coach data.</p>";
    });
});


// fetchAdmin.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("adminstration-container");
  const info = document.getElementById("admin-info");

  fetch("http://localhost:3000/api/adminstration") // adjust route if different
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch admin data");
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const member = data[0]; // Only show the first admin staff

        // Show image
        const img = document.createElement("img");
        img.src = `http://localhost:3000/uploads/adminstration/${member.filename}`;
        img.alt = member.name;
        img.className = "img-fluid";
        container.appendChild(img);

        // Show info
        info.innerHTML = `
          <h4>${member.name}</h4>
          <span>${member.role || 'Support Staff'}</span>
          <p>Fitness trainer, Academy coordinator</p>
        `;
      } else {
        container.innerHTML = "<p>No administration data found.</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching administration data:", error);
      container.innerHTML = "<p>Failed to load administration data.</p>";
    });
});


// fetchPlayers.js
document.addEventListener("DOMContentLoaded", () => {
  const swiperWrapper = document.getElementById("player-swiper-wrapper");

  fetch("https://football-backend-h6ss.onrender.com/api/media/players") // change URL if needed
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch players");
      return response.json();
    })
    .then(players => {
      if (!players.length) {
        swiperWrapper.innerHTML = "<p>No players found.</p>";
        return;
      }

      players.forEach(player => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        slide.innerHTML = `
          <div class="testimonial-item">
            <img src="${player.url}" class="testimonial-img1" alt="${player.name}">
            <h4>${player.position || "Player"}</h4>
          </div>
        `;

        swiperWrapper.appendChild(slide);
      });

      // Force Swiper to update if needed (if Swiper is already initialized)
      if (window.swiperInstance && window.swiperInstance.update) {
        window.swiperInstance.update();
      }
    })
    .catch(error => {
      console.error("Error fetching players:", error);
      swiperWrapper.innerHTML = "<p>Failed to load players.</p>";
    });
});
