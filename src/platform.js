var api
if (process.env.NODE_ENV === 'development') {
  window.storage = document.storage = window.localStorage
  api = window.api = {
    storage: {
      local: {
        get: function (e, cb) {
          var e1 = e.map(d => {
            return catcher(function () {
              return JSON.parse(storage.getItem(d))
            })
          })
          var e2 = {}
          e1.forEach((v, n) => {
            e2[e[n]] = v
          })
          cb(e2)
        },
        set: function (e) {
          console.log('updated')
          storage.setItem(Object.keys(e)[0], JSON.stringify(e[Object.keys(e)[0]]))
        }
      }
    },
    runtime: {
      sendMessage: function (data, cb) {
        cb = cb || function () {}
        api.runtime.sendMessageListeners.forEach(fn => { fn(data, 'compatible', cb) })
      },
      sendMessageListeners: []
    },
    extension: {
      onMessage: {
        addListener: function (fn) {
          api.runtime.sendMessageListeners.push(fn)
        }
      }
    },
    webRequest: {
      onBeforeSendHeaders: {
        addListener: function () {

        }
      }
    },
    identity: {
      getProfileUserInfo: function (cb) {
        cb({})
      }
    }
  }
  api.sendMessage = api.runtime.sendMessage

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

  api.storage.local.get(['data'], function (items) {
    console.log(items)
    if (items.data) {
      data = items.data
    } else {
      update()
    }
  })

  function update () {
    api.storage.local.set({ data: data })
  }
 var postsCB = [{ 'comments_disabled': false, 'id': '2042590553115474065', 'edge_media_to_caption': { 'edges': [{ 'node': { 'text': 'Dinner time and I deserve for working to much😊😊😊❤' } }] }, 'shortcode': 'BxYvUk0BDiR', 'edge_media_to_comment': { 'count': 0 }, 'taken_at_timestamp': 1557715790, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/c73949abad77a5c13f0ecfeebb66ded9/5D5DAC16/t51.2885-15/e35/58411060_137795900638173_632585699513047713_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 4 }, 'edge_media_preview_like': { 'count': 4 }, 'owner': { 'id': '6721480332' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/245e1b8f21907666acf645b12c061a40/5D576765/t51.2885-15/sh0.08/e35/s640x640/58411060_137795900638173_632585699513047713_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/eaba7d37ee3a62d3e32f3f1a137ff15f/5D5B6784/t51.2885-15/e35/s150x150/58411060_137795900638173_632585699513047713_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/c1b9dc98870e8cc87a71c6df6665f15c/5D70CD31/t51.2885-15/e35/s240x240/58411060_137795900638173_632585699513047713_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/a72bfc8a0605d9535b2be94760119be3/5D602589/t51.2885-15/e35/s320x320/58411060_137795900638173_632585699513047713_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/171a1184fbd0a991958b59a0f4054bc2/5D686BD5/t51.2885-15/e35/s480x480/58411060_137795900638173_632585699513047713_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/245e1b8f21907666acf645b12c061a40/5D576765/t51.2885-15/sh0.08/e35/s640x640/58411060_137795900638173_632585699513047713_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2042252433175838716', 'edge_media_to_caption': { 'edges': [{ 'node': { 'text': 'Last meal at my favorite sushi place before they close 😢' } }] }, 'shortcode': 'BxXicSFH3_8', 'edge_media_to_comment': { 'count': 0 }, 'taken_at_timestamp': 1557675483, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/27e9049695585d0bee6ef5ebed04965b/5D768031/t51.2885-15/e35/58453699_2344720435768039_1032313332530180906_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 1 }, 'edge_media_preview_like': { 'count': 1 }, 'owner': { 'id': '13510044130' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/f6638d2830779713f85d29e2491d284e/5D61C88B/t51.2885-15/sh0.08/e35/s640x640/58453699_2344720435768039_1032313332530180906_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/fd5f858d62671254519d7758642cae2c/5D67360E/t51.2885-15/e35/s150x150/58453699_2344720435768039_1032313332530180906_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/340f01db8de1fcabcb8bb21b75d1186b/5D57D408/t51.2885-15/e35/s240x240/58453699_2344720435768039_1032313332530180906_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/6fa5bf8e50f73a543d2bfe368fbd0bf0/5D725B76/t51.2885-15/e35/s320x320/58453699_2344720435768039_1032313332530180906_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/ea10acbd5307fd5a3c34ce90b422768b/5D59F231/t51.2885-15/e35/s480x480/58453699_2344720435768039_1032313332530180906_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/f6638d2830779713f85d29e2491d284e/5D61C88B/t51.2885-15/sh0.08/e35/s640x640/58453699_2344720435768039_1032313332530180906_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2041923104671553543', 'edge_media_to_caption': { 'edges': [] }, 'shortcode': 'BxWXj7AnFgH', 'edge_media_to_comment': { 'count': 0 }, 'taken_at_timestamp': 1557636224, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/ee6f328cbba93059979aaad7737c4a18/5D65445C/t51.2885-15/e35/59419275_2168683483216064_92592108750589950_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 9 }, 'edge_media_preview_like': { 'count': 9 }, 'owner': { 'id': '1151778834' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/22e7886cf09990a18fbacd0ae039a96d/5D62BB2F/t51.2885-15/sh0.08/e35/s640x640/59419275_2168683483216064_92592108750589950_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/19edcb160f86f8d2baa8daa713502f97/5D5ADCCE/t51.2885-15/e35/s150x150/59419275_2168683483216064_92592108750589950_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/366dbd0c1a372052bd9b2b4b1515871e/5D57917B/t51.2885-15/e35/s240x240/59419275_2168683483216064_92592108750589950_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/6b0b0578041d47c6e891604422f40d5f/5D7813C3/t51.2885-15/e35/s320x320/59419275_2168683483216064_92592108750589950_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/7d89aa8d51686eeee57c23e10c150eaa/5D6D4A9F/t51.2885-15/e35/s480x480/59419275_2168683483216064_92592108750589950_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/22e7886cf09990a18fbacd0ae039a96d/5D62BB2F/t51.2885-15/sh0.08/e35/s640x640/59419275_2168683483216064_92592108750589950_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2041921489361372032', 'edge_media_to_caption': { 'edges': [] }, 'shortcode': 'BxWXMaonwOA', 'edge_media_to_comment': { 'count': 1 }, 'taken_at_timestamp': 1557636031, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/3c118dc650093de72fadbf26c67aba2d/5D5BD5CA/t51.2885-15/e35/58468865_2395707177140703_4926351487671368683_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 10 }, 'edge_media_preview_like': { 'count': 10 }, 'owner': { 'id': '1151778834' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/8cd94f8f3b66d1f3d85d27eeb80aef78/5D63C270/t51.2885-15/sh0.08/e35/s640x640/58468865_2395707177140703_4926351487671368683_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/b8103346187b3aece2746665b291c50b/5D6221F5/t51.2885-15/e35/s150x150/58468865_2395707177140703_4926351487671368683_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/6725d5bed66c0297b72c09610aa3d37c/5D65F6F3/t51.2885-15/e35/s240x240/58468865_2395707177140703_4926351487671368683_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/5669418dee76bb1a055e7ed6a61ed02d/5D65EA8D/t51.2885-15/e35/s320x320/58468865_2395707177140703_4926351487671368683_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/a9ad265b5a510720a8ea3fddad1d7bb8/5D7555CA/t51.2885-15/e35/s480x480/58468865_2395707177140703_4926351487671368683_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/8cd94f8f3b66d1f3d85d27eeb80aef78/5D63C270/t51.2885-15/sh0.08/e35/s640x640/58468865_2395707177140703_4926351487671368683_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2041913685472882611', 'edge_media_to_caption': { 'edges': [] }, 'shortcode': 'BxWVa2snq-z', 'edge_media_to_comment': { 'count': 5 }, 'taken_at_timestamp': 1557635101, 'dimensions': { 'height': 810, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/f6d33d269344297a134b46f93554a7f3/5D6202EB/t51.2885-15/e35/58410847_136794980723592_6589123587928987023_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 49 }, 'edge_media_preview_like': { 'count': 49 }, 'owner': { 'id': '1151778834' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/3b4e45d1bb6706ce4e4922d47cf5872a/5D52F448/t51.2885-15/sh0.08/e35/c135.0.810.810a/s640x640/58410847_136794980723592_6589123587928987023_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/d0bb16e97343ba001392f78c310ddfe5/5D62DA20/t51.2885-15/e35/c135.0.810.810a/s150x150/58410847_136794980723592_6589123587928987023_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/71b50781b5c8175a4719b5ccc0491d5b/5D621B6A/t51.2885-15/e35/c135.0.810.810a/s240x240/58410847_136794980723592_6589123587928987023_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/ff09f1795632a223d2368a1e2c4709b3/5D5B0CD0/t51.2885-15/e35/c135.0.810.810a/s320x320/58410847_136794980723592_6589123587928987023_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/b4a314820a8a20ac158d0cd7652bef88/5D63658A/t51.2885-15/e35/c135.0.810.810a/s480x480/58410847_136794980723592_6589123587928987023_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/3b4e45d1bb6706ce4e4922d47cf5872a/5D52F448/t51.2885-15/sh0.08/e35/c135.0.810.810a/s640x640/58410847_136794980723592_6589123587928987023_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': false }, { 'comments_disabled': false, 'id': '2041912850940456592', 'edge_media_to_caption': { 'edges': [] }, 'shortcode': 'BxWVOtenG6Q', 'edge_media_to_comment': { 'count': 2 }, 'taken_at_timestamp': 1557635002, 'dimensions': { 'height': 1179, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/a57d331deea5254383d8998142b78c52/5D608859/t51.2885-15/e35/58454197_429076377874982_2421896522217612315_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 17 }, 'edge_media_preview_like': { 'count': 17 }, 'owner': { 'id': '1151778834' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/b06aa1ff85ea4f3d469b91dcd91a771d/5D731BF6/t51.2885-15/sh0.08/e35/c0.49.1080.1080/s640x640/58454197_429076377874982_2421896522217612315_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/ae1ac1543cf45f1cc060fa1c306dfb92/5D5E7B9E/t51.2885-15/e35/c0.49.1080.1080/s150x150/58454197_429076377874982_2421896522217612315_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/38d129c5f10e6c33972108247e0ecc0c/5D71F0D4/t51.2885-15/e35/c0.49.1080.1080/s240x240/58454197_429076377874982_2421896522217612315_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/b3e9f9d2e9189ffae670b5510e29a45c/5D77466E/t51.2885-15/e35/c0.49.1080.1080/s320x320/58454197_429076377874982_2421896522217612315_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/b76b9dba405814c51ca79075f8c1cbca/5D629B34/t51.2885-15/e35/c0.49.1080.1080/s480x480/58454197_429076377874982_2421896522217612315_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/b06aa1ff85ea4f3d469b91dcd91a771d/5D731BF6/t51.2885-15/sh0.08/e35/c0.49.1080.1080/s640x640/58454197_429076377874982_2421896522217612315_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': false }, { 'comments_disabled': false, 'id': '2041912342305743609', 'edge_media_to_caption': { 'edges': [] }, 'shortcode': 'BxWVHTxnqL5', 'edge_media_to_comment': { 'count': 0 }, 'taken_at_timestamp': 1557634941, 'dimensions': { 'height': 1350, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/65e8f7224d6178c36cbacf5c7af0ecbf/5D6A71B9/t51.2885-15/e35/58781549_598665477311747_3282670884032784303_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 14 }, 'edge_media_preview_like': { 'count': 14 }, 'owner': { 'id': '1151778834' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/5fbad9da7154126970ccaf061273bfba/5D57C2B5/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/58781549_598665477311747_3282670884032784303_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/093d8b669023bcbe736f7d9b68941257/5D76687E/t51.2885-15/e35/c0.135.1080.1080a/s150x150/58781549_598665477311747_3282670884032784303_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/a336579dbcadd31525509c830fd4ae51/5D5AF334/t51.2885-15/e35/c0.135.1080.1080a/s240x240/58781549_598665477311747_3282670884032784303_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/ab1e6115493cbfc215c3475cd6e4cc1d/5D60598E/t51.2885-15/e35/c0.135.1080.1080a/s320x320/58781549_598665477311747_3282670884032784303_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/82d43493bafb3146fe817668bc5643cd/5D5E1FD4/t51.2885-15/e35/c0.135.1080.1080a/s480x480/58781549_598665477311747_3282670884032784303_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/5fbad9da7154126970ccaf061273bfba/5D57C2B5/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/58781549_598665477311747_3282670884032784303_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2041166823048456623', 'edge_media_to_caption': { 'edges': [{ 'node': { 'text': 'Super delicious sushi I am eating right now in San Francisco.  Chefs omikase 50 $. 14 piece order of sushi at its finest.  Yummmy\n.\n.\n.\n.\n.\n#transdoctor #youareworthy #beyourself #beyou #believe #believeinyourself #beauthentic #authenticbeauty #mtftransgender #mtf #transhealth #girlslikeus #transwoman #transgender #translife #transformation #thisiswhattranslookslike #trans #betruetoyourself #behappy #authentic #youbeyou #wontbeerased  #transvisibility' } }] }, 'shortcode': 'BxTrmk3Hamv', 'edge_media_to_comment': { 'count': 4 }, 'taken_at_timestamp': 1557546068, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/984dd84a508725ca7e54aaf61566069a/5D668884/t51.2885-15/e35/s1080x1080/58410491_845981069090016_1956650376018879991_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 39 }, 'edge_media_preview_like': { 'count': 39 }, 'owner': { 'id': '7368100439' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/1365daf298ccecf1ec791c1d2d80b882/5D6D9433/t51.2885-15/sh0.08/e35/s640x640/58410491_845981069090016_1956650376018879991_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/7ea711ecf9c2e2751b76d47eaab28029/5D728294/t51.2885-15/e35/s150x150/58410491_845981069090016_1956650376018879991_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/22f1e3fd07177f16270af6fcfe07ed40/5D5F0FDE/t51.2885-15/e35/s240x240/58410491_845981069090016_1956650376018879991_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/ecc31667ae30ac1548419df6505ebd68/5D689364/t51.2885-15/e35/s320x320/58410491_845981069090016_1956650376018879991_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/314a445af7bbc1c552a557a34fe2bf4c/5D74043E/t51.2885-15/e35/s480x480/58410491_845981069090016_1956650376018879991_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/1365daf298ccecf1ec791c1d2d80b882/5D6D9433/t51.2885-15/sh0.08/e35/s640x640/58410491_845981069090016_1956650376018879991_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2038329073612598569', 'edge_media_to_caption': { 'edges': [{ 'node': { 'text': 'Nigiri Tasting & Yuzu Delight #itadakimasu #oishi .\n.\n.\n.\n.\n.\n.\n.\n.\n#datenight #sushinight #omnomnom #foodstagram #foodie #getinmybelly #sushi #nigiri #yuzu' } }] }, 'shortcode': 'BxJmX4wB60p', 'edge_media_to_comment': { 'count': 1 }, 'taken_at_timestamp': 1557207782, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/2ffcf86778b8395283bcd62c76828745/5D6CDC98/t51.2885-15/e35/s1080x1080/58409517_593408494401357_7066340046386996321_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 37 }, 'edge_media_preview_like': { 'count': 37 }, 'owner': { 'id': '7347399148' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/8bd9e7b8bf6db17944e64e7d4d122b39/5D601A2F/t51.2885-15/sh0.08/e35/s640x640/58409517_593408494401357_7066340046386996321_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/89b484cf7063f51a50f8036eb92bdc70/5D76AD88/t51.2885-15/e35/s150x150/58409517_593408494401357_7066340046386996321_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/e445d3bb543541639d9afa5541d68496/5D6258C2/t51.2885-15/e35/s240x240/58409517_593408494401357_7066340046386996321_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/055acbf0d9a087d21a92186b425c2658/5D5D4478/t51.2885-15/e35/s320x320/58409517_593408494401357_7066340046386996321_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/5d69dd158777049345809dd765944473/5D5BE622/t51.2885-15/e35/s480x480/58409517_593408494401357_7066340046386996321_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/8bd9e7b8bf6db17944e64e7d4d122b39/5D601A2F/t51.2885-15/sh0.08/e35/s640x640/58409517_593408494401357_7066340046386996321_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2035399641113388207', 'edge_media_to_caption': { 'edges': [{ 'node': { 'text': 'Nara - SF, CA | sashimi omakase and belly tartarte 😋😋😋\n.\n.\n.\n.\n.\n.\n.\n.\n.\n#narasushi #narasushirestaurant #sushi  #sashimi #omakase #fish #japanesefood #sushi🍣 #nigiri #tunabelly #salmon #tuna #yellowtail  #foodie #foodphotography #foodporn #foods #food #yummy #delicious #deliciousfood #finedine #instaeats #instaeat #foodlover #foodlovers #foodlover #foodblogger #yummyfood' } }] }, 'shortcode': 'Bw_MTCIhWSv', 'edge_media_to_comment': { 'count': 0 }, 'taken_at_timestamp': 1556858566, 'dimensions': { 'height': 808, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/36288f16b0295982923f2262852613dd/5D6C749C/t51.2885-15/e35/57407400_1076416492569510_5271079267597610102_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 40 }, 'edge_media_preview_like': { 'count': 40 }, 'owner': { 'id': '9667298480' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/b96800154286dfa8a2f7ecb2af9e0eda/5D5F588F/t51.2885-15/sh0.08/e35/c136.0.808.808a/s640x640/57407400_1076416492569510_5271079267597610102_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/c85b17ea0209ffd0d1f0e40a810e6ac8/5D6653C8/t51.2885-15/e35/c136.0.808.808a/s150x150/57407400_1076416492569510_5271079267597610102_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/ecd83a3c7b97e604e94c363d87455b1a/5D71C8CE/t51.2885-15/e35/c136.0.808.808a/s240x240/57407400_1076416492569510_5271079267597610102_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/5670bba33c65caff90a971ef9a44ec19/5D564EB0/t51.2885-15/e35/c136.0.808.808a/s320x320/57407400_1076416492569510_5271079267597610102_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/0a0d088f1eef9f46991603d19112a57a/5D5E75F7/t51.2885-15/e35/c136.0.808.808a/s480x480/57407400_1076416492569510_5271079267597610102_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/b96800154286dfa8a2f7ecb2af9e0eda/5D5F588F/t51.2885-15/sh0.08/e35/c136.0.808.808a/s640x640/57407400_1076416492569510_5271079267597610102_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': true }, { 'comments_disabled': false, 'id': '2034353007135916128', 'edge_media_to_caption': { 'edges': [{ 'node': { 'text': 'When your food is almost too pretty to eat! Love this hamachi spoon shooter appetizer 😍\n.\n.\n.\n.\n.\n#food #foodie #foodlife #foodblogger #foodiegram #foodlove #instafood #instagood #delicious #eat #eats #yum #yummy #tasty #delish #goodeats #igfood #hungry #nom #forkyeah #eeeeeats #lovefood #sanfrancisco #sushi #dinner #fish' } }] }, 'shortcode': 'Bw7eUgSFYBg', 'edge_media_to_comment': { 'count': 2 }, 'taken_at_timestamp': 1556733798, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/8f66bb60355173503b968c87878081fe/5D587BB7/t51.2885-15/e35/59039725_185841535738292_9213271361451098117_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 78 }, 'edge_media_preview_like': { 'count': 78 }, 'owner': { 'id': '4351130713' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/3fc1da9427a5003794406c538428acfe/5D6FF252/t51.2885-15/sh0.08/e35/s640x640/59039725_185841535738292_9213271361451098117_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/8f2fc523338db0640577ab9d1bff4f5a/5D6BC3F5/t51.2885-15/e35/s150x150/59039725_185841535738292_9213271361451098117_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/dc3d8f47d01fddd1a8baaf69ed740bd8/5D74BDBF/t51.2885-15/e35/s240x240/59039725_185841535738292_9213271361451098117_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/2648b168ad2fe677567d30985da5c82b/5D68FE05/t51.2885-15/e35/s320x320/59039725_185841535738292_9213271361451098117_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/2f0c5faa95570868bb748e5f51002346/5D5A825F/t51.2885-15/e35/s480x480/59039725_185841535738292_9213271361451098117_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/3fc1da9427a5003794406c538428acfe/5D6FF252/t51.2885-15/sh0.08/e35/s640x640/59039725_185841535738292_9213271361451098117_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': false }, { 'comments_disabled': false, 'id': '2033104146081951445', 'edge_media_to_caption': { 'edges': [{ 'node': { 'text': "Food tastes better when it's not yours...🍣🥢😈 yamas and ty @notorious_sotorious" } }] }, 'shortcode': 'Bw3CXLylq7V', 'edge_media_to_comment': { 'count': 2 }, 'taken_at_timestamp': 1556584922, 'dimensions': { 'height': 1080, 'width': 1080 }, 'display_url': 'https://scontent-vie1-1.cdninstagram.com/vp/df1fbb8d921b7575866b9b93b1772ddb/5D650F47/t51.2885-15/e35/58033346_612693709248751_883695788589924733_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'edge_liked_by': { 'count': 19 }, 'edge_media_preview_like': { 'count': 19 }, 'owner': { 'id': '3854109' }, 'thumbnail_src': 'https://scontent-vie1-1.cdninstagram.com/vp/18bfac0a0dc7283a9dd57a4538cbc393/5D56E334/t51.2885-15/sh0.08/e35/s640x640/58033346_612693709248751_883695788589924733_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'thumbnail_resources': [{ 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/5442e431c708e894b1bcfc656f14caeb/5D5AFDD5/t51.2885-15/e35/s150x150/58033346_612693709248751_883695788589924733_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 150, 'config_height': 150 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/6527601150ea904b4aa9acdb0c07673b/5D686A60/t51.2885-15/e35/s240x240/58033346_612693709248751_883695788589924733_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 240, 'config_height': 240 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/1d0266b35c7da3e42f8cc3ae71fb2db5/5D6B98D8/t51.2885-15/e35/s320x320/58033346_612693709248751_883695788589924733_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 320, 'config_height': 320 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/b9f8c574edb080b8beff498615693a20/5D64AF84/t51.2885-15/e35/s480x480/58033346_612693709248751_883695788589924733_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 480, 'config_height': 480 }, { 'src': 'https://scontent-vie1-1.cdninstagram.com/vp/18bfac0a0dc7283a9dd57a4538cbc393/5D56E334/t51.2885-15/sh0.08/e35/s640x640/58033346_612693709248751_883695788589924733_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com', 'config_width': 640, 'config_height': 640 }], 'is_video': false, 'selected': false }];
  api.extension.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.why) {
      case 'getData':
        setTimeout(() => { sendResponse(data) }, 700)
        break
      case 'getRSS':
        sendResponse([{
          'type': 'follow',
          'value': {
            'checked': true,
            'followed_by_viewer': false,
            'full_name': 'Arabella White',
            'id': '11322587823',
            'is_verified': false,
            'profile_pic_url': 'https://scontent-vie1-1.cdninstagram.com/vp/da1c531f42d11347b57374ea954d42cc/5D58CC7C/t51.2885-19/s150x150/54732330_368154124033086_5693443879194329088_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com',
            'requested_by_viewer': false,
            'username': 'arabella.white64'
          }
        }])
        break
      case 'setData':
        data.userData = request.value
        update()
        setTimeout(() => { sendResponse(!0) }, 700)
        break
      case 'tool':
        console.log(request)
        if (request.name == 'getUser') {
          setTimeout(() => { sendResponse({ id: 123, username: 12314 }) }, 700)
        } else if (request.name.includes('getFollow')) {
          var col = []
          for (var i = 0; i < 10; i++) {
            col.push({ username: 'test', checked: !1 })
          }
          setTimeout(() => { sendResponse({ nodes: col, page_info: {} }) }, 700)
        } else if(/(getLocation|getUserPosts|myFeed|getHashtag)/ig.test(request.name)) {
          setTimeout(() => { sendResponse(postsCB) }, 700)
        }
        break
      case 'popup':
        data.user.triedToPay = !0
        _gaq.push(['_trackEvent', 'popup', request.what])
        update()
        break
      default:
        console.log('nothing')
    }
    return !0
  })
} else {
  api = window.api = {
    storage: {
      local: {
        get: function (e, cb) {
          chrome.storage.local.get(e, function (e) {
            cb && cb(e)
          })
        },
        set: function (e) {
          chrome.storage.local.set(e)
        }
      }
    },
    runtime: {
      sendMessage: function (data, cb) {
        chrome.runtime.sendMessage(data, function (e) {
          cb && cb(e)
        })
      }
    },
    sendMessage: function (data, cb) {
      chrome.sendMessage(data, function (e) {
        cb && cb(e)
      })
    },
    extension: {
      onMessage: {
        addListener: function (fn) {
          chrome.runtime.onMessage.addListener(fn)
        }
      }
    },
    webRequest: {
      onBeforeSendHeaders: {
        addListener: function (fn, urls, options) {
          chrome.webRequest.onBeforeSendHeaders.addListener(fn, urls, options)
        }
      }
    },
    identity: {
      getProfileUserInfo: function (cb) {
        chrome.identity.getProfileUserInfo(function (e) {
          cb && cb(e)
        })
      }
    }
  }
}

function random (x, y) {
  return Math.floor(Math.random() * (y - x + 1) + x)
}
function catcher (f) {
  try { return f() } catch (err) {
    log(err)
    _gaq.push(['_trackEvent', 'error', arguments[0], arguments[1] + ' : ' + arguments[2]])
    return !1
  }
}
function timer (f, t) {
  a.timeouts.push(setTimeout(function () {
    catcher(f)
  }, t))
}
function log (e) {
  console.log(e)
}
function MD5 (d) { result = M(V(Y(X(d), 8 * d.length))); return result.toLowerCase() };function M (d) { for (var _, m = '0123456789ABCDEF', f = '', r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X (d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V (d) { for (var _ = '', m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y (d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m; var t = f; var g = r; var e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn (d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff (d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg (d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh (d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii (d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add (d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol (d, _) { return d << _ | d >>> 32 - _ }

function dayToday () {
  return new Date().getMonth() + '' + new Date().getDate()
}

function shuffle (a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}
