

adminAuth = (req,res,next) => {
    console.log("admin is being checked");
    const token ="xyz";
    const isAuthorized = token == "xyz";

    if (isAuthorized){
        next();
    }
    else {
        res.status(401).send("Admin is not Authorised Sorry Try Again and fail better");

    }}


module.exports = {
    adminAuth,
};
