fetch("https://api.ipify.org?format=json")
.then(response => response.json())
.then(data => {
document.getElementById("ipadd").innerHTML = data.ip;
});


const apiUrl = "https://ipinfo.io/205.253.36.199?token=5b331c6322c125";
fetch(apiUrl)
.then(response => response.json())
.then(data => {
console.log(data);
const city = data.city;
const region = data.region;
const postal = data.postal;
const organization = data.org;
const hostname = window.location.href;
const latitude = data.loc.split(",")[0];
const longitude = data.loc.split(",")[1];
const Timezone=data.timezone;
const showDiv = document.getElementById("show");
showDiv.innerHTML = `<div><strong>Latitude:</strong> ${latitude}</div> <div><strong>City:</strong> 
${city}</div> <div><strong>Organization:</strong> ${organization}</div> <div><strong>Longitude:</strong>
 ${longitude}</div> <div><strong>Region:</strong> ${region}</div> <div><strong>Hostname:</strong> ${hostname}</div> `;
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
const detailsDiv = document.getElementById("details");
detailsDiv.innerHTML = `<div><strong>Pincode:</strong> ${postal}</div> <div><strong>Date and Time:</strong> Time-${time}
 Date-${date}</div> <div><strong>Timezone:</strong> ${Timezone}</div> <div id="mess"></div>` ;
document.getElementById("map-iframe").setAttribute("src",` https://maps.google.com/maps?q=${latitude},
${longitude}&z=15&output=embed`);
const postUrl = `https://api.postalpincode.in/pincode/${postal}`;
fetch(postUrl)
.then(response => response.json())
.then(data => {
console.log(data);
const messDiv = document.getElementById("mess");
messDiv.innerHTML =`<div><strong>Message:</strong>${data[0].Message} </div>`;
if (data[0].Status === "Success") {
const postOfficeDetails = data[0].PostOffice;
console.log(postOfficeDetails);
let html = "";
///araay for postoffice details
let array=[];
postOfficeDetails.forEach((postOffice) => {
html += `<div class="postoffice"> <strong>Name: </strong>${postOffice.Name}<br> 
<strong>Branch Type: </strong>${postOffice.BranchType}<br> <strong>Delivery Status:
 </strong>${postOffice.DeliveryStatus}<br> <strong>Division: </strong>${postOffice.Division}<br>
  <strong>State: </strong>${postOffice.State}<br> <strong>Country: </strong>
${postOffice.Country}<br> </div><br>`;
      ///for storing details in storage
      const postOfficeObj = {
        name: postOffice.Name,
        branch: postOffice.BranchType,
        Delivery:postOffice.DeliveryStatus,
        Division:postOffice.Division,
        State:postOffice.State
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

////for clicking btn
let unhide=document.querySelector(".hide");
let btn=document.getElementById("btn");
function hide(){
unhide.style.display="block";
btn.style.display="none";
}
////filter function for searching
function searchPostOffices() {
  const filter = document.getElementById('filter');
  const postOfficeDetails = document.getElementById('postDetails');
  const storedDetails = JSON.parse(localStorage.getItem('Details'));
  const searchTerm = filter.value.toLowerCase().trim();
  let html = "";
  storedDetails.forEach(postOffice => {
    const name = postOffice.name.toLowerCase().trim();
    const branch = postOffice.branch.toLowerCase().trim();
    const delivery= postOffice.Delivery.toLowerCase().trim();
    const stat=postOffice.State.toLowerCase().trim();
    
    if (name.includes(searchTerm) || branch.includes(searchTerm)) {
      html += `<div class="postoffice"><strong>Name: </strong>${name.charAt(0).toUpperCase() + name.slice(1)}<br>
      <strong>Branch Type: </strong>${branch.charAt(0).toUpperCase() + branch.slice(1)}<br>
      <strong>Delivery: </strong>${delivery.charAt(0).toUpperCase() + delivery.slice(1)}<br>
      <strong>State: </strong>${stat.charAt(0).toUpperCase() + stat.slice(1)}<br></div><br>`;

    }
  });
  if (html === "") {
    postOfficeDetails.innerHTML = `<div>No post offices found for "${searchTerm}"</div>`;
  } else {
    postOfficeDetails.innerHTML = html;
  }
}





