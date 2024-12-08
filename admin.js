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
        displayData(data, referenceNumber);
      } else {
        dataContainer.innerHTML = `<p>No data found for reference number: ${referenceNumber}</p>`;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      dataContainer.innerHTML = `<p>Error fetching data. Check the console for more details.</p>`;
    }
  }
  
  function displayData(data, referenceNumber) {
    const dataContainer = document.getElementById('data-container');
    let formHTML = `<h2>Edit Your Contact Information</h2>`;
    formHTML += `<form id="editForm">`;
  
    // Create editable fields dynamically
    Object.keys(data).forEach(key => {
      formHTML += `
        <label for="${key}">${key}:</label>
        <input type="text" id="${key}" name="${key}" value="${data[key] || ''}" /><br><br>
      `;
    });
  
    formHTML += `
      <button type="button" onclick="saveData('${referenceNumber}')">Save Changes</button>
    </form>`;
    
    dataContainer.innerHTML = formHTML;
  }
  
  function saveData(referenceNumber) {
    const updatedData = {};
    const formElements = document.getElementById('editForm').elements;
  
    // Collect updated data from the input fields
    for (let i = 0; i < formElements.length; i++) {
      const field = formElements[i];
      if (field.type === 'text') {
        updatedData[field.name] = field.value;
      }
    }
  
    // Save the updated data back to Firebase
    const dataRef = firebase.database().ref(`contactForm/${referenceNumber}`);
    dataRef.update(updatedData)
      .then(() => {
        alert('Data saved successfully!');
      })
      .catch(error => {
        console.error("Error saving data:", error);
        alert('Error saving data!');
      });
  }
  