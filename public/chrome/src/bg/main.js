var a = {
	query: [],
	timeouts: [],
	requests: [],
	sleepTime: 0,
	switchTask: 0,
	tries: 0,
	type: {
		hashtag: function(e){
			a.switchTask = 0;
			var arr = shuffle(e.textarea.trim().split(/[#;,\n]/igm).filter(n => n).map(n=>n.replace(/\s/g, '')));
			console.log(arr)
			var countLimit = (data.user.limitTo-data.feed.length)/arr.length;
			var likeIt = function(tag, limit, cb){

				if(!tag){
					console.log('finished');
					a.init();
					return;
				}

				if(data.tasks.length > 1 && a.switchTask > 3){
					a.init()
				}
				a.switchTask++;

				if(a.sleepTime && data.feed.length > 50){
					a.sleepTime=0;
					let r = random(180000, 900000);
					data.status = 'sleeping for '+(Math.round(r/1000/60))+' mins';
					timer(likeIt.bind(null, ...arguments), r);
					return;
				}else{
					a.sleepTime++;
				}


				// tag = tag.replace(/\s/g, '');
				a.tool.getRecentTags(tag, function(items){
					items.filter(e=>!e.node.is_video);
					var liking = function(){
						data.status = 'liking: #'+tag;
						if(data.feed.length >= data.user.limitTo) return a.init();
						timer(function() {
							var nextPost = items.shift();
							if(Math.random()>0.75) items.shift();
							a.tool.likeIt(nextPost.node.id, function(res){
								if(res){
									limit--;
									data.feed.push(nextPost.node);
									update();
								}
								(!limit||!items.length)?likeIt(arr.pop(), random(countLimit*0.8, countLimit*1.2)):liking()
							});
						}, random(5000, 12000));
					}
					liking()
				});
			}
			likeIt(arr.pop(), random(countLimit*0.8, countLimit*1.2));
		},
		feed: function(e) {
			a.switchTask = 0;

			var limit = random(10, 40);

			if(a.sleepTime && data.feed.length > 50){
				a.sleepTime=0;
				let r = random(180000, 900000);
				data.status = 'sleeping for '+(Math.round(r/1000/60))+' mins';
				timer(a.init, r);
				return;
			}else{
				a.sleepTime++;
			}


			var getNextInFeed = function() {
				var next = false;
				a.myFeed.posts.some(function(e) {
					if(!e.node.viewer_has_liked){
						next = e;
						return true;
					}
				})
				return next;
			}

			var liking = function(){
				data.status = 'liking my feed';
				limit--;
				if(data.feed.length >= data.user.limitTo) return a.init();
				timer(function() {
					catcher(function(){
						if(Math.random()>0.75) getNextInFeed().viewer_has_liked = !0;
					})
					var nextPost = getNextInFeed();
					if(!nextPost){
						a.tool.getFeed(function(){
							liking();
						})
						return;
					}
					a.tool.likeIt(nextPost.node.id, function(res){
						if(res){
							limit--;
							nextPost.node.viewer_has_liked = !0
							console.log(nextPost);
							data.feed.push(nextPost.node);
							update();
						}
						!limit?a.init():liking()
					});
				}, random(5000, 12000));
			}

			liking()

		},
		location: function(e) {
			a.switchTask = 0;
			var arr = shuffle(e.textarea.trim().split(/[#;,\n]/igm).filter(n => n));
			console.log(arr)
			var countLimit = (data.user.limitTo-data.feed.length)/arr.length;
			var likeIt = function(tag, limit, cb){

				if(!tag){
					console.log('finished');
					a.init();
					return;
				}

				if(data.tasks.length > 1 && a.switchTask > 3){
					a.init()
				}
				a.switchTask++;

				if(a.sleepTime && data.feed.length > 50){
					a.sleepTime=0;
					let r = random(180000, 900000);
					data.status = 'sleeping for '+(Math.round(r/1000/60))+' mins';
					timer(likeIt.bind(null, ...arguments), r);
					return;
				}else{
					a.sleepTime++;
				}


				a.tool.search(tag, function(res) {
					data.status = 'liking: '+res.short_name;
					a.tool.getRecentLocations(res, function(items){
						var liking = function(){
							if(data.feed.length >= data.user.limitTo) return a.init();
							timer(function() {
								var nextPost = items.shift();
								if(Math.random()>0.75) items.shift();
								a.tool.likeIt(nextPost.node.id, function(res){
									if(res){
										limit--;
										data.feed.push(nextPost.node);
										update();
									}
									(!limit||!items.length)?likeIt(arr.pop(), random(countLimit*0.8, countLimit*1.2)):liking()
								});
							}, random(5000, 12000));
						}
						liking()
					});
				})

			}
			likeIt(arr.pop(), random(countLimit*0.8, countLimit*1.2));
		}
	},
	readyUp: function(){
		console.log('readyUp');
		$.get('https://www.instagram.com')
		.fail((e)=>{setTimeout(a.readyUp, random(5000, 15000)); changeAcc();})
		.done(function(e){
			var p = $('<div/>').append(e)
			var p = p.find('script').map(function(el){
				if( $(this).html().includes('window._sharedData = ')){
					var e = JSON.parse( $(this).html().replace('window._sharedData = ', '').slice(0, -1) ) ;
					catcher(function(){
						data.user.csrf_token = e.config.csrf_token
						data.user.username = e.config.viewer.username
						data.user.id = e.config.viewer.id
					})!==!1?0:data.user.username=!1;
					if(!data.user.username){
						setTimeout(a.readyUp, random(15000, 40000))
					}
				}
				if( $(this).html().includes("window.__additionalDataLoaded('feed',")){
					var e = JSON.parse( $(this).html().replace("window.__additionalDataLoaded('feed',", "").slice(0, -2) ) ;
					console.log(e)
					data.user.pic = e.user.profile_pic_url;
					a.myFeed = {
						end_cursor: e.user.edge_web_feed_timeline.page_info.end_cursor,
						posts: e.user.edge_web_feed_timeline.edges
					}
				}
				// if( this.src.indexOf('dles/base/FeedPageContainer.js/') != -1 ){
				// 	return new Promise((res)=>{
				// 		$.get('https://www.instagram.com'+$(this).attr('src'))
				// 		.done(function(e){
				// 			data.user.comments = e.split('pagination},queryId:"')[1].split('"')[0]
				// 			res()
				// 		})
				// 	})
				// }
				console.log($(this).attr('src'));
				if( this.src.indexOf('/ConsumerCommons.js/') != -1 ){
					return new Promise((res)=>{
						$.get('https://www.instagram.com'+$(this).attr('src'))
						.done(function(e){
							// data.user.following = e.split('",l="')[1].split('"')[0]
							data.user.followers = e.split(';const t="')[1].split('"')[0]
							// data.user.post =  e.split('),b="')[1].split('"')[0];
							res()
						})
					})
				}
				// if( this.src.indexOf('ndles/base/ConsumerCommons.js/') != -1 ){
				// 	return new Promise((res)=>{
				// 		$.get('https://www.instagram.com'+$(this).attr('src'))
				// 		.done(function(e){
				// 			data.user.feed = e.split('c,u="')[1].split('"')[0];
				// 			res()
				// 		})
				// 	})
				// }
			}).toArray()
			p.reduce(  (prev, next)=>{return prev.then(next)}, Promise.resolve([])  ).then(function(){
				chrome.cookies.getAll({url: 'https://www.instagram.com'}, function(e){
					var cock = '';
					e.forEach(t=>{
						cock += t.name+'='+t.value+'; ';
					})
					data.user.cookies = cock;
					a.init()
				})
			});

		});
	},
	section: {
		target: function(e){
			// if(e.finished){
			// 	setTimeout(function() {
			// 		a.init();
			// 	}, 1000);
			// 	return;
			// }
			// if(!e.isPrepared){
			// 	e.finished = false;
			// 	e.collectedPosts = [];
			// 	console.log(1311111111);
			// 	var calls = $.ajax();
			// 	var i = 1;
			// 	e.accounts.forEach((t)=>{
			// 		calls = calls.then(()=>{
			// 			return a.tool.getUser(t.username, function(res){
			// 				res&&e.collectedPosts.push(...res.edge_owner_to_timeline_media.edges.map(e=>e.node))
			// 				console.log('posts collected for '+t.username);
			// 				i++;
			// 				if(e.accounts.length == i){
			// 					e.isPrepared = !0;
			// 					console.log('finished');
			// 					update();
			// 					a.init();
			// 				}
			// 			})
			// 		})
			// 	})
			// }else{
			// 	var calls = $.ajax();
			// 	e.collectedPosts.forEach((t)=>{
			// 		calls = calls.then(()=>{
			// 			return a.tool.likeIt(t.id, function(res){
			// 				if(Math.random()>0.65){
			// 					e.collectedPosts.shift();
			// 					e.collectedPosts.shift();
			// 				}
			// 				e.collectedPosts.shift();
			// 				console.log('liked one of posts on @'+t.owner.username);
			// 				if(!e.accounts.length){
			// 					e.finished = !0;
			// 					update();
			// 					a.init();
			// 				}
			// 			})
			// 		})
			// 	})
			// }
		},
		feed: function(e){

		},
		unfollow: function(e){

		},
		locations: function(e){

		},
		hashtags: function(e){
			
		}
	},
	init: function(){
		console.log('nit');
		a.timeouts.forEach(clearTimeout)
		a.requests.forEach(e=>e.abort())
		a.timeouts = []
		a.requests = []

		// if(a.tries > 1){
		// 	return;
		// }
		a.tries++;
		if(!data.user.username){
			a.readyUp()
			return;
		}
		console.log('started');
		// a.tool.getUser('_mavlon_oo7', function(e){
		// 	console.log(e)
		//   // a.tool.getFollowers(e.id, function(v){
		//   //   console.log(v);
		//   // })
		// })

		var tasks = data.userData.tasks.filter(e=>e.enabled);
		if(tasks.length && !!data.user.username){
			var r = random(0, (tasks.length-1));
			a.section[tasks[r].section](tasks[r]);
		}else{
			timer(function() {
				a.init()
			}, 60000);
		}
	}
}
