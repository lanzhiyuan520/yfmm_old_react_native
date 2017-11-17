import { StackNavigator , TabNavigator} from 'react-navigation'
import App from './App';
import subAnswer from './components/answer/wenda';
import PublishProblem from './components/answer/publish_problem';
import Problem from './components/answer/problem_detail';
import ColumnDetail from './components/column/column_detail';
import VideoDetail from './components/find/video_detail';
import ExpertDetail from './components/find/expert_detail';
import Message from "./components/message"
import Expertsdetails from "./components/Experts/Expertsdetails"
import ExpertsList from "./components/Experts/ExpertsList"
import Required from "./components/required/required"
import DietList from "./components/dietList/dietList"
import Find from "./components/Find"
import Xfdetailed from "./components/xiaofu/xiaofu_detailed"
import Detailed from "./components/dietList/Detailed"
import Welcome from "./components/welcome/welcome"
import Login from "./components/login/Login"
import PersonalData from "./components/personalData/PersonalData"
import Opinion from "./components/opinion/opinion"
import About from "./components/about/About"
import Setting from "./components/setting/Setting"
import Collect from "./components/collect/collect"
import Declaration from "./components/about/declaration"
import Service from "./components/service/service"
import AboutUs from "./components/about/AboutUs"
import Attention from "./components/attention/attention"
import Questions from "./components/questions/questions"
import State from "./components/state/state"
import Username from "./components/personalData/username"
import Phone from "./components/personalData/phone"
import Address from "./components/personalData/address"
import My from "./components/My"
import First from "./components/welcome/First"
import TalentDetailed from "./components/attention/talent_detailed"
import ColumnDetailed from "./components/attention/column_detailed"
const  SimpleApp = StackNavigator({
    First:{screen:First},
    App:{
        screen:App
    },
    subAnswer:{
        screen:subAnswer
    },
    PublishProblem:{
        screen:PublishProblem
    },
    Problem:{
        screen:Problem
    },
    ColumnDetail:{
        screen:ColumnDetail
    },
    VideoDetail:{
        screen:VideoDetail
    },
    ExpertDetail:{
        screen:ExpertDetail
    },
    Welcome:{screen:Welcome},
    Login:{screen:Login},
    Message:{screen:Message},
    Expertsdetails:{screen:Expertsdetails},
    Required:{screen:Required},
    DietList:{screen:DietList},
    Find:{screen:Find},
    Xfdetailed:{screen:Xfdetailed},
    Detailed:{screen:Detailed},
    ExpertsList:{screen:ExpertsList},
    PersonalData:{screen:PersonalData},
    Opinion:{screen:Opinion},
    About:{screen:About},
    Setting:{screen:Setting},
    Collect:{screen:Collect},
    Declaration:{screen:Declaration},
    Service:{screen:Service},
    AboutUs:{screen:AboutUs},
    Attention:{screen:Attention},
    Questions:{screen:Questions},
    State:{screen:State},
    Username:{screen:Username},
    My:{screen:My},
    Phone:{screen:Phone},
    Address:{screen:Address},
    TalentDetailed:{screen:TalentDetailed},
    ColumnDetailed:{screen:ColumnDetailed},
})
export default SimpleApp;
