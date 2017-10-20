RED.ui = RED.ui || {};
RED.ui.link = (function () {
    var component = {};

    component.create = function (node, d) {
        var rootNode = node.append("svg:g").attr("class", "node_link_group")
        var nodeRect = rootNode.append("rect").attr("class", "node_link_rect")
        var fo = rootNode.append('foreignObject')
        var nodeText = fo.append('xhtml:div')
    }

    component.Draw = function (node, d) {
        // Calculate Size.
        var uiLabel = d._def.defaults.name.value;
        var textSize = RED.utils.calculateTextDimensions(uiLabel, "node_link", 0, 0, d.w);
        var uiHeight = Math.max(d.h, textSize[1]);
        // Get References
        var rootNode = node.select(".node_link_group")
        var nodeRect = node.select(".node_link_rect")
        var fo = rootNode.select('foreignObject')
        var nodeText = node.select('foreignObject div')
        // position
        rootNode.attr("transform", function (d) {
            return "translate(0," + d.h + ")";
        })
        // Draw Rect
        nodeRect.attr("rx", 5).attr("ry", 5)
            .attr("width", d.w)
            .attr("height", commentHeight)
            .attr("fill", "#FFFFFF");
        // Size Comment.
        fo.attr("text-anchor", "start")
            .attr("requiredFeatures", "http://www.w3.org/TR/SVG11/feature#Extensibility")
            .attr("class", "node_link")
            .attr("width", d.w)
            .attr("height", uiHeight)
            .attr("x", 2)
            // .attr("y", (d.h/2 - textSize[1]/2))
            .attr("y", 2);
        //console.log("redrawing link w: "+d.w);
        // Update Comment.
        nodeText.text(uiLabel);
    }
    return component;
})();
