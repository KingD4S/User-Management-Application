const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        
        if(user) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const newUser = await User.create({ name, email, password });

        res.status(201)
            .json({ 
                message: "User signed up successfully",
                success: true, user: newUser 
            });
    } catch (error) {
        res.status(500).json({ 
              message: "Server error",
              error: error.message, success: false 
        });
    }
}

const login =  async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errMsg = "Invalid email or password";

        if(!user) return res.status(403).json({
            message: errMsg,
            success: false
        });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return  res.status(403).json({
                message: errMsg,
                success: false
            });
        }
        
        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
}

const logout = (req, res) => {
    res.clearCookie("token",{
          httpOnly: true,
        secure: false,      
        sameSite: "lax"
    });
    // console.log("USER LOGOUT")
    res.json({
        message: "Logged out successfully",
        success: true
    });
};


module.exports = {
    signup,
    login,
    logout
};