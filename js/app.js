/*
  Name: Danish Sharma
  ID: 148201205
  Email: dsharma115@myseneca.ca
  Date: August 7, 2021
*/
// An instance of our SimpleMap, created below when the window loads.
let map;

// Update the map to show markers for the set of observations
function updateMap(observations, map) {
  // Clear the current markers on the map (if any)
  map.clear();

  //TODO- DONE
  for (let i = 0; i < observations.length; i++) {
    map.addObservation(observations[i]);
  }
}

// Update the div to show markers for the set of observations
function updateDiv(observations) {
  // Remove any current data from the div
  clearAllDiv();

  // Populate the div with all observation data we want to show
  //TODO- DONE
  let div = document.querySelector("#observation-cards");
  observations.forEach((observation) => {
    div.appendChild(buildCardForObservation(observation));
  });
}

// Show all species on the map and div
function showAll() {
  showANI("a");
}

// Show native species on the map and div
function showOnlyNative() {
  showANI("n");
}

// Show introduced species on the map and div
function showOnlyIntroduced() {
  showANI("i");
}

// function for similar 'show' functions code
function showANI(show) {
  let titleName = `All Species `;

  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();
  let filtered = observations;

  if (show == "n") {
    // Filter out any that aren't native species
    filtered = filterOnlyNative(observations);
    titleName = "Only Native Species ";
  } else if (show == "i") {
    // Filter out any that aren't introduced species
    filtered = filterOnlyIntroduced(observations);
    titleName = "Only Introduced Species ";
  }

  updateMap(filtered, map);
  updateDiv(filtered);

  titleName += `(${filtered.length})`;
  updateTableTitle(titleName);
}

function start() {
  // Create our map object for Seneca's Newnham campus
  map = new SimpleMap("map-container", 43.7955, -79.3496);

  // TODO- DONE
  showAll();
  let showAllId = document.querySelector("#show-all");
  showAllId.onclick = showAll;
  let native = document.querySelector("#show-native");
  native.onclick = showOnlyNative;
  let introduced = document.querySelector("#show-introduced");
  introduced.addEventListener("click", showOnlyIntroduced);
}

// TODO- DONE
start();
