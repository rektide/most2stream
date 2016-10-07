#!/usr/bin/env node
"use strict"

var WritableMost = require("..").WritableMost
var Most = require("most")

var writable = WritableMost()
writable.most.forEach(x => console.log("got:", x)).then(x => console.log("done", x))
var writer = writable.writable.getWriter()
writer.write(1)
writer.write(2)
writer.write(3)
writer.write(4)
writer.write(5)
writer.write(6)
writer.write(7)
writer.write(8)
setTimeout(function(){
	writer.write(9)
}, 600)
setTimeout(function(){
	writer.close()
}, 1200)
