# thethingbox-node-sound

## Installation

	$ sudo apt-get install libasound2-dev
	$ npm install git+https://github.com/TheThingBox/player.git

## Presentation

This node play mp3 files online or local. It can play mp3 streams too.

## Usages

###Start
When an input event occurs in the node, the music starts.

###Stop
Send to the sound node an empty msg.sound value.


## Node-RED example flow

For run this example flow, you need go, intensity and intents (Open, Close, More, Less) nodes from TheThingbox

	[{"id":"b337904b.651698","type":"go","name":"","x":1023.3331909179688,"y":280.3333740234375,"z":"c3aed0d3.3ce58","wires":[["35db0df1.81b0aa"]]},{"id":"ed5bae1d.b6d33","type":"go","name":"","x":1032.333251953125,"y":339.3333740234375,"z":"c3aed0d3.3ce58","wires":[["52a98064.249ff8"]]},
	{"id":"35db0df1.81b0aa","type":"Open","x":1188.333251953125,"y":302.3333740234375,"z":"c3aed0d3.3ce58","wires":[["69251cea.fd3284"]]},{"id":"52a98064.249ff8","type":"Close","x":1199.333251953125,"y":350.3333435058594,"z":"c3aed0d3.3ce58","wires":[["69251cea.fd3284"]]},
	{"id":"69251cea.fd3284","type":"sound","name":"France Inter","sound":"http://mp3.live.tv-radio.com/franceinter/all/franceinterhautdebit.mp3","x":1447.333251953125,"y":468.3333435058594,"z":"c3aed0d3.3ce58","wires":[["c1811f8d.e8e45"],["4770a6d3.f51208"]]},
	{"id":"c1811f8d.e8e45","type":"debug","name":"","active":true,"console":"false","complete":"false","x":1622.333251953125,"y":426.33331298828125,"z":"c3aed0d3.3ce58","wires":[]}{"id":"4770a6d3.f51208","type":"debug","name":"","active":true,"console":"false","complete":"false","x":1635.333236694336,"y":505.3333282470703,"z":"c3aed0d3.3ce58","wires":[]},
	{"id":"dd74d5d5.65bf8","type":"go","name":"","x":1035.333251953125,"y":410.33331298828125,"z":"c3aed0d3.3ce58","wires":[["258b5f86.b32fb"]]},{"id":"40c616ed.5c6a4","type":"go","name":"","x":1034.333251953125,"y":473.3333435058594,"z":"c3aed0d3.3ce58","wires":[["e83d4657.4b90a8"]]},{"id":"c073c0e6.f502f8","type":"go","name":"","x":1069.333251953125,"y":544.3333129882812,"z":"c3aed0d3.3ce58","wires":[["a99706cf.ed1c58"]]},
	{"id":"258b5f86.b32fb","type":"More","x":1208.333251953125,"y":410.9999084472656,"z":"c3aed0d3.3ce58","wires":[["69251cea.fd3284"]]},{"id":"e83d4657.4b90a8","type":"Less","x":1207.3331909179688,"y":479.00001525878906,"z":"c3aed0d3.3ce58","wires":[["69251cea.fd3284"]]},{"id":"a99706cf.ed1c58","type":"intensity","property":"intensity","name":"","min":0,"max":100,"val":"50","x":1244.3331909179688,"y":543.0000152587891,"z":"c3aed0d3.3ce58","wires":[["69251cea.fd3284"]]},{"id":"5cc6883a.53f4a","type":"go","name":"","x":1075.3333740234375,"y":605.3333129882812,"z":"c3aed0d3.3ce58","wires":[["f9b069f6.d444f8"]]},
	{"id":"f9b069f6.d444f8","type":"intensity","property":"intensity","name":"","min":0,"max":100,"val":"0","x":1248.3333587646484,"y":602,"z":"c3aed0d3.3ce58","wires":[["69251cea.fd3284"]]},{"id":"5bec165d.c9a478","type":"go","name":"","x":1068.3333740234375,"y":664.3333129882812,"z":"c3aed0d3.3ce58","wires":[["fea8187f.07651"]]},{"id":"fea8187f.07651","type":"intensity","property":"intensity","name":"","min":0,"max":100,"val":"100","x":1241.3333587646484,"y":661,"z":"c3aed0d3.3ce58","wires":[["69251cea.fd3284"]]}]