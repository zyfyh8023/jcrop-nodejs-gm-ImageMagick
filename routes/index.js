var gm = require('gm'),
	fs = require('fs'),
	imageMagick = gm.subClass({ imageMagick : true });

exports.index = function(req, res){
	res.render('jcrop', { title: 'demo'});
};

exports.doJcrop = function(req, res){
	res.header('Content-Type', 'text/plain');

	var path = req.files.img.path,	//获取用户上传过来的文件的当前路径
		sz = req.files.img.size,
		x=req.body.x1,
		y=req.body.y1,
		W=req.body.imgw,
		H=req.body.imgh;

	if (sz > 2*1024*1024) {
		fs.unlink(path, function() {	//fs.unlink 删除用户上传的文件
			return res.end('图片的尺寸过大！');
		}); 
	} else if (req.files.img.type.split('/')[0] != 'image') {
		fs.unlink(path, function() {
			return res.end('只可以上传图片哦~');
		});
	} else {
		imageMagick(path)
		.crop(W,H,x,y)
		//.resize(200, 200, '!') //加('!')强行把图片缩放成对应尺寸150*150！
		.autoOrient()
		.write('public/images/user/'+req.files.img.name, function(err){
			if (err) {
				return res.end('存储失败！');
			}
			fs.unlink(path, function() {
				return res.end('200');
			});
		});
	}

};
