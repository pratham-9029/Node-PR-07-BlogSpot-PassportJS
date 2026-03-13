import blogModel from "../model/blogModel.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import fs from "fs";

const adminPanelController = {
    adminDashboard(req, res) {
        res.render('index');
    },

    addBlogPage(req, res) {
        res.render('./pages/add-blog');
    },

    async addBlog(req, res) {
        req.body.image = req.file.path;
        req.body.user = req.user._id;
        await blogModel.create(req.body);
        res.redirect('/admin/my-blogs');
    },

    async myBlogsPage(req, res) {
        const blogs = await blogModel.find({ user: req.user._id }).populate('user', 'username');
        console.log('Blogs found:', blogs);
        res.render('./pages/my-blogs', { blogs });
    },

    async viewRegisteredUsers(req, res) {
        const users = await userModel.find();
        res.render('./pages/view-registered-users', { users });
    }, 

    async allBlogsPage(req, res) {
        const blogs = await blogModel.find().populate('user', 'username');
        console.log(blogs);        
        res.render('./pages/all-blogs', { blogs });
    },

    async editBlogPage(req,res){
        const blog = await blogModel.findById(req.params.id);
        res.render('./pages/edit-blog', { blog }); 
    },

    async editBlog(req,res){
        let blog = await blogModel.findById(req.params.id);

        if(req.file){
            if(blog.image){
                fs.unlinkSync(blog.image);
            }
            req.body.image = req.file.path;
        }

        await blogModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/my-blogs');
    },

    async deleteBlog(req,res){
        const blog = await blogModel.findById(req.params.id);

        if(blog.image){
            fs.unlinkSync(blog.image);
        }

        await blogModel.findByIdAndDelete(req.params.id);
        res.redirect('/admin/my-blogs');
    }

    
}

export default adminPanelController;