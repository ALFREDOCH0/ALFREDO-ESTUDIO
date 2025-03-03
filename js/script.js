// Pesquisa
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");

// Lista de filmes na pasta "FILMES" (adicione os arquivos reais aqui)
const filmesFolder = [
  // Exemplos iniciais (substitua pelos seus arquivos reais)
  {
    file: "FILMES/AKINO_HEGO_O_FILME.avi",
    name: "AKINO HEGO: O FILME",
    description: "Um filme de ação.",
  },
  {
    file: "FILMES/meu_filme2.mp4",
    name: "Meu Filme 2",
    description: "Uma aventura emocionante.",
  },
  {
    file: "FILMES/meu_filme3.avi",
    name: "Meu Filme 3",
    description: "Drama intenso.",
  },
  { file: "FILMES/meu_filme4.mp4", name: "Meu Filme 4" },
  { file: "FILMES/meu_filme5.avi", name: "Meu Filme 5" },
  { file: "FILMES/meu_filme6.mp4", name: "Meu Filme 6" },
  { file: "FILMES/meu_filme7.avi", name: "Meu Filme 7" },
  { file: "FILMES/meu_filme8.mp4", name: "Meu Filme 8" },
  // Adicione mais filmes da sua pasta "FILMES" aqui
  { file: "FILMES/novo_filme1.avi", name: "Novo Filme 1" },
  { file: "FILMES/novo_filme2.mp4", name: "Novo Filme 2" },
];

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    const name = card.getAttribute("data-name").toLowerCase();
    if (searchTerm === "" || name.includes(searchTerm)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});

// Carrossel para cada seção
const movieListContainers = document.querySelectorAll(".movie-list-container");

movieListContainers.forEach((container) => {
  const movieList = container.querySelector(".movie-list");
  const prevButton = container.querySelector(".carousel-button.prev");
  const nextButton = container.querySelector(".carousel-button.next");
  let position = 0;

  prevButton.addEventListener("click", () => {
    position += 190;
    if (position > 0) position = 0;
    movieList.style.transform = `translateX(${position}px)`;
  });

  nextButton.addEventListener("click", () => {
    position -= 190;
    const maxPosition = -(movieList.scrollWidth - container.clientWidth);
    if (position < maxPosition) position = maxPosition;
    movieList.style.transform = `translateX(${position}px)`;
  });
});

// Navegação Suave
document.querySelectorAll(".navigation a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Controle de Vídeo, Pop-up e Lançamentos
document.addEventListener("DOMContentLoaded", () => {
  const trailerVideo = document.querySelector(".trailer video");
  if (trailerVideo) {
    trailerVideo.addEventListener("click", () => {
      trailerVideo.paused ? trailerVideo.play() : trailerVideo.pause();
    });
  }

  // Popular Lançamentos com os últimos 8 filmes da pasta "FILMES"
  const lancamentosList = document.querySelector("#lancamentos .movie-list");
  const latestMovies = filmesFolder.slice(-8); // Últimos 8 da lista

  latestMovies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.setAttribute("data-file", movie.file);
    card.setAttribute("data-name", movie.name);
    if (movie.description)
      card.setAttribute("data-description", movie.description);
    card.innerHTML = `<img src="https://uploaddeimagens.com.br/images/004/728/971/original/MOVIE.png?1708707264" alt="${movie.name}">`;
    lancamentosList.appendChild(card);
  });

  // Configura o pop-up
  const popup = document.getElementById("popup");
  const mediaContainer = popup.querySelector(".media-container");
  const closeButton = popup.querySelector(".close-button");
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    card.addEventListener("click", () => {
      const fileUrl = card.getAttribute("data-file");
      const fileType = fileUrl.split(".").pop().toLowerCase();
      const isFilmSection = card.closest("#filmes");
      const name = card.getAttribute("data-name") || "Sem Título";
      const description =
        card.getAttribute("data-description") || "Sem descrição disponível.";

      mediaContainer.innerHTML = "";

      const title = document.createElement("h3");
      title.textContent = name;
      mediaContainer.appendChild(title);

      const desc = document.createElement("p");
      desc.textContent = description;
      mediaContainer.appendChild(desc);

      if (isFilmSection) {
        const video = document.createElement("video");
        video.controls = true;
        video.innerHTML = `<source src="${fileUrl}" type="video/${
          fileType === "mp4" ? "mp4" : "avi"
        }">Seu navegador não suporta vídeos HTML5.`;
        mediaContainer.appendChild(video);
        video.play();
      } else {
        if (fileType === "mp4" || fileType === "avi") {
          const video = document.createElement("video");
          video.controls = true;
          video.innerHTML = `<source src="${fileUrl}" type="video/${
            fileType === "mp4" ? "mp4" : "avi"
          }">Seu navegador não suporta vídeos HTML5.`;
          mediaContainer.appendChild(video);
          video.play();
        } else if (fileType === "pdf") {
          const iframe = document.createElement("iframe");
          iframe.src = fileUrl;
          mediaContainer.appendChild(iframe);
        }
      }

      popup.style.display = "flex";
    });
  });

  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
    const video = mediaContainer.querySelector("video");
    if (video) video.pause();
  });
});
