var a = {
	que: [],
	waitTime: {
		on: false,
		ms: 0
	},
	rateLimit: false,
	isRunning: !1,
	rss: [],
	timeouts: [],
	requests: [],
	sleepTime: 0,
	switchTask: 0,
	forceTimes: 0,
	tries: 0,
	createI: function(data){
		if(!data || !data.length) return false;
		var i = 0;
		data.forEach((t,n)=>{
			if(t>0 || t.done)
				i = n;
		})
		for (var j = 0; j < i; j++) {
			if(!(data[j] > 0))
				data[j].done = true;
		}
		return i;
	},
	generateTime: function(e){
		var avTi = 0;
		e.forEach((el, id)=>{
			if(el=='like'){
				avTi += 9000;
			}else if(el=='comment'){
				avTi += 26000;
			}else if(el=='comments'){
				avTi += 9000;
			}else if(el=='follow'){
				avTi += 15000;
			}
		})
		return random(avTi*0.6, avTi*1.4)
	},
	readyUp: function(){
		console.log('readyUp');
		$.get('https://www.instagram.com')
		.fail((e)=>{timer(a.readyUp, random(5000, 15000))})
		.done(function(e){
			var p = $('<div/>').append(e)
			var p = p.find('script').map(function(el){
				if( $(this).html().includes('window._sharedData = ')){
					var e = JSON.parse( $(this).html().replace('window._sharedData = ', '').slice(0, -1) ) ;
					console.log(e)
					catcher(function(){
						// data.user.csrf_token = e.config.csrf_token
						data.user.username = e.config.viewer.username
						data.user.isPrivate = e.config.viewer.is_private
						data.user.id = e.config.viewer.id
					})!==!1?0:data.user.username=!1;
					if(!data.user.username){
						chrome.tabs.create({ url: 'https://www.instagram.com' });
						a.resetOuts()
					}
				}
			})
			chrome.cookies.getAll({url: 'https://www.instagram.com'}, function(e){
				// console.log(e)
				var cock = '';
				data.user.test = {};
				var no_token = false;
				e.forEach(t=>{
					if(t.name=="csrftoken"){
						data.user.csrf_token = t.value;
						no_token = true;
					}
					cock += t.name+'='+t.value+'; ';
				})
				if(!no_token){
					data.user.csrf_token = ''
				}
				data.user.cookies = cock;
				
				data.userData.tasks.forEach((t)=>{
					if(!t.settings.frequency && t.running){
						t.finished = false;
						t.running = false;
					} 
					t.running = !1
				})
				a.isRunning = !1;
				a.init()
			})
		});
	},
	section: {
		target: function(e, cb, second){
			var t = function(cb){
				var i = a.createI(e.posts);
				if(i === false) return cb(e)
				var Action = function(){ if(e.uni != a.isRunning) return;
					if(!e.posts[i]){
						cb(e)
						return;
					}
					if(e.posts[i] > 0 || e.posts[i].done){
						i++;
						e.posts.length>i?Action():cb(e);
						return;
					}
					(async (ms) => {
						e.posts[i].done = true;
						if(e.types.includes('like')){
							await delay(ms/e.types.length);
							a.tool.likeIt(e.posts[i])
						}
						if(e.types.includes('comment')){
							await delay(ms/e.types.length);
							a.tool.commentIt(e.posts[i], e.comments[random(0, e.comments.length-1)])
						}
						if(e.types.includes('comments')){
							await delay(ms/e.types.length);
							a.tool.likeComments(e.posts[i], e.settings.lastComments)
						}
						if(e.types.includes('follow')){
							await delay(ms/e.types.length);
							a.tool.followIt(e.posts[i].owner)
						}
						i++;
						e.posts.length>i?Action():cb(e);
					})(a.generateTime(e.types)).catch(err => {
					    console.error(err);
					    _gaq.push(['_trackEvent', 'error', err]);
					});
					// random(e.types.length*6000, e.types.length*9000)
				}
				Action();
			}
			var i = a.createI(e.accounts);
			if(i === false) return cb(e)
			var Action = function(){ if(e.uni != a.isRunning) return;
				e.accounts[i].done = true;
				a.tool.getUserPosts({name: e.accounts[i].username, count: Math.round(e.settings.amount / e.accounts.length)}, function(res){
					console.log(res)
					res&&e.posts.push(...res)
					i++;
					t(function(){
						if(e.accounts.length>i){
							Action()
						}else{
							if(e.repeating)
								e.posts.unshift(new Date().getTime())
							console.log(e)
							cb(e);
						}
					})
				})
			}
			Action();
		},
		story: function(e, cb, second){
			var i = a.createI(e.accounts);
			if(i === false) return cb(e)
			var Action = function(){ if(e.uni != a.isRunning) return;
				timer(function() {
					e.accounts[i].done = true;
					a.tool.watchUserStory(e.accounts[i]);
					i++;
					timer(function() {
						e.accounts.length>i?Action():cb(e);
					}, random(40, 500));
				}, random(6000, 9000));
			}
			Action();
		},
		feed: function(e, cb){
			var t = function(data){
				// console.log(data)
				var i = a.createI(data);
				if(i === false) return cb(e)
				var Action = function(){ if(e.uni != a.isRunning) return;
					if(e.posts[i] > 0 || e.posts[i].done){
						i++;
						e.posts.length>i?Action():cb(e);
						return;
					}
					(async (ms) => {
						data[i].done = true;
						if(e.types.includes('like')){
							await delay(ms/e.types.length);
							a.tool.likeIt(data[i])
						}
						if(e.types.includes('comment')){
							await delay(ms/e.types.length);;
							a.tool.commentIt(data[i], e.comments[random(0, e.comments.length-1)])
						}
						if(e.types.includes('comments')){
							await delay(ms/e.types.length);;
							a.tool.likeComments(e.posts[i], e.settings.lastComments)
						}
						i++;
						data.length>i?Action():cb(e);
					})(a.generateTime(e.types)).catch(err => {
					    console.error(err);
					    _gaq.push(['_trackEvent', 'error', err]);
					});
				}
				Action();
			}
			if(e.repeating){
				a.tool.myFeed({count: e.settings.amount}, function(data){
					e.posts = data
					e.posts.unshift(new Date().getTime())
					t(e.posts)
				})
			}else{
				t(e.posts);
			}
		},
		unfollow: function(e, cb){
			var i = a.createI(e.accounts);
			if(i === false) return cb(e)
			var Action = function(){ if(e.uni != a.isRunning) return;
				timer(function() {
					a.tool.getUser(e.accounts[i].username, (res)=>{
						if(res)
							if((e.settings.dFollowedByMe && res.follows_viewer) || !e.settings.dFollowedByMe)
								if((e.settings.dVerified && res.is_verified) || !e.settings.dVerified)
									a.tool.unfollowIt(res)
					})
					e.accounts[i].done = true;
					i++;
					e.accounts.length>i?Action():cb(e);
				}, random(6000, 9000));
			}
			Action();
		},
		locations: function(e, cb){
			a.section.locTag(e, cb);
		},
		hashtags: function(e, cb){
			a.section.locTag(e, cb);
		},
		locTag: function(e, cb){
			var t = function(data){
				var i = a.createI(e.posts);
				if(i === false) return cb(e)
				var Action = function(){ if(e.uni != a.isRunning) return;
					if(e.posts[i] > 0 || e.posts[i].done){
						i++;
						e.posts.length>i?Action():cb(e);
						return;
					}
					(async (ms) => {
						if(e.types.includes('like')){
							await delay(ms/e.types.length);
							a.tool.likeIt(e.posts[i])
						}
						if(e.types.includes('comment')){
							await delay(ms/e.types.length);
							a.tool.commentIt(e.posts[i], e.comments[random(0, e.comments.length-1)])
						}
						if(e.types.includes('comments')){
							await delay(ms/e.types.length);
							a.tool.likeComments(e.posts[i], e.settings.lastComments)
						}
						if(e.types.includes('follow')){
							await delay(ms/e.types.length);
							a.tool.getPost(e.posts[i].shortcode, (res1)=>{
								a.tool.getUser(res1.owner.username, function(res2){
									a.tool.followIt(res2)
								});
							})
						}
						e.posts[i].done = true;
						i++;
						e.posts.length>i?Action():cb(e);
					})(a.generateTime(e.types)).catch(err => {
					    console.error(err);
					    _gaq.push(['_trackEvent', 'error', err]);
					});
				}
				Action();
			}

			if(e.repeating){
				var filter = e.filters[random(0, e.filters.length-1)]
				a.tool['getRecent'+e.section.charAt(0).toUpperCase() + e.section.slice(1)](filter, function(data){
					data = data.slice(0, e.settings.amount)
					e.posts = data
					e.posts.unshift(new Date().getTime())
					t(e.posts)
				})
			}else{
				t(e.posts);
			}
		},
		requests: function(e, cb){
			var t = function(){
				var i = a.createI(e.accounts);
				if(i === false) return cb(e)
				var Action = function(){ if(e.uni != a.isRunning) return;
					timer(function() {
						a.tool.approve(e.accounts[i])
						e.accounts[i].done = true;
						i++;
						e.accounts.length>i?Action():cb(e);
					}, random(6000, 9000));
				}
				Action();
			}
			if(e.repeating){
				a.tool['getRequestsList']('', function(data){
					e.accounts = data
					t()
				})
			}else{
				t();
			}
		}
	},
	resetOuts: function(e){
		if(!a.isRunning && !e) return;
		if(e===true && !a.waitTime.on) a.rateLimit = 'simple';
		console.log('resetOuts')
		a.timeouts.forEach(clearTimeout)
		a.requests.forEach(e=>e.abort())
		a.timeouts = []
		a.requests = []
		a.isRunning = !1
		data.userData.tasks.forEach((t)=>{
			if(!t.settings.frequency && t.running){
				t.finished = false;
				t.running = false;
			}
			t.running = !1
		})
		a.forceTimes = 0;
		a.tries = 0;
		if(!a.waitTime.on && a.rateLimit){
			if(a.rateLimit == 'simple') a.waitTime.ms = 4000;
			if(a.rateLimit == 'soft') a.waitTime.ms = 10*1000*60;
			if(a.rateLimit == 'hard') a.waitTime.ms = 60*1000*60;
			a.waitTime.on = !0;
			var intervalReset = setInterval(function() {
				console.log(a.waitTime.ms)
				if(a.waitTime.ms <= 0){
					a.waitTime.ms = 0;
					a.waitTime.on = !1;
					a.rateLimit = false;
					clearInterval(intervalReset);
					a.readyUp()
				}else{
					a.waitTime.ms -= 1000;
				}
			}, 1000);
		}
	},
	buildQue: function(e){
		data.userData.tasks.forEach((t, index)=>{data.userData.tasks[index].id = index});
		// var filtered = data.userData.tasks.filter(e=>e.enabled).filter(e=>!e.finished);
		// data.userData.tasks = data.userData.tasks.filter(e=>e.section=='target');
		var stopApp = true;
		data.userData.tasks.forEach((t, index)=>{
			if(!t.repeating && !t.timeStamp){
				t.timeStamp=new Date().getTime()-1;
			}else if(t.repeating && (!t.timeStamp || (new Date().getTime() - t.timeStamp) > t.settings.frequency*60*60*1000)){
				t.timeStamp = new Date().getTime()+t.settings.frequency*60*60*1000;
			}
			if(t.uni == a.isRunning){
				stopApp = false;
			}
			var time = Math.round((t.timeStamp - new Date().getTime())/1000/60);
			if(time > 140){
			   time = 'in ~'+Math.round((t.timeStamp - new Date().getTime())/1000/60/60) + ' hours';
			}else if(time > 1){
				time = 'in ~'+time+' minutes';
			}else{
				time = 'soon'
			}
			t.status = `Bot will start working on this task ${time}.`;
			if(t.finished) t.status = `Task is completed`;
		});
		if(stopApp && !e) a.resetOuts();
		// data.userData.data.userData.tasks = filtered.sort(function(a, b){return a.timeStamp - b.timeStamp});
		// data.userData.data.userData.tasks = [];
		a.que = _.cloneDeep(data.userData.tasks).sort(function(a, b){
			return a.timeStamp - b.timeStamp
		}).sort(function(a, b) {
	        return (a.enabled === b.enabled)? 0 : a.enabled? -1 : 1;
	    }).sort(function(a, b) {
	        return (!a.finished === !b.finished)? 0 : !a.finished? -1 : 1;
	    }).sort(function(a, b) {
	        return (a.running === b.running)? 0 : a.running? -1 : 1;
	    })
	    a.que.forEach((t, n)=>{
	    	delete a.que[n].posts;
	    })
	},
	init: function(){
		console.log('init')
		update();

		// a.section.feed();

		// console.log('nit');
		// a.timeouts.forEach(clearTimeout)
		// a.requests.forEach(e=>e.abort())
		// a.timeouts = []
		// a.requests = []

		// // if(a.tries > 1){
		// // 	return;
		// // }
		// a.tries++;
		// if(!data.user.username){
			// a.readyUp()
		// 	return;
		// }
		// console.log('started');
		// // a.tool.getUser('_mavlon_oo7', function(e){
		// // 	console.log(e)
		// //   // a.tool.getFollowers(e.id, function(v){
		// //   //   console.log(v);
		// //   // })
		// // })

		a.buildQue(true);
		if(!a.waitTime.on && a.que[0] && data.userData.tasks[a.que[0].id] && !!data.user.csrf_token && !a.isRunning && a.que[0].enabled && a.que[0].timeStamp<=Date.now() && !a.que[0].finished){
			console.log('a task started')
			a.forceTimes = 0;
			data.userData.tasks[a.que[0].id].running = true;
			a.que[0].status = data.userData.tasks[a.que[0].id].status = 'Working on it...'
			a.isRunning = a.que[0].uni;
			update();
			a.section[a.que[0].section](data.userData.tasks[a.que[0].id], function(e){
				console.log('finished')
				e.running = false;
				a.isRunning = !1;
				if(!e.repeating) e.finished = true;
				if(e.repeating) e.timeStamp+=e.settings.frequency*60*60*1000;
				a.init();
			})
			a.tries = 0;
			// var r = random(0, (tasks.length-1));
			// a.section[tasks[r].section](tasks[r]);
		}else{
			if(a.tries > 14){
				a.resetOuts(true);
				return;
			}
			a.tries++;
			timer(function() {
				a.init()
			}, 600000);
		}


	}
}
setInterval(function() {
	a.forceTimes++;
	if(a.forceTimes > 60){
		a.resetOuts(true);
	}else{
		a.buildQue();
	}
}, 4000);