const path = require('path');
const userData = require("../data/usersCollection");

function getURL(num) {		//these image urls might be deleted in the future, I don't know if it has a time limit
	let url = "https://i.ibb.co/hcDLvg9/pic1.jpg";
	switch (num) {
		case 1:
			url = "https://i.ibb.co/hcDLvg9/pic1.jpg";
			break;
		case 2:
			url = "https://i.ibb.co/QkSbJjz/pic2.jpg";
			break;
		case 3:
			url = "https://i.ibb.co/7KH3HYb/pic3.jpg";
			break;
		case 4:
			url = "https://i.ibb.co/41TJqMX/pic4.jpg";
			break;
		case 5:
			url = "https://i.ibb.co/vB1wK3y/pic5.jpg";
			break;
	}
	return url;
}

const constructorMethod = (app) => {
	app.get('/', (req, res) => {
		res.render("theViews/home");
	});
	app.post('/', async (req, res) => {
		try {
			if(req.body.enteredName.trim() == "") {
				res.render("theViews/error", { error: "Form cannot be left blank" });
			}
			else if(req.body.enteredDate.trim() == "") {
				res.render("theViews/error", { error: "Form cannot be left blank" });
			}
			else {
				await userData.createUser(req.body.enteredName, 1, req.body.enteredDate);
				res.render("theViews/home");
			}
		}
		catch (e) {
			res.render("theViews/error", { error: e });
		}
	});
	app.post('/deleteUser', async (req, res) => {
		try {
			if(req.body.delName.trim() == "") {
				res.render("theViews/error", { error: "Form cannot be left blank" });
			}
			else {
				await userData.deleteUser(req.body.delName);
				res.render("theViews/deleteSuc");
			}
		}
		catch (e) {
			res.render("theViews/error", { error: e });
		}
	});
	app.post('/updateUser', async (req, res) => {
		try {
			if(req.body.oldName.trim() == "") {
				res.render("theViews/error", { error: "Must supply old name" });
			}
			else if(req.body.newDate.trim() == "" && req.body.newName.trim() == "" && !("newJPG" in req.body)) {
				res.render("theViews/error", { error: "Form cannot be left blank" });
			}
			else {
				if(req.body.newDate.trim() != "") {
					await userData.updateBirthday(req.body.newDate, req.body.oldName);
				}
				if("newJPG" in req.body) {
					await userData.updatePic(parseInt(req.body.newJPG), req.body.oldName);
				}
				if(req.body.newName.trim() != "") {
					await userData.updateName(req.body.newName, req.body.oldName);
				}
				res.render("theViews/updateUser");
			}
		}
		catch (e) {
			res.render("theViews/error", { error: e });
		}
	});
	app.get('/users/:name', async (req, res) => {
		let uData;
		try {
			uData = await userData.getUser(req.params.name);
			uData.picURL = getURL(uData.userPic);
			res.render("theViews/profile", uData);
		}
		catch (e) {
			res.render("theViews/error", { error: e });
		}
	});
	app.use('/*', (req, res) => {
		res.status(404).render("theViews/error",{ error: "Webpage Not Found" });
	});
};

module.exports = constructorMethod;