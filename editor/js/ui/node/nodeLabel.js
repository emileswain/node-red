RED.ui = RED.ui || {};
RED.ui.nodeLabel = (function () {
    var component = {};

    component.create = function (node, d) {
        var rootNode = node.append("svg:g").attr("class", "node_label_group")
        var fo = rootNode.append('foreignObject')
            .attr("text-anchor", "start")
            .attr("requiredFeatures", "http://www.w3.org/TR/SVG11/feature#Extensibility")
            .attr("class", "node_label")

        var nodeText = fo.append('xhtml:div')
            .attr("class","node_label");

    }

    component.Draw = function (node, d) {
        // *************************
        // Calculate Size.
        // *************************
        var uiLabel =RED.utils.getNodeLabel(d);
        var textSize = RED.utils.calculateTextDimensions(uiLabel, "node_label", 0, 0, (d._def.defaults.nodeWidth ? d._def.defaults.nodeWidth.value : null));
        var uiHeight = Math.max(d.h, textSize[1]);

        // *************************
        // Get References
        // *************************
        var rootNode = node.select(".node_label_group")
        var fo = rootNode.select('foreignObject')
        var nodeText = rootNode.select('foreignObject div')

        // *************************
        // Position
        // *************************
        rootNode.attr("transform", function (d) {
            return "translate(38," + 0 + ")";
        })

        fo.attr("width", textSize[0])
            .attr("height", textSize[1])
            .attr("y", (d.h / 2 - textSize[1] / 2));

        // *************************
        // Text Assignment.
        // *************************
        //nodeText.text(uiLabel); // It was previously set multiple times, differently.
        nodeText.text(function(d){
            var l = "";
            if (d._def.label) {
                l = d._def.label;
                try {
                    l = (typeof l === "function" ? l.call(d) : l)||"";
                    l = RED.text.bidi.enforceTextDirectionWithUCC(l);
                } catch(err) {
                    console.log("Definition error: "+d.type+".label",err);
                    l = d.type;
                }
            }
            return l;
        });

        // *************************
        // Right alignment
        // *************************
        if (d._def.align) {
            // nodeText.attr("class", "node_label node_label_" + d._def.align);
            // if (d._def.align === "right") {
            //     nodeText.attr("text-anchor", "end");
            //     fo.attr("x", 15);
            // }
            rootNode.attr("transform", function (d) {
                return "translate(15," + 0 + ")";
            })
        }

    }
    return component;
})();
