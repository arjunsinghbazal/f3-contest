// Get user's public IP address using ipify API
$.getJSON("https://api.ipify.org?format=json", function(data) {
    $("#ipadd").html(data.ip);
})


//$("#ipadd") jquery liberary without dom manupulation

let apiUrl = "https://ipinfo.io/205.253.36.199?token=5b331c6322c125";
$.getJSON(apiUrl, function(data) {
    console.log(data);
    const city = data.city;
    const region = data.region;
    const postal = data.postal;
    const organization = data.org;
    const hostname = window.location.href;
    const latitude = data.loc.split(",")[0];
    const longitude = data.loc.split(",")[1];
    const Timezone=data.timezone;
    $("#show").html(`
    <div><strong>Latitude:</strong> ${latitude}</div>
    <div><strong>City:</strong> ${city}</div>
    <div><strong>Organization:</strong> ${organization}</div>
    <div><strong>Longitude:</strong> ${longitude}</div>
    <div><strong>Region:</strong> ${region}</div>
    <div><strong>Hostname:</strong> ${hostname}</div>
    `);
    // Get current date and time
    const today = new Date();
    const date = today.toLocaleDateString();
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
    ////mess variable for shhowing message
 let mess;
 const time = today.toLocaleTimeString('en-US', options);
 console.log(time);
    $("#details").html(`
    <div><strong>Pincode:</strong> ${postal}</div>
    <div><strong>Date and Time:</strong> Time-${time}  Date-${date}</div>
    <div><strong>Timezone:</strong> ${Timezone}</div>
    <div id=mess></div>
    `);
    $("#map-iframe").attr("src", `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`)
    const postUrl = `https://api.postalpincode.in/pincode/${postal}`;
     $.getJSON(postUrl, function(data) {
  // Handle the response data here
  console.log(data);
  $("#mess").html(`<div><strong>Message:</strong>${data[0].Message} </div>`)
  if (data[0].Status === "Success") {
    const postOfficeDetails = data[0].PostOffice;
    console.log(postOfficeDetails)
    let html = "";
    ///araay for postoffice details
    let array=[];
    postOfficeDetails.forEach((postOffice) => {
      html += `<div class="postoffice">
        <strong>Name: </strong>${postOffice.Name}<br>
        <strong>Branch Type: </strong>${postOffice.BranchType}<br>
        <strong>Delivery Status: </strong>${postOffice.DeliveryStatus}<br>
        <strong>Division: </strong>${postOffice.Division}<br>
        <strong>State: </strong>${postOffice.State}<br>
        <strong>Country: </strong>${postOffice.Country}<br>
      </div><br>`;
      ///for storing details in storage
      const postOfficeObj = {
        name: postOffice.Name,
        branch: postOffice.BranchType
      };
      array.push(postOfficeObj);
    localStorage.setItem("Details",JSON.stringify(array))
    });
    $("#postDetails").html(html);
  } else {
    $("#postDetails").html(`<div>No post office found for this pincode</div>`);
  }
});
});


let unhide=document.querySelector(".hide");
let btn=document.getElementById("btn");
function hide(){
unhide.style.display="block";
btn.style.display="none";
}

// Get the search input and post office elements
// Define the search function
function searchPostOffices() {
    // Get the search term
    const search = document.getElementById("filter");
    const post = document.querySelectorAll(".postOffice")[0];
    const searchT = search.value.toLowerCase();
    console.log(post.innerText)
  if(searchT===post.innerContent.toLowerCase()){
    console.log(post.innerText)
       post.style.display="block";
             }
             else{
                post.style.display="none";
     }
}
// Attach the event listener to the search input



// let longitude;
// let latitude;

// // Get user's current latitude and longitude using geolocation API
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         show.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// function showPosition(position) {
//     // Store the latitude and longitude in variables
//     longitude = position.coords.longitude;
//     latitude = position.coords.latitude;
//     console.log(position)
//     $("#longlat").html(`Latitude: ${latitude}<br>Longitude: ${longitude}`);

//     // Set the iframe src to the Google Maps URL with the user's latitude and longitude
//     $("#map-iframe").attr("src", `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`);


//     const apiKey = 'AIzaSyDi5F7Imac9vNprn8mNqv_zJye3r8ch8gQ';
//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
//     $.getJSON(apiUrl, function(data) {
//         console.log(data);
//         const addressComponents = data.results[0].address_components;
//         const city = addressComponents.find(c => c.types.includes("locality")).long_name;
//         const region = addressComponents.find(c => c.types.includes("administrative_area_level_1")).long_name;
//         const country = addressComponents.find(c => c.types.includes("country")).long_name;
//         const postal = addressComponents.find(c => c.types.includes("postal_code")).long_name;
//         const organization = data.results[0].formatted_address;
//         const hostname = data.results[0].formatted_address;
//         console.log(`City: ${city}\nRegion: ${region}\nCountry: ${country}\nPostal: ${postal}\nOrganization: ${organization}\nHostname: ${hostname}`);
//     });
// }

// getLocation();



