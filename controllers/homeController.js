class HomeController {
    static async home(req, res, next) {
        res.status(200).json({ message: "Welcome my friends, to Ngobrol Home Page" });
    }
};

module.exports = HomeController;