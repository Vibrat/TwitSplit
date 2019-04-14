var content = "qekjhsdkqj dkqjdqu dkajdqid aksjd qid askd qi";
const splitRegex = /\s/;
let chunkMessages = content.split(splitRegex);
chunkMessages = chunkMessages.filter(word => word.length > 0);

console.log (content.length);
console.log ("return train value", calculateBatch(content.length, 49));

function calculateBatch(data, batch) {
    let batchSize = Math.ceil(data / batch);
    let poolSizeGap = 0;
    for (n=1; n <= batchSize.toString().length; n++) {
        console.log ('n', n);
        if (n != batchSize.toString().length) {
            poolSizeGap += 9*(10**(n-1))*n;
        } else {
            poolSizeGap += (batchSize + 1 - 10**(batchSize.toString().length-1))*batchSize.toString().length;
        }
    }

    poolSizeGap += batchSize +batchSize*batchSize;
    return Math.ceil((data + poolSizeGap)/ batch);
}
