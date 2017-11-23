/**
 * Created by Administrator on 2017/10/24.
 */
import {
    AsyncStorage
} from 'react-native';

const object = {
    url:'http://test.na.ayi800.com',
    uuid:'6e76-933cad1-41a6130-3392c69-0ff2bd7',
    api:'v1/',
    userId:'47',
    PROBLEM_URL:"http://nf.youfubaba.com/problem/show-problem",//问题分享url
    PROFEESIONAL_URL : "http://nf.youfubaba.com/professional/show-professional",//专家分享url
    ARTICLE_URL :"http://nf.youfubaba.com/article/show-article",//文章分享url
};
AsyncStorage.getItem("user",(error,result)=>{
    if(result==null || result==""){
        console .log("暂无数据")
    }else{
        result = JSON.parse(result);
        object.token=result.token;//把token做成公共变量
    }
});
export default object;