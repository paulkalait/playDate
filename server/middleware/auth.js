//middleware for auth
import jwt from "jsonwebtoken";
const secret = "test";

//next do something and then move to the next thing
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      //this will give us the data of each user
      decodedData = jwt.verify(token, secret);

      //get users id from our jwt token
      req.userId = decodedData?.id;

    } 
    else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    //if the auth middleare approves the jwt verify then do this next
  next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
