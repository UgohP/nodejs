const { readFile, writeFile } = require('fs')

console.log('Start task')
readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    const first = result
    readFile('./content/second.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err)
            return
        }

        const second = result
        writeFile('./content/result-sync.txt', `Here is the reuslt of them: ${first}, ${second}`, (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('Done with this task')
        })
    })
})
console.log('Starting next task')

// const { readFile } = require('fs');
// const { reject, concat, result } = require('lodash');
// const { resolve } = require('path');

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile((path), 'utf8', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

// const start = async () => {
//     try {
//         const first = await getText('./content/first.txt')
//         console.log(first)
//     } catch (error) {
//         console.log(error)
//     }
// }

// start()
// getText('./content/first.txt')
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err))

// const { readFile, writeFile } = require('fs');
// const util = require('util');

// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

// const start = async () => {
//     try {
//         const first = await readFilePromise('./content/first.txt', 'utf8')
//         const second = await readFilePromise('./content/second.txt', 'utf8')
//         await writeFilePromise('./content/third.txt', `This is the third file and ${first}, ${second}`)
//         console.log(first, second)
//     } catch (error) {
//         console.log(error)
//     }
// }

// start()