var AWS = require('aws-sdk');
var http = require('http');

exports.handler = function(event, context) {

  var codepipeline = new AWS.CodePipeline();
  var job = event["CodePipeline.job"]

  var jobId = job.id;
  var url = job.data.actionConfiguration.configuration.UserParameters; 
  
  function success(message) {
    codepipeline.putJobSuccessResult({
      jobId: jobId
    }, function(err, data) {
      if(err) {
        context.fail(err);    
      } else {
        context.succeed(message);    
      }
    });
  }
  
  function failure(message) {
    codepipeline.putJobFailureResult({
      jobId: jobId,
      failureDetails: {
        message: JSON.stringify(message),
        type: 'JobFailed',
        externalExecutionId: context.invokeid
      }
    }, function(err, data) {
      if(err) {
        context.fail(err);    
      } else {
        context.succeed(message);    
      }
    });
  }

  http.get(url, function(response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      if (response.statusCode === 200 && body.includes("<h1>Automation for the people</h1>")) {
        success("URL check successful.")
      } else {
        console.log(response.statusCode);
        console.log8(body);
        failure("Invalid status code or content.");
      }
    });
  }).on('error', function(error) {
    failure(error);  
  });

};