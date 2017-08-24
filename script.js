const users = ["ogn_ow", "freecodecamp","esl_sc2", "leh_tv", "lachu", "jasonr", "cretetion"]
// const streamUrl = `https://api.twitch.tv/kraken/streams/${user}?client_id=${clientID}`
// const userUrl = `https://wind-bow.glitch.me/twitch-api/users/${user}`
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

const generateResult = (userData, streamData) => {
	
	if (state == 'all' && streamData.stream) {
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
	} if (state == 'all' && !streamData.stream) {
			$("#insert").append(
				`<div class="result-box grid"><div class="content-box col-1">
					<img class="avatar" src="${userData.logo}" alt="avatar">
				</div>				
				<div class="avatar-nest col-7">
					<h3 id="user-name">${userData.display_name}</h3>
				</div>
			<div class="status-box col-3">
					<h2 id="stream-status">offline</h2>
					<i class="fa fa-bed"></i>
				</div>
			</div>`
		)
	} if (state == 'online' && streamData.stream) {
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
	} if (state == 'offline' && !streamData.stream){
			$("#insert").append(
				`<div class="result-box grid"><div class="content-box col-1">
					<img class="avatar" src="${userData.logo}" alt="avatar">
				</div>				
				<div class="avatar-nest col-7">
					<h3 id="user-name">${userData.display_name}</h3>
				</div>
			<div class="status-box col-3">
					<h2 id="stream-status">offline</h2>
					<i class="fa fa-bed"></i>
				</div>
			</div>`
			)
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

// const onlineClickHndl = (streamData) =>{
// 	$("#online-ch").on('click', () => {
// 		const hide = (streamData) =>{
// 			// for(var i = 0; i < users.length; i++){
// 				console.log(streamData);
// 				if (streamData.stream == null){
// 					$("#result-box").css('display', 'none')
// 				}
// 			// }
// 		}
// 		clearAll();
// 		fetchAll(hide(streamData));
// 	})
// }
