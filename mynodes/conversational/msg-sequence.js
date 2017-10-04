module.exports = function(RED) {
    function MsgSequencer(config) {
        RED.nodes.createNode(this,config);
        this.outputs = config.outputs;
        var node = this;
        this.on('input', function(msg) {
            if (msg === null || typeof msg === "undefined") {
                return;
            }

            var MESSAGE_COUNT = node.outputs || 0;
            for (var i = 0 ; i < MESSAGE_COUNT; i++)
            {
                var tmp = [];
                var t = MESSAGE_COUNT;
                while(t--){tmp[t]=null};

                tmp[i] = msg;

                //this.log("temp = "+ JSON.stringify(tmp));
                node.send(tmp);
            }

        });
    }
    RED.nodes.registerType("msg-sequence",MsgSequencer);
}