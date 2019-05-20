var a = {
	que: [],
	isRunning: !1,
	rss: [],
	timeouts: [],
	requests: [],
	sleepTime: 0,
	switchTask: 0,
	tries: 0,
	createI: function(data){
		var i = 0;
		data.forEach((t,n)=>{
			if(t.done)
				i = n;
		})
		return i;
	},
	readyUp: function(){
		console.log('readyUp');
		$.get('https://www.instagram.com')
		.fail((e)=>{timer(a.readyUp, random(5000, 15000)); changeAcc();})
		.done(function(e){
			var p = $('<div/>').append(e)
			var p = p.find('script').map(function(el){
				if( $(this).html().includes('window._sharedData = ')){
					var e = JSON.parse( $(this).html().replace('window._sharedData = ', '').slice(0, -1) ) ;
					catcher(function(){
						// data.user.csrf_token = e.config.csrf_token
						data.user.username = e.config.viewer.username
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
				a.init()
			})
		});
	},
	section: {
		target: function(e, cb, second){
			if(e.repeating){
				if(!e.posts){
					e.posts = [];	
				}
				if(!second){
					if(e.accounts.length != e.posts.length){
						e.posts = [];
					}
					var i = a.createI(e.accounts);
					var Action = function(){
						timer(function() {
							e.accounts[i] = true;
							a.tool.getUser(e.accounts[i].username, function(res){
								res&&e.type!='follow'&&e.posts.push(...res.edge_owner_to_timeline_media.edges.slice(0, e.settings.amount).map(e=>e.node))
								res&&e.type=='follow'&&a.tool.followIt(e.accounts[i])
								update();
								i++;
								e.accounts.length>i?Action():a.section.target(e, cb, true);
							})
						}, random(6000, 14000));
					}
					Action();
				}else if(e.type!='follow'){
					var i = a.createI(e.posts);
					var Action = function(){
						timer(function() {
							e.posts[i].done = true;
							if(e.type=='like'){
								a.tool.likeIt(e.posts[i])
							}
							if(e.type=='comment'){
								a.tool.commentIt(e.posts[i], e.comments[random(0, e.comments.length-1)])
							}
							i++;
							e.posts.length>i?Action():cb(e);
						}, random(6000, 14000));
					}
					Action();
				}else{
					console.log('target finished')
					e.finished = !0;
					cb(e)
				}
			}else{
				if(e.posts.length){
					var i = a.createI(e.posts);
					var Action = function(){
						timer(function() {
							e.posts[i].done = true;
							if(e.type=='like'){
								a.tool.likeIt(e.posts[i])
							}
							if(e.type=='comment'){
								a.tool.commentIt(e.posts[i], e.comments[random(0, e.comments.length-1)])
							}
							i++;
							e.posts.length>i?Action():cb(e);
						}, random(6000, 14000));
					}
					Action();
				}else{
					var i = a.createI(e.accounts);
					var Action = function(){
						timer(function() {
							e.accounts[i].done = true;
							a.tool.followIt(e.accounts[i])
							i++;
							e.accounts.length>i?Action():cb(e);
						}, random(6000, 14000));
					}
					Action();
				}
			}
		},
		feed: function(e, cb){
			var t = function(data){
				console.log(data)
				var i = a.createI(data);
				var Action = function(){
					timer(function() {
						data[i].done = true;
						if(e.type=='like'){
							a.tool.likeIt(data[i])
						}
						if(e.type=='comment'){
							a.tool.commentIt(data[i], e.comments[random(0, e.comments.length-1)])
						}
						i++;
						data.length>i?Action():cb(e);
					}, random(6000, 14000));
				}
				Action();
			}
			if(e.repeating){
				a.tool.myFeed({count: e.settings.amount}, function(data){
					e.posts.push(new Date().getTime())
					e.posts.push(...data)
					t(e.posts.filter(e=>e).filter(e=>!e.done))
				})
			}else{
				t(e.posts);
			}
		},
		unfollow: function(e, cb){
			var i = a.createI(e.accounts);
			var Action = function(){
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
				}, random(6000, 14000));
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
			if(e.repeating){
				var filter = e.filters[random(0, e.filters.length-1)]
				a.tool['getRecent'+e.section.charAt(0).toUpperCase() + e.section.slice(1)](filter, function(data){
					data = data.slice(0, e.settings.amount)
					console.log(data)
					var Action = function(){
						timer(function() {
							if(e.type=='like'){
								a.tool.likeIt(data.shift())
							}
							if(e.type=='comment'){
								a.tool.commentIt(data.shift(), e.comments[random(0, e.comments.length-1)])
							}
							if(e.type=='follow'){
								a.tool.getPost(data.shift().shortcode, (res1)=>{
									a.tool.getUser(res1.owner.username, function(res2){
										a.tool.followIt(res2)
									});
								})
							}
							if(Math.random() > 0.67) data.shift();
							data.length?Action():cb(e);
						}, random(6000, 14000));
					}
					Action();
				})
			}else{
				var i = a.createI(e.posts);
				var Action = function(){
					timer(function() {
						if(e.type=='like'){
							a.tool.likeIt(e.posts[i])
						}
						if(e.type=='comment'){
							a.tool.commentIt(e.posts[i], e.comments[random(0, e.comments.length-1)])
						}
						if(e.type=='follow'){
							a.tool.getPost(e.posts[i].shortcode, (res1)=>{
								a.tool.getUser(res1.owner.username, function(res2){
									a.tool.followIt(res2)
								});
							})
						}
						e.posts[i].done = true;
						i++;
						e.posts.length>i?Action():cb(e);
					}, random(6000, 14000));
				}
				Action();
			}
		}
	},
	resetOuts: function(e){
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
		a.tries = 0;

		timer(function() {
			a.readyUp()
		}, 10*1000*60);
	},
	buildQue: function(tasks){
		tasks.forEach((t, index)=>{t.id = index});
		// var filtered = tasks.filter(e=>e.enabled).filter(e=>!e.finished);
		// tasks = tasks.filter(e=>e.section=='target');
		var stopApp = true;
		tasks.forEach((t, index)=>{
			if(!t.settings.frequency || !t.timeStamp){
				t.timeStamp=new Date().getTime()-1;
			}else if(t.settings.frequency && t.dateCreated){
				t.timeStamp = t.dateCreated+t.settings.frequency*60*60*1000;
			}
			if(t.uni == a.isRunning && t.enabled){
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
			if(!t.enabled) t.status = `Task is disabled`;
			if(t.finished) t.status = `Task is completed`;
		});
		if(stopApp) a.resetOuts();
		// data.userData.tasks = filtered.sort(function(a, b){return a.timeStamp - b.timeStamp});
		// data.userData.tasks = [];
		a.que = JSON.parse(JSON.stringify(tasks)).sort(function(a, b){
			return a.timeStamp - b.timeStamp
		}).sort(function(a, b) {
	        return (a.enabled === b.enabled)? 0 : a.enabled? -1 : 1;
	    }).sort(function(a, b) {
	        return (!a.finished === !b.finished)? 0 : !a.finished? -1 : 1;
	    })
		data.userData.tasks = tasks;
		a.que.forEach((t)=>{
			data.userData.tasks[t.id] = t
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

		a.buildQue(data.userData.tasks);
		if(a.que.length && !!data.user.csrf_token && !a.isRunning && a.que[0].enabled && a.que[0].timeStamp<=Date.now() && !a.que[0].finished){
			a.que[0].running = true;
			a.que[0].status = 'Working on it...'
			a.isRunning = a.que[0].uni;
			update();
			a.section[a.que[0].section](a.que[0], function(e){
				console.log('finished')
				e.running = false;
				a.isRunning = !1;
				if(!e.settings.frequency) e.finished = true;
				if(e.settings.frequency) e.timeStamp+=e.settings.frequency*60*60*1000;
				setTimeout(function() {
					a.init();
				}, 1000);
			})
			a.tries = 0;
			// var r = random(0, (tasks.length-1));
			// a.section[tasks[r].section](tasks[r]);
		}else{
			if(a.tries > 14){
				a.resetOuts();
				return;
			}
			a.tries++;
			timer(function() {
				a.init()
			}, 60000);
		}


	}
}
