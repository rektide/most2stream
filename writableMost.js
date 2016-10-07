"use strict"

var Most = require("most")
var WhatwgStreams = require("web-streams-polyfill")

/**
 * A writable stream whose value is captured into a most stream
 */
function WritableMost(){
	/**
	 * Ingresser deferred transfers values from the writable stream to the Most.unfold loop.
	 * @private
	 */
	var ingresser = Promise.defer()

	/**
	 * stream unfolds through all the available ingresser deferreds until no more are available
	 */
	var most = Most.unfold(function(seed){
		if(!seed){
			return {
				done: true
			}
		}
		var next = ingresser && ingresser.promise
		return seed.then(function(value){
			return {
				value,
				seed: next
			}
		})
	}, ingresser.promise)
	/**
	 * writable represents the writable stream 
	 */	
	var writable = new (WhatwgStreams.WritableStream)({
		start(controller){
		},
		write(chunk){
			var ingress = ingresser
			ingresser = Promise.defer()
			ingress.resolve(chunk)
		},
		close(){
			ingresser = null
		}
	})
	return {most, writable}
}

module.exports = WritableMost
