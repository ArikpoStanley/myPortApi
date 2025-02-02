const admin = require("../firebaseAdmin")

export const authenticate = async (req, res, next) => {
    const idToken = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  
    if (!idToken) return res.status(401).send({ error: 'Unauthorized' });
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Invalid token' });
    }
  };
