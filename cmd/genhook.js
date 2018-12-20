let fs = require("fs");
let path = require("path");

let exit = false;
// try{
//     exit  = fs.statSync(path.resolve("../.git/hooks/pre-commit"));
// }
// catch(e){
    // fs.copyFileSync("./cmd/pre-commit","./.git/hooks/pre-commit");
// }

try{
	fs.copyFileSync("./cmd/pre-commit","./.git/hooks/pre-commit");
}
catch(e){
	console.log('请升级你的node版本');
	process.exit(1);
}