(function() {
    var cookies = function() {

        // Create cookie
        function createCookie(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                expires = "; expires="+date.toGMTString();
            }
            else {
                expires = "";
            }
            document.cookie = name+"="+value+expires+"; path=/";
        }

        // Read cookie
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length,c.length);
                }
            }
            return null;
        }

        // Erase cookie
        function eraseCookie(name) {
            createCookie(name,"",-1);
        }

        return {
            create: createCookie,
            read: readCookie,
            erase: eraseCookie
        }
    };

    window.cook = cookies();
    
})();


(function() {
    var merryPawning = function() {

        function getUsername() {
            var username = window.cook.read("username");
            if (username) {
                console.log("username: " + username);
                return username
            }
            else {
                console.log("No username set");
                return false
            }
        }

        function saveUsername() {
            var input = document.getElementById('ask-name-input').value;
            if (input && input.length > 3) {
                window.cook.create("username", input, 5);
                location.reload()
            }
            console.log(input)
        }

        function binds() {
            var btn = document.getElementById('ask-name-btn').addEventListener("click", saveUsername)
        }

        function removeInputUsername() {
            document.getElementById("ask-name-wrapper").style.display = "none";
        }

        function setUsernameInTitle() {
            document.getElementById("title").innerHTML = "Merry pawning, " + getUsername() + "!";
        }


        var init = (function() {
            var username = getUsername();
            if (username !== false) {
                removeInputUsername();
                setUsernameInTitle()
            }
            binds();
            console.log("HEEEY")
        })();
    };

    window.mp = merryPawning();
})();


var u = window.location.host;

$("#pawn").click(function(){
    var endpt = 'http://' + u + '/pawn',
        uinfo = {
            id: 123,
            name: "Francisco"
        };
    
    console.log(Pawn.post(endpt, uinfo));
});



// TODO user name UI

// TODO preserve user data on localstorage/cookie

// TODO add toast

// TODO add socket.io

// TODO toast once another user pawns
