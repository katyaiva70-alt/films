const apiKey = '8XTZ6C7-0WNMH8P-Q61EG8R-Y7DYVGZ'; // замените на ваш реальный ключ
let query = '';         // название фильма для поиска
const limit = 20;                // количество результатов на страницу
const page = 1;                 // номер страницы
const aside = document.querySelector("aside") 
let sections = ""
let buttonId = 0


function searchFilms(query, genre){

// Формируем URL с параметрами вручную, не используя new URL
//const url = `https://api.kinopoisk.dev/v1.4/movie/search?query=${encodeURIComponent(query)}&limit=${limit}&page=${page}`;

const url = `https://api.kinopoisk.dev/v1.4/movie/search?query=${encodeURIComponent(query)}&type=${encodeURIComponent(genre)}&limit=${limit}&page=${page}`;

fetch(url, {
  method: 'GET',
  headers: {
    'X-API-KEY': apiKey,
    'Content-Type': 'application/json'
  }
})

.then(response => {
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log('Результаты поиска фильмов:', data);
  // Здесь можно обработать и отобразить данные
data.docs.forEach(film => {
  //document.write(film.alternativeName, film.year, film.shortDescription, film.poster.url, "<br>")
sections += `
<section>
            <div>
    <h2>${film.name}</h2>
    <h2>${film.alternativeName}</h2>
    <p class = "type">${film.type}</p>
    <p class = "year">${film.year}</p>
    <p class = "description">${film.shortDescription}</p>
    <img src=${film.poster.url} alt="Постер не найден">
    <button id = ${"b" + buttonId}>Details</button>
            </div>
</section>
`
buttonId++
})

aside.innerHTML = sections
sections = ""
buttonId = 0

const buttons = document.querySelectorAll("button")
buttons.forEach((button,i) => {
  button.addEventListener("click", function(event){
    console.log(data.docs[i])
    const modal = document.getElementById("modal")
    film = data.docs[i]
    modal.innerHTML = `
   <h2>${film.name}</h2>
    <h2>${film.alternativeName}</h2>
    <p class = "type">${film.type}</p>
    <p class = "year">${film.year}</p>
    <p class = "countries">${film.countries[0].name}</p>
    <p class = "description">${film.shortDescription}</p>
    <img src=${film.poster.url} alt="Постер не найден">
    <img src=${film.logo.url} alt="Логотип не найден">
    `
  })
})

})
.catch(error => {
  console.error('Ошибка при запросе:', error);
});
}

const form = document.querySelector('form')

form.addEventListener("submit", function(event){
  event.preventDefault()
  query = document.getElementById("films").value
  genre = document.getElementById("type").value
  console.log(genre)
  searchFilms(query,genre);
})
