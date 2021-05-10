//! This one is going to commited and It will check whether we are in development mode or in production area

if (process.env.NODE_ENV === 'production') {
    //* WE ARE IN PRODUCTION AREA GOING TO RETURN PROD SET OF KEYS
    module.exports = require('./prod')
} else {
    //* WE ARE USING DEVELOPMENT ENVIRONMENT
    module.exports = require('./dev')
}