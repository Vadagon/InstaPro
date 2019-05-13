jax = function(e){
  var aj = $.ajax(e);
  a.requests.push(aj)
  return aj;
}
var _Fail = function(cb){
  cb&&cb(!1)
  a.tries++;
  if(a.tries > 4){
    a.resetOuts();
    return;
  }
}
a.tool = {
  likeIt: function(post, cb){
    console.log('like')
    jax({
        url: 'https://www.instagram.com/web/likes/'+post.id+'/like/',
        type: 'post',
        headers: {
          'x-csrftoken': data.user.csrf_token,
          'x-instagram-ajax': '1'
        }
    }).fail(e=>_Fail(cb)).done((e)=>{
      a.rss.push({type: 'like', value: post}) 
      cb&&cb(!0)
    })
  },
  followIt: function(user, cb){
    jax({
      url: 'https://www.instagram.com/web/friendships/'+user.id+'/follow/',
      method: 'POST',
      beforeSend: function(xhr) {
          xhr.setRequestHeader('x-csrftoken', data.user.csrf_token);
          xhr.setRequestHeader('x-instagram-ajax', '1');
      }
    }).fail(e=>_Fail(cb)).done((e)=>{
      a.rss.push({type: 'follow', value: user}) 
      cb&&cb(!0)
    })
  },
  unfollowIt: function(user, cb){
    jax({
      url: 'https://www.instagram.com/web/friendships/' + user.id + '/unfollow/',
      method: 'POST',
      beforeSend: function(xhr) {
          xhr.setRequestHeader('x-csrftoken', data.user.csrf_token);
          xhr.setRequestHeader('x-instagram-ajax', '1');
      }
    }).fail(e=>_Fail(cb)).done((e)=>{
      a.rss.push({type: 'unfollow', value: user}) 
      cb&&cb(!0)
    })
  },
  commentIt: function(post, comment, cb){
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
    }).fail(e=>_Fail(cb)).done((e)=>{
      a.rss.push({type: 'comment', value: post, comment: comment}) 
      cb&&cb(!0)
    })
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
    .fail(e=>_Fail(cb)).done(e=>e.status=="ok"?cb(e.data.shortcode_media):_Fail(cb));
  },
  getRecentHashtags: function(tag, cb){
    jax('https://www.instagram.com/explore/tags/'+tag+'/?__a=1').done(function(e){
      cb(catcher(function(){
        return e.graphql.hashtag.edge_hashtag_to_media.edges.map(t=>t.node);
      }))
    }).fail(a.init.bind(!1))
  },
  getRecentLocations: function(tag, cb) {
    jax('https://www.instagram.com/explore/tags/'+tag+'/?__a=1').done(function(e){
      cb(catcher(function(){
        return e.graphql.hashtag.edge_hashtag_to_media.edges.map(t=>t.node);
      }))
    }).fail(a.init.bind(!1))

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
    jax(url).fail(e=>cb(!1)).done(e=>e.status=="ok"?cb(e.data.user.edge_web_feed_timeline.edges.map(t=>t.node)):cb(!1));
  },
  // search: function(tag, cb){
  //   jax('https://www.instagram.com/web/search/topsearch/?context=blended&query='+tag+'&rank_token=0.806776188138403&include_reel=true').done(function(e){
  //     cb(catcher(function(){
  //       console.log(e);
  //       return e.places[0].place.location;
  //     }))
  //   }).fail(a.init.bind(!1))
  // },
  getUser: function(user, cb){
    jax('https://www.instagram.com/'+user.replace('@', '')+'/?__a=1').done((e)=>{
      catcher(()=>{
        return e.graphql.user;
      })?cb(e.graphql.user):_Fail(cb)
    }).fail(()=>{_Fail(cb)})
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
    jax(url).done(function(e){
      console.log(e)
      if(e.status == 'ok'){
        cb({page_info: e.data.user.edge_followed_by.page_info, nodes: e.data.user.edge_followed_by.edges.map((t)=>{
          t.node.checked = !0;
          return t.node;
        })})
      }
    }).fail((e)=>{cb(!1)})
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
    jax(url).done(function(e){
      console.log(e)
      if(e.status == 'ok'){
        cb({page_info: e.data.user.edge_follow.page_info, nodes: e.data.user.edge_follow.edges.map((t)=>{
          t.node.checked = !0;
          return t.node;
        })})
      }
    }).fail((e)=>{cb(!1)})
  }
}
