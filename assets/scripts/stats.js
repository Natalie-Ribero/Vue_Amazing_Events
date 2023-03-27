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
  let pastEvents = eventosPast(data.events, data.currentDate)
  let upcomingEvents = eventosUpcoming(data.events, data.currentDate);
  menorAsistencia(pastEvents)
  document.querySelector("#primerTabla .mayorAsistenciaTR .menorAsistencia").innerHTML = `${arrayOrdenadoPorcentaje[0].name + " (" + (arrayOrdenadoPorcentaje[0].assistance) / (arrayOrdenadoPorcentaje[0].capacity) * 100}%)`
  document.querySelector("#primerTabla .mayorAsistenciaTR .mayorAsistencia").innerHTML = `${arrayOrdenadoPorcentaje[17].name + " (" + (arrayOrdenadoPorcentaje[17].assistance) / (arrayOrdenadoPorcentaje[17].capacity) * 100}%)`
  mayorCapacidad(pastEvents)
  document.querySelector("#primerTabla .mayorAsistenciaTR .mayorCapacidad").innerHTML = `${arrayOrdenadoCapacidad[0].name + " (" + arrayOrdenadoCapacidad[0].capacity})`
  // porcentajeAsistenciaT2(upcomingEvents)
  // porcentajeAsistenciaT3(pastEvents)
  categoryGananciaT2(upcomingEvents)
  categoryGananciaT3(pastEvents)
}

iniciar();


function eventosPast(array, fecha) {
  return array.filter(event => event.date < fecha);
}

function eventosUpcoming(array, fecha) {
  return array.filter(event => event.date > fecha);
}

//Tabla 1

let arrayOrdenadoPorcentaje = []
//Ordenar Eventos de menor a mayor
function menorAsistencia(array) {
  arrayOrdenadoPorcentaje = array.sort(function (a, b) {
    if ((a.assistance / a.capacity) * 100 > (b.assistance / b.capacity) * 100) {
      return 1;
    }
    if ((a.assistance / a.capacity) * 100 < (b.assistance / b.capacity) * 100) {
      return -1;
    }
    return 0;
  });
  return arrayOrdenadoPorcentaje
}


let arrayOrdenadoCapacidad = []
//evento con mayor capacidad.
function mayorCapacidad(array) {
  arrayOrdenadoCapacidad = array.sort(function (a, b) {
    if (a.capacity < b.capacity) {
      return 1;
    }
    if (a.capacity > b.capacity) {
      return -1;
    }
    return 0;
  });
}

//---------------------------------------------------------------------------------------------------------------------------------------
//Tabla 2

//Ganancias de todos los eventos de una categoría
function GananciaT2(array, guardar) {
  for (let index = 0; index < array.length; index++) {
    let numero = Number((array[index].estimate) * (array[index].price))
    guardar.push(numero)
  }
  let total = guardar.reduce((a, b) => a + b, 0);
  return total
}

async function categoryGananciaT2(array) {
  let food = array.filter(event => event.category === "Food")
  var gananciaFoodPast = []
  let arrayGananciaF = await GananciaT2(food, gananciaFoodPast)
  document.querySelector("#segundaTabla .food .ganancias").innerHTML = `$${arrayGananciaF}`

  //-----------------------------------------------------------------------------------------------------------

  let museum = array.filter(event => event.category === "Museum")
  let gananciaMuseumPast = []
  let arrayGananciaMP = await GananciaT2(museum, gananciaMuseumPast)
  document.querySelector("#segundaTabla .museum .ganancias").innerHTML = `$${arrayGananciaMP}`

  //-----------------------------------------------------------------------------------------------------------
  let concert = array.filter(event => event.category === "Concert")
  let gananciaConcertPast = []
  let arrayGananciaCP = await GananciaT2(concert, gananciaConcertPast)
  document.querySelector("#segundaTabla .concert .ganancias").innerHTML = `$${arrayGananciaCP}`
  //-----------------------------------------------------------------------------------------------------------
  let race = array.filter(event => event.category === "Race")
  let gananciaRacePast = []
  let arrayGananciaRP = await GananciaT2(race, gananciaRacePast)
  document.querySelector("#segundaTabla .race .ganancias").innerHTML = `$${arrayGananciaRP}`
  //-----------------------------------------------------------------------------------------------------------
  let book = array.filter(event => event.category === "Books")
  let gananciaBookPast = []
  let arrayGananciaBP = await GananciaT2(book, gananciaBookPast)
  document.querySelector("#segundaTabla .book .ganancias").innerHTML = `$${arrayGananciaBP}`

  //-----------------------------------------------------------------------------------------------------------
  let party = array.filter(event => event.category === "Party")
  let gananciaPartyPast = []
  let arrayGananciaPP = await GananciaT2(party, gananciaPartyPast)
  document.querySelector("#segundaTabla .party .ganancias").innerHTML = `$${arrayGananciaPP}`
}

//Porcentaje de asistencia.
function porcentajeT2(array, guardar) {
  for (let index = 0; index < array.length; index++) {
    let numero = Number(array[index].estimate) / Number(array[index].capacity) * 100
    guardar.push(numero)
  }
  let total = guardar.reduce((a, b) => a + b, 0);
  let resultado = total/guardar.length
  return resultado.toFixed(2)
}

async function porcentajeAsistenciaT2(array) {

  let food = array.filter(event => event.category === "Food")
  let porcentajeFoodUpcoming = []
  let arrayporcentajeF = await porcentajeT2(food, porcentajeFoodUpcoming)
  document.querySelector("#segundaTabla .food .asistencia").innerHTML = `${arrayporcentajeF}%`
  //-----------------------------------------------------------------------------------------------------------

  let museum = array.filter(event => event.category === "Museum")
  let porcentajeMuseumUpcoming = []
  let arrayporcentajeM = await porcentajeT2(museum, porcentajeMuseumUpcoming)
  document.querySelector("#segundaTabla .museum .asistencia").innerHTML = `${arrayporcentajeM}%`
  //-----------------------------------------------------------------------------------------------------------

  let concert = array.filter(event => event.category === "Concert")
  let porcentajeConcertUpcoming = []
  let arrayporcentajeC = await porcentajeT2(concert, porcentajeConcertUpcoming)
  document.querySelector("#segundaTabla .concert .asistencia").innerHTML = `${arrayporcentajeC}%`
  //-----------------------------------------------------------------------------------------------------------

  let race = array.filter(event => event.category === "Race")
  let porcentajeRaceUpcoming = []
  let arrayporcentajeR = await porcentajeT2(race, porcentajeRaceUpcoming)
  document.querySelector("#segundaTabla .race .asistencia").innerHTML = `${arrayporcentajeR }%`
  //-----------------------------------------------------------------------------------------------------------

  let book = array.filter(event => event.category === "Books")
  let porcentajeBookUpcoming = []
  let arrayporcentajeB = await porcentajeT2(book, porcentajeBookUpcoming)
  document.querySelector("#segundaTabla .book .asistencia").innerHTML = `${arrayporcentajeB}%`
  //-----------------------------------------------------------------------------------------------------------

  let party = array.filter(event => event.category === "Party")
  let porcentajePartyUpcoming = []
  let arrayporcentajeP = await porcentajeT2(party, porcentajePartyUpcoming)
  document.querySelector("#segundaTabla .party .asistencia").innerHTML = `${arrayporcentajeP}%`
}

//-----------------------------------------------------------------------------------------------------------------------------------------
//Tabla 3


//Ganancias de todos los eventos de una categoría
function calcularGananciaT3(array, guardar) {
  for (let index = 0; index < array.length; index++) {
    let numero = Number((array[index].assistance) * (array[index].price))
    guardar.push(numero)
  }
  let total = guardar.reduce((a, b) => a + b, 0);
  return total
}

async function categoryGananciaT3(array) {
  let food = array.filter(event => event.category === "Food")
  let gananciaFoodPast = []
  let arrayGananciaF = await calcularGananciaT3(food, gananciaFoodPast)
  document.querySelector("#tercerTabla .food .ganancias").innerHTML = `$${arrayGananciaF}`

  //-----------------------------------------------------------------------------------------------------------

  let museum = array.filter(event => event.category === "Museum")
  let gananciaMuseumPast = []
  let arrayGananciaM = await calcularGananciaT3(museum, gananciaMuseumPast)
  document.querySelector("#tercerTabla .museum .ganancias").innerHTML = `$${arrayGananciaM}`

  //-----------------------------------------------------------------------------------------------------------
  let concert = array.filter(event => event.category === "Concert")
  let gananciaConcertPast = []
  let arrayGananciaC = await calcularGananciaT3(concert, gananciaConcertPast)
  document.querySelector("#tercerTabla .concert .ganancias").innerHTML = `$${arrayGananciaC}`
  //-----------------------------------------------------------------------------------------------------------
  let race = array.filter(event => event.category === "Race")
  let gananciaRacePast = []
  let arrayGananciaR = await calcularGananciaT3(race, gananciaRacePast)
  document.querySelector("#tercerTabla .race .ganancias").innerHTML = `$${arrayGananciaR}`
  //-----------------------------------------------------------------------------------------------------------
  let book = array.filter(event => event.category === "Books")
  let gananciaBookPast = []
  let arrayGananciaB = await calcularGananciaT3(book, gananciaBookPast)
  document.querySelector("#tercerTabla .book .ganancias").innerHTML = `$${arrayGananciaB}`
  //-----------------------------------------------------------------------------------------------------------

  let cinema = array.filter(event => event.category === "Cinema")
  let gananciaCinemaPast = []
  let arrayGananciaCi = await calcularGananciaT3(cinema, gananciaCinemaPast)
  document.querySelector("#tercerTabla .cinema .ganancias").innerHTML = `$${arrayGananciaCi}`
  //-----------------------------------------------------------------------------------------------------------

  let party = array.filter(event => event.category === "Party")
  let gananciaPartyPast = []
  let arrayGananciaP = await calcularGananciaT3(party, gananciaPartyPast)
  document.querySelector("#tercerTabla .party .ganancias").innerHTML = `$${arrayGananciaP}`
}

//Porcentaje de asistencia.
function calcularPorcentajeT3(array, guardar) {
  for (let index = 0; index < array.length; index++) {
    let numero = Number(array[index].assistance) / Number(array[index].capacity) * 100
    guardar.push(numero)
  }
  let total = guardar.reduce((a, b) => a + b, 0);
  let resultado = total/guardar.length
  return resultado.toFixed(2)
}




// async function porcentajeAsistenciaT3(array) {
//   let food = array.filter(event => event.category === "Food")
//   let porcentajeFoodPast = []
//   let arrayporcentajeFP = await calcularPorcentajeT3(food, porcentajeFoodPast)
//   document.querySelector("#tercerTabla .food .asistencia").innerHTML = `${arrayporcentajeFP}%`

//   //-----------------------------------------------------------------------------------------------------------

//   let museum = array.filter(event => event.category === "Museum")
//   let porcentajeMuseumPast = []
//   let arrayporcentajeMP = await calcularPorcentajeT3(museum, porcentajeMuseumPast)
//   document.querySelector("#tercerTabla .museum .asistencia").innerHTML = `${arrayporcentajeMP}%`

//   //-----------------------------------------------------------------------------------------------------------

//   let concert = array.filter(event => event.category === "Concert")
//   let porcentajeConcertPast = []
//   let arrayporcentajeCP = await calcularPorcentajeT3(concert, porcentajeConcertPast)
//   document.querySelector("#tercerTabla .concert .asistencia").innerHTML = `${arrayporcentajeCP}%`

//   //-----------------------------------------------------------------------------------------------------------

//   let race = array.filter(event => event.category === "Race")
//   let porcentajeRacePast = []
//   let arrayporcentajeRP = await calcularPorcentajeT3(race, porcentajeRacePast)
//   document.querySelector("#tercerTabla .race .asistencia").innerHTML = `${arrayporcentajeRP}%`

//   //-----------------------------------------------------------------------------------------------------------

//   let book = array.filter(event => event.category === "Books")
//   let porcentajeBookPast = []
//   let arrayporcentajeBP = await calcularPorcentajeT3(book, porcentajeBookPast)
//   document.querySelector("#tercerTabla .book .asistencia").innerHTML = `${arrayporcentajeBP}%`

//   //-----------------------------------------------------------------------------------------------------------
//   let cinema = array.filter(event => event.category === "Cinema")
//   let porcentajeCinemaPast = []
//   let arrayporcentajeCiP = await calcularPorcentajeT3(cinema, porcentajeCinemaPast)
//   document.querySelector("#tercerTabla .cinema .asistencia").innerHTML = `${arrayporcentajeCiP}%`

//   //-----------------------------------------------------------------------------------------------------------
//   let party = array.filter(event => event.category === "Party")
//   let porcentajePartyPast = []
//   let arrayporcentajeP = await calcularPorcentajeT3(party, porcentajePartyPast)
//   document.querySelector("#tercerTabla .party .asistencia").innerHTML = `${arrayporcentajeP}%`
// }

//----------------------------------------------------------------------------------------------------------------------------------------



