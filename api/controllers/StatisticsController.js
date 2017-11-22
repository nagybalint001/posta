module.exports = {
    renderPage: function(req, res){
        /*Package.find({ select: ['date', 'value'], where: {'value':{'>':0}}})
        .exec(function(err, result){
            res.view("statistics", {data:result});
        });*/

        Promise.all([
            Package.find({ select: ['date', 'value'], where: {'value':{'>':0}}}),
            Package.find({ select: ['date', 'total']})
        ])
        .then(function(arr){
            var data = {
                dateValue : arr[0],
                dateTotal : arr[1]
            }
            res.view("statistics", {data});
        })
        .catch(function(reason){
            console.log(reason);
        });
    }
};