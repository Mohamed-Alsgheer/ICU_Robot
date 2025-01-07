// Verify authorization role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Not authorized user
        if (!roles.includes(req.user.role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        next();
    }
};


export default authorizeRoles;