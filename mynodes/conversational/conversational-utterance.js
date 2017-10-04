module.exports = function(RED) {
    function ConversationalUtterance(config) {
        RED.nodes.createNode(this,config);
        this.utterance = config.utterance;
        var node = this;
        this.on('input', function(msg) {

            if (msg === null || typeof msg === "undefined") {
                return;
            }
            //this.log("payload - " + JSON.stringify(msg,null,16));

            if (msg.hasOwnProperty("payload")) {

                var utterance = {utterance: node.utterance};

                if (!msg.payload.hasOwnProperty("utterances")) {
                    msg.payload.utterances = [];
                }

                msg.payload.utterances.push(utterance);

            }else{
                this.error("No Payload found.");
            }

            node.send(msg);
        });
    }
    RED.nodes.registerType("conversational-utterance",ConversationalUtterance);
}