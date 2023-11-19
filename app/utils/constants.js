let CONSTANTS = {}

CONSTANTS.TOKEN_TYPE = {
  LOGIN: 1,
  OTP: 2
};

CONSTANTS.ERROR_TYPES = {
  ERROR: 'ERROR',
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  MONGO_EXCEPTION: 'MONGO_EXCEPTION',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED'
};

CONSTANTS.STRATEGYTYPES = {
  INDEX_TYPE: {
    NIFTY: 'nifty',
    BANKNIFTY: 'banknifty',
    FINNIFTY: 'finnifty',
    MIDCAP: 'midcap',
    SENSEX: 'sensex'
  },
  TRADE_TYPES: {
    INTERADAY: 'interaday',
    POSITIONAL: 'positional'
  },
  SEGMENT: {
    OPTIONS: 'options',
    FUTURE: 'future'
  },
  EXIT_POSITION: {
    PARTIAL: 'partial',
    COMPLETE: 'complete'
  },
  MOVE_SL_TO_COST: {
    TRUE: true,
    FALSE: false
  },
  MTM_SL_TYPE: {
    MTM_SL_IN_PERCENT: 'mtm SL in percent',
    MTM_SL_IN_TOTAL_AMOUNT: 'mtm SL in total amount'
  },
  SL_BY_BROKER_OR_SYS: {
    BROKER: 'borker',
    SYS: 'sys'
  },
  REENTRY_ON: {
    CANDLECLOSE: 'candle close'
  },
  MTM_TARGET_TYPE: {
    MTM_IN_PERCENT: 'mtm in percent',
    MTM_IN_TOTAL_AMOUNT: 'mtm in total amount'
  }
}

module.exports = CONSTANTS;
