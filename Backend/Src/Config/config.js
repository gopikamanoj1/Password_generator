// config.js
export default {
    port: process.env.PORT || 3000,
    mongo: {
      uri: 'mongodb://127.0.0.1:27017/password-generator',
    },
};
