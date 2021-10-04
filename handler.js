var pdf = require('html-pdf');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
process.env["FONTCONFIG_PATH"] = "/var/task/fonts"

var options = { format: 'Letter', phantomPath: './phantom_lambda/phantomjs_linux-x86_64' };

module.exports.hello = function (event, context, callback) {
  var htmlString = "<body>Hi, my friend!!!</body>"

  pdf.create(htmlString, options).toBuffer(function (err, buffer) {
    if (err) {
      console.log("There was an error generating the PDF file");
      console.log(err);
      var error = new Error("There was an error generating the PDF file");
      callback(error);
    }
    else {
      context.done(null, { file: `data:application/pdf;base64,${Buffer.from(buffer).toString("base64")}`, result: 'Created PDF file' });
    }
  });
};
