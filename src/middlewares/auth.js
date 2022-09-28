const jwt = require ("jsonwebtoken");


const SECRET_KEY  = '2000';
const auth = (req, res) => {
    let authorization = req.headers.authorization;
    console.log(authorization);
    if (authorization) {
        let accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            res.status(401).json({
                message: 'you are anonymous'
            });
        } else {
            jwt.verify(accessToken, SECRET_KEY, (err, data) => {
                if (err) {
                    res.status(401).json({
                        error: err.message,
                        message: 'you are anonymous'
                    })
                } else {
                    req.decoded = data;

                }
            })
        }
    } else {
        res.status(401).json({
            message: 'you are anonymous'
        })
    }
}



module.exports ={auth}
