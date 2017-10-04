/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.portUtils = (function() {

    var MODE_LEFT_RIGHT= 'left-right';
    var MODE_TOP_BOTTOM= 'top-bottom';

    // Pre-calculate the positions of the ports.
    // node = node (i.e. not d3Node
    // X = x position of node
    // Y = y position of node
    var calculatePortPositions = function (node, X, Y)
    {
        //var positions = {in:{left:[], top:[]}, out:{right:[], bottom:[]}};
        var positions = {in:[], out:[]}
        var portCounts = countOutputPorts(node); // Counts ports on the right and bottom edges

        // Node information;
        var nw = node.w;   // hardcoded in view.js line 50;
        var nh = node.h;    // hardcoded in view.js line 51;
        nh = Math.max(nh,(portCounts.rightPortCount||0) * 15); // Recalculate based on number of ports...
        var pW = 10;    // port width
        var pH = 10;    // port height
        var pS = 13;     // port spacing

        // ************************************
        // Calculate INPUTS.
        // ************************************
        if(node.inputAlignments !== undefined && node.inputAlignments[0] == true)
        {
            positions.in.push({x:X + nw/2 - pW/2,y:Y - pH/2, vertical:true});

        }else{
            positions.in.push({x:X - pW/2,y:Y + nh/2 - pH/2, vertical:false});
        }

        // ************************************
        //  Calculate OUTPUTS.
        // ************************************

        for (var i=0; i< node.outputs; i++)
        {
            if( node.outputAlignments !== undefined )
            {
                var alignBottom = node.outputAlignments ? node.outputAlignments[i]: false;
                var edgeIndex = getEdgeIndex(node,i,alignBottom);
                if(alignBottom)
                {
                    positions.out.push({x:X + nw/2 - (portCounts.bottomPortCount * pS)/2 + (pS*edgeIndex),y: Y + nh - pH/2, vertical:true});
                }else{
                    positions.out.push({x:X + nw - pW/2,y: Y + nh/2 - (portCounts.rightPortCount * pS)/2 + (pS*edgeIndex), vertical:false});
                }
            }else{
                //
                positions.out.push({x:X + nw - pW/2,y: Y + nh/2 - (portCounts.rightPortCount * pS)/2 + (pS*i), vertical:false});
            }
        }

        // Manage exceptions with subflows not having input/output data.
        if(node.type == "subflow" && node.direction == "in")
        {
            positions.out.push({x:X + nw - pW/2,y: Y + nh/2 - (portCounts.rightPortCount * pS)/2 + (pS*0), vertical:false});
        }

        return positions;
    }


    // Ports may be aligned left|top or right|bottom.
    // to position the ports neatly you need to get the index of that port along the edge.
    // this index is used to multiply the spacing.
    var getEdgeIndex = function (node, sourcePort, state){
        var p = 0;
        node.outputAlignments.forEach(function (v,i){
            if(i < sourcePort && v == state)
            {
                p++;
            }
        });
        return p;
    }
    // This counts the ports aligned along the right or bottom edges.
    // You don't need to count the input ports as there is only ever one input.
    var countOutputPorts = function (node)
    {
        // count ports aligned to right and bottom edges.
        var rightPortCount = 0;
        var bottomPortCount = 0;
        if(node.outputAlignments !== undefined)
        {
            node.outputAlignments.forEach(function (v){if(v==false){rightPortCount++}else{bottomPortCount++}} );
        }
        return {rightPortCount:rightPortCount, bottomPortCount:bottomPortCount}
    }

    // connects output ports to input ports. target is an Input Port
    var drawWire = function (outputNode, inputNode, outputPortIndex)
    {
        outputPortIndex = outputPortIndex;
        var outputPositions = calculatePortPositions(outputNode,0,0);
        var inputpositions = calculatePortPositions(inputNode,0,0);

        // This will be facing to the right or downwards
        var outdata = outputPositions.out[outputPortIndex];
        var x1 = outputNode.x - outputNode.w/2 + 5 + outdata.x ;//+ outputNode.w/2;
        var y1 = outputNode.y - outputNode.h/2 + 5 + outdata.y ;
        var cx1 = x1 + (outdata.vertical ? 0 : 60);
        var cy1 = y1 + (outdata.vertical ? 60 : 0);

        // This will be facing to the left or upwards.
        var indata = inputpositions.in[0];
        var x2 = inputNode.x - inputNode.w/2 + 5 + indata.x;
        var y2 = inputNode.y - inputNode.h/2 + 5 + indata.y;
        var cx2 = x2 - (indata.vertical ? 0 : 60);
        var cy2 = y2 - (indata.vertical ? 60 : 0);


        var wire = ""
        wire += "M " + x1 + ' ' + y1;
        wire += " C " + cx1 + ' ' + cy1;
        wire += " " + cx2 + ' ' + cy2;
        wire += " " + x2 + ' ' + y2;
        return wire
    }

    var drawMouseWire = function (node, portIndex, mouseX, mouseY)
    {
        var outputPositions = calculatePortPositions(node,0,0);

        // This will be facing to the right or downwards
        var outdata = outputPositions.out[portIndex];
        var x1 = node.x - node.w/2 + 5 + outdata.x ;//+ outputNode.w/2;
        var y1 = node.y - node.h/2 + 5 + outdata.y ;
        var cx1 = x1 + (outdata.vertical ? 0 : 60);
        var cy1 = y1 + (outdata.vertical ? 60 : 0);

        // This will be facing to the left or upwards.
        var x2 = mouseX;
        var y2 = mouseY;
        var mouseOrientation = false;
        var cx2 = x2 ;//- (mouseOrientation ? 0 : 60);
        var cy2 = y2 ;//- (mouseOrientation ? 60 : 0);


        var wire = ""
        wire += "M " + x1 + ' ' + y1;
        wire += " C " + cx1 + ' ' + cy1;
        wire += " " + cx2 + ' ' + cy2;
        wire += " " + x2 + ' ' + y2;
        return wire
    }

    return {
        getEdgeIndex: getEdgeIndex,
        countOutputPorts: countOutputPorts,
        MODE_LEFT_RIGHT: MODE_LEFT_RIGHT ,
        MODE_TOP_BOTTOM: MODE_TOP_BOTTOM,
        calculatePortPositions:calculatePortPositions,
        drawWire:drawWire,
        drawMouseWire:drawMouseWire
    }
})();
