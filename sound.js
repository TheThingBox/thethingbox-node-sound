module.exports = function(RED) {
    "use strict";
    var exec = require('child_process').exec;
    var isUtf8 = require('is-utf8');
    function main(config) {
        RED.nodes.createNode(this,config);
        this.sound = config.sound;
		this.intensity = config.intensity;
        var node = this;
		var pid = null;
        this.on("input", function(msg) {
			if(typeof msg.sound != "undefined"){
				var sound = msg.sound ;
			}
			else{
				var sound = node.sound ;
			}
			var pidof = exec("pidof mpg321", {encoding: 'binary', maxBuffer:10000000}, function (error, stdout, stderr) {
				pid = new Buffer(stdout,"binary");
				if (isUtf8(pid)) {
					pid = pid.toString();
					node.log(typeof pid);
					if(pid.indexOf(" ") > -1){
						pid = pid.split(" ")[0];
					}
					if(pid.length == 0){
						pid = null;
					}
				}
			});
			if(pid != null){
				node.warn("-----------------kill " + pid + "-----------------");
				var kill = exec("kill " + pid, {encoding: 'binary', maxBuffer:10000000}, function (error, stdout, stderr) {
					if (error !== null) {
						node.warn(error);
					}
				});
				pid = null;
			}
			if(sound != ""){
				if(pid == null){
					var intensity = msg.intensity||node.intensity;
					node.status({fill:"blue",shape:"dot",text:"playing " + sound});
					if(typeof node.intensity != "undefined"){
						var intensity = exec("amixer cset numid=1 -- " + node.intensity + "%", {encoding: 'binary', maxBuffer:10000000}, function (error, stdout, stderr) {
							node.log("Volume : " + node.intensity + "%");
						});
					}
					if (RED.settings.verbose) { node.log(sound); }
					var mpg321 = exec("mpg321 " + sound, {encoding: 'binary', maxBuffer:10000000}, function (error, stdout, stderr) {
						msg.payload = new Buffer(stdout,"binary");
						if (isUtf8(msg.payload)) { msg.payload = msg.payload.toString(); }
						var msg2 = {payload:stderr};
						var msg3 = null;
						if (error !== null) {
							msg3 = {payload:error};
						}
						node.status({});
						node.send([msg,msg2,msg3]);
					});
					var pidof = exec("pidof mpg321", {encoding: 'binary', maxBuffer:10000000}, function (error, stdout, stderr) {
						pid = new Buffer(stdout,"binary");
						if (isUtf8(pid)) {
							pid = pid.toString();
							node.log(typeof pid);
							if(pid.indexOf(" ") > -1){
								pid = pid.split(" ")[0];
							}
						}
						node.log("MPG321 pid : " + pid);
					});
				}
				else{
					var kill = exec("kill " + pid, {encoding: 'binary', maxBuffer:10000000}, function (error, stdout, stderr) {
						if (error !== null) {
							node.warn(error);
						}
						pid = null;
					});
					
				}
			}
		});
		this.on('close', function() {
			
			// we stop the sound when the node is closed
			if(pid != null){
				var kill = exec("kill " + pid, {encoding: 'binary', maxBuffer:10000000}, function (error, stdout, stderr) {
					if (error !== null) {
						node.warn(error);
					}
					pid = null;
				});
				
			}
		});
	}
	RED.nodes.registerType("sound",main);
}
