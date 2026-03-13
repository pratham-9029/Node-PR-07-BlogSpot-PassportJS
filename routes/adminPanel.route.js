import { Router } from "express";
import adminPanelController from "../controllers/adminPane.controller.js";
import auth from "../middleware/auth.js";
import passport from "passport";
import imageUploads from "../middleware/imageUplods.js";

const adminRouter = Router();

adminRouter.get('/', auth, adminPanelController.adminDashboard);

// adminRouter.get('/login', adminPanelController.loginPage);
// adminRouter.post('/login', passport.authenticate('local', {
//     successRedirect : '/admin',
//     failureRedirect : '/login'
// }));

// adminRouter.get('/register', adminPanelController.registerPage);
// adminRouter.post('/register', adminPanelController.registerUser);

// adminRouter.get('/logout', adminPanelController.logoutUser);

// adminRouter.get('/view-registered-users', auth, adminPanelController.viewRegisteredUsers);

adminRouter.get('/add-blog', auth, adminPanelController.addBlogPage);
adminRouter.post('/add-blog', auth, imageUploads, adminPanelController.addBlog);

adminRouter.get('/my-blogs', auth, adminPanelController.myBlogsPage);

adminRouter.get('/all-blogs', auth, adminPanelController.allBlogsPage);

adminRouter.get('/edit-blog/:id', auth, adminPanelController.editBlogPage);
adminRouter.post('/edit-blog/:id', auth, imageUploads, adminPanelController.editBlog);

adminRouter.get('/delete-blog/:id', auth, adminPanelController.deleteBlog);




export default adminRouter;