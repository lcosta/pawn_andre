var Username = {
    get: function() {
        return $.cookie("username")
    },

    set: function(name) {
        $.cookie("username", name)
    }
}


(function() {
    var merryPawning = function() {
        
        /**
         * Username
         */
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
        function setUsername() {
            var input = document.getElementById('ask-name-input').value;
            if (input && input.length > 3) {
                window.cook.create("username", input, 50000000);
                location.reload()
            }
            console.log(input)
        }

        /**
         * Other functions
         */
        function removeInputUsername() {
            document.getElementById("ask-name-wrapper").style.display = "none";
        }

        function setUsernameInTitle() {
            document.getElementById("title").innerHTML = "Merry pawning, " + getUsername() + "!";
        }

        function removeUI() {
            $('#ui').remove();
        }

        function rollTheDices() {
            // check cookie
            var cookie = window.cook.read("usertimeout");
            if (cookie) return "Don't spam the poor guy :( Wait for your turn!"

            // if no cookie set 
            
            // make request
            
            // set cookie
            window.cook.create("usertimeout", true, 20);
            // block ui
        }

        /**
         * Binds
         */
        function binds() {
            var btn = document.getElementById('ask-name-btn').addEventListener("click", setUsername)
            var pawn = document.getElementById('ask-name-btn').addEventListener("click", rollTheDices)
        }

        /**
         * Init function
         */
        var init = (function() {
            var username = getUsername();
            binds();
            if (username == false) {
                removeUI()
                return false;
            }
            removeInputUsername();
            setUsernameInTitle()
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
