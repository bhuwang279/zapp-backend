const FS = require('fs');

exports.writeToFile = (data, filePath) => {
	return new Promise((resolve, reject) => {
		FS.writeFile(filePath, data, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
};

exports.appendToFile = (data, filePath) => {
	return new Promise((resolve, reject) => {
		FS.appendFile(filePath, data, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
};

exports.deleteFile = (filePath) => {
	return new Promise((resolve, reject) => {
		const exists = FS.existsSync(filePath);
		if (exists) {
			FS.unlink(filePath, (err) => {
				if (err) reject(err);
				else resolve();
			});
		} else {
			resolve();
		}
	});
};
