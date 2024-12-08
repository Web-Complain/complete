// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQHex3ozIVNu-sJ1dL855kLMooRJNLNK0",
    authDomain: "complaint-website.firebaseapp.com",
    databaseURL: "https://complaint-website-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "complaint-website",
    storageBucket: "complaint-website.firebasestorage.app",
    messagingSenderId: "629513016557",
    appId: "1:629513016557:web:1468aabfa64be0c800e8e4",
    measurementId: "G-WKC78T0YND"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database(app);
  
  async function fetchData() {
    const referenceNumber = document.getElementById('header').value;
    const dataContainer = document.getElementById('data-container');
  
    if (!referenceNumber) {
      dataContainer.innerHTML = "<p>Please enter a reference number.</p>";
      return;
    }
  
    try {
      const dataRef = firebase.database().ref(`contactForm/${referenceNumber}`);
      const snapshot = await dataRef.get();
  
      if (snapshot.exists()) {
        const data = snapshot.val();
        displayData(data);
      } else {
        dataContainer.innerHTML = `<p>No data found for reference number: ${referenceNumber}</p>`;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      dataContainer.innerHTML = `<p>Error fetching data. Check the console for more details.</p>`;
    }
  }
  
  function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    let table = `<table><thead><tr>`;
  
    // Create table headers dynamically
    Object.keys(data).forEach(key => {
      table += `<th>${key}</th>`;
    });
    table += `</tr></thead><tbody><tr>`;
  
    // Create a single table row for the data
    Object.values(data).forEach(value => {
      table += `<td>${value || ''}</td>`;
    });
  
    table += `</tr></tbody></table>`;
    dataContainer.innerHTML = table;
  }
  