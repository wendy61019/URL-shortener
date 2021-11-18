const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = upperLetters.toLowerCase()
const numbers = '1234567890'
const collection = upperLetters + lowerLetters + numbers

function shortenURL() {
    let shortCode = ''
    for(let i = 0; i < 5; i++){
        const randomIndex = Math.floor(Math.random() * collection.length)
        shortCode += collection[randomIndex]
    }
    return shortCode
} 

module.exports = shortenURL
