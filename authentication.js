const jwt = require("jsonwebtoken");


exports.verifyTokenStrict = (req, res, next) => {
    const token = 
    req.headers["Authorisation"] || req.cookies.Authorisation;

    if (!token) {
        res.statusMessage = "Forbidden ! No token.";
        res.status(403)
        .send("The token is missing.")
        ;
    } else {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userName = decoded.userName;

        } catch (err) {
            return res.sendstatus(403);
        }
    }
    return next(); // a successful iteration of this function modifies the req, but returns no response.
}

exports.verifyToken = (req, res, next) => {
    const token = 
    req.headers["Authorisation"] || req.cookies.Authorisation;

    if (!token) {
        req.userName = null;
    } else { 
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            //console.log("token is %s, while decoded is %s", token, decoded);
            if (!(req.userName === decoded.userName)){
                req.username = decoded.userName; 
                // we want to avoid an [ERR_HTTP_HEADERS_SENT] error.
                // does this workaround make it so you only need a token to g-
                // et to a specific username ?
            };

        } catch (err) {
            return res.sendstatus(403);
        }
    }
    return next(); // this is a different one because I do not want non-token users to be disallowed from the site.
}
