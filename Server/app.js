const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

var corsOptions = {
	origin: 'http://localhost:4200',
	//domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép), 
	//giả sử node server là http://localhost:800
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
const app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.listen(8000, () => {
	console.log('Server started!');
});

app.route('/api/movies').get((req, res) => {
	let list = []
	db.collection('Movie').get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				list.push(doc.data())
			});
			res.send(list)
		})
		.catch((err) => {
			console.log('Error getting documents', err);
		});
});

app.route('/api/create').post((req, res) => {


	console.log(req.body)
	let ref = db.collection('Movie').doc();
	let id = ref.id
	db.collection('Movie').doc(id).set({
		id: id,
		nguoiTao: req.body.nguoiTao,
		theLoai: req.body.theLoai,
		ngayPhatHanh: req.body.ngayPhatHanh,
		tenPhim: req.body.tenPhim,
		moTa: req.body.moTa,
		trangThai: req.body.trangThai
	});
	res.send({ status: 200 })
});
app.route('/api/update').put((req, res) => {


	console.log(req.body)

	db.collection("Movie").doc(req.body.id).update({
		nguoiTao: req.body.nguoiTao,
		theLoai: req.body.theLoai,
		ngayPhatHanh: req.body.ngayPhatHanh,
		tenPhim: req.body.tenPhim,
		moTa: req.body.moTa,
		trangThai: req.body.trangThai
	});

	res.send({ status: 200 })
});
app.route('/api/delete/:id').delete((req, res) => {
	console.log(req.params.id)

	db.collection("Movie").doc(req.params.id).delete()
	res.send({ status: 200 })
});