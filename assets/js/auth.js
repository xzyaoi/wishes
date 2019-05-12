var authData = {
	ClientId: '74jv97vrvc3okcqfcp7cffqcmc', // Your client id here
	AppWebDomain: 'autoai.auth.us-east-1.amazoncognito.com',
	TokenScopesArray: ['email', 'openid', 'profile'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
	RedirectUriSignIn: 'https://wishes.game.autoai.org/callback.html',
	RedirectUriSignOut: 'https://wishes.game.autoai.org/callback.html',
	UserPoolId: 'us-east-1_IYJ3FvCKZ', // Your user pool id here
	AdvancedSecurityDataCollectionFlag: false // e.g. true
};

var auth = new AmazonCognitoIdentity.CognitoAuth(authData);

auth.userhandler = {
	onSuccess: function (result) {
		console.log(result)
		let idToken = result.getIdToken().getJwtToken()
		if (idToken) {
			let idTokenPayload = idToken.split('.')[1]
			let payload = JSON.parse(sjcl.codec.utf8String.fromBits(sjcl.codec.base64url.toBits(idTokenPayload)))
			localStorage.setItem("WISHES_USER", JSON.stringify(payload))
		}
	},
	onFailure: function (err) {
		console.log(err)
		alert("Error!");
	}
};

function login() {
	auth.getSession();
}

function parse() {
	console.log('parsing')
	let curUrl = window.location.href;
	auth.parseCognitoWebResponse(curUrl);
	setTimeout(function () {
		location.href = "./index.html"
	}, 3000);
}

function indexOnload() {
	let user = JSON.parse(localStorage.getItem("WISHES_USER"))
	if (user && typeof (user) !== 'undefined') {
		document.getElementById('accountInfo').innerHTML = user["cognito:username"]
		document.getElementById('accountInfo').href = "javascript:auth.signOut()"
	}

	// bootstrap
	getItems()
}