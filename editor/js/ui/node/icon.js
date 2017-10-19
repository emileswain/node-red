RED.ui = RED.ui || {};
RED.ui.icon = (function () {
    var component = {};

    component.create = function (node, d) {
        var icon_url = RED.utils.getNodeIcon(d._def,d);
        var icon_group = node.append("g")
            .attr("class","node_icon_group");

        var icon_shade = icon_group.append("rect")
            .attr("class","node_icon_shade")
            .attr("width","30")
            .attr("stroke","none")
            .attr("fill","#000")
            .attr("fill-opacity","0.05");


    }

    component.Draw = function (node, d) {
        var icon_group = node.select(".node_icon_group");
        var icon_shade = icon_group.select('node_icon_shade');
        // position
        icon_group.attr("x",0).attr("y",0);

        // shade
        icon_shade.attr("x",0)\
            .attr("y",0)
            .attr("height",function(d){return Math.min(50,d.h-4);});


    }
    return component;
})();
