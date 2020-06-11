import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login';
import MainScreen from './screens/MainPage';
import Register from './screens/Register';
import Maps from './screens/Maps';
import Profile from './screens/UserProfile'
import AddLand from './screens/addLandDetails'
import DrawMap from './screens/drawMap'

const stack = createStackNavigator({
    Home:{
        screen:Login
    },
    MainScreen: {
        screen:MainScreen,
    },
    Maps: {
        screen:Maps,
    },
    Register:{
        screen:Register,
    },
    Profile:{
        screen:Profile,
    },
    AddLand:{
        screen:AddLand,
    },
    DrawMap:{
        screen:DrawMap,
    }
    },
    {initialRouteName:'Home'}

);

export default stack;