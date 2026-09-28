
    // Fetch the PSI data from the government API
    fetch("https://api-open.data.gov.sg/v2/real-time/api/psi")
      // Convert the API response into JSON
      .then(gvtReply => gvtReply.json())
      // The parsed JSON is now available as 'data'
      .then(data => {
        // Uncomment when we're ready to use it
        // let readings = data.data.items[0].readings;
        // Print the JSON to the browser console for debugging
        console.log(data);
      })
      // Handle any errors
      .catch(error => {
        console.error(error);
      });