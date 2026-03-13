import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

passport.use('local', new LocalStrategy(async (username, password, done) => {
    try {
        let user = await userModel.findOne({username});

        console.log(user);

        if (!user) return done(null, false);

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return done(null, false);

        return done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await userModel.findById(id);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
})