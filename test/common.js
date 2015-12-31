global.chai = require("chai");
global.should = require("chai").should();
global.sinon = sinon = require('sinon');

var sinonChai = require('sinon-chai');
global.chai.use(sinonChai);