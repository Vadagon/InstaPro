var s, pathname = !1,
a = {
	tools: {
		isExist: function(category){
			return s.pool.units[category].some(function(e){
				return pathname == e.pathname
			})
		}
	},
	append: function(e){
		$('#followerPotato').remove()
		if(e){
			$('body').last().append(`
				<div id="followerPotato">`+
					(function(array){
						var str = '';
						array.forEach(function(el, index){
							str += `<button data-path="${el[1]}" data-data="${el[2]}"}>${el[0]+el[2]}</button>`;
						})
						return str;
					})(e)
				+`</div>
			`);
			$('#followerPotato button:not(.red)').on('click', function(event){
					console.log('clicked')
					chrome.extension.sendMessage({why: 'openPage', value: `#/${$(this).data('path')}?injectData=${$(this).data('data')}`})
			});
		}
	},
	url: function(){
		var href = location.pathname;
		var state = false;
		if(href.length > 1) state = [ ['Target: @', 'target', href.split('/')[1]] ];
		if(href.indexOf('/p/') != -1) state = false;
		if(href.indexOf('explore/tags') != -1) state = [ ['Collect posts from #', 'hashtags', href.split('explore/tags/')[1].replace('/', '')] ];
		if(href.indexOf('explore/locations') != -1) state = [ ['Collect posts from ', 'locations', href.split('explore/locations/')[1].split('/')[1]] ];
		console.log(href, state)
		return state;
	},
	init: function(){

		setInterval(function() {
			if(pathname != location.pathname){
				pathname = location.pathname
				a.append(a.url())
			}
		}, 400);

	}
}

a.init()