module.exports = {
    env: process.env.NODE_ENV || 'development',
    api: {
        mongodb: 'mongodb://localhost/cody',
        mongodb_max_retries: 5,
        security: {
            secret: 'Z283HPPc2N0ZL5iNf2kR8ihEB3apEoMv',
            salt_factor: 10,
            token_duration_in_days: 2
        }
    },
    spa: {
        apiUrl: '/api',
        locals: {
            base: '/'
        }
    }
};