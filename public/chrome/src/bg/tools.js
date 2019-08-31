var forceTimes = 0;
jax = function(e){
  var aj = $.ajax(e);
  a.requests.push(aj)
  return aj;
}
var _Fail = function(cb, res){
  cb&&cb(!1)
  a.tries++;
  if(a.tries > 1){
    if(res.status == 403) data.user.rateLimit = 'soft';
    if(res.status == 400) data.user.rateLimit = 'hard';
    a.resetOuts();
    return;
  }
}
function sortData(data, type){
  function trashData(e){
      delete e.edge_media_to_comment;
      delete e.edge_media_preview_comment;
      delete e.attribution;
      delete e.accessibility_caption;
      delete e.dimensions;
      delete e.location;
      delete e.tracking_token;
      delete e.media_preview;
      delete e.thumbnail_resources;
      if(e.display_resources && e.display_resources.length) e.display_resources = [e.display_resources.shift()];

      return e;
  }
  if(Array.isArray(data)){
    return data.map(e=>trashData(e))
  }else{
    return trashData(data)
  }
}
a.tool = {
  likeIt: function(post, cb){
    forceTimes = 0;
    if(!a.rss.filter(e=>e.type=='like').some((e)=>e.value.id==post.id))
      jax({
          url: 'https://www.instagram.com/web/likes/'+post.id+'/like/',
          type: 'post',
          headers: {
            'x-csrftoken': data.user.csrf_token,
            'x-instagram-ajax': '1'
          }
      }).fail(e=>_Fail(cb, e)).done((e)=>{
        a.rss.push({type: 'like', value: sortData(post)}) 
        cb&&cb(!0)
      })
  },
  followIt: function(user, cb){
    forceTimes = 0;
    if(!a.rss.filter(e=>e.type=='follow').some((e)=>e.value.id==user.id))
      jax({
        url: 'https://www.instagram.com/web/friendships/'+user.id+'/follow/',
        method: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('x-csrftoken', data.user.csrf_token);
            xhr.setRequestHeader('x-instagram-ajax', '1');
        }
      }).fail(e=>_Fail(cb, e)).done((e)=>{
        a.rss.push({type: 'follow', value: user}) 
        cb&&cb(!0)
      })
  },
  unfollowIt: function(user, cb){
    forceTimes = 0;
    if(!a.rss.filter(e=>e.type=='unfollow').some((e)=>e.value.id==user.id))
      jax({
        url: 'https://www.instagram.com/web/friendships/' + user.id + '/unfollow/',
        method: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('x-csrftoken', data.user.csrf_token);
            xhr.setRequestHeader('x-instagram-ajax', '1');
        }
      }).fail(e=>_Fail(cb, e)).done((e)=>{
        a.rss.push({type: 'unfollow', value: user}) 
        cb&&cb(!0)
      })
  },
  commentIt: function(post, comment, cb){
    forceTimes = 0;
    if(!a.rss.filter(e=>e.type=='comment').some((e)=>e.value.id==post.id))
      jax({
        url: 'https://www.instagram.com/web/comments/'+post.id+'/add/',
        method: 'POST',
        data: {
          'comment_text': comment, 
          'replied_to_comment_id': ''
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader('x-csrftoken', data.user.csrf_token);
            xhr.setRequestHeader('x-instagram-ajax', '1');
        }
      }).fail(e=>_Fail(cb, e)).done((e)=>{
        a.rss.push({type: 'comment', value: sortData(post), comment: comment}) 
        cb&&cb(!0)
      })
  },
  likeComments: function(post, count, cb){
    a.tool.getCommentators({post: post}, function(e){
      e && e.node && e.nodes.slice(0, count).forEach((e, index)=>{
        setTimeout(function() {
          jax({
              url: 'https://www.instagram.com/web/comments/like/'+e.id+'/',
              type: 'post',
              headers: {
                'x-csrftoken': data.user.csrf_token,
                'x-instagram-ajax': '1'
              }
          }).fail(e=>_Fail(cb, e))
        }, 160*index);
      })
      cb&&cb(!0)
    })
  },
  watchUserStory: function(user, cb){

  },
  getPost: function(id, cb){
    var jsonvars = {
      shortcode: id, 
      child_comment_count: 3,
      fetch_comment_count: 40,
      parent_comment_count: 24,
      has_threaded_comments: false
    }
    var urljsonvars = JSON.stringify(jsonvars);
    jax('https://www.instagram.com/graphql/query/?query_hash=477b65a610463740ccdb83135b2014db&variables='+encodeURIComponent(urljsonvars))
    .fail(e=>_Fail(cb)).done(e=>e.status=="ok"?cb(sortData(e.data.shortcode_media)):_Fail(cb));
  },
  getRecentHashtags: function(tag, cb){
    jax('https://www.instagram.com/explore/tags/'+tag+'/?__a=1').done(function(e){
      cb(catcher(function(){
        return sortData(e.graphql.hashtag.edge_hashtag_to_media.edges.map(t=>t.node));
      }))
    }).fail(a.init.bind(!1))
  },
  getHashtag: function(e, cb){
    a.tool.search(e.name, function(res){
      if(!res && !res.hashtags.length){
        cb([])
        return;
      }
      var collection = [];
      var get = function(after, id){
        if (typeof after != 'string') after = '';
        var jsonvars = {
          "tag_name": res.hashtags[0].hashtag.name,
          "id": id,
          "first": 12
        }
        if (after != '') {
            jsonvars.after = after;
        }
        var urljsonvars = JSON.stringify(jsonvars);
        var url = 'https://www.instagram.com/graphql/query/?query_hash=f92f56d47dc7a55b606908374b43a314&variables=' + encodeURIComponent(urljsonvars);
        if(!after){
          url = 'https://www.instagram.com/explore/tags/'+res.hashtags[0].hashtag.name+'/?__a=1';
        }
        jax(url)
        .fail(e=>{
          cb(sortData(collection.slice(0, e.count)));
        })
        .done(data=>{
          if(!after){
            if(data && data.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page && collection.length < e.count){
              collection.push(...data.graphql.hashtag.edge_hashtag_to_media.edges.map(t=>t.node));
              get(data.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor, data.graphql.hashtag.id)
            }else{
              cb(sortData(collection.slice(0, e.count)));
            }
          }else{
            if(data.status=="ok"){
              collection.push(...data.data.hashtag.edge_hashtag_to_media.edges.map(t=>t.node))
              if(data.data.hashtag.edge_hashtag_to_media.page_info.has_next_page && collection.length < e.count){
                get(data.data.hashtag.edge_hashtag_to_media.page_info.end_cursor, id)
              }else{
                cb(sortData(collection.slice(0, e.count)));
              }
            }else{
              cb(sortData(collection.slice(0, e.count)));
            }
            // e.status=="ok"?cb(e.data.user.edge_web_feed_timeline.edges.map(t=>t.node)):cb(collection)
          }
        });
        

      }
      get()
      // jax('https://www.instagram.com/explore/locations/'+res.places[0].place.location.pk+'/'+res.places[0].place.location.name+'/?__a=1')
    });
  },
  getRecentLocations: function(tag, cb) {
    jax('https://www.instagram.com/explore/tags/'+tag+'/?__a=1').done(function(e){
      cb(catcher(function(){
        return sortData(e.graphql.hashtag.edge_hashtag_to_media.edges.map(t=>t.node));
      }))
    }).fail(a.init.bind(!1))

  },
  getLocation: function(e, cb){
    a.tool.search(e.name, function(res){
      if(!res && !res.places.length){
        cb([])
        return;
      }
      var collection = [];
      var get = function(after, id){
        if (typeof after != 'string') after = '';
        var jsonvars = {
          "id": id,
          "first": 12
        }
        if (after != '') {
            jsonvars.after = after;
        }
        var urljsonvars = JSON.stringify(jsonvars);
        var url = 'https://www.instagram.com/graphql/query/?query_hash=1b84447a4d8b6d6d0426fefb34514485&variables=' + encodeURIComponent(urljsonvars);
        if(!after){
          url = 'https://www.instagram.com/explore/locations/'+res.places[0].place.location.pk+'/'+res.places[0].place.slug+'/?__a=1';
        }
        jax(url)
        .fail(e=>{
          cb(sortData(collection.slice(0, e.count)));
        })
        .done(data=>{
          if(!after){
            if(data && data.graphql.location.edge_location_to_media.page_info.has_next_page && collection.length < e.count){
              collection.push(...data.graphql.location.edge_location_to_media.edges.map(t=>t.node));
              get(data.graphql.location.edge_location_to_media.page_info.end_cursor, data.graphql.location.id)
            }else{
              cb(sortData(collection.slice(0, e.count)));
            }
          }else{
            if(data.status=="ok"){
              collection.push(...data.data.location.edge_location_to_media.edges.map(t=>t.node))
              if(data.data.location.edge_location_to_media.page_info.has_next_page && collection.length < e.count){
                get(data.data.location.edge_location_to_media.page_info.end_cursor, id)
              }else{
                cb(sortData(collection.slice(0, e.count)));
              }
            }else{
              cb(sortData(collection.slice(0, e.count)));
            }
            // e.status=="ok"?cb(e.data.user.edge_web_feed_timeline.edges.map(t=>t.node)):cb(collection)
          }
        });
        

      }
      get()
      // jax('https://www.instagram.com/explore/locations/'+res.places[0].place.location.pk+'/'+res.places[0].place.location.name+'/?__a=1')
    });
  },
  getFeed: function(after, cb) {
    if (typeof after != 'string') after = '';
    var jsonvars = {
      "fetch_media_item_count": 24,
      "fetch_comment_count": 4,
      "fetch_like": 10,
      "has_stories": false
    }
    if (after != '') {
        jsonvars.fetch_media_item_cursor = after;
    }
    var urljsonvars = JSON.stringify(jsonvars);
    var url = 'https://www.instagram.com/graphql/query/?query_hash=615767824d774172a86e99cbaca97512&variables=' + encodeURIComponent(urljsonvars);
    jax(url).fail(e=>cb(!1)).done(e=>e.status=="ok"?cb(e.data.user.edge_web_feed_timeline.edges.map(t=>t.node), e.data.user.edge_web_feed_timeline.page_info.end_cursor):cb(!1));
  },
  myFeed: function(e, cb){
    console.log('myFeed')
    var collected = [];
    var load = (af)=>{
      var goNext = false;
      if(e.count>collected.length){
        a.tool.getFeed(af, (response, after)=>{
          if(response){
            goNext = true;
            collected.push(...response);
            load(after);
          }else{
            cb(sortData(collected.slice(0, e.count)))
          }
        })
      }else{
        cb(sortData(collected.slice(0, e.count)))
      }
    }
    load('');
  },
  search: function(tag, cb){
    jax('https://www.instagram.com/web/search/topsearch/?context=blended&query='+tag+'&rank_token=0.806776188138403&include_reel=true').done(function(e){
      cb(catcher(function(){
        if(e.status == 'ok'){
          return e;
        }else{
          return !1;
        }
      }))
    }).fail(a.init.bind(!1))
  },
  getUser: function(user, cb){
    jax('https://www.instagram.com/'+user.replace('@', '')+'/?__a=1').done((e)=>{
      catcher(()=>{
        return e.graphql.user;
      })?cb(e.graphql.user):_Fail(cb, {})
    }).fail(()=>{_Fail(cb, {})})
  },
  getUserPosts: function(data, cb){
    a.tool.getUser(data.name, (response)=>{
      if(response && response.edge_owner_to_timeline_media){
        cb(sortData(response.edge_owner_to_timeline_media.edges.map(t=>t.node).slice(0, data.count)));
      }else{
        cb([])
      }
    })
  },
  getFollowers: function(e, cb){
    var jsonvars = {
        id: e.id.toString(),
        first: 48
    }
    if (typeof e.after == 'string' && e.after != '') {
      jsonvars.after = e.after;
    }else{
      jsonvars.after = '';
    }
    var urljsonvars = JSON.stringify(jsonvars);
    var url = 'https://www.instagram.com/graphql/query/?query_hash=37479f2b8209594dde7facb0d904896a&variables=' + encodeURIComponent(urljsonvars);
    if (e.after != '') {
        url = url + '&after=' + e.after;
    }
    $.ajax(url).done(function(e){
      console.log(e)
      if(e.status == 'ok'){
        cb({page_info: e.data.user.edge_followed_by.page_info, nodes: e.data.user.edge_followed_by.edges.map((t)=>{
          t.node.checked = !0;
          return t.node;
        })})
      }else{
        cb([])
      }
    }).fail(()=>{_Fail(cb, [])})
  },
  getFollowings: function(e, cb){
    var jsonvars = {
        id: e.id.toString(),
        first: 48
    }
    if (typeof e.after == 'string' && e.after != '') {
      jsonvars.after = e.after;
    }else{
      jsonvars.after = '';
    }
    var urljsonvars = JSON.stringify(jsonvars);
    var url = 'https://www.instagram.com/graphql/query/?query_hash=58712303d941c6855d4e888c5f0cd22f&variables=' + encodeURIComponent(urljsonvars);
    $.ajax(url).done(function(e){
      console.log(e)
      if(e.status == 'ok'){
        cb({page_info: e.data.user.edge_follow.page_info, nodes: e.data.user.edge_follow.edges.map((t)=>{
          t.node.checked = !0;
          return t.node;
        })})
      }else{
        cb([])
      }
    }).fail(()=>{_Fail(cb, [])})
  },
  getFollowersStories: function(e, cb){
    var jsonvars = {
        id: e.id.toString(),
        include_reel: true,
        first: 48
    }
    if (typeof e.after == 'string' && e.after != '') {
      jsonvars.after = e.after;
    }else{
      jsonvars.after = '';
    }
    var urljsonvars = JSON.stringify(jsonvars);
    var url = 'https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=' + encodeURIComponent(urljsonvars);
    if (e.after != '') {
        url = url + '&after=' + e.after;
    }
    $.ajax(url).done(function(e){
      console.log(e)
      if(e.status == 'ok'){
        cb({page_info: e.data.user.edge_followed_by.page_info, nodes: e.data.user.edge_followed_by.edges.map((t)=>{
          t.node.checked = !0;
          return t.node;
        }).filter(e=>{
          if(!e.reel || !e.reel.expiring_at) return false;
          return ((Date.now()/1000/60/60 - e.reel.expiring_at/60/60) < 23)
        }) })
      }else{
        cb([])
      }
    }).fail(()=>{_Fail(cb, [])})
  },
  getCommentators: function(e, cb){
    var query_hash = '477b65a610463740ccdb83135b2014db';
    var jsonvars = {
        shortcode: e.post.shortcode,
        child_comment_count:3,
        fetch_comment_count:40, 
        parent_comment_count:24,
        has_threaded_comments:true,
        first: 48
    }
    if (typeof e.after == 'string' && e.after != '') {
      jsonvars.after = e.after;
      jsonvars.first = 12;
      delete jsonvars.child_comment_count;
      delete jsonvars.fetch_comment_count;
      delete jsonvars.parent_comment_count;
      delete jsonvars.has_threaded_comments;
      query_hash = '97b41c52301f77ce508f55e66d17620e';
    }else{
      jsonvars.after = '';
    }
    var urljsonvars = JSON.stringify(jsonvars);
    var url = 'https://www.instagram.com/graphql/query/?query_hash='+query_hash+'&variables=' + encodeURIComponent(urljsonvars);
    $.ajax(url).done(function(e){
      if(e.status == 'ok'){
        cb({page_info: e.data.shortcode_media.edge_media_to_parent_comment.page_info, nodes: e.data.shortcode_media.edge_media_to_parent_comment.edges.map((t)=>{
          t.node.owner.checked = !0;
          return t.node;
        })})
      }else{
        cb([])
      }
    }).fail(()=>{_Fail(cb, [])})
  },
  getRequestsList: function(e, cb){
    jax('https://www.instagram.com/accounts/activity/?__a=1&include_reel=true').done(function(e){
      if(e && e.graphql && e.graphql.user && e.graphql.user.edge_follow_requests){
        cb(e.graphql.user.edge_follow_requests.edges.map(t=>t.node))
      }else{
        cb([])
      }
    }).fail(()=>{_Fail(cb, [])})
  },
  approve: function(e, cb){
    jax({
      url: `https://www.instagram.com/web/friendships/${e.id}/approve/`,
      type: 'post',
      headers: {
        'x-csrftoken': data.user.csrf_token,
        'x-instagram-ajax': '1'
      }
    }).done(function(e){
      console.log(e)
    }).fail(()=>{_Fail(cb)})
  }
}
