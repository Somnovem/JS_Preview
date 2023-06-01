console.log("Task 1");
var spikyArr = [];
for(var i = 0; i < Math.floor(Math.random() * 9) + 1; ++i) {
    spikyArr[i] = [];
    for(var j = 0; j < Math.floor(Math.random() * 9) + 1; ++j) {
        spikyArr[i][j] = Math.floor(Math.random() * 100);
    }    
}

console.log(spikyArr);

console.log("Task 2");

for(var i = 0; i < spikyArr.length; ++i) {
    spikyArr[i].sort(((a, b) => {a-b}));
}

console.log(spikyArr);