// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');


/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
	//Object.keys(filmingLocations.fields).length;
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	return filmingLocations.sort(function(a,b){return new Date(a.fields.date_debut) - new Date(b.fields.date_debut)})
}
//console.log(sortFilmingLocationsByStartDate())

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	return filmingLocations.filter(filmingLocations => filmingLocations.fields.date_debut.includes('2020')||filmingLocations.fields.date_fin.includes('2020')).length
}
//console.log(getFilmingLocationsNumber2020())
console.log(`There is ${getFilmingLocationsNumber2020()} filming locations in 2020 in Paris`)

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result

function getFilmingLocationsNumberPerYear () {
	let film_per_year = {}
	for(const film in filmingLocations){
		let year = filmingLocations[film].fields.annee_tournage;
		if(!(year in film_per_year)){
			film_per_year[year]=0;
		}
		film_per_year[year]+=1;
	}
	return (film_per_year)
}

console.log(getFilmingLocationsNumberPerYear())


// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict() {
	let film_per_district = {}
	for(const film in filmingLocations){
		let district = filmingLocations[film].fields.ardt_lieu;
		if(!(district in film_per_district)){
			film_per_district[district]=0;
		}
		film_per_district[district]+=1;
	}
	return (film_per_district)
}
console.log(getFilmingLocationsNumberPerDistrict())


// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array

// sort descending : arr.sort((a, b) => b - a);

function getFilmLocationsByFilm() {
	const location_per_film = {}
	for(const location in filmingLocations) {
		let film = filmingLocations[location].fields.nom_tournage
		if (!(film in location_per_film)){
			location_per_film[film] = 0
		}
		location_per_film[film] += 1
	}
	return location_per_film
}
console.log(getFilmLocationsByFilm())

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	return Object.keys(getFilmLocationsByFilm()).length
}
console.log(`there are ${getNumberOfFilms()} films \n`)

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations() {
	let LRDMLocations = []
	for(const location of filmingLocations) {
		if(location.fields.nom_tournage ==`LRDM - Patriot season 2`){
			LRDMLocations.push(location.fields.adresse_lieu)
		}
	}
	return LRDMLocations
}
console.log(`lieux de tournage LRDM : \n ${getArseneFilmingLocations()} \n`)


// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	let locations = []
	for(const location of filmingLocations) {
		if(location.fields.nom_tournage ==favoriteFilmsNames){
			if(locations.indexOf(location.fields.ardt_lieu)==-1){
				locations.push(location.fields.ardt_lieu)
			}
		}
	}
	locations.sort(function(a,b){return a - b})
	return locations
}

const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]

for (let film of favoriteFilms){
	console.log(`lieux de tournage de ${film} : ${getFavoriteFilmsLocations(film)}\n`)
}


// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const location_per_film = {}
	for(const location of filmingLocations) {
		let film = location.fields.nom_tournage
		if (!(film in location_per_film)){
			location_per_film[film] = []
		}
		location_per_film[film].push(location.fields.adresse_lieu)
	}
	return location_per_film
}

//console.log(getFilmingLocationsPerFilm())

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes() {
	const number_per_type = {}
	const films = []
	for(const location in filmingLocations) {
		let type = filmingLocations[location].fields.type_tournage
		let nomFilm = filmingLocations[location].fields.nom_tournage
		if (!(type in number_per_type)) {
			number_per_type[type] = 0
		}
		if (!films.includes(nomFilm)) {
			films.push(nomFilm)
			number_per_type[type] += 1
		}
	}
	return number_per_type
}
console.log(countFilmingTypes())

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	const dict =  countFilmingTypes()
	const result =[]
	for (const filmType of Object.keys(dict)) {
		result.push({'type':filmType, 'count' : dict[filmType]})
	}
	result.sort(function(a,b){return b.count - a.count})
	return result
}
console.log(sortedCountFilmingTypes())

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
