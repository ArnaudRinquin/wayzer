// Karma configuration
// Generated on Wed Mar 18 2015 20:35:18 GMT+0000 (GMT)

module.exports = function(config) {

  require('./karma.conf')(config);

  config.set({

    singleRun: false,
    browserify: {
      watch: true,
    }

  });
};
