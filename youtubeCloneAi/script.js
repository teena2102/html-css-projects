// This script adds YouTube-like interactivity: video playback, search, trending, and history

const videos = [
  {
    id: 1,
    title: "Executive Leadership: How Great Leaders Inspire Action",
    channel: "TEDx Talks",
    views: "2.5M views",
    date: "1 week ago",
    thumbnail: "https://i.ytimg.com/vi/qp0HIF3SfI4/hqdefault.jpg",
    src: "https://www.youtube.com/embed/qp0HIF3SfI4",
    trending: true,
  },
  {
    id: 2,
    title: "Executive Presence: What Is It?",
    channel: "Harvard Business Review",
    views: "1.2M views",
    date: "2 weeks ago",
    thumbnail: "https://i.ytimg.com/vi/2nK5n3Gqk_U/hqdefault.jpg",
    src: "https://www.youtube.com/embed/2nK5n3Gqk_U",
    trending: true,
  },
  {
    id: 3,
    title: "How to Think Like an Executive",
    channel: "Stanford Graduate School of Business",
    views: "800K views",
    date: "3 weeks ago",
    thumbnail: "https://i.ytimg.com/vi/1K5KQ2xkKzY/hqdefault.jpg",
    src: "https://www.youtube.com/embed/1K5KQ2xkKzY",
    trending: false,
  },
];

let history = [];

function renderVideos(filterFn = () => true) {
  const container = document.querySelector(".videos");
  container.innerHTML = "";
  videos.filter(filterFn).forEach((video) => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="Video Thumbnail" />
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${video.channel} • ${video.views} • ${video.date}</p>
      </div>
    `;
    card.onclick = () => playVideo(video);
    container.appendChild(card);
  });
}

function playVideo(video) {
  history.unshift(video);
  const main = document.querySelector(".main-content");
  main.innerHTML = `
    <div class="video-player">
      <iframe width="100%" height="400" src="${video.src}" frameborder="0" allowfullscreen></iframe>
      <h2>${video.title}</h2>
      <p>${video.channel} • ${video.views} • ${video.date}</p>
      <button onclick="window.location.reload()">Back to Videos</button>
    </div>
  `;
}

function setupSearch() {
  const search = document.querySelector(".search-bar");
  search.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    renderVideos(
      (v) =>
        v.title.toLowerCase().includes(term) ||
        v.channel.toLowerCase().includes(term)
    );
  });
}

function setupSidebar() {
  const items = document.querySelectorAll(".sidebar li");
  items.forEach((item) => {
    item.onclick = () => {
      if (item.textContent === "Trending") {
        renderVideos((v) => v.trending);
      } else if (item.textContent === "Home") {
        renderVideos();
      } else if (item.textContent === "History") {
        renderHistory();
      }
    };
  });
}

function renderHistory() {
  const main = document.querySelector(".main-content");
  main.innerHTML = "<h2>Watch History</h2>";
  if (history.length === 0) {
    main.innerHTML += "<p>No videos watched yet.</p>";
    return;
  }
  history.forEach((video) => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="Video Thumbnail" />
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${video.channel} • ${video.views} • ${video.date}</p>
      </div>
    `;
    card.onclick = () => playVideo(video);
    main.appendChild(card);
  });
}

// Add History to sidebar
window.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar ul");
  if (![...sidebar.children].some((li) => li.textContent === "History")) {
    const li = document.createElement("li");
    li.textContent = "History";
    sidebar.appendChild(li);
  }
  renderVideos();
  setupSearch();
  setupSidebar();
});
