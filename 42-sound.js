/**
 * Copyright 2015 Digital Airways
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

module.exports = function(RED) {
    "use strict";
    var Player = require("player");

    function Sound(n) {
        RED.nodes.createNode(this, n);

        this.sound = n.sound;
        this.playing = false;
        createPlayer(this, this.sound);

        var node = this;

        this.on('input', function(msg) {
            if(msg.command && msg.command === "stop" && node.playing) {
                stopPlayer(node);
                node.lastmsgreceived = null;
                node.send([msg,null]);
            } else {
                node.lastmsgreceived = msg;
                if(msg.sound) {
                    createPlayer(node, msg.sound);
                } else if(node.player.playList()[0] != node.sound){
                    createPlayer(node, node.sound);
                }
                if(node.playing){
                    stopPlayer(node);
                }
                node.player.play(function(err) {
                    if(err) {
                        node.warn(err);
                    } else {
                        node.send([null, msg]);
                    }
                    node.playing = false;
                });
                node.playing = true;
                node.send([msg, null]);
            }
        });

        this.on("close", function() {
            if(node.playing)
                node.player.stop();
        });
    }
    RED.nodes.registerType("sound", Sound);

    function createPlayer(node, sound) {
        if(node.playing) {
            stopPlayer(node);
        }
        node.player = new Player([sound]);
        node.player.on("error", function(err) {
            node.warn(err);
        });
    }

    function stopPlayer(node) {
        node.player.stop();
        node.playing = false;
    }

}
