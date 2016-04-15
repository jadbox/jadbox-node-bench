const express = require('express');
const app = express();
const Rx = require('rx');
const Rxo = Rx.Observable;
const _ = require('lodash');
const bodyParser = require('body-parser');
const compression = require('compression');
const zlib = require('zlib');

var PORT = 8088;
var RELOAD = true;

app.use(compression({
    'strategy': zlib.Z_FILTERED,
    'level': 6
}));
app.use(bodyParser.json());

app.use('/', function(req, res, next) {
    const body = req.body;
    if(!body.text) {
    	res.send('missing text parameter');
    	return
    }
    console.log('Message text', req.body)

    step1(body.text, x=>step2(x, y=>
    	res.send({
        	'data': y
    	})
    ))
    
});

app.listen(PORT, function() {
    console.log('Bench app listening on port', PORT);
});

function step1(text, cb) {
	const c = text.split('');
	const s1 = _.map(c, x => 'char ' + x);
	const s2 = _.chain(s1).map(x => ({ char: x, foo: 'bar', random: { val: Math.random() } }))
				.filter(x=>x.char.indexOf('w')===-1).map(x=>x.char.replace('char ', '')).value();
	
	cb(s2.join(''));
}

function step2(text, cb) {
	Rxo.from(text).flatMap(x => Rxo.fromArray(x.split('')))
	.map(x => ({ char: x, foo: 'bar', random: { val: Math.random() } }))
	.filter(x=>x.char.indexOf('d')===-1)
	.map(x=>x.char.replace('char ', ''))
	.toArray()
		.subscribe(x=>{
			cb(x.join(''));
		})
}