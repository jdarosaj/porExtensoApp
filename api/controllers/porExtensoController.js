'use strict';

let fullNumber = function(){
    return '';
};

module.exports = {
    getNumberInFull: function (req, res) {
        let isBetween = function (interval, number) {
            if (!interval || interval.length !== 2)
                return null;
            return (number > interval[0] && number < interval[1])
        };

        let numberReceived = (req.params.number) ? parseInt(req.params.number) : undefined;
        if (numberReceived === undefined || isNaN(numberReceived)) {
            res.send("Não foi passado um número ou o mesmo está incorreto!");
            return;
        }

        const numberInterval = [-99999, 99999];
        if (!isBetween(numberInterval, numberReceived)) {
            res.send(`O número passado deve estar entre ${numberInterval[0]} e ${numberInterval[1]}.`);
            return;
        }

        // const isNegative = numberReceived < 0;

        let fullNumber = fullNumber(numberReceived);
        res.json({"extenso": fullNumber});


        // const extenso = require('extenso');
        // let fullNumber = extenso(numberReceived);
        // res.json({"extenso": fullNumber});
    }
};
