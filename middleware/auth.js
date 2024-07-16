import jwt from "jsonwebtoken";

const verifytoken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer ") ) {
       return res.status(401).json({ message: "Authentication invalid" });
    }
    
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication invalid" });
  }
};
export default verifytoken;
