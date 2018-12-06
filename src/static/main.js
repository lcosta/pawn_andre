var Username = {
    get: function() {
        return window.cookie.read("username")
    },

    set: function(name) {
        window.cookie.create("username", name, 10)
    }
}

var Timer = {
    
    get: function() {
        return window.cookie.read("timeout")
    },
    
    start: function() {
        window.cookie.create("timeout", (new Date).getTime(), 10)
    }
}

var Welcome = {
    remove: function() {
        document.getElementById("ask-name-wrapper").style.display = "none";
    }
}

var PawnSocket = {

    get: function() {
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/socket');
        return socket
    },

    register: function() {
        var socket = this.get()

        // connect response receiver
        socket.on('connect', function () {
            $.toast({
                heading: 'Connected',
                icon: 'success',
                text: "Successfully connected",
                position: 'bottom-right',
                loader: false
            })
        });

        // pawn response event receiver
        socket.on('pawn_response', function (msg) {
            console.log("pawn_response")
            $.toast({
                heading: 'Toast',
                text: msg.data,
                position: 'bottom-right',
                loader: false
            })
        });
    }
}

var Binds = {
    register: function() {
        // Username
        $("#ask-name-btn").on('click', function() {
            var username = $('#ask-name-input').val()
            console.log(username)
            if (username.length > 3) {
                Username.set(username)
                $.toast({
                    heading: 'Login',
                    icon: 'success',
                    text: "Success! Prepare to voodoo someone!",
                    position: 'bottom-right',
                    loader: false
                })
                setTimeout(function() {
                    console.log("reloading")
                    window.location.reload()
                }, 2000) // for drama
            } else {
                $.toast({
                    heading: 'Username',
                    icon: 'error',
                    text: "la la la... Insert your name!",
                    position: 'bottom-right',
                    loader: false
                })
            }
        })

        // Roll the dice
        $("#pawn").on('click', function() {
            console.log("click.. click..")
            var s = PawnSocket.get()
            s.emit("pawn", {data: "super teste"})
            console.log("end..")

        })
    }
}


$(document).ready(function() {
    // Register socket actions
    PawnSocket.register();
    // Register bind events
    Binds.register();

    // Check if username is set
    if (Username.get()) Welcome.remove();
    else return false // Stop if not set

});


