var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;


router.get('/', function(req, res, next) {
    //res.sendfile('test.html',{root: __dirname });
    res.render('test');
});

router.post('/', function(req,res, next){
    data = req.body.send;	//html에서 받은 send를 data변수에 저장
    console.log(data);	//콘솔 출력 함수
    //exec('python ../test.py/', function(error, stout, stderr){});	//쉘명령어로 파이썬 실행
    exec('python test.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        else
          console.log(`${stdout}`);
    });
    res.render('test');	//다시 html파일 뿌림
   });

module.exports = router;
