const got = require('got');
const { send } = require('micro');

module.exports = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');

        const data = got(process.env.SUPERNODE_LIST);
        send(res, 200, data)
    } catch (err) {
        send(res, 502, 'error fetching supernode list')
    }
};
