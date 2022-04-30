/*
  Name: Danish Sharma
  ID: 148201205
  Email: dsharma115@myseneca.ca
  Date: August 7, 2021
*/

// Add the text to the <span>...<span> element in the element with id=table-title
function updateTableTitle(title) {
  // TODO- DONE
  let idSpan = document.querySelector("#table-title span");
  idSpan.innerHTML = title;
}

// Creates and returns new <div> element with the specified id value.
function createDiv(id) {
  // TODO- DONE
  let div = document.createElement("div");
  div.id = id;
  return div;
}

// Clear the div tag
function clearAllDiv() {
  let i = 0;
  let div = document.querySelector("#observation-cards");
  div.innerHTML = "";
}

// Given a URL src string, create a <div> element and return:
// <div class="card-img" style="background-image: url(background-image: url(‘https://inaturalist-opendata.s3.amazonaws.com/photos/10177220/medium.jpg?1545693877’);"></div>
function cardImg(url) {
  // TODO- DONE
  let div = document.createElement("div");
  let urlMed = url.replace("square", "medium");
  div.className = "card-img";
  div.style = `background-image: url('${urlMed}');`;
  return div;
}

// Create a function for the body of the card which will have all the necessary information

function cardBody(name, date, uri, wikipediaUrl) {
  // TODO- DONE
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  let h4 = document.createElement("h4");
  let a3 = document.createElement("a");
  let a4 = document.createElement("a");
  let textNodeA3 = document.createTextNode(name);
  let textNodeA4 = document.createTextNode(date);

  div.className = "card-body";

  a3.href = wikipediaUrl;
  a3.appendChild(textNodeA3);
  h3.appendChild(a3);

  a4.href = uri;
  a4.appendChild(textNodeA4);
  h4.appendChild(a4);

  div.appendChild(h3);
  div.appendChild(h4);

  return div;
}

// Create function to add appropriate icon to the card of a species.

function cardIcons(isNative, isIntroduced, isThreatened, isEndangered) {
  let div = document.createElement("div");
  let iN = document.createElement("i");
  let iI = document.createElement("i");
  let iT = document.createElement("i");
  let iE = document.createElement("i");

  div.className = "card-icons";

  if (isNative) {
    iN.className = "fas fa-leaf";
    iN.title = "Native";
    div.appendChild(iN);
  }

  if (isIntroduced) {
    iI.className = "fas fa-frog";
    iI.title = "Introduced";
    div.appendChild(iI);
  }

  if (isThreatened) {
    iT.className = "fas fa-radiation-alt";
    iT.title = "Threatened";
    div.appendChild(iT);
  }

  if (isEndangered) {
    iE.className = "fas fa-skull-crossbones";
    iE.title = "Endangered";
    div.appendChild(iE);
  }

  return div;
}

function buildCardForObservation(observation) {
  // 1. Create the div for observation Id
  // TODO- DONE
  const div = createDiv(observation.id);

  // 2. Create the card photo using cardImg
  // TODO- DONE
  const photo = cardImg(observation.photoUrl);

  //3. Create the body of the card using cardBody
  //TODO- DONE
  const body = cardBody(
    observation.name,
    observation.date.toLocaleDateString(),
    observation.uri,
    observation.wikipediaUrl
  );

  //4. Create the icons needed for the specified observation
  //TODO- DONE
  const icon = cardIcons(
    observation.isNative,
    observation.isIntroduced,
    observation.isThreatened,
    observation.isEndangered
  );

  div.appendChild(photo);
  div.appendChild(body);
  div.appendChild(icon);

  // 10. TODO- DONE
  return div;
}
