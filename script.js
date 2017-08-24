const users = ["ogn_ow", "freecodecamp","esl_sc2", "leh_tv", "lachu", "jasonr", "cretetion", "syndicate", "riotgames", "shroud"]

let state = 'all';
$(document).ready(() => {
	fetchAll();
	state = 'all'
});

const fetchAll = (online) => {
	users.forEach((user) => {
		userGet(user, online);
	});
}

const userGet = (user) => {
	$.ajax({
		type: 'GET',
		url: `https://wind-bow.glitch.me/twitch-api/users/${user}`,
		dataType: "jsonp",
		format:'json',
		success: (userData) =>{
			streamGet(user, userData);
		}
	});
}

const streamGet = (user, userData) =>{
	$.ajax({
		type: 'GET',
		url: `https://wind-bow.gomix.me/twitch-api/streams/${user}`,
		dataType: "jsonp",
		format:'json',
		success: (streamData) =>{
			generateResult(userData, streamData)
		}
	});
}

const mainHTML = (userData, streamData) => {
	$("#insert").append(
		`<a href="https://www.twitch.tv/${userData.display_name}"><div class="result-box grid"><div class="content-box col-1">
		<img class="avatar" src="${userData.logo}" alt="avatar">
	</div>				
	<div class="avatar-nest col-7">
		<h3 id="user-name">${userData.display_name}</h3>
		<p>Playing: ${streamData.stream.game}</p>
		<p>${streamData.stream.channel.status}</p>
	</div>
		<div class="status-box col-3">
		<h2 id="stream-status">${streamData.stream.stream_type}</h2>
		<img id="stream-preview" class="preview" src=${streamData.stream.preview.medium}>
	</div>
	</div>
	</a>`
	)
}

const offlineHtml = (userData, streamData) => {
	$("#insert").append(
			`<a href="https://www.twitch.tv/${userData.display_name}"><div class="result-box grid"><div class="content-box col-1">
				<img class="avatar" src="${userData.logo}" alt="avatar">
			</div>				
			<div class="avatar-nest col-7">
				<h3 id="user-name">${userData.display_name}</h3>
			</div>
		<div class="status-box col-3">
				<h2 id="stream-status">offline</h2>
				<i class="fa fa-bed"></i>
			</div>
		</div>
		</a>`
	)
}


const generateResult = (userData, streamData) => {
	if (state == 'all' && streamData.stream || state == 'online' && streamData.stream) {
		mainHTML(userData, streamData)
	} if (state == 'all' && !streamData.stream || state == 'offline' && !streamData.stream) {
			offlineHtml(userData, streamData)	
	}
}

const clearAll = () =>{
	$("#insert").empty();
}

const reload = () => {
	clearAll();
	fetchAll();
}

$("#all-ch").on('click', () => {
	state = 'all'			
	reload()
});

$("#online-ch").on('click', () => {
	state = 'online'
	reload()
});

$("#offline-ch").on('click', () => {
	state = 'offline'
	reload()	
});