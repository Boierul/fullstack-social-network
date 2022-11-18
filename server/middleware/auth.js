import jwt from "jsonwebtoken";

// Verifying JWT
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        // Grabs the formatted part of the JWT
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Verifying if the token is available
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        // Will call next middleware
        next();
    } catch (err) {
        // In a production app these errors should be handled
        res.status(500).json({error: err.message});
    }
};
