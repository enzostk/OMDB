const resultDiv = document.getElementById("result");
const popupDiv = document.getElementById("popup");
const submitBtn = document.getElementById("button");
const searchBar = document.getElementById("search");

import apiKey from "./apiKey.js";

let observer = new IntersectionObserver(
  function (observable) {
    observable.forEach(function (observable) {
      if (observable.intersectionRatio > 0.5) {
        observable.target.classList.remove("not-visible");
        console.log("visible");
      } else {
        observable.target.classList.add("not-visible");
        console.log("pas visible");
      }
    });
  },
  {
    threshold: [0.5],
  }
);

const observe = () => {
  let result = document.querySelectorAll(".card");
  result.forEach(function (result) {
    result.classList.add("not-visible");
    observer.observe(result);
  });
};

const getUrl = (searchText) => {
  let formatedText = searchText.replace(" ", "+");
  let url = `https://www.omdbapi.com/?s=${formatedText}&apikey=${apiKey}`;
  getMovieData(url);
};

const getMovieData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let movieData = data.Search;
      displayMovie(movieData);
      observe();

      const popupBtn = document.querySelectorAll("a");
      popupBtn.forEach((button) => {
        button.addEventListener("click", () => {
          getDetailData(button);
        });
      });
    })
    .catch((error) => console.error(error));
};

submitBtn.addEventListener("click", () => {
  getUrl(searchBar.value);
});

const displayMovie = (movieData) => {
  resultDiv.innerHTML = movieData
    .map(
      (movie) =>
        ` 
       <div class="row">
         <div class="card" style="width: 25rem; height =15rem;">
            <img class="card-img-top" src=${movie.Poster} alt="">
            <div class="card-body">
               <h5 class="card-title">${movie.Title}</h5>
               <p class="card-text">${movie.Year}</p>
               <a id="${movie.imdbID}" class="btn btn-primary">Read More</a>
            </div>
         </div>
       </div>    
   
 `
    )
    .join(" ");
};

// const getDetailData = (button) => {
//   fetch(`https://www.omdbapi.com/?i=${button.id}&apikey=${apiKey}`)
//     .then((res) => res.json())
//     .then((data) => {
//       popupDiv.style.display = "flex";
//       popupDiv.innerHTML = movieDetail(data);
//       console.log(popupDiv);
//       closeBtnPopup();
//     });
// };

// const closeBtnPopup = () => {
//   let closeButton = document.getElementById("close-button");
//   closeButton.addEventListener("click", () => {
//     closePopup();
//   });
// };

// const movieDetail = (data) => {
//   return `
//    <div class="card mb-3" style = "max-width: 540px; display: flex">
//       <button type=button class='btn-close' id="close-button" data-bs-dismiss="alert" aria-label="Close"></button>
//       <div class="column">
//          <div class= "col-md-4">
//          <img src ="${data.Poster}" class="card-img-top" alt="...">
//          </div>
//          <div class="col-md-8">
//             <div class="card-body">
//                <h5 class="card-title">${data.Title}</h5>
//                <p class="card-text">${data.Plot}</p>
//                <p class="card-text"><small class="text-muted">${data.Released}</small></p>
//             </div>
         
//          </div>
//       </div>
//   </div>
//    `;
// };

// const closePopup = () => {
//   popupDiv.style.display = "none";
//   popupDiv.innerHTML = "";
// };
