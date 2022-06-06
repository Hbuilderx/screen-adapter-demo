const designWidth = 5200;
const designHeight = 1976;

let styleUtil = {

    // px转vw, vh换算
    px2vw: function (_px) {
        return _px*100.0/designWidth +'vw';
    },

    px2vh: function (_px) {
        return _px*100.0/designHeight +'vh';
    },

    px2font:function (_px) {
        return _px*100.0/designWidth + 'vw';
    },

};

export default styleUtil;