fetch("https://api.ipify.org?format=json")
.then(response => response.json())
.then(data => {
document.getElementById("ipadd").innerHTML = data.ip;
});

//$("#ipadd") jquery liberary without dom manupulation

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





function searchPostOffices() {
    const filter = document.getElementById('filter');
const postOffices = document.querySelectorAll('.postoffice');
console.log(postOffices);
  const searchTerm = filter.value.toLowerCase();
  postOffices.forEach(postOffice => {
    const name = postOffice.querySelector('strong:nth-child(1)').textContent.toLowerCase();
    const branchType = postOffice.querySelector('strong:nth-child(2)').textContent.toLowerCase();
    // If the search term matches either the name or branch type, show the post office
    if (name.includes(searchTerm) || branchType.includes(searchTerm)) {
      postOffice.style.display = 'block';
    } else {
      postOffice.style.display = 'none';
    }
  });
}




