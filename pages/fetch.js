const input = document.querySelector('input');
const log = document.getElementById('values');
input.addEventListener('input', updateValue);

var savedName = null;
function updateValue(e) {
	getName(e.target.value);
}

function getName(username) {
	queryFetchId(`query {
		getAccIdByUsername(name: "${username}")
	  }`)}

function getAccount(accountId) {
	queryFetchAccount(`query {
		accountTemplate(id: ${accountId}) {
			accountId
			aliveChars
			deadChars	
			banned
			connected
			registerTime
			}
		}	
	`)}

function UpdateAccount() {
	getAccount(savedName)
}
	
function queryFetchAccount(query) {
	return fetch('http://localhost:8080', {
		method: 'POST',
		headers: {
			'Content-Type':'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({query: query})
		})
		.then(r => r.json())
		.then(data => {	
			console.log(data.data.accountTemplate.registerTime);
		})
}

function queryFetchId(query) {
	var errorText = document.getElementById("error");
	return fetch('http://localhost:8080', {
		method: 'POST',
		headers: {
			'Content-Type':'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({query: query})
		})
		.then(r => r.json())
		.then(data => {	
			console.log(data)
			errorText.innerHTML = "Account Found!";
			errorText.style.color = "#32cd32";
			savedName = data.data.getAccIdByUsername;
		})
		.catch(error => handleInvalidAccount())
}

function handleInvalidAccount() {
	var errorText = document.getElementById("error");
	errorText.style.color = "#ff0000";
	errorText.innerHTML = "Invalid Account.";
	errorText.style.visibility = "visible";
}