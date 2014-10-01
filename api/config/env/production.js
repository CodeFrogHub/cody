module.exports = {
    api: {
        mongodb:  process.env.MONGOSOUP_URL || process.env.MONGODB || 'mongodb://localhost/cody-production'
    }
};