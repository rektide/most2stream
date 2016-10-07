"use strict"

var Most = require("most")
var WhatwgStreams = require("web-streams-polyfill")

/**
 * Turn a Most.js stream into a ReadableStream
 */
function ReadableMost(most){
	var reading
	var readable = new (WhatwgStreams.ReadableStream)({
		start(controller){
			reading = true
			most.forEach(function(el){
				if(reading){
					controller.enqueue(el)
				}
			}).then(function(val){
				controller.close()
			}, function(err){
				controller.error(err)
			})
		},
		cancel(){
			reading = false
		}
	})
	return readable
}

module.exports = ReadableMost
