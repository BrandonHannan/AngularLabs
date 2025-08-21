var fs = require('fs');

module.exports = function (req, res) {
    const { username, password } = req.body;
    const users = fs.readFileSync(__dirname + '/../../data/users.json', 'utf-8');

    if (users) {
        const userJson = JSON.parse(users);
        const userArray = userJson.users;
        const foundUser = userArray.find(user => user.username == username && user.password == password);
        if (foundUser) {
            const userToReturn = {
                username: foundUser.username,
                birthdate: foundUser.birthdate,
                age: foundUser.age,
                email: foundUser.email,
                valid: foundUser.valid
            };
            res.status(200).json(userToReturn);
        }
        else {
            res.status(401).json({ "valid": false });
        }
    }
}