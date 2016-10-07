"use strict"

var Most = require("most")
var WhatwgStreams = require("web-streams-polyfill")

/**
 * A writable stream whose value is captured into a most stream
 */
function WritableMost(){
	/**
	 * Store for incoming elements
	 * @private
	 */
	var ingress = [] // hold written data in here until it can be processed
	var signal // if existing, unfold waiting for data
	var going = false // state of the writable

	/**
	 * stream unfolds through all the available ingresser deferreds until no more are available
	 */
	function unfold(){
		// drain stored
		if(ingress.length)
			var value = ingress.pop()
			return {
				value
			}
		}
		// drained, check for done
		if(!going){
			return {
				done: true
			}
		}
		// loop
		signal = Promise.defer()
		return signal.promise.then(unfold)
	}
	var most = Most.unfold(unfold)
	/**
	 * writable represents the writable stream 
	 */	
	var writable = new (WhatwgStreams.WritableStream)({
		start(controller){
			going = true
		},
		write(chunk){
			ingress.push(chunk)
			if(signal){
				signal.resolve()
				signal = null
			}
		},
		close(){
			going = false
		}
	})
	return {most, writable}
}

module.exports = WritableMost
