//The test to find if a keyword could be recognised 

const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, 'test.txt');
const outputPath = path.join(__dirname, 'output.txt');


fs.readFile(inputPath, 'utf8', (err, data) => {
    if(err){
        console.error(err);
        return;
    }
    const keyword = "han"
    const lowerText = data.toLowerCase();

    //alla ord för sig
    const split = lowerText.split(/[\r\n. ]+/);
    console.log(split)
    fs.writeFile(outputPath, lowerText, (err) =>{
        if(err){
            console.error(err)
            return;
        }
        console.log("lowercase!")
    })

});
