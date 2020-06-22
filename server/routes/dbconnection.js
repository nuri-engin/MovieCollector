'use strict';

const
    express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Person = getPersonSchema()

let router = express.Router();


//> localhost:{PORT}/api/get
router.get('/get', function(req,res){
    
    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.find
    Person.find((err, data) => {
        // if err or no users found, respond with error
        if (err || data == null) {
            let jsonData = {
                status:'ERROR',
                message: 'Could not find people'
            };
            
            return res.json(jsonData);
        }
        
        // otherwise, respond with the data
        let jsonData = {
            status: 'OK',
            people: data
        };
        
        res.json(jsonData);
    });
});

function getPersonSchema () {
    // See http://mongoosejs.com/docs/schematypes.html
    const personSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            trim: true
        },
        
        dateAdded: {
            type: Date,
            default: Date.now
        }
    });
    
    return (
        mongoose.model('Person', personSchema)
    );
}

module.exports = router;
