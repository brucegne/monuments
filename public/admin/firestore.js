const firebaseConfig = {
    apiKey: "AIzaSyCnfbXx5E9d-1tzlEmQhs47wHGDEEUW9mA",
    authDomain: "fship-app.firebaseapp.com",
    databaseURL: "https://fship-app-default-rtdb.firebaseio.com",
    projectId: "fship-app",
    storageBucket: "fship-app.appspot.com",
    messagingSenderId: "596894522005",
    appId: "1:596894522005:web:124e5534b260811c0bd99c"
  };


  const work_url = 'https://socialpancakes-d1dad.firebaseio.com/Obits.json';
  const srch_url = 'https://socialpancakes-d1dad.firebaseio.com/Obits/';      
  
  function killIt(key) {
    //        key = document.getElementById("keyval").value;
    url = `https://socialpancakes-d1dad.firebaseio.com/Users/${key}.json`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
        loadAll();
      }
    };
    xhttp.open("delete", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    //document.getElementById("keyval").value() = "";
  }

  function loadAll() {
    document.getElementById("demo").innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = "";
        snap = JSON.parse(this.responseText);
          refRes = document.getElementById("demo")
          refOut="";
          refOut = "<table style='width: 350px;' id='tbl01'  class='w3-table w3-border w3-stripe'>";
          refOut += "<thead><tr><th>Delete</th><th>Edit</th><th>Name</th><th>Phone</th></tr></thead><tbody>"
        Object.keys(snap).forEach(key => {
          refOut += `<tr><td><i class="material-icons pointer" onclick="killIt('${key}')">delete</i></td><td><i class="material-icons pointer"
          onclick="loadOne('${key}')">mode_edit</i></td><td>${snap[key].name}</td><td>${snap[key].phone}</td></tr>`;
        })
        refOut += "</tbody></table>";
        console.log(refOut)
        document.getElementById("editKey").value = "";
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("age").value = "";

        refRes.innerHTML = refOut;
      }
     };
    xhttp.open("get",work_url+'?orderBy=\"name\"', true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  }

  function loadOne(key) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = "";
        snap = JSON.parse(this.responseText);
        console.log(key, snap.name, snap.title, snap.age );
        document.getElementById("editKey").value = key;
        document.getElementById("name").value = snap.name;
        document.getElementById("phone").value = snap.phone;
        document.getElementById("age").value = snap.age;
      }
    };
    xhttp.open("get", `https://socialpancakes-d1dad.firebaseio.com/Users/${key}.json`);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  }

  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    
    name = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    age = document.getElementById("age").value;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
        loadAll();
        document.getElementById("editKey").value = "";
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("age").value = "";

      }
    };
    xhttp.open("post", work_url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ name: name, phone: phone, age: age }));
  }

  function updateDoc() {
    var xhttp = new XMLHttpRequest();
    key = document.getElementById("editKey").value;
    console.log(key);
    name = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    age = document.getElementById("age").value;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
        loadAll();
        document.getElementById("editKey").value = "";
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("age").value = "";
      }
    };
    key = document.getElementById("editKey").value;
    xhttp.open("PUT", `https://socialpancakes-d1dad.firebaseio.com/Users/${key}/.json?auth=FagV1ErLl0uqDUv8PMeIU5bmWKsqMhZM0bORbdok"`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({ key: key, name: name, phone: phone, age: age })
    );
    document.getElementById("editKey").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("age").value = "";
  }

  options = "";

  