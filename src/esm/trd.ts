/*
import jsflow from './lib';

const json = jsflow.init().name("");
*/

import endure from './lib';

// create("users");
// create()

// endure.create("")

const json = endure.init().name("users");
const db = json.createDatabase("mydb");