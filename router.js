import { StackNavigator , TabNavigator} from 'react-navigation'
import App from './App';
import subAnswer from './components/answer/wenda';
import PublishProblem from './components/answer/publish_problem';
import Problem from './components/answer/problem_detail';
import ColumnDetail from './components/column/column_detail';
import VideoDetail from './components/find/video_detail';
import ExpertDetail from './components/find/expert_detail';
const  SimpleApp = StackNavigator({
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
})
export default SimpleApp;
