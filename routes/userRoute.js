const userRouter = require('express').Router(),
mongoose = require('mongoose'),
userModel = require('../models/user'),
passport = require('passport'),
verify = require('../util/verify');

//Register user to Database
userRouter.post('/register',function(req,res,next){
	UserModel.register(new UserModel({username:req.body.username}),req.body.password,function(err,user){

		if(err){
			res.status(500).json({"err":err});
		}else{
			
			if(req.body.name){
				user.name = req.body.name;
			}
			

			user.save(function(err,user){
				
				if(err) return next(err);
					
				passport.authenticate('local')(req,res,function(){
					res.status(200).json({status:"Registration Successful!"});
				});
			});
		
		}

	} );

});

//login user
userRouter.post('/login',function(req,res,next){

	passport.authenticate('local',function(err,user,info){
		if(err){
			res.status(401).json({err:info});
		}else{

			if(user){
				//console.log(user);
				var token = verify.getToken(user);
				//var token = verify.getToken({"id":user._id,"admin":user.admin});
				userModel.findByIdAndUpdate(user._id,{$set:{localToken:token}},{new:true}, function(err,user){
					if(err) return next(err);
					
					res.status(200).json({
						"status":"Login successfull",
						"success":true,
						"token":token
					});
				});
			
			
				// disable this code as does not work for API. I is intended for express session
		/*		req.login(user,function(err){					
					if(err){
						res.status(500).json({err:"Cannot login user",message:err});
					}else{
					}
				});
*/
			}else{
				res.status(401).json({err:info});
			}

		}

	})(req,res,next);
});

//log out the user
userRouter.get('/logout',function(req,res,next){

	req.logout();
	res.status(200).json({status:"Logged out !"});
});

module.exports = userRouter;