
var shuffle = require('./shuffle.js');
var utils = require('./utils');

const STATUS = {
    init:0/*洗*/,
    start:1/*發*/,
    bid:3/*叫*/,
    firstLead:4/*首引*/,

    close:-1
};
const seat = ['s','e','n','w'];
const PLAYER = {
    s:0,e:1,n:2,w:3,all:4,
    dummy:10,decraler:11
};
var getSeat = ()=> {
    let max = seat.length - 1;
    if(-1 === max) throw new Error('Full seat');//connection close
    let ran = Math.floor(Math.random() * (max + 1));
    var o = seat.splice(ran,1)[0];
    return PLAYER[o];
};
;
let hostUrl = 'ws://localhost',
    WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({port:8181}),
    uuid = require('node-uuid'),
    clients = [],
    client_uuid = undefined;

function wsSend(nickname, status, message) {
    const player = clients.find(player=>player.nickname = nickname);
    if(player)
        if(WebSocket.OPEN === player.ws.readyState)
            player.ws.send(utils.stringify(status,player.id,player.nickname,message));
}

function sendAll(status,messages){
    clients.forEach((player)=>{
        if(WebSocket.OPEN === player.ws.readyState)
            player.ws.send(utils.stringify(status,player.id,player.nickname,messages[player.id]));
     });
}




let clientIndex = 1;

wss.on('connection', (ws)=>{

    let _seat = getSeat();
    var player = {id: _seat,  "ws": ws, nickname: _seat + uuid.v4()};
    clients.push(player);
    console.log(player.id);

   if(clients.length === 4) {
       sendAll(STATUS.start,shuffle());
   }

ws.on('message',(str)=>{
    let json = JSON.parse(str);
    console.log('[on message] ' ,json );
   // wsSend("message", player.id, player.nickname, msg);
    switch (json.type){
        case 'init':
            break;
        case 'deal': break;
        case 'shuffle': break;
        case 'close': break;
        default:
            console.log('[on message]  default');
    }
});
   ws.on('close', function() {closeSocket();});

    process.on('SIGINT', function() {
        console.log("Closing things");
        closeSocket('Server has disconnected');
        process.exit();
    });

    var closeSocket = function(customMessage) {
        for(var i=0; i<clients.length; i++) {
            if(clients[i].id == client_uuid) {
                var disconnect_message;
                if(customMessage) {
                    disconnect_message = customMessage;
                } else {
                    disconnect_message = nickname + " has disconnected";
                }
                sendAll("notification", client_uuid, nickname, disconnect_message);
                clients.splice(i, 1);
            }
        }
    }

});






