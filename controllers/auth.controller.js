import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";

const authController = {
    loginPage(req, res) {
        res.render('./pages/login');
    },

    // async loginUser(req, res) {
    //     const { email, password } = req.body;

    //     const user = await userModel.findOne({ email });

    //     console.log(user);        

    //     if (user) {
    //         if (await bcrypt.compare(password, user.password)) {
    //             return res.redirect('/admin');
    //         } else {
    //             return res.redirect('/login');
    //         }
    //     } else {
    //         return res.redirect('/login');
    //     }
    // },

    registerPage(req, res) {
        res.render('./pages/register');
    },
    async registerUser(req, res) {
        const { username, email, password, confirmPassword } = req.body;


        if (password == confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await userModel.create({ username, email, password: hashedPassword });
            return res.redirect('/login');
        } else {
            return res.redirect('/register');
        }
    },

    logoutUser(req, res) {
        req.logout(function (err) {
            if (err) { return next(err); }
            return res.redirect('/login');
        });
    }
}

export default authController;