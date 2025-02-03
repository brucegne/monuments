firebaseConfig = {
  apiKey: "AIzaSyCnfbXx5E9d-1tzlEmQhs47wHGDEEUW9mA",
  authDomain: "fship-app.firebaseapp.com",
  databaseURL: "https://fship-app-default-rtdb.firebaseio.com",
  projectId: "fship-app",
  storageBucket: "fship-app.appspot.com",
  messagingSenderId: "596894522005",
  appId: "1:596894522005:web:124e5534b260811c0bd99c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.enablePersistence().catch((err) => console.log(err));
const storageService = firebase.storage();
const storageRef = storageService.ref();

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  db.collection("obits").doc(id).set(value);
  localStorage.setItem("frm", JSON.stringify(value));
  loadHeader();
}
const form = document.querySelector("form");
//  const form = document.;getElementById('obitInfo');
form.addEventListener("submit", handleSubmit);

function loadForm() {
  var dbRef = db.collection("obits").doc(id);
  dbRef.get().then((doc) => {
    //        res=JSON.parse(doc);
    console.log(doc.data());
    dumpForm(doc.data());
  });
}

function dumpForm(res) {
  for (const key in res) {
    console.log(`${key}: ${res[key]}`);
    try {
      document.getElementById(key).value = res[key];
    } catch (error) {
      console.log(error);
    }
  }
}

function loadHeader() {
  var dbRef = db.collection("obits").doc(id);
  dbRef.get().then((doc) => {
    mainImage = doc.data()["mainImage"];
    slideShow = doc.data()["slideShow"];
    fname = doc.data()["fname"];
    mname = doc.data()["mname"];
    lname = doc.data()["lname"];
    from = doc.data()["from"];
    subline = doc.data()["subline"];
    service = doc.data()["service"];
    dob = doc.data()["dob"];
    dod = doc.data()["dod"];
    pob = doc.data()["pob"];
    pod = doc.data()["pod"];
    entured = doc.data()["entured"];
    mother = doc.data()["mother"];
    father = doc.data()["father"];
    preceded = doc.data()["preceded"];
    survived = doc.data()["survived"];
    document.getElementById("obit_pic").src = mainImage;
    document.getElementById(
      "hdr_name"
    ).innerHTML = `<strong><em>${fname} ${mname}, ${lname}</em></strong>`;
    document.getElementById("hdr_tagLine").innerHTML = `<em>${subline}</em>`;
    document.getElementById("hdr_dates").innerHTML = `${dob} - ${dod}`;
    document.getElementById("obit_body0").innerHTML = `${service}`;
    document.getElementById(
      "obit_body1"
    ).innerHTML = `${fname} ${mname}, ${lname} from ${from} was born on ${dob} in ${pob}. ${fname} passed away on ${dod} in ${pod}.`;
    document.getElementById(
      "obit_body2"
    ).innerHTML = `${fname} was born to ${mother} and ${father} in ${pob}`;
    document.getElementById(
      "obit_body3"
    ).innerHTML = `${fname} is survived by ${survived}, and was preceded in death by ${preceded}`;
    txt = "";
    slides = slideShow.split(",");
    for (i = 1; i < slides.length; i++) {
      slide = slides[i];
      if (slide != "DELETED") {
        txt += `<img src="${slide}" width="250" class="w3-border w3-card-4"><br><br>`;
      }
    }

    document.getElementById("obit_body4").innerHTML = txt;
  });
}

document
  .querySelector(".file-selectM")
  .addEventListener("change", handleFileUploadChangeM);

function handleFileUploadChangeM(e) {
  //  document.getElementById("btn_post").disabled = true;
  let selectedFile;
  selectedFile = e.target.files[0];
  const uploadTask = storageRef
    .child(`images/${id}/${selectedFile.name}`)
    .put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    () => {
      // Do something once upload is complete
      console.log("success");
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log(downloadURL);
        document.getElementById("mainImage").value = downloadURL;
        document.getElementById("obit_pic").src = downloadURL;
        db.collection("obits").doc(id).update({ mainImage: downloadURL });
        loadHeader();
        w3.hide("#mainImage");
        w3.hide("#galleryImage");
      });
      //      document.getElementById("btn_post").disabled = false;
      let selectedFile;
    }
  );
}

function loadImageList(sshow) {
  txt = "";
  slides = sshow.split(",");
  for (i = 1; i < slides.length; i++) {
    slide = slides[i];
    if (slide != "DELETED") {
      txt += `<img src="${slide}" onclick="killSlide('${slide}')" width="250" class="w3-border w3-card-4"><br><br>`;
    }
  }

  document.getElementById("imageList").innerHTML = txt;
}

function killSlide(slideno) {
  slides = slideShow.split(",");
  let position = slides.indexOf(slideno);
  slides[position] = "DELETED";
  slideName = slideno.split("images/")[1];
  //   alert(slideno);

  db.collection("obits").doc(id).update({ slideShow: slides.toString() });
  var slideRef = storageRef.child("images/" + slideName);

  // Delete the file
  slideRef
    .delete()
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  loadHeader();
  loadImageList(slides.toString());
}

document
  .querySelector(".file-selectG")
  .addEventListener("change", handleFileUploadChangeG);

function handleFileUploadChangeG(e) {
  let selectedFile;
  selectedFile = e.target.files[0];
  const uploadTask = storageRef
    .child(`images/${id}/${selectedFile.name}`)
    .put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    () => {
      // Do something once upload is complete
      console.log("success");
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log(downloadURL);
        step1 = slideShow.split(",");
        step2 = step1.push(downloadURL);
        slideShow = step1.toString();
        db.collection("obits").doc(id).update({ slideShow: slideShow });
        loadHeader();
        loadImageList(slideShow);
        w3.hide("#mainImage");
        w3.hide("#galleryImage");
      });
      let selectedFile;
    }
  );
} // Function to check prime number

function validatePassword() {
  passList = [1007, 1011, 1013, 1019, 1021, 1027, 1031, 1037, 1049, 1051];

  passIn = 1011;
  if (passIn.indexOf(passList)) {
    return true;
  } else {
    return false;
  }
}
