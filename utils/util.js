exports.shuffle = function (array) {
    var tmp, next;
    var size = array.length;

    for (var i = size -1; i > 0; i --) {
        next = Math.floor(Math.random() * (i + 1));
        tmp = array[i];
        array[i] = array[next];
        array[next] = tmp;
    }
    return array;
}
