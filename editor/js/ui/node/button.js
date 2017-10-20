RED.ui = RED.ui || {};
RED.ui.button = (function () {
    var component = {};

    component.create = function (node, d) {
        var rootNode = node.append("svg:g")
            .attr("class", function (d) {
                return "node_button " + ((d._def.align == "right") ? "node_right_button" : "node_left_button");
            });
        // background
        rootNode.append("rect")
            .attr("rx",5)
            .attr("ry",5)
            .attr("width",32)
            .attr("height",d.h-4)
            .attr("fill","#eee");

        rootNode.append("rect")
            .attr("class","node_button_button")
            .attr("x",function(d) { return d._def.align == "right"? 11:5})
            .attr("y",4)
            .attr("rx",4)
            .attr("ry",4)
            .attr("width",16)
            .attr("height",d.h-12)
            .attr("fill",function(d) { return d._def.color;})
            .attr("cursor","pointer");

        return rootNode.select('.node_button_button');
    }

    component.Draw = function (node, d) {
        // Get References
        var rootNode = node.select(".node_button");
        var nodeRect = rootNode.select("rect");
        var nodeButton = rootNode.select(".node_button_button");
        // position
        rootNode.attr("transform", function (d) {
            return "translate(" + ((d._def.align == "right") ? 94 : -25) + ",2)";
        })
        // Draw Rect
        nodeRect.attr("height",d.h-4);

        // button
        nodeButton.attr("height",d.h-12)

    }
    return component;
})();

// Original.
// var nodeButtonGroup = node.append("svg:g")
//     .attr("transform",function(d) { return "translate("+((d._def.align == "right") ? 94 : -25)+",2)"; })
//     .attr("class",function(d) { return "node_button "+((d._def.align == "right") ? "node_right_button" : "node_left_button"); });
// nodeButtonGroup.append("rect")
//     .attr("rx",5)
//     .attr("ry",5)
//     .attr("width",32)
//     .attr("height",node_height-4)
//     .attr("fill","#eee");//function(d) { return d._def.color;})
// nodeButtonGroup.append("rect")
//     .attr("class","node_button_button")
//     .attr("x",function(d) { return d._def.align == "right"? 11:5})
//     .attr("y",4)
//     .attr("rx",4)
//     .attr("ry",4)
//     .attr("width",16)
//     .attr("height",node_height-12)
//     .attr("fill",function(d) { return d._def.color;})
//     .attr("cursor","pointer")