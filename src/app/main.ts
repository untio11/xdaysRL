import { Test } from './test';
import { Display } from 'rot-js'

var peter = new Test("peter");
var app = document.getElementById("app") || document.body;
app.appendChild(document.createTextNode(peter.display()));