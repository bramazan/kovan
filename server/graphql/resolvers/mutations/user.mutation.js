const bcrypt = require('bcrypt');
const token = require('../../../helpers/token');
module.exports = {
    createUser: async (parent, { data: { username, password }},{ User }) => {
        const user = await User.findOne({ username });
        if (user) {
            throw new Error('User already exists');
        }
        const newUser = await new User({
            username,
            password
        }).save();

        return { token: token.generate(newUser,'1h') }
    },

    signIn: async (parent, { data: { username, password }}, { User }) => {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User does not exist');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        return { token: token.generate(user,'1h') }
    }
};