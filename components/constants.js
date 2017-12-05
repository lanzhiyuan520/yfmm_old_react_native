/**
 * Created by Administrator on 2017/10/24.
 */
import {
    AsyncStorage
} from 'react-native';

const object = {
    url:'http://test.na.ayi800.com',
    api:'v1/',
    PROBLEM_URL:"http://nf.youfubaba.com/problem/show-problem",//问题分享url
    PROFEESIONAL_URL : "http://nf.youfubaba.com/professional/show-professional",//专家分享url
    ARTICLE_URL :"http://nf.youfubaba.com/article/show-article",//文章分享url
};

AsyncStorage.getItem("user",(error,result)=>{
    if(result==null || result==""){
        console .log("暂无数据")
    }else{
        result = JSON.parse(result);
        console.log(result);
        object.user=result;
        object.token=result.token;//把token做成公共变量
        object.uuid=result.uuid;
        object.userId=result.id;
        object.status=result.status;
    }
});



export default object;