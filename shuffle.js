let randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**/


module.exports  = function(){

    let DIAMONDS = ["d1","d2","d3","d4","d5","d6","d7","d8","d9","d10","d11","d12","d13"];
    let HEARTS = ["h1","h2","h3","h4","h5","h6","h7","h8","h9","h10","h11","h12","h13"];
    let CLUBS = ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13"];
    let SPADES = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","s12","s13"];



    let pokers = [];
    for(let i = 0  ; i < 13 ; i++)
    {
        let max = DIAMONDS.length - 1;
        pokers.push(...[
            DIAMONDS.splice(Math.floor(Math.random() * (max + 1)),1)[0],
            HEARTS.splice(Math.floor(Math.random() * (max + 1)),1)[0],
            CLUBS.splice(Math.floor(Math.random() * (max + 1)),1)[0],
            SPADES.splice(Math.floor(Math.random() * (max + 1)),1)[0]
        ]);
    }
    var f, t ,tmp ;
    for(let i = 0 ; i < 52 ; i++)
    {
        f = randomInt(0, 51);
        t = randomInt(0, 51);
        temp = pokers[f];
        pokers[f] = pokers[t];
        pokers[t] = temp;
    }
    return {
        '0':pokers.slice(13,25),
        '1':pokers.slice(26,38),
        '2':pokers.slice(0,12),
        '3':pokers.slice(39,51)
    };
}
