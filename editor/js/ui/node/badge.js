RED.ui = RED.ui || {};
RED.ui.badge = (function () {

    // original.
    // var badge = node.append("svg:g").attr("class","node_badge_group");
    // var badgeRect = badge.append("rect").attr("class","node_badge").attr("rx",5).attr("ry",5).attr("width",40).attr("height",15);
    // badge.append("svg:text").attr("class","node_badge_label").attr("x",35).attr("y",11).attr("text-anchor","end").text(d._def.badge());
    // if (d._def.onbadgeclick) {
    //     badgeRect.attr("cursor","pointer")
    //         .on("click",function(d) { d._def.onbadgeclick.call(d);d3.event.preventDefault();});
    // }

    var component = {};
    component.getRect = function (node)
    {
        return  node.select(".node_badge_rect");
    }

    component.create = function (node, d) {
        var rootNode = node.append("svg:g").attr("class", "node_badge_group");
        var nodeRect = rootNode.append("rect").attr("class", "node_badge_rect");
        var nodeText = rootNode.append('svg:text').attr("text-anchor","end");

        if (d._def.onbadgeclick) {
            nodeRect.attr("cursor","pointer")
                .on("click",function(d) { d._def.onbadgeclick.call(d);d3.event.preventDefault();});
        }

    }

    component.Draw = function (node, d) {

            // Calculate Size.
            var label = d._def.badge();
            var textSize = RED.utils.calculateTextDimensions(label, "node_badge_label", 0, 0, d.w);
            var commentHeight = Math.max(d.h, textSize[1]);
            // Get References
            var rootNode = node.select(".node_badge_group");
            var nodeRect = rootNode.select(".node_badge_rect");
            var nodeText = rootNode.select('svg:text');

            // position Badge
            // rootNode.attr("transform", function (d) {
            //     return "translate(0," + d.h + ")";
            // })

            // Draw Rect
            nodeRect.attr("rx",5)
                .attr("ry",5)
                .attr("width",40)
                .attr("height",15);

            // Size Comment.
            nodeText
                .attr("x",35)
                .attr("y",11)

            // Update Comment.
            nodeText
                .text(commentLabel);

    }


    return component;
})();
