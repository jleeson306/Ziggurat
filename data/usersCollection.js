const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.usersCollection;
const {ObjectId} = require('mongodb');
const moment = require('moment');
const { usersCollection } = require('../config/mongoCollections');

const removeAll = async function() {
	const usersCollection = await users();
	usersCollection.deleteMany({});
	return 0;
}

const createUser = async function(fullName, whichPic, birth) {
	if(arguments.length != 3 || fullName == undefined || whichPic == undefined || birth == undefined) {
		throw("createUser: you are missing one of these - firstName, lastName, birth");
	}
	if(typeof fullName !== 'string' || fullName.trim() == "") {
		throw("createUser: fullName must be a string with characters");
	}
	fullName = fullName.toLowerCase();
	if(typeof birth !== 'string' || birth.trim() == "") {
		throw("createUser: birth must be a string with characters");
	}
	if(typeof whichPic !== 'number' || 0 > whichPic || whichPic > 5) {
		whichPic = 1;
	}
	let testDate = moment(birth, 'YYYY-MM-DD', true).isValid();
	if(!testDate) {
		throw("createUser: birth is invalid or in inncorect format");
	}
	
	const usersCollection = await users();
	
	let user = await usersCollection.findOne({userFullName: fullName});
	if(user != null) {
		throw("createUser: already exists");
	}
	
	let newUser = {
		userFullName: fullName,
		userPic: whichPic,
		userBirthday: birth,
	};
	
	const inIn = await usersCollection.insertOne(newUser);
	if(inIn.insertCount === 0) {
		throw("createUser: unable to add this user");
	}
	else{
		return 0;
	}

	
}

const deleteUser = async function(name) {
	if(arguments.length != 1 || name == undefined) {
		throw("deleteUser: You must have a name");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("deleteUser: name must be a string with letters");
	}
	name = name.toLowerCase();
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userFullName: name});
	if(user == null) {
		throw("deleteUser: user could not be found");
	}
	
	const delin = await usersCollection.deleteOne({userFullName: name});
	
	return 0;
}

const updateName = async function(newName, name){
	if(arguments.length != 2 || newName == undefined || name == undefined) {
		throw("updateName: You must have a newName and a name");
	}
	if(typeof newName !== 'string' || newName.trim() == "") {
		throw("updateName: name must be a string with letters");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("updateName: name must be a string with letters");
	}
	newName = newName.toLowerCase();
	name = name.toLowerCase();

	const usersCollection = await users();
	let user = await usersCollection.findOne({userFullName: name});
	if(user == null) {
		throw("updateName: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userFullName: name}, {$set: {userFullName: newName}});
	if (upin === 0) {
		throw("updateName: failed to update");
	}
	
	return 0;
}

const updatePic = async function(num, name){
	if(arguments.length != 2 || name == undefined || num == undefined) {
		throw("updatePic: You must have a name and a num");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("updatePic: name must be a string with letters");
	}
	name = name.toLowerCase();
	if(typeof num !== 'number' || 0 > num || num > 5) {
		num = 1;
	}

	const usersCollection = await users();
	let user = await usersCollection.findOne({userFullName: name});
	if(user == null) {
		throw("updatePic: user could not be found");
	}
	const upin = await usersCollection.updateOne({userFullName: name}, {$set: {userPic: num}});
	if (upin === 0) {
		throw("updatePic: failed to update");
	}
	
	return 0;
}

const updateBirthday = async function(date, name){
	if(arguments.length != 2 || date == undefined || name == undefined) {
		throw("updateBirthday: You must have a date and a name");
	}
	if(typeof date !== 'string' || date.trim() == "") {
		throw("updateBirthday: date must be a string with letters");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("updateBirthday: name must be a string with letters");
	}
	name = name.toLowerCase();
	let beeboy = moment(date, 'YYYY-MM-DD', true).isValid();
	if(!beeboy) {
		throw("updateBirthday: date is invalid or in inncorect format");
	}
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userFullName: name});
	if(user == null) {
		throw("updateBirthday: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userFullName: name}, {$set: {userBirthday: date}});
	if (upin === 0) {
		throw("updateBirthday: failed to update");
	}
	
	return 0;
}

const getUser = async function(name){
	if(arguments.length != 1 || name == undefined) {
		throw("getUser: You must have a name");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("getUser: name must be a string with letters");
	}
	name = name.toLowerCase();
	const usersCollection = await users();
	let user = await usersCollection.findOne({userFullName: name});
	if(user == null) {
		throw("getUser: user could not be found");
	}
	return user;
}

module.exports = {
	removeAll,
	createUser,
	getUser,
	updateName,
	updatePic,
	updateBirthday,
	getUser,
	deleteUser
}
