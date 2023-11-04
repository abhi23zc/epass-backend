let store = document.getElementById("store")
let domain = document.getElementById("domain")
let password = document.getElementById("password")
let savedata = document.getElementById("savedata")
let logout = document.getElementById("logout")

async function fetch_home(url) {
  try {


    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem("token") // Set the content type to JSON
      },
      credentials: 'include',
      // Convert the data object to JSON
    };


    const response = await fetch(url, options);

    if (response.ok) {

      const data = await response.json();
      if (data.message == 'error') {
        window.location.href = "/login.html";
      }
      if (data.length != 0) {


        data.forEach(element => {
          store.innerHTML += `        <div class="box1">
          <div class="password">
              <img src="./public/key.png" alt="">
              <label style="display:none" class="mylabel">${element._id}</label>
              <h3 style="color:black;">${element.password}</h3>
              
              </div>
              
              <div class="domain">
              <img src="./public/domain-registration.png" alt="">
              <h3 style="color:black;">${element.domain}</h3>
              
              
          </div>
          <div class="bottom">
              <img src="public/edit.png" class="edit" alt="">
              <img src="public/delete.png" class="delete" alt="">

          </div>
      </div>`

        });
        
      }
      else {
        console.log("No data")
        store.innerHTML += `<h3>No Data Available.....</h3>`

      }
      console.log(data)
      // console.log(data)
      // console.log(data.password);
      // console.log(data.domain);



    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log("")
    // console.error('Error:', error);
  }
}

async function save_data(url) {
  if (!password.value || !domain.value) {
    alert("Fill details Carefully !")
  }
  else {


    const data = {

      password: password.value,
      domain: domain.value
    }


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem("token") // Set the content type to JSON
      },

      body: JSON.stringify(data)
      // Convert the data object to JSON
    };


    const response = await fetch(url, options);

    if (response.ok) {

      const data = await response.json();

      console.log(data)
      alert("Credentials Saved Succesfully")
      password.value = "";
      domain.value = "";
      location.reload();


    } else {
      throw new Error('Request failed');
    }
  }
}

async function delete_doc(url, uid) {



  const data = {

    uid: uid,
    
  }


  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem("token") // Set the content type to JSON
    },

    body: JSON.stringify(data)
    // Convert the data object to JSON
  };


  const response = await fetch(url, options);

  if (response.ok) {

    const data = await response.json();

    console.log(data)
    alert("Document Deleted")
    password.value = "";
    domain.value = "";
    location.reload()


  } else {
    throw new Error('Request failed');
  }
}


savedata.addEventListener('click', async (e) => {
  e.preventDefault();
  await save_data(url)
})

let url = "https://mpass-vyzd.onrender.com/";


fetch_home(url);

async function deleteall() {

  let mydelete = document.querySelectorAll(".delete")
  console.log(mydelete)

  mydelete.forEach(async element => {

    element.addEventListener('click', async (e) => {
      let uid = (element.parentNode.parentElement.childNodes[1].childNodes[3])
      console.log(uid.innerText)
      delete_doc(url, uid.innerText)
    })

  });
}

const myTimeout = setTimeout(deleteall, 1000);

// let edit = document.getElementById("edit")

logout.addEventListener('click', ()=>{
  localStorage.removeItem('token')
  location.reload()
})