RED.ui = RED.ui || {};
RED.ui.grid = (function () {
    var component = {};

    component.getData = function ()
    {
        return {
            space_width:1000,
            space_height:1000,
            gridSize:10
        };
    }

    component.toggleShowGrid = function (node, state)
    {
        var grid = node.select(".grid");
        if (state) {
            grid.style("visibility","visible");
        } else {
            grid.style("visibility","hidden");
        }

    }

    component.create = function (node) {
        node.append("svg:g").attr('class','grid');

    }

    component.Draw = function (node, data) {
        if (data == null) {
            throw new Error("must pass data object with {space_width, space_height, gridSize}");
        }

        // Get References
        var grid = node.select(".grid");
        var gridTicks = [];
        for (var i = 0; i < data.space_width; i += +data.gridSize) {
            gridTicks.push(i);
        }

        grid.selectAll("line.horizontal").remove();
        grid.selectAll("line.horizontal").data(gridTicks).enter()
            .append("line")
            .attr(
                {
                    "class": "horizontal",
                    "x1": 0,
                    "x2": data.space_width,
                    "y1": function (d) {
                        return d;
                    },
                    "y2": function (d) {
                        return d;
                    },
                    "fill": "none",
                    "shape-rendering": "crispEdges",
                    "stroke": "#eee",
                    "stroke-width": "1px"
                });
        grid.selectAll("line.vertical").remove();
        grid.selectAll("line.vertical").data(gridTicks).enter()
            .append("line")
            .attr(
                {
                    "class": "vertical",
                    "y1": 0,
                    "y2": data.space_width,
                    "x1": function (d) {
                        return d;
                    },
                    "x2": function (d) {
                        return d;
                    },
                    "fill": "none",
                    "shape-rendering": "crispEdges",
                    "stroke": "#eee",
                    "stroke-width": "1px"
                });

    }
    return component;
})();
