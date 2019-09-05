chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("/index.html") });
});








var data = {
	tasks: [],
	user: {
		rateLimit: false,
		daysLeft: 3,
		lastDay: dayToday(),
		firstDay: dayToday(),
		firstInit: new Date().getTime(),
		purchased: !1,
		products: []
	},
	userData: {
	    tasks: []
	},
	status: 'Sleeping'
}



chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.why) {
	    case 'getData':
	    	data.user.rateLimit = a.rateLimit;
	    	data.user.waitTimeMS = a.waitTime.ms
	        sendResponse(data);
	        break;
	    case 'getRSS':
	        sendResponse(a.rss);
	    case 'getQUE':
	        sendResponse(a.que);
	        break;
	    case 'setData':
	    	if(request.value.tasks.length == data.userData.tasks.length){
		    	request.value.tasks.forEach((t,n)=>{
		    		data.userData.tasks[n].settings = t.settings;
		    		data.userData.tasks[n].enabled = t.enabled;
		    		data.userData.tasks[n].id = t.id;
		    	})
		    }else if(request.value.tasks.length > data.userData.tasks.length){
		    	data.userData.tasks.push(request.value.tasks[request.value.tasks.length-1])
		    }else{
		    	var unis = []
		    	request.value.tasks.forEach((t,n)=>{
		    		unis.push(t.dateCreated)
		    	})
		    	data.userData.tasks.forEach((t,n)=>{
		    		if(!unis.includes(t.dateCreated)){
		    			data.userData.tasks.splice(n, 1)
		    		}
		    	})
		    }
		    a.buildQue();
			update();
			!a.running&&a.init();
	        sendResponse(!0);
	        break;
	    case 'tool':
	    	console.log(request)
	    	a.tool[request.name](request.value, sendResponse);
	    	break;
	   	case 'pay':
	        pay()
	        break;
	    case 'openPage':
		    chrome.tabs.create({ url: chrome.runtime.getURL("/index.html")+request.value });
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


chrome.storage.local.get(["data", "rss"], function(items) {
	console.log(items)
    if (items.data) {
    	data = items.data;
    	a.rss = items.rss
    }
	chrome.storage.sync.get(["user"], function(items) {
		if (items.user) {
	    	data.user = items.user;
	    }else{
	    	update()
	    }
    	a.readyUp();
		memberShip()
	})
});

// chrome.google.payments.inapp.getSkuDetails({
//   'parameters': {'env': 'prod'},
//   'success': function(){
//   	console.log(arguments)
//   },
//   'failure': function(){
//   	console.log(arguments)
//   }
// });
function memberShip(){
	if(data.user.lastDay != dayToday()){
		a.rss = [];
		data.userData.tasks.forEach((task)=>{
			if(task.finished || task.repeating)
				task.posts = [];
		})
	}
	data.user.lastDay = dayToday();
	data.user.daysLeft = data.user.firstDay - data.user.lastDay + 3;
}
setInterval(memberShip, 600000);