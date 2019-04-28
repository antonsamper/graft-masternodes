module.exports = (req, res) => {
    res.send([
        { "tier": "1", "nodes": "585", "roi": "100%" },
        { "tier": "2", "nodes": "324", "roi": "100.31%" },
        { "tier": "3", "nodes": "213", "roi": "91.39%" },
        { "tier": "4", "nodes": "147", "roi": "79.46%" }
    ]);
};
