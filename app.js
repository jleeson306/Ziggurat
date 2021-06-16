const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const userData = require("./data/usersCollection");

app.use(static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

async function main(){
	try{
		let t = await userData.removeAll();
	}catch(e){
		console.log(e);
	}
	try{
		let tt = await userData.createUser("John", 13, "2001-05-02");
	}catch(e){
		console.log(e);
	}try{
		let ttt = await userData.createUser("Emily", 2, "2007-12-07");
	}catch(e){
		console.log(e);
	}
	try{
		let tttt = await userData.createUser("Robert", 3, "1999-07-06");
	}catch(e){
		console.log(e);
	}
};

main().catch((error) => {
  console.log(error);
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});