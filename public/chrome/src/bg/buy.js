(function() {
    var f = this,
        g = function(a, d) {
            var c = a.split("."),
                b = window || f;
            c[0] in b || !b.execScript || b.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift());) c.length || void 0 === d ? b = b[e] ? b[e] : b[e] = {} : b[e] = d
        };
    var h = function(a) {
        var d = chrome.runtime.connect("nmmhkkegccagdldgiimedpiccmgmieda", {}),
            c = !1;
        d.onMessage.addListener(function(b) {
            c = !0;
            "response" in b && !("errorType" in b.response) ? a.success && a.success(b) : a.failure && a.failure(b)
        });
        d.onDisconnect.addListener(function() {
            !c && a.failure && a.failure({
                request: {},
                response: {
                    errorType: "INTERNAL_SERVER_ERROR"
                }
            })
        });
        d.postMessage(a)
    };
    g("google.payments.inapp.buy", function(a) {
        a.method = "buy";
        h(a)
    });
    g("google.payments.inapp.consumePurchase", function(a) {
        a.method = "consumePurchase";
        h(a)
    });
    g("google.payments.inapp.getPurchases", function(a) {
        a.method = "getPurchases";
        h(a)
    });
    g("google.payments.inapp.getSkuDetails", function(a) {
        a.method = "getSkuDetails";
        h(a)
    });
})();

var sku = "1";
function pay(){

    google.payments.inapp.buy({
      'parameters': {'env': 'prod'},
      'sku': sku,
      'success': function(){
        console.log(arguments)
        data.user.purchased = !0;
      },
      'failure': function(){
        console.log(arguments)
      }
    });

}

google.payments.inapp.getSkuDetails(
{
    'parameters': {'env':'prod'},
    'success': function(response)
    {
        console.log('Success', response);
        data.user.products = response.response.details.inAppProducts
        sku = data.user.products[0].sku;
        console.log(data.user.products)
        google.payments.inapp.getPurchases({
          'parameters': {'env': 'prod'},
          'success': function(e){
            console.log(arguments)
            if(e.response.details.length && e.response.details[0].state == 'ACTIVE'){
                data.user.purchased = !0;
            }
          },
          'failure': function(){
            console.log(arguments)
          }
        });
    },
    'failure': function(response)
    {
        data.user.firstDay = 0;
        console.log('Failure', response);
    }
});