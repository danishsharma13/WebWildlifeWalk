/*
  Name: Danish Sharma
  ID: 148201205
  Email: dsharma115@myseneca.ca
  Date: August 7, 2021
*/
// An iNaturalist observation Object contains a tremendous amount of data, much of
// it not useful in our current program. We need to transform these Observation
// objects into a new format that matches our needs.
//
// Here's a simplified version of the current structure of an observation Object
// (see src/data.js for a complete example of what it looks like). Many of the
// properties and values have been removed to highlight the ones we do
// care about:
//
// {
//   id: 67868131,
//   uri: "https://www.inaturalist.org/observations/67868131",
//   geojson: {
//     coordinates: [ -79.3565522733, 43.798774894 ],
//     type: "Point"
//   },
//   created_at: "2021-01-10T09:51:48-10:00",
//   taxon: {
//     threatened: false,
//     introduced: false,
//     native: true,
//     name: "Ondatra zibethicus",
//     wikipedia_url: "http://en.wikipedia.org/wiki/Muskrat",
//     default_photo: {
//       square_url:
//         "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//       attribution: "(c) Stephen Garvey, all rights reserved",
//       flags: [],
//       medium_url:
//         "https://static.inaturalist.org/photos/109319291/medium.jpg?1609877680",
//       id: 109319291,
//       license_code: null,
//       original_dimensions: { width: 2048, height: 1365 },
//       url:
//         "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//     },
//     iconic_taxon_name: "Mammalia",
//     preferred_common_name: "Muskrat"
//   }
// },
//
// Here's the same data transformed into a simpler format we want to use:
//
// {
//   id: 67868131,
//   uri: "https://www.inaturalist.org/observations/67868131",
//   coords: [ -79.3565522733, 43.798774894 ],
//   date: Date Sun Jan 10 2021 14:51:48 GMT-0500 (Eastern Standard Time),
//   name: "Muskrat",
//   photoUrl: "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//   wikipediaUrl: "http://en.wikipedia.org/wiki/Muskrat",
//   isNative: true,
//   isIntroduced: false,
//   isEndangered: false,
//   isThreatened: false
// }

// Given a string, convert the first letter of each word in the
// string to a capital letter. For example, convert 'muskrat' to
// 'Muskrat', and 'bittersweet nightshade' to 'Bittersweet Nightshade'
function titleCase(s) {
  // TODO- DONE
  let newS;
  if (s != undefined) {
    let sCap = s.toUpperCase();
    for (let i = 0; i < s.length; i++) {
      if (i == 0) {
        newS = sCap[i];
      } else if (s[i - 1] == " ") {
        newS += sCap[i];
      } else {
        newS += s[i];
      }
    }
  }
  return newS;
}

// Given an Array of iNaturalist observation objects, transform the objects into
// our desired format, and return the new Array. For example:
//​
// [
//   {
//     id: 67868131,
//     uri: "https://www.inaturalist.org/observations/67868131",
//     coords: [ -79.3565522733, 43.798774894 ],
//     date: Date Sun Jan 10 2021 14:51:48 GMT-0500 (Eastern Standard Time),
//     name: "Muskrat",
//     photoUrl: "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//     wikipediaUrl: "http://en.wikipedia.org/wiki/Muskrat",
//     isNative: true,
//     isIntroduced: false,
//     isEndangered: false,
//     isThreatened: false
//   },
//   ...
// ]
//
// Things to note in your solution:
//
// - id: use the same value unmodified
// - uri: use the same value unmodified
// - coords: extract the array of [lng, lat] values from the geojson property
// - date: convert the created_at string property to a real JavaScript Date
// - name: use either the taxon's preferred_common_name or name property, converted to Title Case
// - photoUrl: use the taxon's default_photo square_url value
// - wikipediaUrl: use the taxon's wikipedia_url value
// - isNative: convert the taxon native value to a boolean
// - isIntroduced: convert the taxon introduced value to a boolean
// - isEndangered: convert the taxon endangered value to a boolean
// - isThreatened: convert the taxon threatened value to a boolean
function transformObservations(observations) {
  return observations.map(function (observation) {
    // TODO- DONE
    let convDate = new Date(observation.created_at);
    let convName =
      observation.taxon.preferred_common_name != null
        ? titleCase(observation.taxon.preferred_common_name)
        : titleCase(observation.taxon.name);

    let obsObj = {
      id: observation.id,
      uri: observation.uri,
      coords: observation.geojson.coordinates,
      date: convDate,
      name: convName,
      photoUrl: observation.taxon.default_photo.square_url,
      wikipediaUrl: observation.taxon.wikipedia_url,
      isNative: observation.taxon.native == true,
      isIntroduced: observation.taxon.introduced == true,
      isEndangered: observation.taxon.endangered == true,
      isThreatened: observation.taxon.threatened == true,
    };

    return obsObj;
  });
}

// Take the array of observations and filter out any observations that haven't
// been identified yet (i.e., are missing the `taxon` property) and/or don't have
// a photo (i.e., are missing the `taxon.default_photo` property).
function filterObservations(observations) {
  return observations.filter(function (observation) {
    // TODO- DONE
    let tf = false;
    if ("taxon" in observation) {
      if (
        "default_photo" in observation.taxon &&
        observation.taxon.default_photo != null
      ) {
        tf = true;
      }
    }
    return tf;
  });
}

// Process all observation data in the window.data.results array (see data.js)
// to a simpler format we can work with, and filter the observations to get
// rid of any that are missing data that we need.
function getAllObservations() {
  const filtered = filterObservations(data.results);
  const transformed = transformObservations(filtered);

  // TODO- DONE
  return transformed;
}

// Given an array of observations, filter out any that aren't native species
// and return the filtered array.
function filterOnlyNative(observations) {
  // TODO- DONE
  return observations.filter((obs) => obs.isNative);
}

// Given an array of observations, filter out any that aren't introduced species
// and return the filtered array.
function filterOnlyIntroduced(observations) {
  // TODO- DONE
  return observations.filter((obs) => obs.isIntroduced);
}
