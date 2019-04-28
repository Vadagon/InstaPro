var a = {
	que: [],
	isRunning: !1,
	rss: [],
	timeouts: [],
	requests: [],
	sleepTime: 0,
	switchTask: 0,
	tries: 0,
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
						t.finished = true;
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
			if(!e.collectedPosts){
				e.collectedPosts = [];	
			}
			console.log(e.accounts, e.collectedPosts)
			if(!second){
				if(e.accounts.length != e.collectedPosts.length){
					e.collectedPosts = [];
				}
				var i = 0;
				var Action = function(){
					timer(function() {
						a.tool.getUser(e.accounts[i].username, function(res){
							res&&e.type!='follow'&&e.collectedPosts.push(...res.edge_owner_to_timeline_media.edges.slice(0, e.settings.amount).map(e=>e.node))
							res&&e.type=='follow'&&a.tool.followIt(e.accounts[i])
							update();
							i++;
							e.accounts.length>i?Action():a.section.target(e, cb, true);
						})
					}, random(900, 14000));
				}
				Action();
			}else if(e.type!='follow'){
				var Action = function(){
					console.log(e)
					timer(function() {
						if(e.type=='like'){
							a.tool.likeIt(e.collectedPosts.shift())
						}
						if(e.type=='comment'){
							a.tool.commentIt(e.collectedPosts.shift(), e.comments[random(0, e.comments.length-1)])
						}
						if(Math.random() > 0.67) e.collectedPosts.shift();
						e.collectedPosts.length?Action():cb(e);
					}, random(900, 14000));
				}
				Action();
			}else{
				console.log('target finished')
				e.finished = !0;
				cb(e)
			}
		},
		feed: function(e, cb){
			a.tool.getFeed('', function(data){
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
						if(Math.random() > 0.67) data.shift();
						data.length?Action():cb(e);
					}, random(900, 14000));
				}
				Action();
			})
		},
		unfollow: function(e, cb){
			var Action = function(){
				timer(function() {
					a.tool.unfollowIt(e.accounts.shift())
					if(Math.random() > 0.67) e.accounts.shift();
					e.accounts.length?Action():cb(e);
				}, random(900, 14000));
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
						if(Math.random() > 0.67) data.shift();
						data.length?Action():cb(e);
					}, random(900, 14000));
				}
				Action();
			})
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
				t.finished = true;
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
		tasks = tasks.filter(e=>!e.draft).filter(e=>e.enabled).filter(e=>!e.finished).filter(e=>!e.running);
		// tasks = tasks.filter(e=>e.section=='target');
		var stopApp = a.isRunning?!0:!1;
		tasks.forEach((t, index)=>{
			if(!t.settings.frequency || !t.timeStamp){
				t.timeStamp=Date.now()
			}else{
				if(Date.now()-t.timeStamp>t.settings.frequency*60*60*1000){
					t.timeStamp=Date.now()
				}else{
					t.timeStamp+=t.settings.frequency*60*60*1000;
				}
			}
			if(t.uni == a.isRunning){
				stopApp = false;
			}
		});
		if(stopApp){
			a.resetOuts()
		}
		a.que = tasks.sort(function(a, b){return a.timeStamp - b.timeStamp});
		console.log(tasks, a.que)
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
		if(a.que.length && !!data.user.csrf_token && !a.isRunning && a.que[0].timeStamp<=Date.now()){
			var qq = a.que.shift();
			qq.running = true;
			a.isRunning = qq.uni;
			a.section[qq.section](qq, function(e){
				console.log('finished')
				e.running = false;
				a.isRunning = !1;
				if(!e.settings.frequency) e.finished = true;
				a.init();
			})
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
