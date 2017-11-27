var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Real-time financial service location planning and search - API',
        version: '1.0.0',
        description: 'Describing the API endpoints',
        contact: {
            name: 'API support',
            url: 'http://laboremus.ug/',
            email: 'group_lug_proj_commercialis@laboremus.no'
        }
    },
    //host: 'localhost:3000',//'hotapi.laboremus.biz'
    basePath: '/',
    schemes: ["http","https"]
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./controller/basecontroller.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


module.exports = swaggerSpec;