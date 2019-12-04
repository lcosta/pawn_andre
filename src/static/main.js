let wrapper = {
    /** Welcome object instance */
    welcome: {
        /** @var ({HTMLElement|null}) $el */
        $el: document.getElementById("wrap-welcome"),
    },

    /** Pawn object instance */
    pawm: {
        /** @var ({HTMLElement|null}) $el */
        $el: document.getElementById("wrap-welcome"),
    },

    /**
     * Verifies if required ctx is valid
     *
     * @param {string} ctx required context
     * @private
     * @throws error message if required ctx isn't valid
     */
    _verify: function(ctx) {
        if(wrapper.hasOwnProperty(ctx) && wrapper[ctx].$el instanceof HTMLElement){
            return;
        }

        throw "The required " + ctx + " is invalid";
    },

    /**
     * Shows required item
     *
     * @param {string} ctx required context to apply
     *
     * @return {wrapper}
     */
    show: function (ctx) {
        this._verify(ctx);
        wrapper[ctx].$el.style.visibility = "visible";

        return this;
    },

    /**
     * Remove required item
     *
     * @param {string} ctx required context to apply
     * @return {wrapper}
     */
    remove: function (ctx) {
        this._verify(ctx);
        wrapper[ctx].$el.nextElementSibling.remove();

        return this;
    },
};

var Username = {
    get: function () {
        return window.cookie.read("username") || false;
    },

    set: function (name) {
        window.cookie.create("username", name, 10)
    }
};

var Timer = {
    get: function () {
        return window.cookie.read("timeout")
    },

    start: function () {
        window.cookie.create("timeout", (new Date).getTime(), 10)
    }
};

var Welcome = {
    remove: function () {
        document.getElementById("ask-name-wrapper").style.display = "none";
    }
};

var merryPawning = function () {

    /**
     * Username
     */
    function getUsername() {
        var username = window.cookie.read("username");
        if (username) {
            console.log("username: " + username);
            return username
        } else {
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
        if (cookie) return "Don't spam the poor guy :( Wait for your turn!";

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
    var init = (function () {
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

var PawnSocket = {

    get: function () {
        if (typeof window.socket === "undefined") {
            window.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/');
        }
        return window.socket;
    },

    register: function () {
        var s = this.get();

        // connect response receiver
        s.on('connect', function () {
            console.log("connected!");
            // TODO disable load
        });

        // pawn response event receiver
        s.on('pawn_response', function (msg) {
            var same_author = msg.pawn_author === window.cookie.read('username'),
                author = !same_author ? msg.pawn_author : "you",
                inc = same_author ? " Now wait 5 seconds to pawn again." : "";

            $.toast({
                heading: 'Toast',
                text: "Daaaammmnn! <strong style='font-size:20px'>" + author + "</strong> just pawned with  <strong style='font-size:18px'>`" + msg.action.replace("_", " ") + "`</strong>!" + inc,
                position: 'bottom-right',
                loader: false,
                stack: 50,
                icon: 'success',
                hideAfter: false,
                bgColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
            });
            // play sound
            document.getElementById("plucky").play();
        });
    }
};

var Binds = {
    register: function () {
        // Username
        $("#ask-name-btn").on('click', function () {
            var username = $('#ask-name-input').val();
            console.log(username);
            if (username.length > 3) {
                Username.set(username);
                $.toast({
                    heading: 'Login',
                    icon: 'success',
                    text: "Success! Prepare to voodoo someone!",
                    position: 'bottom-right',
                    loader: false,
                });
                setTimeout(function () {
                    console.log("reloading");
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
        });

        if (window.cookie.read('block_pawn')) {
            $("#pawn").prop('disabled', true);
        }
        // Roll the dice
        $("#pawn").on('click', function () {
            var _t = $(this);
            PawnSocket.get().emit("pawn", {user: window.cookie.read("username")});

            // TODO gen new cookie
            window.cookie.create('block_pawn', true, 0.00005787037037); // 5secs

            // TODO block this button
            _t.prop('disabled', true);
            setTimeout(function () {
                _t.prop("disabled", false)
            }, 5000);

            // TODO start timer to next available click
        });
    }
};

/**
 * Init app
 */
$(document).ready(function () {
    // Register socket actions
    PawnSocket.register();
    // Register bind events
    Binds.register();

    // Check if username is set
    if (Username.get()) {
        // TODO show pawn container
        wrapper.show('pawn').remove('welcome');
    } else {
        // TODO show welcome container
        wrapper.show('welcome').remove('pawn');
    }

    return false; // Stop if not set
});
