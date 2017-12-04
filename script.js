var connStyle = {
  dashstyle: "2 2",
  outlineColor: "white",
  outlineWidth: 5,
};

var common = {
  maxConnections: -1,
  connector: [
    "Bezier",
    { curviness: 50 }
  ],
  connectorStyle: connStyle,
  paintStyle: {
    fillStyle: "#ffa500",
    outlineColor: "white",
    outlineWidth: 1
  },
  hoverPaintStyle: {
    outlineColor: "#000000",
    outlineWidth: 5
  },
  connectorStyle: {
    strokeStyle: "#ffa500",
    lineWidth: 5
  }
};

jsPlumb.ready(function() {
  var index=144;

  $("#container").on('click','.addAgent',function(e) {
    addAgent('plugin' + index, "test");
    index++;
  });
});



function addAgent(id, title) {
  var getID = 'point-item' + id;
  var newAgent = $('<div>').attr('id', getID).addClass('item');
  var title = $('<p>').addClass('title').text(title);
  newAgent.append(title);

  $('#mathSection').append(newAgent);

  jsPlumb.addEndpoint(getID, {
      anchors: ["Bottom", "Bottom"],
      endpoint: "Dot",
      isSource: true,
      isTarget: false,
    },
    common
  );
  jsPlumb.addEndpoint(getID, {
    anchors: ["Top", "Top"],
    endpoint: "Rectangle",
    isSource: false,
    isTarget: true,
    connector: ["Straight", { curviness: 1 }],
  });

  jsPlumb.draggable(newAgent);
}
