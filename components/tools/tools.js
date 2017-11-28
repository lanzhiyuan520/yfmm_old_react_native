

import CryptoJS from "crypto-js"

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
var key = 'D*HS^GW^DT2(*27&3%GF2B121s%S$*J1';

export function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if(i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if(i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

export function getSingedUrl(url,uuid){
    var nonce = Math.ceil((Math.random()+1)*1000000);//不需要动
    var secret = 'KD&2d&H1n^hdIH*&DK&^Y(4df*&&^dd1';//不可变
    var timestamp =  new Date().getTime();//不需要动
    var sign = 'nonce='+nonce+'timestamp='+timestamp+'uuid='+uuid+secret;
    sign = base64encode(CryptoJS.MD5(sign).toString());
    url = url+"&timestamp=" + timestamp+'&nonce='+nonce+'&sign='+sign;
    return url;
}
/**
 * 解密
 * @param str
 */
 export function decrypt(str) {
    var key = CryptoJS.enc.Utf8.parse("1111111111111111");// 秘钥
    var iv=    CryptoJS.enc.Utf8.parse('1234567890123412');//向量iv
    var decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
    return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * 加密
 */
function encrypt(str,key) {
    key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key).toString());//秘钥
    var iv= CryptoJS.enc.Utf8.parse('1234567890123412');//向量iv
    var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    return encrypted.toString();
}
//post 数据加密 返回数据直接写入 ajax 的 data 参数
export function getEncryptParam(json){
    var aes = base64encode(encrypt(JSON.stringify(json), key));//加密
    var param = {param: aes};
    return param;
}
//映射导航
export function getKeywordsByUserStatus( status ) {

    if ( !status ) {
        return ["无","无"] ;
    }else{
        var KeyWords = ["孕","月","育"] ;
        var UnitKeyWords = ["周","天","月"] ;
        var MinDay = [1,1,2] ;
        var MaxDay = [40,42,12] ;
        var status = (status*1)-1 ;
        return [KeyWords[status] , UnitKeyWords[status] , MinDay[status] , MaxDay[status]] ;
    }

}