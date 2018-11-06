import { Test } from './test';

var peter = new Test("peter");
var app = document.getElementById("app") || document.body;
app.appendChild(document.createTextNode(peter.display()));