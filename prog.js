
fetch("https://api-open.data.gov.sg/v2/real-time/api/psi")

  //this line passes in the reference to the http response object created as a result of the fetch function. It passes it into the following function as a parameter we call gvtReply. it then applies the .json() method to this object. the function returns or converts the text in the HTTP response object to a JS object.
.then(gvtReply => gvtReply.json())

//the next line will now process the JS object. The result returned from gvtReply.json() is now passed into the next function as parameter we call data.
.then(apiResult => {
// allPSIReadings is an object containing only the readings portion of the previous JS object	
  const allPSIReadings = apiResult.data.items[0].readings;
//get the time that this is valid
const caaTime = apiResult.data.items[0].timestamp.replace("T", " Time: ");;
document.querySelector("p").textContent = "Correct as at: " + caaTime;

	//displays the headers, note that object.keys returns and array with the header names
	//console.log(Object.keys(allPSIReadings));
	
	// assigns the header names of the various PSI categories to an array
	const psiCategories = Object.keys(allPSIReadings);

	// Use the first category's areas to initialise the table headers.
	const tableHeaders = Object.keys(allPSIReadings[psiCategories[0]]);
	const firstRow = document.querySelector("thead tr");
	for (let k = 0; k < tableHeaders.length; k++){
		const newHeader = document.createElement("th");
		newHeader.textContent = tableHeaders[k];
		firstRow.appendChild(newHeader);
	}

	const newRowCategory = document.querySelector("tbody");

	//loops through each header in the PSI categories array
	for (let i = 0; i < psiCategories.length; i++){
		
		//for each header, the areas in Singapore are assigned to an array
		const areaHeaders = Object.keys(allPSIReadings[psiCategories[i]]);
		
		//create a new row
		const newRow = document.createElement("tr");
		//create a new table description
		const newData = document.createElement("td");
		//initialise the table description with the psi category
		newData.textContent = psiCategories[i].replaceAll("_", " ");
		//append the new td to the newly created row
		newRow.appendChild(newData);

			for (let j = 0; j < areaHeaders.length; j++){
				//now keep adding to the td and appending it to the same row
				const areaData = document.createElement("td");
				const value = allPSIReadings[psiCategories[i]][areaHeaders[j]];
				areaData.textContent = value;

				if (psiCategories[i] === "psi_twenty_four_hourly"){
					if (value <= 50){
						areaData.style.backgroundColor = "#22c55e";
					}
					else if (value <= 100){
						areaData.style.backgroundColor = "#eab308";
					}
					else if (value <= 200){
						//orange
						areaData.style.backgroundColor = "#f97316";
						areaData.style.color = "white";
					}
					else if (value <= 300) {
						//red
						areaData.style.backgroundColor = "#ef4444";
						areaData.style.color = "white";
					}
					else{
						//purple
						areaData.style.backgroundColor = "#7e22ce";
						areaData.style.color = "white";
					}

				}				

				newRow.appendChild(areaData);

			} 

		newRowCategory.appendChild(newRow);
	}
})

//error handling
.catch(error => console.error(error))
