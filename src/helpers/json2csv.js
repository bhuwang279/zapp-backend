const { Parser } = require('json2csv');

exports.toCSV = (jsonArray, fields, keepHeader) => {
	const json2csvParser = new Parser({ fields, header: keepHeader });
	return json2csvParser.parse(jsonArray);
};
