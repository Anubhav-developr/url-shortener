
var endpoint = "http://www.jsonstore.io/00a4c82b645287a055779525d4fb2b7beb569111947fcc728d9148d625b8537a"

function geturl(){            //  dekh rahe hai ki fit hai ki nahi warna fit karna padega starting url ka 
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;               
        }else{
            return url;
        }
}


function getrandom(){  
      var random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);  
        return random_string()
    }    // random string generate kar rahe hain joki hash value post krne me mdd krega


    function genhash(){                             //hash generate krega gr initially nhi milega
        if (window.location.hash == ""){
            window.location.hash = getrandom();
        }
    }
    
    function send_request(url) {
        this.url = url;
        $.ajax({
            'url': endpoint + "/" + window.location.hash.substr(1),
            'type': 'POST',                                                // post request send karne ka ajax masala waise toh web api me xhh.https
                                                                          // jo ki khud choli ke piiche hota hai jquery ajax json post request ke magar ham malai se kaam kr rhe hen..doodh me jane ka tym nhi
                                                                        // aur ham covid +ve bhi hai isiliye  
           'data': JSON.stringify(this.url),
            'dataType': 'json',
            'contentType': 'application/json; charset=utf-8'
    })
    }
    
    function shorturl(){
        var longurl = geturl();
        genhash();                                            //bhej dega abb send_request() .... babul ki duaayen leti ja ja tujko sukhi cloud storage mile
        send_request(longurl);
    }
    
    var hashh = window.location.hash.substr(1)
    
    if (window.location.hash != "") {
        $.getJSON(endpoint + "/" + hashh, function (data) {
            data = data["result"];
    
            if (data != null) {
                window.location.href = data;
            }
    
        });
    }
