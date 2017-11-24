//API版本号
var API_VERSION = "v1/";
//var URI = "http://www.youfubaba.com:9201/";
//生产：
var URI = "https://api.youfumama.com/";

//文章分享url
var ARTICLE_URL = "http://nf.youfumama.com/article/show-article";

//问题分享url
var PROFEESIONAL_URL = "http://nf.youfumama.com/professional/show-professional";

//专家分享url
var PROBLEM_URL = "http://nf.youfumama.com/problem/show-problem";

//DoctorList
var DOCTORLIST = "professionals?";

//ColumnList
var COLUMNLIST = "group?";

//Question
var QUESTIONLIST = "problem?";

//文章类型常量
var ARTICLE_XIAOFU = 2;
var ARTICLE_YINSHI = 3;
var ARTICLE_SHIPIN = 4;

//行为常量
var COLLECT_ACTION = "collect";
var CARE_ACTION = "care";
var LIKE_ACTION = "like";
var UV = "visit";

//行为受众对象类型常量
var GROUP_TYPE = 6; //专栏
var PROFESSIONAL_TYPE = 7; //专家
var TALENT = 8; //达人
var PROBLEM_TYPE = 5; //问题
var REPLY_ACTION_TYPE = 1; //回复

//用户关注常量 + 行为受众对象类型常量 组成组合
var USER_CARE_LIST_FIX = "user_care_list_";
//用户收藏常量
var USER_COLLECT_LIST_FIX = "user_collect_list_";
//用户点赞常量
var USER_LIKE_LIST_FIX = "user_like_list_";

//取消／添加锚点
var REVERSE_OK = 1;
var REVERSE_NO = 2;

//标记
var LIST_ID_FLAG = "user_id_";
import {ToastAndroid,AsyncStorage} from "react-native"
import {getSingedUrl,getEncryptParam,decrypt} from "./tools/tools"
//发送验证码
export function request_code_in_phone(get_params,success){
    var url = URI + API_VERSION + "verifycode/getlogincode?uuid=" + get_params.uuid + "&phone=" + get_params.phone + "&type=" + get_params.type;
    var urlSigned = getSingedUrl(url,get_params.uuid)
    console.log(urlSigned)
    fetch(urlSigned)
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            success(responseText)
        })
        .catch((error)=>{
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
            console.log(error)
        })
}
//手机登录
export function request_login_by_phone(uuid,post_params,successcallback){
    var url = URI + API_VERSION + "login/loginbyphone?uuid=" + uuid;
    var urlSigned = getSingedUrl(url,uuid);
    var dataEncrypt = getEncryptParam(post_params);
    fetch(urlSigned,{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body:`param=${dataEncrypt.param}`
            /*"param=cXFYMnh4QllTakhvZUcrdHEzTmRWTzl2Z3h2ZU8xK3I0aDl0bTZVRm4wbTQrREIxb2NVTjhrRksydm5jZnlRTQ=="*/
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successcallback(responseText)
        })
        .catch((error)=>{
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
            console.log(error)
        })
}
//获取用户信息
export function user_status(id,uuid,token,successcallback){
    var url = URI + API_VERSION + "user?rid=" + id + "&uuid=" + uuid;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successcallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//获取首页饮食推荐列表
export function request_article_yinshi(uuid, userstatus, orderBy, offset, limit, token, successCallBack){
    var url = URI + API_VERSION + "article?uuid=" + uuid + "&userStatus=" + userstatus + "&articleType=" + ARTICLE_YINSHI + "&orderBy=" + orderBy + "&offset=" + offset + "&limit=" + limit;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
 //获取饮食推荐列表
export function request_article_yinshi_list(uuid, user_status, orderBy, offset, limit, token, successCallBack){
    var url = URI + API_VERSION + "article?uuid=" + uuid + "&articleType=" + ARTICLE_YINSHI + "&userStatus=" + user_status + "&orderBy=" + orderBy + "&offset=" + offset + "&limit=" + limit;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//首页视频列表
export function request_article_shipin(uuid, token, offset, limit, orderBy, successCallBack){
    var url = URI + API_VERSION + "article?uuid=" + uuid + "&articleType=" + ARTICLE_SHIPIN + "&orderBy=" + orderBy + "&limit=" + limit + "&offset=" + offset;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//首页有问必答
export function request_professionals_list(offset, limit, uuid, token, successCallBack){
    var url = URI + API_VERSION + "professionals?uuid=" + uuid + "&offset=" + offset + "&limit=" + limit;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//首页今日建议
export function requestTodayView(rid, userstatus, uuid, token, successCallback){
    var url = URI + API_VERSION + "advice?rid=" + rid + "&userStatus=" + userstatus + "&uuid=" + uuid;
    var urlSigned = getSingedUrl(url, uuid);
    console.log(url)
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//专家列表
export function request_page_content_by_caregory(uuid, token, getParams, successCallBack){
    var url = URI + API_VERSION + "professionals?uuid=" + uuid + "&category=" + getParams.category + "&offset=" + getParams.offset + "&limit=" + getParams.limit + "&action_num=" + getParams.action_num;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//小福精选列表
export function request_article_xiaofujingxuan(uuid, userstatus, orderBy, offset, limit, token, successCallBack){
    var url = URI + API_VERSION + "article?uuid=" + uuid + "&userStatus=" + userstatus + "&articleType=" + ARTICLE_XIAOFU + "&orderBy=" + orderBy + "&offset=" + offset + "&limit=" + limit;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//用户关注达人数据
export function request_user_action_list(id,uuid,token,successCallback){
    var url = URI + API_VERSION + 'userbehavior/user?uuid=' + uuid + '&userId=' + id + '&userOpType=3' + "&operateType=8&limit=10&offset=0" ;
    var urlSigned = getSingedUrl(url,uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//用户关注专家数据
export function request_user_collect(id,uuid,token,successCallback){
    var url = URI + API_VERSION + 'userbehavior/user?uuid=' + uuid + '&userId=' + id + '&userOpType=3' + "&operateType=7&limit=10&offset=0" ;
    var urlSigned = getSingedUrl(url,uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//用户关注专栏
export function request_user_column(id,uuid,token,successCallback){
    var url = URI + API_VERSION + 'userbehavior/user?uuid=' + uuid + '&userId=' + id + '&userOpType=3' + "&operateType=6&limit=10&offset=0" ;
    var urlSigned = getSingedUrl(url,uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//用户收藏数据
export function collect_user_list(id,uuid,token,successCallback){
    var url = URI + API_VERSION + 'userbehavior/user?uuid=' + uuid + '&userId=' + id + '&userOpType=2' + "&operateType=14&limit=10&offset=0" ;
    var urlSigned = getSingedUrl(url,uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//获取用户行为
export function user_behavior(user, successCallback){
    var url = URI + API_VERSION + 'userbehavior/user?uuid=' + user.uuid + '&userId=' + user.id + '&userOpType=10';
    var urlSigned = getSingedUrl(url, user.uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": user.token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//饮食推荐详情
export function request_article_yinshi_xiangqing(id,uuid,token,successCallBack){
    var url = URI + API_VERSION + "article/" + id + "?uuid=" + uuid + "&articleType=" + ARTICLE_YINSHI;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//初次获取用户行为
export function init_user_behavior(user, successCallback){
    var url = URI + API_VERSION + 'userbehavior/user?uuid=' + user.uuid + '&userId=' + user.id + '&userOpType=10';
    var urlSigned = getSingedUrl(url, user.uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": user.token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//关注事件
export function request_user_action(user, op, post_params, successCallback){
    var url = URI + API_VERSION + 'userbehavior/' + op + '?uuid=' + user.uuid;
    var urlSigned = getSingedUrl(url, user.uuid);
    var dataEncrypt = getEncryptParam(post_params);
    fetch(urlSigned,{
        method:"POST",
        headers: {
            "Http-App-Token": user.token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body:`param=${dataEncrypt.param}`
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            var careHappen = AsyncStorage.getItem("careHappen")
            if(!careHappen) {
                AsyncStorage.setItem('careHappen', post_params.operateType);
            }else{
                if(careHappen != post_params.operateType) {
                    AsyncStorage.setItem('careHappen', 'multi');
                }
            }
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//获取专家详情
export function request_professionals_content(uuid, token, rid, successCallBack){
    var url = URI + API_VERSION + "professionals?uuid=" + uuid + "&rid=" + rid;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//获取达人详情文章
export function request_get_article_byauth(id,user,succCallback){
    var url = URI + API_VERSION + 'article?uuid='+user.uuid +"&articleType=8" + "&limit=10" + "&offset=0" + "&orderBy=created_at desc" + "&articleSource=auth" + "&authId=" + id;
    console.log(url)
    var urlSigned = getSingedUrl(url, user.uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": user.token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            succCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//小福精选详情页
export function request_article_xiaofu_xiangqing(id, uuid, token, successCallBack){
    var url = URI + API_VERSION + "article/" + id + "?uuid=" + uuid + "&articleType=" + ARTICLE_XIAOFU;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//专栏详情页面
export function columnDetail(token, uuid , id, successCallback,){
    var url = URI + API_VERSION + COLUMNLIST + "rid=" + id + "&offset=0&limit=1&uuid=" + uuid;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//获取消息列表
export function request_noticelist(uuid, token, successCallBack){
    var url = URI + API_VERSION + "push?uuid=" + uuid;
    var urlSigned = getSingedUrl(url, uuid);
    fetch(urlSigned,{
        method:"GET",
        headers:{
            "Http-App-Token": token
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallBack(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//用户状态
export function request_user_status(user, selectTableWarp, successCallback){
    var url = URI + API_VERSION + 'user?uuid=' + user.uuid;
    var urlSigned = getSingedUrl(url, user.uuid);
    var dataEncrypt = getEncryptParam(selectTableWarp);
    console.log(urlSigned)
    console.log(url)
    console.log(dataEncrypt)
    fetch(urlSigned,{
        method:"PUT",
        headers: {
            "Http-App-Token": user.token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body:`param=${dataEncrypt.param}`
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//修改用户名
export function username(userData, postData, successCallback){
    var url = URI + API_VERSION + "user?uuid=" + userData.uuid;
    var urlSigned = getSingedUrl(url, userData.uuid);
    postData.id = userData.id;
    var dataEncrypt = getEncryptParam(postData);
    console.log(postData)
    fetch(urlSigned,{
        method:"POST",
        headers: {
            "Http-App-Token": userData.token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body:`param=${dataEncrypt.param}`
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//修改地址
export function address(userData, postData, successCallback){
    var url = URI + API_VERSION + "user?uuid=" + userData.uuid;
    var urlSigned = getSingedUrl(url, userData.uuid);
    postData.id = userData.id;
    var dataEncrypt = getEncryptParam(postData);
    fetch(urlSigned,{
        method:"POST",
        headers: {
            "Http-App-Token": userData.token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body:`param=${dataEncrypt.param}`
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}
//上传图片
export function user_img(uuid,token,path,successCallback){
    var url = DOMAIN+'/'+API_VERSION+'/'+'upload?uuid='+uuid;
    var urlSigned = getSingedUrl(url,uuid);
    fetch(urlSigned,{
        method:"POST",
        headers: {
            "Http-App-Token": token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body:`${path}`
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            successCallback(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}

//修改信箱数据
export function message(user, post_params){
    var url = URI + API_VERSION + "push?uuid=" + user.uuid;
    var urlSigned = getSingedUrl(url, user.uuid);
    var data = {
        time: post_params.time,
    };
    console.log(data.time)
    var dataEncrypt = getEncryptParam(data);
    console.log(dataEncrypt)
    fetch(urlSigned,{
        method:"POST",
        headers: {
            "Http-App-Token": user.token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body:`param=${dataEncrypt.param}`
    })
        .then((response) => {
            return response.json();
        })
        .then((responseText) => {
            console.log(responseText)
        })
        .catch((error)=>{
            console.log(error)
            ToastAndroid.show('网络错误', ToastAndroid.SHORT)
        })
}