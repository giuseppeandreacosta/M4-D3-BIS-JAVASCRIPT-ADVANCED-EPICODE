const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const url = "https://api.pexels.com/v1/search?query=";

const apiKey = "IzjqfEL1ITBGQrac2m7bjGM4PWARcr7zfCIO7PlON2DnpsZo8MSvC6Lu";
const perPage = 15;
let currentPage = 1;
let searchTerm = "";

function getImages(url) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        generateHTML(data.photos);
    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}

const generateHTML = (images) => {
    imageWrapper.innerHTML += images.map(img =>
        `<li class="card">
            <img ('${img.photographer}', '${img.src.large2x}')" src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photograph">
                <ion-icon name="camera-outline"></ion-icon>
                    <span>${img.photographer}</span>
                </div>
                <button ('${img.src.large2x}');">
                <ion-icon name="download-outline"></ion-icon>
                </button>
            </div>
        </li>`
    ).join("");
}

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
    }
});



loadMoreBtn.addEventListener("click", () => {
    currentPage++; // Incrementa più foto
     let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    if (searchTerm) {
        apiUrl = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
    }
    getImages(apiUrl);
});

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);




