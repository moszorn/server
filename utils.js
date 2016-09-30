module.exports = {
    stringify(type,id,nick,message){
        return JSON.stringify(Object.assign(Object.prototype,{type,id,nick,message}));
    }
};

