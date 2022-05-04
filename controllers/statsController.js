const { count } = require("../models/togglesInstanceModel.js");
const togglesInstance = require("../models/togglesInstanceModel.js")

exports.index = function(req, res){
    return res.status(200).render("stats");
};

exports.practice = function(req, res){
    res.statusMessage = "H-ELLLO";
    res.status(200).end();
}

exports.collectUserStats = function(req, res){
    const userStats = {};
    const userName = req.cookies.userName;
    
    if (userName) { 
        // const {timeframe} = req.body;
        // we need the time frame, but since I don't have it...
        const query = togglesInstance.find({ user_name: userName });
        
        query.select("date toggles");
        // what we need for this is the user's userName, the requested time frame, and access to toggleinstances from the DB.
        
        // no userName: default of defaultVirtues with randomised data
        // no timeframe: default of current month, maybe two months past additionally
        // no access: !oopsie poopise! we are having issues with DB connectivity, 
        // please hold the line, refresh, or whatever you think best.

        // we can keep the labels the same, but we should generate them as necessary.
    
        
        // we need to find some way to make more than one chart, but then that would involve us needing to update statsScript

        query.exec( (err, instances ) => {
            if (err) return handleError(err);
            // current month - days per month - instances equal the days.

            let labels = [
                "Not Done",
                "Done"
            ];
            let data = [labels];
            let config = {};
            
            let dataSet = {
                label: "",
                data: [],
                backgroundColor: [
                ],
                hoverOffset: 10
            } // remember to put this in a list in the data.
            
            let dataCount = []; // this is an array we need to find out the count for 0 or 1.

            for( instance of instances ){
                // the date stuff
                dataSet.label = new Date(instance.date).toISOString().split("T")[0];
                // you have to use JS Date constructor with the Mongoose date object first.

                const categories = instance.toggles.categories;

                // TypeError Categories is not iterable.
                for ( category of categories ){
                    const components = category.components;
                    //console.log("category:")
                    //console.table(category);

                    for ( component of components ){
                        dataCount.push(component.progress);
                        //console.log("component:")
                        //console.table(component);

                    };
                };
            };
            dataSet.data.push(dataCount.filter( x => x === 0).length); // to tally up the 0's
            dataSet.data.push(dataCount.filter( x => x === 1).length); // to tally up the 1's
            console.log(dataSet)
            data.push(dataSet);

            config = {
                type: 'pie',
                data: data,
            }
        })

            /**
             * labels: days of the current month - or generated as requested.
             * label: component.name - perhaps even "category: component"
             * color: random
             * data: progress by the current month - or collected as requested.
             * 
             */

            /**
             * type: pie as we would like this to be about states % not done % done % achieved each day
             * options: ???
             */
   
            userStats["data"]  = data;
            userStats["labels"]  = labels;
            userStats["config"] = config;
    } else {
        //no.
    }

    res
    .status(200)
    .send(userStats)
};