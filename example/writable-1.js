#!/usr/bin/env node
"use strict"

var WritableMost = require("..").WritableMost
var Most = require("most")

process.on("unhandledRejection", x => console.log(x))

var writable = WritableMost()
writable.most.forEach(x => console.log(x)).then(x => console.log("done", x))
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
	writer.close()
}, 1000)
