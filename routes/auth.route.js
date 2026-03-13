import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import passport from "passport";

const authRouter = Router();

authRouter.get('/login', authController.loginPage);
authRouter.post('/login', passport.authenticate('local', {
    successRedirect : '/admin',
    failureRedirect : '/login'
}));

authRouter.get('/register', authController.registerPage);
authRouter.post('/register', authController.registerUser);

authRouter.get('/logout', authController.logoutUser);

export default authRouter;