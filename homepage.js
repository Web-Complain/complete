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
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var Name = getElementVal("Name");
    var Email = getElementVal("Email");
    var Concern = getElementVal("Concern");
  
    saveMessages(Name, Email, Concern);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (Name, Email, Concern) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      Name: Name,
      Email: Email,
      Concern: Concern,
      Department: "Pending...",
      Status: "Pending..."
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };