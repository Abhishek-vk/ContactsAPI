var fs = require("fs");

var dataPath = `./data/Contacts.json`;
var data = JSON.parse(fs.readFileSync(dataPath));

//-----------Get Contact List--------------//

exports.getContacts = (req, res) => {
	if (!!req.params.id) {
		let index = undefined;
		data.forEach((e, i) => {
			if (e.id == req.params.id) index = i;
		});
		if (index === undefined) {
			res.status(400).json({
				status: "Error",
				statusCode: 400,
				error: "Invalid id",
			});
		} else {
			res.status(200).json({
				status: "Success",
				statusCode: 200,
				data: data[index],
			});
		}
		return;
	}
	res.status(200).json({
		status: "Success",
		statusCode: 200,
		total: data.length,
		data,
	});
};

//-----------Add New Contact--------------//

exports.addContact = (req, res) => {
	const body = req.body;
	const newId = data.length !== 0 ? data[data.length - 1].id + 1 : 1;
	if (!!!body["user-details"]) {
		res.status(400).json({
			status: "Error",
			statusCode: 400,
			error: "user-details not found",
		});
	} else if (!!!body["user-details"].phone) {
		res.status(400).json({
			status: "Error",
			statusCode: 400,
			error: "invalid phone value",
		});
	}
	const newContact = { id: newId, ...body };
	data.push(newContact);
	fs.writeFile(dataPath, JSON.stringify(data, null, 4), err => {
		if (err) {
			res.status(500).json({
				status: "Error",
				statusCode: 500,
				error: "Server error",
			});
		}
		res.status(200).json({
			status: "Success",
			statusCode: 200,
			addedData: newContact,
		});
	});
};

//-----------Edit Contact--------------//

exports.editContact = (req, res) => {
	const body = req.body;
	let oldDetails = {},
		index = undefined;
	if (!!!body.id) {
		res.status(400).json({
			status: "Error",
			statusCode: 400,
			error: "Invalid id",
		});
		return;
	}
	data.forEach((e, i) => {
		if (e.id == body.id) {
			oldDetails = e;
			index = i;
		}
	});
	if (index === undefined) {
		res.status(400).json({
			status: "Error",
			statusCode: 400,
			error: "Invalid id",
		});
	} else {
		data[index] = {
			...oldDetails,
			...body,
			"user-details": {
				...oldDetails["user-details"],
				...body["user-details"],
			},
		};
		fs.writeFile(dataPath, JSON.stringify(data, null, 4), err => {
			if (err) {
				res.status(500).json({
					status: "Error",
					statusCode: 500,
					error: "Server error",
				});
			} else {
				res.status(200).json({
					status: "Success",
					statusCode: 200,
					newData: data[index],
				});
			}
		});
	}
};

//-----------Delete Contact--------------//

exports.deleteContact = (req, res) => {
	let index = undefined;
	if (!!!req.params.id) {
		res.status(400).json({
			status: "Error",
			statusCode: 400,
			error: "Invalid id",
		});
		return;
	}
	data.forEach((e, i) => {
		if (e.id == req.params.id) {
			index = i;
		}
	});
	if (index === undefined) {
		res.status(400).json({
			status: "Error",
			statusCode: 400,
			error: "Invalid id",
		});
	} else {
		let deletedData = data.splice(index, 1);
		fs.writeFile(dataPath, JSON.stringify(data, null, 4), err => {
			if (err) {
				res.status(500).json({
					status: "Error",
					statusCode: 500,
					error: "Server error",
				});
			} else {
				res.status(200).json({
					status: "Success",
					statusCode: 200,
					deletedData: deletedData[0],
				});
			}
		});
	}
};
