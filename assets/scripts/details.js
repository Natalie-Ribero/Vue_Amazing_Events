// let url = "./assets/scripts/amazing.json"
let url = "https://mindhub-xj03.onrender.com/api/amazing"

async function pedirData() {
  try {
    let respuesta = await fetch(url)
    let data = await respuesta.json()
    return data;

  } catch (error) {
    console.log(error)
  }

}

async function iniciar() {
  const data = await pedirData()

  const querySearch = document.location.search

  const id = new URLSearchParams(querySearch).get("id")

  let eventoDetails = data.events.filter(event => event._id == id)

  let containerCards = document.getElementById("containerCards")

  for (const character of eventoDetails) {
    containerCards.innerHTML =
      `<div class="card estilocardDetails" style="width: 18rem;">
<img src= ${character.image} alt="Imagen de evento">
<div class="card-body">
<h5 class="card-title">${character.name}</h5> 
<h6 class="card-title">Date: ${character.date}</h6> 
<h6 class="card-title">Price: ${character.price} USD</h6>
<h6 class="card-title">Place: ${character.place}</h6>   
<h6 class="card-title">Capacity: ${character.capacity}</h6>   
<h6 class="card-title">Assistance: ${character.assistance || character.estimate}</h6>   
<p class="card-text">${character.description}</p>
<a href="./index.html" class="btn btn-primary">Go back to start</a>
</div>
</div>`
  }
}

iniciar()



