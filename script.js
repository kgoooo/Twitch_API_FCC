//  https://api.twitch.tv/kraken/streams/esl_sc2?client_id=qc6mfya171mgkww1dn0s5p3wu3hq59

const users = ["ogn_ow", "freecodecamp","esl_sc2", "noobs2ninjas", "c9shroud", "jasonr", "cretetion"]
// const streamUrl = `https://api.twitch.tv/kraken/streams/${user}?client_id=${clientID}`
// const userUrl = `https://wind-bow.glitch.me/twitch-api/users/${user}`

$(document).ready(() => {
	users.forEach((user) => {
		userGet(user);
		streamGet(user);
	});
});

const userGet = (user) => {
	$.ajax({
		type: 'GET',
		url: `https://wind-bow.glitch.me/twitch-api/users/${user}`,
		dataType: "jsonp",
		format:'json',
		success: (userData) =>{
			generateResult(userData);
		}
	});
}

const streamGet = (user) =>{
	$.ajax({
		type: 'GET',
		url: `https://wind-bow.gomix.me/twitch-api/streams/${user}`,
		dataType: "jsonp",
		format:'json',
		success: (streamData) =>{
			console.log(streamData);
		}
	});
}

const generateResult = (userData, streamData) => {
	$("#insert").append(
		`<div class="result-box grid"><div class="content-box col-1">
			<img class="avatar" src="${userData.logo}" alt="avatar">
		</div>				
		<div class="avatar-nest col-7">
			<h3 id="user-name">${userData.display_name}</h3>
			<p>Preview</p></p>
		</div>
			<div class="status-box col-4">
				<h2 id="stream-status">LIVE!</h2>
				<img id="stream-preview" class="preview" src="https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_sc2-320x180.jpg">
			</div>
		</div>`
	);
}


