fis.config.set('modules.postpackager', 'simple');
fis.config.set('project.charset', 'gbk');

fis.config.set('pack',{
    'js/index.min.js': [
        'js/jquery.tmpl.min.js',
        'js/index.js',
        'js/carousel.js',
        'js/dianjiang.js'
    ],
    'css/index.min.css' : [
        'css/index.css',
        'css/tese.css',
        'css/dianjiang.css',
        'css/yuyue.css'
    ]
});
fis.config.merge({
    roadmap : {
        domain : {
            //所有的js文件使用
            '**.js' : 'http://res.zgmh.netease.com/gw/14v3',
            '**.css' : 'http://res.zgmh.netease.com/gw/14v3',
            'image' : 'http://res.zgmh.netease.com/gw/14v3'
        }
    }
});