const tiers = [
    "IRON",
    "BRONZE",
    "SILVER",
    "GOLD",
    "PLATINUM",
    "DIAMOND",
    "MASTER",
    "GRANDMASTER",
    "CHALLENGER"
];

function getRangeTier(tier){
    const index = tiers.indexOf(tier);
    if (index==0) {
        return [tiers[0],tiers[1]];
    }
    if (index==8) {
        return [tiers[7],tiers[8]];
    }
    return [tiers[index-1],tiers[index],tiers[index+1]];
}
module.exports = getRangeTier;