require("@babel/polyfill");
let config = {

};

let fn = () => {
    console.log("===========fn======");
}

fn();


function * gen(params) {
    yield 1;
}
console.log(gen().next())


console.log("aaaaa".includes("a"));

console.log(DEV);
