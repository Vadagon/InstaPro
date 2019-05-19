chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("/index.html") });
});








var data = {
	tasks: [],
	user: {
		lastDay: dayToday(),
		isMember: !1,
		limitTo: 500
	},
	userData: {
	    tasks: []
	},
	status: 'Sleeping'
}



chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.why) {
	    case 'getData':
	        sendResponse(data);
	        break;
	    case 'getRSS':
	        sendResponse(a.rss);
	    case 'getQUE':
	        sendResponse(data.userData.tasks);
	        break;
	    case 'setData':
	    	data.userData = request.value;
			update();
			!a.running&&a.init();
	        sendResponse(!0);
	        break;
	    case 'tool':
	    	console.log(request)
	    	a.tool[request.name](request.value, sendResponse);
	    	break;
		case 'popup':
			data.user.triedToPay = !0;
			_gaq.push(['_trackEvent', 'popup', request.what]);
			update();
			break;
	    default:
	        console.log('nothing');
	}
	return !0;
});


chrome.storage.local.get(["data"], function(items) {
	console.log(items)
    if (items.data) {
    	data = items.data;
    }else{
    	update()
    }
    a.readyUp();
});
