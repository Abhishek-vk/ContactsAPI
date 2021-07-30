var fs = require("fs");

var dataPth = `./data/Contacts.json`;
var data = JSON.parse(fs.readFileSync(dataPth));

exports.getContacts = (req, res) => {
    res.status(200).json({
        status: "Success",
        statusCode: 200,
        total: data.length,
        data,
    });
};

exports.addContact = (req, res) => {
    const body = req.body;
    const newId = data[data.length - 1].id + 1;
    if (!!!body["user-details"]) {
        res.status(400).json({
            status: "user-details not found",
            statusCode: 400,
        });
    } else if (!!!body["user-details"].phone) {
        res.status(400).json({
            status: "invalid phone value",
            statusCode: 400,
        });
    }
    const newContact = { id: newId, ...body };
    data.push(newContact);
    fs.writeFile(dataPth, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            res.status(500).json({
                status: "Server error",
                statusCode: 500,
            });
        }
        res.status(200).json({
            status: "Success",
            statusCode: 200,
            addedData: newContact,
        });
    });
};
