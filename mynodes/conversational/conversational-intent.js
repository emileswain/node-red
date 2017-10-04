module.exports = function(RED) {
    function ConversationalIntent(config) {
        RED.nodes.createNode(this,config);
        this.intentType = config.intentType;
        var node = this;
        this.on('input', function(msg) {

            if (msg === null || typeof msg === "undefined") {
                return;
            }

            if (msg.hasOwnProperty("payload")) {
                var intent = {intent: node.intentType, slots: [], utterances: []};

                if (!msg.hasOwnProperty("_intents")) {
                    msg._intents = [];
                }

                // add new Intent.
                msg.payload = intent;

                msg._intents.push(intent);
            }else{
                this.error("No Payload found.");
            }

            node.send(msg);
        });
    }
    RED.nodes.registerType("conversational-intent",ConversationalIntent);
}