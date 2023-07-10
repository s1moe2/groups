const { expect } = require("chai");
const { generateGroups } = require("./services");

describe("generateGroups", () => {
    it("should generate groups of the specified size", () => {
        const names = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
        const size = 2;
        const groups = generateGroups(names, size);
        
        expect(groups).to.have.lengthOf(3); // We expect 3 groups
        
        // Check each group size
        expect(groups[0]).to.have.lengthOf(2);
        expect(groups[1]).to.have.lengthOf(2);
        expect(groups[2]).to.have.lengthOf(1);
    });
    
    it("should distribute names randomly across groups", () => {
        const names = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
        const size = 2;
        const groups = generateGroups(names, size);
        
        // Ensure all names are distributed across groups
        const allNames = groups.flat();
        expect(allNames).to.have.members(names);
    });
});