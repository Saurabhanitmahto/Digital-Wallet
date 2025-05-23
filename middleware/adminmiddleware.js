const adminOnly = (req, res, next) => {
    // Step 1: Check if user is attached
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
  
    // Step 2: Check if user is admin
    if (req.user.isAdmin !== true) {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
  
    // All good
    next();
  };
  
  module.exports = adminOnly;
  