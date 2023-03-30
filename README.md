# deep-clone
Worlds fastest deep clone

This is the worlds fastest deep cloning algorithm that can handle and maintain circular and self references, and does not error with functions (functions are converted to undefined)

Currently it will handle the following types
1. Object
1. Array
1. Map
1. Set
1. File
1. Blob
1. Primitives

In tests, this algorthim will clone objects almost at the same speed as the newly added (Chrome 98) structuredClone, but will not throw an exceptions with functions. 

It is upto 30x faster than Lodash 
