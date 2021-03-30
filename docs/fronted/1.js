async function sleap(timer) {
    await wating(timer);
}

function wating(timer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, timer);
    });
}


console.log(1);
async function ex() {
    await sleap(5000);
}
console.log(2);

ex();