import jwt from "jsonwebtoken"
export default (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        // in headers we will receive token like "Bearer oiawhenjbh" (some long token)
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // this will return userId and other details with which we encoded earlie
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        console.log(err);
        res.send({
            message: err.message,
            success: false
        })
    }
}