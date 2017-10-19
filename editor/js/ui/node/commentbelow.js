

RED.ui = RED.ui || {};
RED.ui.commentbelow = (function() {
    var component = {};

    component.create = function (node,d)
    {
        var commentNode = node.append("svg:g").attr("class","node_comment_group")
        var commentRect = commentNode.append("rect").attr("class","node_comment_rect")
        var fo = commentNode.append('foreignObject');
        var commentText = fo.append('xhtml:div');
    }

    component.Draw = function (node, d)
    {
        if(d._def.defaults && d._def.defaults.comment != null)
        {
            // Calculate Size.
            var commentLabel = d._def.defaults.comment.value;
            var textSize = RED.utils.calculateTextDimensions(commentLabel, "node_comment", 0, 0, d.w);
            var commentHeight = Math.max(d.h, textSize[1]);
            // Get References
            var commentNode = node.select(".node_comment_group");
            var commentRect = node.select(".node_comment_rect");
            var fo = node.select('foreignObject')
            var commentText = node.select('foreignObject div');
            // position
            commentNode.attr("transform",function(d) { return "translate(0,"+d.h+")"; });
            // Draw Rect
            commentRect.attr("rx",5).attr("ry",5)
                .attr("width",d.w)
                .attr("height",commentHeight)
                .attr("fill","#FFFFFF");
            // Size Comment.
            fo.attr("text-anchor","start")
                .attr("requiredFeatures","http://www.w3.org/TR/SVG11/feature#Extensibility")
                .attr("class","node_comment")
                .attr("width", d.w)
                .attr("height", commentHeight)
                .attr("x", 2)
                // .attr("y", (d.h/2 - textSize[1]/2))
                .attr("y", 2);
            console.log("redrawing Comment w: "+d.w);
            // Update Comment.
            commentText.text(commentLabel);
        }
    }
    return component;
})();
