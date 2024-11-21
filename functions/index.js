
const functions = require("firebase-functions/v1");
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();
db = admin.firestore();

// db.collection("cities").whereEqualTo("country", “USA”).orderBy(“population”);

const app = express();
app.use(cors({'origin': true}));

app.get("/em", async (req, res) => {
	const snapshots = await db.collection("family").orderBy('name').get();

	let family = [];
	snapshots.forEach(doc => {
		oData = {};
		lData = doc.data()
		oData['key'] = doc.id;
		oData['name'] = lData.name;
		oData['comments'] = lData.comments;
		oData['email'] = lData.email;
		family.push(oData);
	});
	contacts={};
	contacts['family']= family;
	res.send(JSON.stringify(contacts));
});

app.get("/", async (req, res) => {
	const snapshots = await db.collection("family").orderBy('name').get();

	let family = [];
	snapshots.forEach(doc => {
		oData = {};
		lData = doc.data()
		oData['key'] = doc.id;
		oData['name'] = lData.name;
		oData['comments'] = lData.comments;
		oData['email'] = lData.email;
		family.push(oData);
	});
	res.send(JSON.stringify(family))
});

app.delete("/:id", async(req, res) => {
	await db.collection("family").doc(req.params.id).delete()
	res.status(200).send()
})

app.get("/:id", async (req, res) => {
	const snapshot = await db.collection("family").doc(req.params.id).get();
	res.send(JSON.stringify(snapshot.data()))
})

app.put("/:id", async (req, res) =>{
	bdata = req.body;
	await db.collection("family").doc(req.params.id).update(bdata);
	res.status(200).send();
})

app.post("/", async (req, res) => {
	data = req.body;
	await db.collection("family").add(data);
	res.status(201).send();
});

exports.app = functions.https.onRequest(app);

exports.date = functions.https.onRequest((req, res) => {
  	res.status(200).send("Hello");
});
