var Username = {
    get: function() {
        return $.cookie("username")
    },

    set: function(name) {
        $.cookie("username", name)
    }
};


(function() {
    var merryPawning = function() {
        
        /**
         * Username
         */
        function getUsername() {
            var username = window.cookie.read("username");
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
                window.cookie.create("username", input, 50000000);
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
            var cookie = window.cookie.read("usertimeout");
            if (cookie) return "Don't spam the poor guy :( Wait for your turn!"

            // if no cookie set 
            
            // make request
            
            // set cookie
            window.cookie.create("usertimeout", true, 20);
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
            if (username === false) {
                removeUI();
                return false;
            }
            removeInputUsername();
            setUsernameInTitle()
        })();
    };

    window.mp = merryPawning();
})();


$(document).ready(function () {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/');

    // connect response receiver
    socket.on('connect', function () {
        // TODO disable loading
        console.log("Successfully conected!")
    });


    $("#pawn").click(function(){
        socket.emit("pawn", {user: window.cookie.read("username")});
        console.log(this);
    });


    // pawn response event receiver
    socket.on('pawn_response', function (msg) {
        $.toast({
            heading: 'Toast',
            text: "Daaaammmnn! " + msg.pawn_author + " just pawned with `" + msg.action + "`",
            position: 'bottom-right',
            loader: false,
            stack: 50,
            icon: 'success'
        })
    });
});




// TODO user name UI

// TODO preserve user data on localstorage/cookie

// TODO add toast

// TODO add socket.io

// TODO toast once another user pawns
