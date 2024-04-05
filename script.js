// get data api
async function getApi() {
  const response = await fetch("https://api.jikan.moe/v4/top/anime");
  const result = await response.json();
  // console.log(result.data);
  return result.data;
}

//menampilkan data ke dalam setiap element
async function renderAnime(animeList) {
  const containerElement = document.getElementById("anime-list");
  containerElement.innerHTML = "";

  if (animeList.length === 0) {
    alert("Anime Not Found");
    return;
  }

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add(
      "w-60",
      "2xl:w-full",
      "2xl:max-w-sm",
      "bg-white",
      "rounded-lg",
      "shadow-lg",
      "overflow-hidden",
      "mb-4",
      "flex",
      "flex-col",
      "hover:scale-105",
      "transition",
      "ease-in-out",
      "delay-75"
    );

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("w-full", "h-64", "overflow-hidden");
    card.appendChild(imgContainer);

    const imgElement = document.createElement("img");
    imgElement.src = anime.images.jpg.image_url;
    imgElement.alt = anime.title;
    imgElement.classList.add(
      "object-cover",
      "object-center",
      "w-full",
      "h-full"
    );
    imgContainer.appendChild(imgElement);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add(
      "p-4",
      "flex",
      "flex-col",
      "grow",
      "shrink",
      "basis-40",
      "overflow-auto"
    );
    card.appendChild(contentContainer);

    const titleElement = document.createElement("h2");
    titleElement.textContent = anime.title;
    titleElement.classList.add(
      "text-xl",
      "font-semibold",
      "text-gray-800",
      "mb-2"
    );
    contentContainer.appendChild(titleElement);

    const ratingContainer = document.createElement("div");
    contentContainer.appendChild(ratingContainer);
    ratingContainer.classList.add("flex");

    const genreElement = document.createElement("p");
    genreElement.textContent = anime.genres[0].name; //
    genreElement.classList.add("text-red-700", "mb-2", "mr-24");
    ratingContainer.appendChild(genreElement);

    // create star icon
    function featherIcon(iconName) {
      const starIcon = document.createElement("i");
      starIcon.setAttribute("data-feather", iconName);
      starIcon.style.color = "yellow";
      return starIcon;
    }
    const starIcon = featherIcon("star");
    ratingContainer.appendChild(starIcon);

    const scoreElement = document.createElement("span");
    scoreElement.textContent = anime.score;
    ratingContainer.appendChild(scoreElement);

    if (anime.background) {
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = anime.background;
      descriptionElement.classList.add(
        "text-gray-600",
        "description",
        "text-sm"
      );
      contentContainer.appendChild(descriptionElement);
    } else {
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = "No description available.";
      descriptionElement.classList.add(
        "text-gray-600",
        "description",
        "text-sm"
      );
      contentContainer.appendChild(descriptionElement);
    }

    containerElement.appendChild(card);
  });
  feather.replace();
}

getApi().then((anime) => renderAnime(anime));

async function searchAnime(keyword) {
  const animeList = await getApi();
  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(keyword.toLowerCase())
  );
  return filteredAnime;
}

document.getElementById("search-button").addEventListener("click", async () => {
  const keyword = document.getElementById("search-input").value.trim();
  if (keyword === "") {
    alert("Enter The Title");
    return;
  }

  try {
    const filteredAnime = await searchAnime(keyword);
    renderAnime(filteredAnime);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error, please try again");
  }
});

document
  .getElementById("search-input")
  .addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      const keyword = event.target.value.trim();
      if (keyword === "") {
        alert("Enter The Title");
        return;
      }

      try {
        const filteredAnime = await searchAnime(keyword);
        renderAnime(filteredAnime);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error, please try again");
      }
    }
  });
