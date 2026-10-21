const MAX_LEN = 5;

function generator() {
    let ans = "";
    const subset = "123456789abcdefghijkmnopqrstwxyz";
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}


export { generator }