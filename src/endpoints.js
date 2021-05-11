const url = require('url');
const report = require('./report');

module.exports = function(app){
    app.get('/report', function(req, res){
        const queryObject = req.query;
        report.makeReport(queryObject).then(() =>{
            res.download(`${__dirname}/CSV/report.csv`);
        });

    })
}
