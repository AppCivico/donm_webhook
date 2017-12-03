User = require('../models').user;

module.exports = {
    //Create a new author using model.create()
    create_user(senderId, data) {
        console.log("create_user -> senderId: ", senderId,  " - first_name: ", data.first_name);
        User.create({
            messenger_id: senderId,
		    name: data.name,
		    fb_first_name: data.first_name,
		    fb_last_name: data.last_name,
		    email: data.email,
		    gender: data.gender,
		    cellphone: data.cellphone,
		    city: data.city,
		    district: data.district
        });
        // console.log(tx);
    },

    //Edit an existing author details using model.update()
    update(req, res) {
	    User.update(req.body, {
	        where: {
	            id: req.params.id
	        }
	    })
	    .then(function (updatedRecords) {
	        res.status(200).json(updatedRecords);
	    })
	    .catch(function (error){
	        res.status(500).json(error);
	    });
  	}

};