const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');



exports.signup = (req , res) => {
    const user = new User({
        fullName:req.body.fullname,
        school:req.body.school,
        age:req.body.age,
        email:req.body.email,
        country:req.body.country,
        class:req.body.classN,
        userName:req.body.username,
        scores:req.body.scores,
        role:req.body.role?req.body.role:'normal',
        password:bcrypt.hashSync(req.body.password , 8)
    });

    user.save((err , user) => {
        if(err){
           return res.status(500).send({message:err});
        }

        else {
            res.status(200).send({message:"User Registered successfully"});
        }

    });
}


exports.signin = (req , res) => {
    User.findOne({email:req.body.email})
        .exec((err , user) => {
            if(err){
                return res.status(500).send({message:err});
            }
            if(!user){
                return res.status(404).send({message:"User not found"});
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password , user.password);

            if(!passwordIsValid){
                return res.status(400).send({accessToken:null , message:"Invalid Password!"});
            }

            const token = jwt.sign({
                id:user.id,
                email:user.email,
                fullName:user.fullName,
                school:user.school,
                age:user.age,
                country:user.country,
                class:user.class,
                userName:user.userName,
                role:user.role
            } , process.env.API_SECRET , {expiresIn:86400});

            res.status(200).send({
                user:{
                    id:user._id,
                    email:user.email,
                    fullName:user.fullName,
                    school:user.school,
                    age:user.age,
                    country:user.country,
                    class:user.class,
                    userName:user.userName,
                },
                message:"Login successfull",
                accessToken:token
            });

        });
}
