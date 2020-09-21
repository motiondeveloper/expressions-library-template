{
	"getLayerDuration": function(layerName) {
	    const layer = thisComp.layer(layerName);
	    return layer.outPoint - layer.inPoint;
	},
	
	"remap": function(value) {
	    return linear(value, 0, 10, 0, 1);
	},
	"welcome": function(name) {
	    return `Welcome ${name}!`;
	},
	"someValue":  2,
	"version":  '1.2.2'
}