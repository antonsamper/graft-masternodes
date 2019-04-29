const got = require('got');
const { send } = require('micro');

module.exports = async (req, res) => {
    try {
        const response = await got.get(process.env.SUPERNODE_LIST, {
            json: true
        });
        const nodes = response.body.result.items;

        let tier1Nodes = 0;
        let tier2Nodes = 0;
        let tier3Nodes = 0;
        let tier4Nodes = 0;

        nodes.forEach((node) => {
            const stake = Math.ceil(node.StakeAmount / 10000000000);

            if(node.LastUpdateAge <= 3600 && stake >= 1) {
                if (stake < 90000) { tier1Nodes++ }
                else if (stake < 150000) { tier2Nodes++ }
                else if (stake < 250000) { tier3Nodes++ }
                else { tier4Nodes++ }
            }
        });

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 's-maxage=300, max-age=0');

        send(res, 200, {
            count: tier1Nodes + tier2Nodes + tier3Nodes + tier4Nodes,
            tiers: [
                { "tier": "1", "nodes": tier1Nodes },
                { "tier": "2", "nodes": tier2Nodes },
                { "tier": "3", "nodes": tier3Nodes },
                { "tier": "4", "nodes": tier4Nodes }
            ]
        })
    } catch (err) {
        send(res, 502, 'Error fetching supernodes list.')
    }
};
