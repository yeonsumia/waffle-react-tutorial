import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import StudentListPage from './route/StudentListPage/StudentListPage'
import StudentPage from "./route/StudentPage/StudentPage";
import LoginPage from "./route/LoginPage/LoginPage";
import Auth from './hoc/Auth';

const App =() =>  (
    // window.sessionStorage.getItem('loginCheck') === 'true' ?
    <BrowserRouter>
        <Switch>
            <Route path='/students' component={Auth(StudentListPage, true)}/>
            <Route path='/student/:id' component={Auth(StudentPage, true)}/>
            <Route path='/login' component={Auth(LoginPage, false)}/>
            {sessionStorage.getItem('loginCheck') === 'true' ? <Redirect to='/students'/> : <Redirect to='/login'/> }
        </Switch>
    </BrowserRouter>
)

export default App;
