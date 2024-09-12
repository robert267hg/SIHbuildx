// script.js

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const drugList = document.getElementById('drug-list');
const scannerContainer = document.getElementById('scanner-container');
const analyticsSection = document.getElementById('analytics');
const resultSection = document.getElementById('result');
const reportSection = document.getElementById('report');

searchButton.addEventListener('click', () => {
    const drugName = searchInput.value.trim();
    if (drugName !== '') {
        window.location.href = `drug.html?drug=${drugName}`;
    }
});

function searchDrugs() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // TO DO: implement search logic here
        // for now, let's just populate the list with some dummy data
        const drugs = [
            { name: 'Paracetamol', composition: '500mg Paracetamol, 10mg Caffeine' },
            { name: 'Ibuprofen', composition: '200mg Ibuprofen, 10mg Pseudoephedrine' },
            { name: 'Amoxicillin', composition: '500mg Amoxicillin, 125mg Clavulanate' },
            // ...
        ];
        const filteredDrugs = drugs.filter(drug => drug.name.toLowerCase().includes(searchTerm.toLowerCase()));
        drugList.innerHTML = '';
        filteredDrugs.forEach(drug => {
            const listItem = document.createElement('li');
            listItem.textContent = `${drug.name} - ${drug.composition}`;
            drugList.appendChild(listItem);
        });
    }
}

// Get the buttons
const scanQrButton = document.getElementById('scan-qr-button');
const analyticsButton = document.getElementById('analytics-button');

// Add event listeners to the buttons
scanQrButton.addEventListener('click', () => {
  // Redirect to scan.html page
  window.location.href = 'scan.html';
});

analyticsButton.addEventListener('click', () => {
  // Redirect to analytics.html page
  window.location.href = 'analytics.html';
});


// Get the form and response elements
const reportForm = document.getElementById('report-form');
const reportResponse = document.getElementById('report-response');

// Add an event listener to the form
reportForm.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the error message value
    const errorMessage = document.getElementById('error-message').value;

    // You can add your logic here to handle the error message
    // For example, you can send it to a server or display it on the page
    reportResponse.innerText = `Thank you for reporting the error: ${errorMessage}`;

    // Clear the form field
    reportForm.reset();
});
reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorMessage = document.getElementById('error-message').value;

    fetch('/report-error', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ errorMessage })
    })
    .then((response) => response.json())
    .then((data) => {
        reportResponse.innerText = `Thank you for reporting the error: ${errorMessage}`;
    })
    .catch((error) => {
        reportResponse.innerText = `Error reporting the error: ${error.message}`;
    });

    reportForm.reset();
});