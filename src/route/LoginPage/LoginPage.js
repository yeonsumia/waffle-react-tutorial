import './LoginPage.css'
import mainImg from '../../resource/img.png'
import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";

const LoginPage = () => {
    const {setLoginCheck} = useUserContext();
    const loginStateConfirm = () => {
        setLoginCheck(true);
        sessionStorage.setItem('loginCheck', 'true');
    }
    return (
        <div className="LoginPageWrapper">
            <div className="LoginWrapper">
                <img src={mainImg} className="LoginIcon" alt=""/>
                <div className="LoginIconText">Sign in to Waffle HS</div>
                <div className="LoginBox">
                    <div className="LoginUsernameBox">
                        <div className="LoginUsernameText">Username or email address</div>
                        <input className="LoginUsernameInput"/>
                    </div>
                    <div className="LoginPasswordBox">
                        <div className="LoginPasswordText">
                            Password
                            <span className="LoginPasswordForget">Forgot password?</span>
                        </div>

                        <input className="LoginPasswordInput"/>
                    </div>
                    <div className="LoginButtonBox">
                        <Link to='/students' onClick={loginStateConfirm}>
                            <div className="LoginButton">
                                <div className="LoginButtonText">Sign in</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="RegisterBox">
                    <div className="RegisterBoxText">
                        New to Waffle HS
                        <span className="RegisterText">Create an Account</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage