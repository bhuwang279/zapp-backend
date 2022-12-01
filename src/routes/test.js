'use strict';


function test (req, res) {
    const returnData = {
        name: "hello"
    };
    res.write(JSON.stringify(returnData));
    res.end();
}

const testRoute = app => {
	app.get('/test', test);
};

export default testRoute
