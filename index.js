const cities = [];

//fetching the data
// async function fetchData(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }
// fetchData(endpoint).then((value) => {
//     cities.push(value);
// });

fetch(endpoint)
    .then((response) => response.json())
    .then((data) => cities.push(...data));

//matches function
function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
        //here we need to figure out if the city or state matches with the word to match
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
    });
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
    const resultArrays = findMatches(this.value, cities);
    const html = resultArrays
        .map((place) => {
            const regex = new RegExp(this.value, "gi");
            const cityName = place.city.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            const stateName = place.state.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            return `
            <li>
            <span class="name"> ${cityName}, ${stateName} </span>
            <span class="population"> ${numberWithCommas(place.population)}</span>
            </li>
        `;
        })
        .join("");
    searchList.innerHTML = html;
}

const searchInput = document.getElementById("city");
const searchList = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
