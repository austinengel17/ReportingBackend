
const arr = returnJsonArr();
console.log(JSON.stringify(arr));
async function returnJsonArr(){
    const a = [{A: "a"}, {A: "b"}]
    return a;
}
