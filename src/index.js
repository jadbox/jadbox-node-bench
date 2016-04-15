const express = require('express');
const app = express();
const Rx = require('rx');
const Rxo = Rx.Observable;
const _ = require('lodash');
const bodyParser = require('body-parser');
const compression = require('compression');
const zlib = require('zlib');
const moment = require('moment');

var PORT = 8088;
var RELOAD = true;

app.use(compression({
    'strategy': zlib.Z_FILTERED,
    'level': 6
}));
app.use(bodyParser.json());

let i = 0;
app.use('/', function(req, res, next) {
    const body = req.body;
    /*if (!body.text) {
        res.send('missing text parameter');
        return
    }*/

    //console.log('Message text', req.body);
    console.time('request ' + (++i));
    const date = moment().utc();
    const text = genData();
    //console.log(text)
    const sample = step0();

    step1(text, x => step2(x, y => {
        console.timeEnd('request ' + i);
        res.send({
            'data': y,
            'date': date.format(),
            'sample': sample.format()
        })
    }))

});

app.listen(PORT, function() {
    console.log('Bench app listening on port', PORT);
});

function genData() {
	return _.chain(_.range(1000))
        .map(
            x => String.fromCharCode(Math.floor(Math.random()*(122-48))+48)
        ).reduce((acc,x)=>acc+x, 'wwwddd').value();
}

function step0() {
    return _.chain(_.range(100))
        .map(
            x => moment().utc().subtract(Math.floor(Math.random() * 100), 'day')
        ).sample().value();
}

function step1(text, cb) {
    const c = text.split('');
    const s1 = _.map(c, x => 'char ' + x);
    const s2 = _.chain(s1).map(x => ({
            char: x,
            foo: 'bar',
            random: {
                val: Math.random()
            }
        }))
        .filter(x => x.char.indexOf('w') === -1).map(x => x.char.replace('char ', '')).value();

    cb(s2.join(''));
}

function step2(text, cb) {
    Rxo.from(text).flatMap(x => Rxo.fromArray(x.split('')))
        .map(x => ({
            char: x,
            foo: 'bar',
            random: {
                val: Math.random()
            }
        }))
        .filter(x => x.char.indexOf('d') === -1)
        .map(x => x.char.replace('char ', ''))
        .toArray()
        .subscribe(x => {
            cb(x.join(''));
        })
}