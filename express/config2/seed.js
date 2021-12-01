var seeder = require('mongoose-seed');
// const product = require('../models/product');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/ecommerce', function() {

  // Load Mongoose models
  seeder.loadModels([
      'models/user',

    ]);

  // Clear specified collections
  seeder.clearModels(['Users'], function() {
    // Callback to populate DB once collections have been cleared
    setTimeout(function(){ seeder.populateModels(data, function() {
      seeder.disconnect();
    });  }, 10000);
  });
  // seeder.clearModels(['User'], function() {

  //   // Callback to populate DB once collections have been cleared
  //   seeder.populateModels(data, function() {
  //     seeder.disconnect();
  //   });

  // });
});

var data = require('./seeder/index')
