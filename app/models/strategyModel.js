const mongoose = require('mongoose');
const CONSTANTS = require('../utils/constants');
const strategySchema = mongoose.Schema({
    sid: {
        type: Number,
        unique: true,
        type: mongoose.Types.ObjectId
    },
    index_type: {
        type: String,
        default:CONSTANTS.STRATEGYTYPES.INDEX_TYPE.NIFTY
        // required: true
    },
    segment: {
        type: String,
        // required: true
        default:CONSTANTS.STRATEGYTYPES.SEGMENT.FUTURE
    },
    trade_type: {
        type: String,
        default:CONSTANTS.STRATEGYTYPES.TRADE_TYPES.INTERADAY
        // required: true
    },
    exit_position: {
        type: String,
        default:CONSTANTS.STRATEGYTYPES.EXIT_POSITION.COMPLETE
        // required: true
    },
    move_sl_to_cost: {
        type: true,
        default:CONSTANTS.STRATEGYTYPES.MOVE_SL_TO_COST.FALSE
        // required: true
    },
    startTime: {
        type: String,
        required: true
    },
    exitTime: { 
        type: String,
        required: true
    },
    broker_id: {
        type: Number,
        requried: true
    },
    mtm_target_type: {
        type: String,
        default:CONSTANTS.STRATEGYTYPES.MTM_TARGET_TYPE.MTM_IN_TOTAL_AMOUNT
        // required: true
    },
    mtm_target_value: {
        type: String,
        required: true
    },
    reentry_mtm_target: {
        type: Number,
        required: true
    },
    lock_profit: {
        type: Number,
        required: true
    },
    trail_profit: {
        type: String,
        requried: true
    },
    profit_move_x: {
        type: Number,
        required: true
    },
    trail_profit_y: {
        type: Number,
        requried: true
    },
    entry_order_type: {
        type: String,
        requried: true
    },
    limit_order_buffer: {
        type: Number,
        requried: true
    },
    sl_by_broker_or_sys: {
        type: String,
        default:CONSTANTS.STRATEGYTYPES.SL_BY_BROKER_OR_SYS.BROKER
        // required: true
    },
    reentry_on: {
        type: String,
        default:CONSTANTS.STRATEGYTYPES.REENTRY_ON.CANDLECLOSE
        // required: true
    },
    candle_interval: {
        type: Number,
        required: true
    },
    reentry_after: {
        type: String,
        required: true
    },
    reentry_befor: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    match_premium: {
        type: String,
        required: true
    },
    match_premium_value: {
        type: Number,
        required: true
    }
});

const strategyModel = mongoose.model('strategy', strategySchema);

module.exports = strategyModel;