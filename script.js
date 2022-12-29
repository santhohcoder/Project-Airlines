const key = "100af2f68a5320fab2071fb517485625";
const baseURL = "http://api.aviationstack.com/v1";
let entireDetails = [];
// let a1 = localStorage.getItem('data')
// a1 = JSON.parse(a1)
// if (a1?.length > 0) {
//     entireDetails = [...a1]
// }

const getAllAirports = async () => {
    const url = `${baseURL}/airlines?access_key=${key}`;
    if (entireDetails.length === 0) {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        entireDetails = [...result.data]
        populateCard(entireDetails);
    }
};

const populateCard = (airportDetails) => {
    let airportDetailsInHTML = "";

    airportDetails.map((x) => {
        airportDetailsInHTML += `<div
    class="shadow border-1 rounded p-3 m-2"
    style="width: 20rem"
  >
    <div>
      <label for="">IATA Code:</label>
      <label for="">${x.iata_code}</label>
    </div>
    <div>
      <label for="">Hub Code:</label>
      <label for="">${x.hub_code}</label>
    </div>
    <label for="">Airline Name:</label>
    <label for="">${x.airline_name}</label>
    <label for="">Country Name:</label>
    <label for="">${x.country_name}</label>
    <label for="">Fleet average age:</label>
    <label for="">${x.fleet_average_age}</label>
    <label for="">Fleet Size:</label>
    <label for="">${x.fleet_size}</label>
  </div>`;
    });

    document.getElementById("airportDetailsContainer").innerHTML =
        airportDetailsInHTML;
};

getAllAirports();

let searchBox = document.getElementById('search_airport')
searchBox.addEventListener('keyup', (event) => {
    let value = event.target.value;
    if (value.length > 0 && value.length <= 3) {
        return;
    } else if (value.length === 0) {
        populateCard(entireDetails)
    } else {
        let a = entireDetails.filter(x => x.country_name === value.trim())
        populateCard(a)
    }
})