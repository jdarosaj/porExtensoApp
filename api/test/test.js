const controller = require('../controllers/porExtensoController');

function startTest(){

    const startInterval = -1500;
    const stopInterval = 1500;

    for(let i = startInterval;i <= stopInterval; i++) {
        console.log(`i=${i}  fullNumber=${controller.fullNumber(i)}`);
    }
    console.log(`i=10000  fullNumber=${controller.fullNumber(10000)}`);
    console.log(`i=99999  fullNumber=${controller.fullNumber(99999)}`);
    console.log(`i=-99999  fullNumber=${controller.fullNumber(-99999)}`);
    console.log(`i=50000  fullNumber=${controller.fullNumber(50000)}`);
    console.log(`i=500  fullNumber=${controller.fullNumber(500)}`);
}

startTest();