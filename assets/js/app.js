document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");

  if (!container) {
    console.error("Error: #events-container not found in the DOM.");
    return;
  }

  fetch("https://football-backend-h6ss.onrender.com/api/events/media")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((events) => {
      container.innerHTML = ""; // Clear existing content

      if (!Array.isArray(events) || events.length === 0) {
        container.innerHTML = "<p>No events found.</p>";
        return;
      }

      events.forEach((event) => {
        const card = document.createElement("div");
        card.className = "news-card fade-in";

        const isVideo = event.filetype && event.filetype.startsWith("video");
        const mediaElement = isVideo
          ? `
            <video class="card-video" autoplay muted loop playsinline>
              <source src="${event.url}" type="${event.filetype}">
              Your browser does not support the video tag.
            </video>
          `
          : `<img src="${event.url}" class="card-image" alt="${event.title}">`;

        const createdAt = new Date(event.created_at);
        const formattedDate = createdAt.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        card.innerHTML = `
          <div class="image-container">
            ${mediaElement}
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
    .catch((err) => {
      console.error("Error loading events:", err);
      container.innerHTML = '<p style="color:red;">Failed to load events. Try again later.</p>';
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.querySelector(".hero-video");

  if (!videoElement) {
    console.error("Hero video element not found.");
    return;
  }

  fetch("https://football-backend-h6ss.onrender.com/api/home-video/media")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to load hero video`);
      return response.json();
    })
    .then(videos => {
      if (!Array.isArray(videos) || videos.length === 0) {
        console.warn("No hero video found in the database.");
        return;
      }

      const latestVideo = videos[0]; // assuming first is the newest
      const sourceElement = videoElement.querySelector("source");

      sourceElement.src = latestVideo.url;
      videoElement.load(); // reload the video element with the new source
    })
    .catch(error => {
      console.error("Error loading hero video:", error);
    });
});



// fetchFounder.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("founder-container");
  const info = document.getElementById("founder-info");

  fetch("https://football-backend-h6ss.onrender.com/api/founders/media") // Update this if your backend route differs
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch founder data");
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const founder = data[0]; // Only showing first founder

        // Show image
        const img = document.createElement("img");
        img.src = founder.url;
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

  fetch("https://football-backend-h6ss.onrender.com/api/coaches/media") // Make sure this route matches your backend
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch coach data");
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const coach = data[0]; // Display first coach only

        // Show image
        const img = document.createElement("img");
        img.src = coach.url;
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


document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("admin-scroll-wrapper");
  const container = document.getElementById("adminstration-container");

  if (!container || !wrapper) {
    console.error("Required elements not found.");
    return;
  }

  const API_URL = "https://football-backend-h6ss.onrender.com/api/leaders/media";

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch data`);
      }
      return response.json();
    })
    .then(admins => {
      if (!Array.isArray(admins) || admins.length === 0) {
        container.innerHTML = "<p>No administration data found.</p>";
        return;
      }

      // Clear container
      container.innerHTML = "";

      admins.forEach(member => {
        const card = document.createElement("div");
        card.className = "admin-card";

        card.innerHTML = `
          <img src="${member.url}" alt="${member.name || 'Admin'}">
          <h4>${member.name || 'Unnamed'}</h4>
          <span>${member.title || 'Support Staff'}</span>
        `;

        card.addEventListener("click", () => openModal(member));
        container.appendChild(card);
      });

      // Infinite scroll setup
      const originalHTML = container.innerHTML;

      const cloneBefore = document.createElement("div");
      cloneBefore.className = "scroll-container";
      cloneBefore.innerHTML = originalHTML;

      const cloneAfter = document.createElement("div");
      cloneAfter.className = "scroll-container";
      cloneAfter.innerHTML = originalHTML;

      container.before(cloneBefore);
      container.after(cloneAfter);

      const cloneWidth = cloneBefore.offsetWidth;
      wrapper.scrollLeft = cloneWidth;

      wrapper.addEventListener("scroll", () => {
        const totalScroll = cloneWidth + container.offsetWidth;
        if (wrapper.scrollLeft <= 0) {
          wrapper.scrollLeft = cloneWidth;
        } else if (wrapper.scrollLeft >= totalScroll) {
          wrapper.scrollLeft = cloneWidth;
        }
      });
    })
    .catch(error => {
      console.error("Error loading administration data:", error);
      container.innerHTML = "<p style='color: red;'>Failed to load data.</p>";
    });

  // Modal logic
  const modal = document.getElementById("admin-modal");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalTitle = document.getElementById("modal-title");
  const modalClose = document.querySelector(".admin-modal-close");

  function openModal(member) {
    modalImg.src = member.url;
    modalName.textContent = member.name || "Unnamed";
    modalTitle.textContent = member.title || "Support Staff";
    modal.classList.remove("hidden");
  }

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const swiperWrapper = document.getElementById("player-swiper-wrapper");

  if (!swiperWrapper) {
    console.error("Player swiper wrapper not found in DOM.");
    return;
  }

  const API_URL = "https://football-backend-h6ss.onrender.com/api/players/media";

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch players`);
      }
      return response.json();
    })
    .then(players => {
      if (!Array.isArray(players) || players.length === 0) {
        swiperWrapper.innerHTML = "<p>No players found.</p>";
        return;
      }

      // Clear any existing slides
      swiperWrapper.innerHTML = "";

      players.forEach(player => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        slide.innerHTML = `
          <div class="testimonial-item">
            <img src="${player.url}" class="testimonial-img1" alt="${player.name || 'Player'}">
            <h4>${player.position || "Player"}</h4>
          </div>
        `;

        swiperWrapper.appendChild(slide);
      });

      // Update Swiper if it's initialized
      if (window.swiperInstance?.update) {
        window.swiperInstance.update();
      }
    })
    .catch(error => {
      console.error("Error loading players:", error);
      swiperWrapper.innerHTML = "<p style='color: red;'>Failed to load players.</p>";
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const logoLink = document.getElementById("logo-link");

  fetch("https://football-backend-h6ss.onrender.com/api/logo/media")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch logo");
      return res.json();
    })
    .then((logos) => {
      if (!Array.isArray(logos) || logos.length === 0) {
        console.warn("No logo found in database.");
        return;
      }

      const logo = logos[0]; // Get the first logo
      const logoImg = document.createElement("img");
      logoImg.src = logo.url;
      logoImg.alt = "GAYDO";
      logoImg.className = "logogydo"; // Keep existing class

      logoLink.appendChild(logoImg);
    })
    .catch((err) => {
      console.error("Error loading logo:", err);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("news-container");

  // Simulating a backend API call
  fetch("https://football-backend-h6ss.onrender.com/api/news/media")
  .then(response => response.json())
  .then(newsData => {
    newsData.forEach(news =>{
      const card = document.createElement("div");
      card.className = "news-card fade-in";

      card.innerHTML = `
      <div class="image-container">
      ${news.url ? `<img src="${news.url}" class="card-image" alt="${news.category}">` : ""}
      <div class="image-overlay"></div>
      <span class="time-ago" data-posted="${news.date}">${news.date}</span>
      </div>
      <div class="card-content"> <h3 class="news-title">${news.title}</h3>
      <p class="news-excerpt">${news.description}</p> </div>`;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading news:", error);
    container.innerHTML = "<p> Failed to load news</p>";
  });
});