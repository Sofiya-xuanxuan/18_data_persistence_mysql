const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

const asyncFun = async (fun, curMax = 4, sum = 200) => {
    let num = 0;
    let curNum = 0;
    console.log('beginTime:' + new Date().toLocaleString());
    const result = [];
    console.log(curNum);
    while (num !== sum) {

        if (curNum <= curMax) {
            result.push(new Promise(async resolve => {
                console.log(`Process Run 并发数:${curNum} 完成:${num}/${sum} `);
                res = await fun();
                curNum--;
                console.log(curNum+'并发数1');
                resolve(res)
            }));
            num++;
            curNum++;
            console.log(curNum+'并发数2');
        } else {
            console.log(curNum+'并发数3');
            await sleep(10)
        }
    }
    console.log('endTime:' + new Date().toLocaleString())
};
module.exports = {asyncFun};

// 测试
// const test = async () => {
//     const delay = (Math.random() * 1000).toFixed();
//     await sleep(delay)
// };
// setTimeout(() => asyncFun(test, 4, 10));
