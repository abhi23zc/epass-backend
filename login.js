console.log("I'm register")

let submit  = document.getElementById("submitform")

let email = document.getElementById("email")
let password = document.getElementById("password")
let register = document.getElementById("register")



async function register_user(url) {

    const data = {
 
        email:email.value,
        password:password.value
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        },
        credentials: 'include', 
        body: JSON.stringify(data) // Convert the data object to JSON
      };

    try {

      const response = await fetch(url, options);
  
      if (response.ok) {

        const data = await response.json();

        console.log(data);
        email.value = "";
        password.value = "";
        alert("Login Succesfully")
        localStorage.setItem("token", data.token)
        window.location.href = "/";
    } else {
        throw new Error('Request failed');
    }
} catch (error) {
    
    alert("Invalid Credentials")
      console.error('Error:', error);
    }
  }


let url= "https://mpass-vyzd.onrender.com/auth/login";
submit.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Submit")
    register_user(url);

});


register.addEventListener('click', ()=>{
  window.location.href = "/register.html"
})
