const mongoose=require('mongoose');
const strategySchema = mongoose.Schema({
    sid:{
        type:Number,
        unique:true,
        type:mongoose.Types.ObjectId
    },
    index_type:{
        type:String,
        required:true
    },
    segment:{
        type:String,
        required:true
    },
    trade_type:{
        type:String,
        required:true
    },
    exit_position:{
        type:String,
        required:true
    },
    move_sl_to_cost:{
        type:true,
        required:true
    }
})