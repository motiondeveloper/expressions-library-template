{
	"getLayerDuration": function(layerName) {
	    const layer = thisComp.layer(layerName);
	    return layer.outPoint - layer.inPoint;
	},
	
	"remap": function(value) {
	    return linear(value, 0, 10, 0, 1);
	},
	"someFunction": function() {
	    return 'Local Function';
	},
	"someValue":  2,
}