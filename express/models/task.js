const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
      
        title:{
                type: String,
        },
        description:{
            type: String
        },
        start_time:{
            type:Date,
            required:true
        },
        end_time:{
            type:Date,
            required:true

        },
        _assign:{
            type:Schema.Types.ObjectId, 
            ref: 'User'
        },
        
        _project:{
            type:Schema.Types.ObjectId, 
            ref: 'Project'
        },
        status:{
            type: String,
            enum : ['todo','inprogress','complete'],
            default: 'todo'
        },
        cost:{
            type: String,
            required:true
        },
        work:[
            {
                work_date:{
                    type:Date
                }, 
                work_hour:{
                    type:Number
                } 
            }
        ]
       
 
}, {timestamps:true});


module.exports = mongoose.model('Task', taskSchema);
