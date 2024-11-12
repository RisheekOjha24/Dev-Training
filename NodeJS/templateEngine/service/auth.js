const jwt=require('jsonwebtoken');

const secret = "BlackOps";

function setUser(username){
    return jwt.sign({username},secret,{ expiresIn: '20s' });
}

module.exports={setUser};
