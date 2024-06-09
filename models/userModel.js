const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/userData.json');

class User {
    static getUsers() {
        try {
            if (!fs.existsSync(filePath)) return [];
            const data = fs.readFileSync(filePath);
            return JSON.parse(data);

        } catch (error) {
            console.error(' Failed to fetch user: ', error);
        }
    }

    static saveUsers(userDetail) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(userDetail, null, 2) );

        } catch (error) {
            console.error(' Failed to save users: ', error);
        }
    }

    static createUser(userData) {
        try {
            const users = this.getUsers();
            users.push(userData);
            this.saveUsers(users);

        } catch (error) {
            console.error(' Failed to create user: ', error);
        }
    }

    static getUserByUsername(username) {
        try {
            const users = this.getUsers();
            if (!Array.isArray(users)) {
                console.error('Failed to get user: Invalid user data');
                return null;
            }
            return users.find(user => user.username === username);
        } catch (error) {
            console.error('Failed to get user: ', error);
            return null;
        }
    }
}

module.exports = User;