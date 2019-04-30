const got = require('got');
const { send } = require('micro');

module.exports = async (req, res) => {
    try {
        const stimulus = 112000;
        const tier1Cost = 50000;
        const tier2Cost = 90000;
        const tier3Cost = 150000;
        const tier4Cost = 250000;
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
                { tier: '1', nodes: tier1Nodes, roi: `${parseFloat((stimulus/4/(tier1Nodes*tier1Cost))*30).toFixed(2)}%` },
                { tier: '2', nodes: tier2Nodes, roi: `${parseFloat((stimulus/4/(tier2Nodes*tier2Cost))*30).toFixed(2)}%` },
                { tier: '3', nodes: tier3Nodes, roi: `${parseFloat((stimulus/4/(tier3Nodes*tier3Cost))*30).toFixed(2)}%` },
                { tier: '4', nodes: tier4Nodes, roi: `${parseFloat((stimulus/4/(tier4Nodes*tier4Cost))*30).toFixed(2)}%` }
            ]
        })
    } catch (err) {
        send(res, 502, 'Error fetching supernodes list.')
    }
};

