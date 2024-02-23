const fs = require('fs');

function findCountForPair(pair, pairsData) {
    for (const item of pairsData) {
        if (item.pairs.includes(pair)) {
            return item.count;
        }
    }
    return null;
}

const pairToCheck = '1,1';
const pairsFileName = 'pairs.json';

fs.readFile(pairsFileName, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const pairsData = JSON.parse(data);
        const count = findCountForPair(pairToCheck, pairsData);
        if (count !== null) {
            console.log(`Count for pair ${pairToCheck}: ${count}`);
        } else {
            console.log(`Pair ${pairToCheck} not found.`);
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
