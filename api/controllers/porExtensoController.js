'use strict';

var fullNumbers = [];
fullNumbers[0] = 'zero';
fullNumbers[1] = 'um';
fullNumbers[2] = 'dois';
fullNumbers[3] = 'tres';
fullNumbers[4] = 'quatro';
fullNumbers[5] = 'cinco';
fullNumbers[6] = 'seis';
fullNumbers[7] = 'sete';
fullNumbers[8] = 'oito';
fullNumbers[9] = 'nove';
fullNumbers[10] = 'dez';
fullNumbers[11] = 'onze';
fullNumbers[12] = 'doze';
fullNumbers[13] = 'treze';
fullNumbers[14] = 'quatorze';
fullNumbers[15] = 'quinze';
fullNumbers[16] = 'dezesseis';
fullNumbers[17] = 'dezessete';
fullNumbers[18] = 'dezoito';
fullNumbers[19] = 'dezenove';
fullNumbers[20] = 'vinte';
fullNumbers[30] = 'trinta';
fullNumbers[40] = 'quarenta';
fullNumbers[50] = 'cinquenta';
fullNumbers[60] = 'sessenta';
fullNumbers[70] = 'setenta';
fullNumbers[80] = 'oitenta';
fullNumbers[90] = 'noventa';
fullNumbers[100] = 'cem';
fullNumbers[200] = 'duzentos';
fullNumbers[300] = 'trezentos';
fullNumbers[400] = 'quatrocentos';
fullNumbers[500] = 'quinhentos';
fullNumbers[600] = 'seiscentos';
fullNumbers[700] = 'setecentos';
fullNumbers[800] = 'oitocentos';
fullNumbers[900] = 'novecentos';

function fullNumber(number) {
    const isNegative = number < 0;
    let ret = isNegative ? 'menos ' : '';
    number = Math.abs(number);

    let missingProcess = number;

    // Se o numero for maior que 999, primeiro processa a parte dos milhares
    if (missingProcess >= 1000) {
        var thousands = Math.floor(missingProcess / 1000);
        missingProcess = missingProcess - (thousands * 1000);
        ret += getHundreds(thousands) + ' mil';

        if (missingProcess > 0) {
            ret += ' e ';
        } else {
            missingProcess = -1;
        }
    }

    ret += getHundreds(missingProcess);
    return ret;
}

function getHundreds(missingProcess) {
    let ret = '';
    let lastProcessedValue;

    // Se o numero for maior que 99 processa as centenas
    if (missingProcess >= 100) {
        lastProcessedValue = Math.floor(missingProcess / 100);
        missingProcess = missingProcess - (lastProcessedValue * 100);
        if (lastProcessedValue === 1 && missingProcess > 0) {
            ret += 'cento';
        } else {
            ret += fullNumbers[lastProcessedValue * 100];
        }

        if (missingProcess > 0) {
            ret += ' e ';
        } else {
            missingProcess = -1
        }
    }

    // Se o numero for menor q 20 já pega direto o valor do array
    if (missingProcess <= 20 && missingProcess >= 0) {
        ret += fullNumbers[missingProcess];
        missingProcess = -1;
    }

    // Se o numero for entre 20 e 99 processa as dezenas
    if (missingProcess >= 10) {
        lastProcessedValue = Math.floor(missingProcess / 10);

        missingProcess = missingProcess - (lastProcessedValue * 10);
        ret += fullNumbers[lastProcessedValue * 10];

        if (missingProcess > 0) {
            ret += ' e ';
        } else {
            missingProcess = -1
        }
    }

    // Após processar as dezenas, se ainda houver algo restante para
    // processar o valor vai ser menor que 10, então pega direto do array
    if (missingProcess >= 0) {
        lastProcessedValue = Math.floor(missingProcess / 1);
        ret += fullNumbers[lastProcessedValue];
    }
    return ret;
}

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

        let fullNumberToReturn = fullNumber(numberReceived);
        res.json({"extenso": fullNumberToReturn});

        // Para essa tarefa obviamente poderia ser utilizado uma lib já pronta, por ex.:
        // const extenso = require('extenso');
        // let fullNumber = extenso(numberReceived);
        // res.json({"extenso": fullNumber});
    },

    // exportando a função para testes
    fullNumber: fullNumber
};
