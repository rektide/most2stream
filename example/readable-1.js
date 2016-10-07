#!/usr/bin/env node
"use strict"

var ReadableMost = require("..").ReadableMost
var Most = require("most")

var most = Most.from([1,2,3,4,5])
var readable = ReadableMost(most)
var reader = readable.getReader()
reader.read().then(x => console.log("1:", x))
reader.read().then(x => console.log("2:", x))
reader.read().then(x => console.log("3:", x))
reader.read().then(x => console.log("4:", x))
reader.read().then(x => console.log("5:", x))
reader.read().then(x => console.log("6:", x))
reader.read().then(x => console.log("7:", x))
