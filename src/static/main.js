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
    }

    window.cook = cookies();
    
})();


(function() {
    var merryPawning = function() {

        function checkForUsername() {
            var username = window.cook.read("username")
            if (username) console.log("username: " + username)
            else console.log("No username set")
        }


        var init = (function() {
            checkForUsername()
            console.log("HEEEY")
        })();
    }

    window.mp = merryPawning();
})();