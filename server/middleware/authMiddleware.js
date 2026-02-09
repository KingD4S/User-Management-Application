const jwt =  require('jsonwebtoken' );


const authMiddleware = (req, res, next) => {
    const authHeader = req.cookies.token;

    //  console.log(authHeader);
    if (!authHeader) {
        return res.status(403).json({ message: "Authorization header missing", success: false });
    }
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Debugging log
        return res.status(403).json({ message: "Invalid token", success: false, error: error.message });  
    }

}

module.exports = authMiddleware;