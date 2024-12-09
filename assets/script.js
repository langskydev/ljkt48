// Animasi garis bawah pada link aktif
const navLinks = document.querySelectorAll('.nav-list li a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active'));
    link.classList.add('active');
  });
});

// Ambil elemen video
const video = document.getElementById('hero-video');

// Fungsi untuk mengulang video ketika durasi habis
video.addEventListener('ended', () => {
    video.currentTime = 0; // Atur ulang waktu video ke 0
    video.play(); // Mulai ulang video
});

document.addEventListener('DOMContentLoaded', function () {
  // Mengambil semua tombol unduh
  const downloadBtns = document.querySelectorAll('.btn-download');
  const notification = document.getElementById('download-notification');

  // Menambahkan event listener untuk setiap tombol unduh
  downloadBtns.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      // Menampilkan notifikasi unduh
      notification.style.display = 'block';
      notification.style.opacity = '1';

      // Menyembunyikan notifikasi setelah 3 detik
      setTimeout(function () {
        notification.style.opacity = '0';
        setTimeout(function () {
          notification.style.display = 'none';
        }, 500); // Menunggu transisi selesai
      }, 3000);
    });
  });

  // Fungsi untuk menampilkan lebih banyak lagu
  let musicCards = document.querySelectorAll('.music-card');
  let moreMusicBtn = document.getElementById('more-music-btn');
  const visibleMusicCount = 6;

  // Menyembunyikan musik setelah 6
  for (let i = visibleMusicCount; i < musicCards.length; i++) {
    musicCards[i].style.display = 'none';
  }

  moreMusicBtn.addEventListener('click', function () {
    // Menampilkan lebih banyak lagu
    for (let i = visibleMusicCount; i < musicCards.length; i++) {
      musicCards[i].style.display = 'block';
    }
    moreMusicBtn.style.display = 'none'; // Menyembunyikan tombol setelah semua lagu ditampilkan
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Mengambil semua tombol share
  const shareBtns = document.querySelectorAll('.btn-share');

  // Menambahkan event listener untuk setiap tombol share
  shareBtns.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      const audioFile = event.target.closest('.music-card').querySelector('audio');
      const shareText = `Check out this awesome song: ${audioFile.src}`;

      if (navigator.share) {
        // Web Share API (for supported browsers)
        navigator.share({
          title: 'Heavy Rotation',
          text: shareText,
          url: audioFile.src
        }).then(() => {
          console.log('Shared successfully');
        }).catch((error) => {
          console.log('Error sharing:', error);
        });
      } else {
        alert('Sharing is not supported on this browser.');
      }
    });
  });
});

let currentPage = 1;
const videosPerPage = 6;

const videoData = {
  christy: [
    "assets/vidoo/christy1.mp4",
    "assets/vidoo/christy2.mp4",
    "assets/vidoo/christy3.mp4",
    "assets/vidoo/christy4.mp4",
    "assets/vidoo/christy5.mp4",
    "assets/vidoo/christy6.mp4",
    "assets/vidoo/christy7.mp4",
    "assets/vidoo/christy8.mp4",
    "assets/vidoo/christy9.mp4",
  ],
  gracia: [
    "assets/vidoo/gracia1.mp4",
    "assets/vidoo/gracia2.mp4",
  ],
  oline: [
    "assets/vidoo/oline1.mp4",
    "assets/vidoo/oline2.mp4",
    "assets/vidoo/oline3.mp4",
    "assets/vidoo/oline4.mp4",
  ],
  all: [
    "assets/vidoo/christy1.mp4",
    "assets/vidoo/christy2.mp4",
    "assets/vidoo/christy3.mp4",
    "assets/vidoo/christy4.mp4",
    "assets/vidoo/christy5.mp4",
    "assets/vidoo/christy6.mp4",
    "assets/vidoo/christy7.mp4",
    "assets/vidoo/christy8.mp4",
    "assets/vidoo/christy9.mp4",
    "assets/vidoo/gracia1.mp4",
    "assets/vidoo/gracia2.mp4",
    "assets/vidoo/oline1.mp4",
    "assets/vidoo/oline2.mp4",
    "assets/vidoo/oline3.mp4",
    "assets/vidoo/oline4.mp4",
  ]
};

function loadVideos(oshi) {
  let videoGrid = document.getElementById('video-grid');
  videoGrid.innerHTML = ''; // Clear current videos
  let videos = videoData[oshi];

  // Ambil data like yang sudah ada di localStorage, jika ada
  let likes = JSON.parse(localStorage.getItem('videoLikes')) || {};

  // Pagination logic
  const start = (currentPage - 1) * videosPerPage;
  const end = start + videosPerPage;
  const currentVideos = videos.slice(start, end);

  currentVideos.forEach(function(videoSrc, index) {
    let videoCard = document.createElement('div');
    videoCard.classList.add('video-card');
    videoCard.setAttribute('data-aos', 'zoom-in');
    videoCard.setAttribute('data-aos-delay', '300');

    // Menampilkan jumlah like dari localStorage untuk setiap video
    let videoKey = videoSrc;
    let currentLikes = likes[videoKey] || 0;

    videoCard.innerHTML = `
      <video class="video-player" controls>
        <source src="${videoSrc}" type="video/mp4">
        Browser Anda tidak mendukung video.
      </video>
      <div class="video-card-footer">
        <button class="btn-share"><i class="fas fa-share-alt"></i> Share</button>
        <button class="btn-like"><i class="fas fa-thumbs-up"></i> Like <span class="like-count">${currentLikes}</span></button>
      </div>
    `;

    // Menambahkan fungsionalitas tombol Like
    let likeButton = videoCard.querySelector('.btn-like');
    let likeCount = videoCard.querySelector('.like-count');
    likeButton.addEventListener('click', function() {
      likes[videoKey] = (likes[videoKey] || 0) + 1;
      likeCount.textContent = likes[videoKey]; // Update like count on the UI
      localStorage.setItem('videoLikes', JSON.stringify(likes));
    });

    // Menambahkan fungsionalitas tombol Share
    let shareButton = videoCard.querySelector('.btn-share');
    shareButton.addEventListener('click', function() {
      let videoUrl = videoSrc;

      if (navigator.share) {
        navigator.share({
          title: 'Video Oshi',
          url: videoUrl
        }).then(() => {
          console.log('Video shared successfully');
        }).catch((error) => {
          console.log('Error sharing video: ', error);
        });
      } else {
        navigator.clipboard.writeText(videoUrl).then(() => {
          alert('Link video telah disalin ke clipboard!');
        }).catch((error) => {
          console.error('Gagal menyalin URL: ', error);
        });
      }
    });

    videoGrid.appendChild(videoCard);
  });

  // Jika video lebih banyak, tampilkan tombol "Load more"
  if (end < videos.length) {
    document.getElementById('load-more-videos').style.display = 'block';
  } else {
    document.getElementById('load-more-videos').style.display = 'none';
  }
}

document.getElementById('all-videos').addEventListener('click', function() {
  currentPage = 1; // Reset to first page
  loadVideos('all');
});

document.getElementById('christy-videos').addEventListener('click', function() {
  currentPage = 1; // Reset to first page
  loadVideos('christy');
});

document.getElementById('gracia-videos').addEventListener('click', function() {
  currentPage = 1; // Reset to first page
  loadVideos('gracia');
});

document.getElementById('oline-videos').addEventListener('click', function() {
  currentPage = 1; // Reset to first page
  loadVideos('oline');
});

document.getElementById('load-more-videos').addEventListener('click', function() {
  currentPage++;
  loadVideos('all');
});

// Initial load
loadVideos('all');
