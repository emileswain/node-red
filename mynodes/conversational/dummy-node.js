module.exports = function(RED) {
    function DummyNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            node.send(msg);

        });
    }
    RED.nodes.registerType("dummy-node",DummyNode);
}