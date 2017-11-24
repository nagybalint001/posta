module.exports = {
    renderPage: function(req, res){
        /*Package.find({ select: ['date', 'value'], where: {'value':{'>':0}}})
        .exec(function(err, result){
            res.view("statistics", {data:result});
        });*/
        var groupByCount = function(xs, key) {
            return xs.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || 0);
                rv[x[key]]++;
                return rv;
            }, {});
        };
        Promise.all([
            Package.find({select:'dir'}).then(x => groupByCount(x, 'dir')),
            Package.find({select:'type'}).then(x => groupByCount(x, 'type')),
            Package.find({select:'administrator'}).then(x => groupByCount(x, 'administrator')),
            Package.find({select:'division'}).then(x => groupByCount(x, 'division')),
            Package.find({ select: ['subject', 'value'], where: {'value':{'>':0}}}),
            Package.find({ select: ['subject', 'total']})
        ])
        .then(function(arr){
            var data = {
                dirCount : Object.keys(arr[0]).map(x => ({dir:x, count: arr[0][x]})),
                typeCount : Object.keys(arr[1]).map(x => ({type:x, count: arr[1][x]})),
                administratorCount : Object.keys(arr[2]).map(x => ({administrator:x, count: arr[2][x]})),
                divisionCount : Object.keys(arr[3]).map(x => ({division:x, count: arr[3][x]})),
                subjectValue : arr[4],
                subjectTotal : arr[5],
                raw : arr
            }
            res.view("statistics", {data});
        })
        .catch(function(reason){
            console.log(reason);
        });
    }
};