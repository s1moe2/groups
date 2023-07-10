function generateGroups(names, size) {
    const shuffled = names
        .map((el) => ({
            name: el,
            rand: Math.random(),
        }))
        .sort((a, b) => (a - b))
        .map((el) => el.name);
    
    const groups = [];
    const chunkSize = size;
    for (let i = 0; i < shuffled.length; i += chunkSize) {
        groups.push(shuffled.slice(i, i + chunkSize));
    }

    return groups;
}

module.exports = {
    generateGroups,
}