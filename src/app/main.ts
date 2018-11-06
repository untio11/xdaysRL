import { Test } from './test';

var peter = new Test("Peter");
var app = document.getElementById("app") || document.body;
app.appendChild(document.createTextNode(peter.display()));