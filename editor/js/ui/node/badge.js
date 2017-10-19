RED.ui = RED.ui || {};
RED.ui.badge = (function () {
    var component = {};
    component.getRect = function (node)
    {
        return  node.select(".node_badge_rect");
    }

    component.create = function (node, d) {
        var commentNode = node.append("svg:g").attr("class", "node_badge_group");
        var commentRect = commentNode.append("rect").attr("class", "node_badge_rect");
        var commentText = commentNode.append('svg:text').attr("text-anchor","end");
    }

    component.Draw = function (node, d) {

            // Calculate Size.
            var commentLabel = d._def.badge();
            var textSize = RED.utils.calculateTextDimensions(commentLabel, "node_badge_label", 0, 0, d.w);
            var commentHeight = Math.max(d.h, textSize[1]);
            // Get References
            var commentNode = node.select(".node_badge_group");
            var commentRect = commentNode.select(".node_badge_rect");
            var commentText = commentNode.select('svg:text');

            // position Badge
            // commentNode.attr("transform", function (d) {
            //     return "translate(0," + d.h + ")";
            // })

            // Draw Rect
            commentRect.attr("rx",5)
                .attr("ry",5)
                .attr("width",40)
                .attr("height",15);

            // Size Comment.
            commentText
                .attr("x",35)
                .attr("y",11)

            // Update Comment.
            commentText
                .text(commentLabel);

    }
    return component;
})();
