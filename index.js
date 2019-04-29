const got = require('got');

module.exports = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        return await got(process.env.SUPERNODE_LIST);
    } catch (err) {
        send(res, 502, 'error fetching supernode list')
    }
};
