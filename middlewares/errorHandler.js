function errorHandler (error, req, res, next) {
    let status = error.status
    let message = error.message
    console.log(error,"console log error handler")
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = error.errors[0].message;
            break;
        case "Internal Server Error":
            status = 500;
            message = "Internal Server Error";
            break;
        case "Forbidden!":
            status = 403;
            message = "You Are Not Authorized!";
            break;
        case "ErrorNotFound":
            status = 404;
            message = "Error Not Found";
            break;
        case "Not Found!":
            status = 404;
            message = "Not Found!";
            break; 
        case "ErrorInvalidUsernameOrEmailOrPassword":
            status = 401;
            message = "Error Invalid Username or Email or Password";
            break;
        case "Token is Invalid!":
            status = 401;
            message = "Unauthenticated!";
            break;
        default:
            break;
    }
    res.status(status).json({
        message
    })
}

module.exports = errorHandler;