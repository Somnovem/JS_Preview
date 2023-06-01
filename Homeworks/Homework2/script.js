function SolveQuadraticEquation(a,b,c){
    if(isNaN(a) || isNaN(b) || isNaN(c)){
        console.error('Incorrect arguments');
    }
    var roots = [];
    var discriminant = b*b - 4*a*c;
    if(discriminant >= 0){
        var discriminantRoot = Math.sqrt(discriminant);
        roots[0] = ((-1)*b - discriminantRoot) / 2*a;
        if(discriminant > 0){
            roots[1] = ((-1)*b + discriminantRoot) / 2*a;
        }
    }
    return roots;
}

function DistanceBetweenTwoDots2D(ax,ay,bx,by){
    if(isNaN(ax) || isNaN(ay) || isNaN(bx)|| isNaN(by)){
        console.error('Incorrect arguments');
    }

    return Math.sqrt(Math.pow((bx-ax),2) + Math.pow((by-ay),2));
}

function DistanceBetweenTwoDots3D(ax,ay,az,bx,by,bz){
    if(isNaN(ax) || isNaN(ay) || isNaN(az) || isNaN(bx)|| isNaN(by) || isNaN(bz)){
        console.error('Incorrect arguments');
    }

    return Math.sqrt(Math.pow((bx-ax),2) + Math.pow((by-ay),2) + Math.pow((bz-az),2));
}

function NumberOfDigitsIteratively(number){
    if(isNaN(number)){
        console.error('Incorrect arguments');
    }
    if (number == 0) {
        return 1;
    }
    let count = 0;
    while (number >= 1) {
        number = number / 10;
        count++;
    }
    return count;
}

function NumberOfDigitsRecursively(number){
    if(isNaN(number)){
        console.error('Incorrect arguments');
    }
    if (number < 10) return 1;
    return NumberOfDigitsRecursively(Math.floor(number / 10))+1;
}

function SumOfDigitsIteratively(number){
    if(isNaN(number)){
        console.error('Incorrect arguments');
    }
    if (number == 0) {
        return 0;
    }
    let res = 0;
    while (number >= 1) {
        res += Math.floor(number % 10);
        number = number / 10;
    }
    return res;
}

function SumOfDigitsRecursively(number){
    if( number < 10) return number;
    return (number % 10) + SumOfDigitsRecursively(Math.floor(number / 10));
}

function MaximalElementOfArrayRecursively(arr){
    if(arr.length == 1) return arr[0];
    return Math.max(arr[0],MaximalElementOfArrayRecursively(arr.slice(1)));
}

function ConvertDecimalToBinaryRecursively(number){
    if(number <=0) return'0';
    return ConvertDecimalToBinaryRecursively(Math.floor(number / 2)) + number % 2;
}