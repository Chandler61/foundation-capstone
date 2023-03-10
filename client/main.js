const carsContainer = document.querySelector('#cars-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/cars`

const carsCallback = ({ data: cars }) => displayCars(cars)
const errCallback = err => console.log(err.response.data)

const getAllCars = () => axios.get(baseURL).then(carsCallback).catch(errCallback)
const createCars = body => axios.post(baseURL, body).then(carsCallback).catch(errCallback)
const deleteCars = id => axios.delete(`${baseURL}/${id}`).then(carsCallback).catch(errCallback)
const updateCars = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(carsCallback).catch(errCallback)


function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createCars(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createCarsCard(cars) {
    const carsCard = document.createElement('div')
    carsCard.classList.add('cars-card')

    carsCard.innerHTML = `<img alt='Sweet Ride' src=${cars.imageURL} class="cars-cover"/>
    <p class="cars-title">${cars.title}</p>
    <div class="btns-container">
        <button onclick="updateCars(${cars.id}, 'minus')">-</button>
        <p class="cars-rating">${cars.rating} stars</p>
        <button onclick="updateCars(${cars.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteCars(${cars.id})">Delete</button>
    `


    carsContainer.appendChild(carsCard)
}

function displayCars(arr) {
    carsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createCarsCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllCars()

let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

function search_cars() {
  let input = document.getElementById('searchbar').value
  input=input.toLowerCase();
  let x = getAllCars;
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].style.display="none";
      }
      else {  
        x[i].style.display="list-item";                 
      }
  }
}