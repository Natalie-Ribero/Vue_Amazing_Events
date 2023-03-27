// let url = "./assets/scripts/amazing.json"
let url = "https://mindhub-xj03.onrender.com/api/amazing"

async function pedirData() {
  try {
    let respuesta = await fetch(url);
    let data = await respuesta.json();
    return data;

  } catch (error) {
    console.log(error);
  }

}

async function iniciar() {
  const data = await pedirData();

  crearCheckbox(data.events);
  let upcomingEvents = await data.events.filter(event => event.date > data.currentDate);
  sumarCardsArray(upcomingEvents);
  filtroCheckbox(upcomingEvents);
}

iniciar();

// Crear categorys
function crearCheckbox(array) {
  let categorias = array.map((event) => event.category);
  let category = new Set(categorias);
  let checkbox = '';
  for (let event of category) {
    checkbox += `<label>
  <input type="checkbox" name="category" value="${event}">
   ${event}
</label>`
  }

  document.querySelector(".categoryUpcoming #categorias .labels").innerHTML =
    checkbox;
}

//Pintar tarjetas con los datos de data
function sumarCardsArray(array) {
  let cards = "";
  for (let event of array) {
    cards += `<div class="card estilocard" style="width: 18rem;">
    <img src= ${event.image} alt="Imagen de evento">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <h6 class="card-title"> ${event.date}</h6>
    <h6 class="card-title">${event.price} USD</h6>
    <p class="card-text">${event.description}</p>
    <a href="./details.html?id=${event._id}" class="btn btn-primary">See more</a>
    </div>
  </div>`
  }
  document.getElementById("contenedorCards").innerHTML = cards;
}

//Filtro de Categorias
function filtroCheckbox(array) {
  const checkboxes = document.querySelectorAll('[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let categoryArray = [];
      checkboxes.forEach((c) => {
        if (c.checked) {
          categoryArray.push(c.value);
        }
      });
      let filteredEvents = array.filter((event) => {
        return categoryArray.includes(event.category);
      });
      if (categoryArray.length) {
        sumarCardsArray(filteredEvents);
      } else {
        sumarCardsArray(array);
      }
    });
  });
}

//filtro buscador
document.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    let input = e.target.value.toLowerCase();
    let cards = document.querySelectorAll(".estilocard");
    cards.forEach((card) => {
      let title = card.querySelector(".card-title").textContent.toLowerCase();
      let description = card
        .querySelector(".card-text")
        .textContent.toLowerCase();
      if (title.includes(input) || description.includes(input)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

  }
});
