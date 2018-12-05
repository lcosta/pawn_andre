let u = window.location.host;

$("#pawn").click(function(){
    let endpt = `http://${u}/pawn`,
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


