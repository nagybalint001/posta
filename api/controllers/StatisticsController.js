module.exports = {
    renderPage: function(req, res){
        Package.find({ select: ['date', 'value'], where: {'value':{'>':0}}})
        .exec(function(err, result){
            res.view("statistics", {data:result});
        });
    }
};