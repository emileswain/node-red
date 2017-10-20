RED.ui = RED.ui || {};
RED.ui.icon = (function () {
    var component = {};

    component.Create = function (node, d) {
        var icon_url = RED.utils.getNodeIcon(d._def, d);


        var icon_group = node.append("g")
            .attr("class", "node_icon_group");
            icon_group.style("pointer-events", "none");

        var icon_shade = icon_group.append("rect")
            .attr("class", "node_icon_shade")
            .attr("width", "30")
            .attr("stroke", "none")
            .attr("fill", "#000")
            .attr("fill-opacity", "0.05");

        var icon = icon_group.append("image")
            .attr("xlink:href", icon_url)
            .attr("class", "node_icon")
            .attr("x",0)
            .attr("width","30")
            .attr("height","30");

        var icon_shade_border = icon_group.append("path")
            .attr("class", "node_icon_shade_border")
            .attr("stroke-opacity", "0.1")
            .attr("stroke", "#000")
            .attr("stroke-width", "1");

        RED.ui.icon.LoadImage(icon_url, node, d);
    }

    // And do icons actually change? that they need to be reloaded?
    // Will this cause a mem leak passing node and d ???
    component.LoadImage = function (icon_url, node, d)
    {
        var icon = node.select(".node_icon");
        var img = new Image();
        img.src = icon_url;
        img.onload = function () {
            icon.attr("width", Math.min(img.width, 30));
            icon.attr("height", Math.min(img.height, 30));
            icon.attr("x", 15 - Math.min(img.width, 30) / 2);
            RED.ui.icon.Draw(node,d);
        }
    }

    component.Draw = function (node, d) {
        var icon_group = node.select(".node_icon_group");
        var icon_shade = icon_group.select('.node_icon_shade');
        var icon = icon_group.select(".node_icon");
        var icon_shade_border = icon_group.select(".node_icon_shade_border");

        // Check If icon needs to change.
        var current_url = icon.attr("xlink:href");
        var new_url = RED.utils.getNodeIcon(d._def,d);
        if (new_url !== current_url) {
            icon.attr("xlink:href", new_url);
            RED.ui.icon.LoadImage(new_url, node, d);
        }

        // position
        icon_group.attr("x", 0).attr("y", 0);

        // shade
        icon_shade.attr("x", 0)
            .attr("y", 0)
            .attr("height", function (d) {
                return Math.min(50, d.h);
            });

        // icon
        icon.attr("x", 0)
            .attr("width", "30")
            .attr("height", "30")
            .attr("y",function(d){return (d.h-d3.select(this).attr("height"))/2;});

        // icon_shade_border
        icon_shade_border
            .attr("d",function(d){ return "M "+(("right" == d._def.align) ?0:30)+" 1 l 0 "+(d.h-2)});

        // Adjust alignment.
        if ("right" == d._def.align) {
            icon_group.attr("class", "node_icon_group node_icon_group_" + d._def.align);
            icon_shade_border.attr("d", function (d) {
                return "M 0 1 l 0 " + (d.h - 2)
            })
            //icon.attr("class","node_icon node_icon_"+d._def.align);
            //icon.attr("class","node_icon_shade node_icon_shade_"+d._def.align);
            //icon.attr("class","node_icon_shade_border node_icon_shade_border_"+d._def.align);
        }

        node.selectAll(".node_icon_group_right")
            .attr("transform", function (d) {
                return "translate(" + (d.w - 30) + ",0)"
            });

    }
    return component;
})();
