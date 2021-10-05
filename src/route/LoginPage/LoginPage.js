import './LoginPage.css'
import mainImg from '../../resource/img.png'
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import API from '../../api/API';
import {toast} from "react-toastify";
import {useUserContext} from "../../context/UserContext";

const LoginPage = () => {
    const history = useHistory();
    const {loginToken, setLoginToken} = useUserContext();
    useEffect(() => {
        if(loginToken === "") {
            const token = localStorage.getItem('loginToken');
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            API.get("/student/1")
                .then(() => {
                    setLoginToken(token);
                    history.push('/students');
                })
        } else history.push('/students');
    }, []);

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const {username, password} = inputs;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }
    const loginStateConfirm = () => {
        API.post("/auth/login", inputs)
            .then(res => res.data)
            .then(data => {
                const token = data.access_token;
                setLoginToken(data);
                localStorage.setItem('loginToken', token);
                API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                history.push('/students')
            })
            .catch(() => {
                    setInputs({ username:'', password: ''});
                    toast.error("올바르지 않은 ID/password 입니다.");
            })
    }

    return (
        <div className="LoginPageWrapper">
            <div className="LoginWrapper">
                <img src={mainImg} className="LoginIcon" alt=""/>
                <div className="LoginIconText">Sign in to Waffle HS</div>
                <div className="LoginBox">
                    <div className="LoginUsernameBox">
                        <div className="LoginUsernameText">Username or email address</div>
                        <input name="username" className="LoginUsernameInput" value={username} onChange={onChange} />
                    </div>
                    <div className="LoginPasswordBox">
                        <div className="LoginPasswordText">
                            Password
                            <span className="LoginPasswordForget">Forgot password?</span>
                        </div>

                        <input name="password" className="LoginPasswordInput" value={password} onChange={onChange} />
                    </div>
                    <div className="LoginButtonBox">
                        <div onClick={loginStateConfirm}>
                            <div className="LoginButton">
                                <div className="LoginButtonText">Sign in</div>
                            </div>
                        </div>
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