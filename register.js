console.log("I'm register")

let submit  = document.getElementById("submitform")
let name = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("password")
let login = document.getElementById("login")



async function register_user(url) {

    const data = {
        name:name.value,
        email:email.value,
        password:password.value
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(data) // Convert the data object to JSON
      };

    try {

      const response = await fetch(url, options);
  
      if (response.ok) {

        const data = await response.json();

        console.log(data);
        alert("Successfully Registerd")
        name.value ="";
        email.value ="";
        password.value ="";
        window.location.href = "/"
        
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
    
      console.error('Error:', error);
    }
  }


let url= "https://mpass-vyzd.onrender.com/auth/register";
submit.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Submit")
    register_user(url);

});

login.addEventListener('click', ()=>{
  window.location.href = "/login.html"
})
