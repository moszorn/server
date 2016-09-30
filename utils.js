module.exports = {
    stringify(status,playerId,nickname,message){
        return JSON.stringify(Object.assign(Object.prototype,{status,playerId,nickname,message}));
    }
};


