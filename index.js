const got = require('got');
const { send } = require('micro');

module.exports = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');

        const response = await got(process.env.SUPERNODE_LIST);
        send(res, 200, response.body)
    } catch (err) {
        send(res, 502, 'error fetching supernode list')
    }
};
