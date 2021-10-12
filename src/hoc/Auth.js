import React, { useEffect } from 'react';
import {Redirect, useParams} from "react-router-dom";
import API from "../api/API";
import {useUserContext} from "../context/UserContext";
const Auth = (SpecialComponent, option, adminRoute=null) => {

    /*
       예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                   true -> 로그인한 유저만 출입이 가능한 페이지
                   false -> 로그인한 유저는 출입이 불가능한 페이지
    */
    const AuthenticateCheck = (props) => {
        const params = useParams();
        const {loginToken, setLoginToken} = useUserContext();
        useEffect(() => {
            function loginCheckByToken () {
                if(loginToken === "") {
                    const token = localStorage.getItem('loginToken');
                    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    console.log("token")
                    API.get("/student/1")
                        .then(() => {
                            setLoginToken(token);
                            if(params.hasOwnProperty('id')) props.history.push('/students');
                        })
                        .catch(() => {
                            if(option) props.history.push('/login');
                        })
                }
            }
            function accessStudentLoginCheckByToken (id) {
                if(loginToken === "") {
                    const token = localStorage.getItem('loginToken');
                    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    API.get(`/student/${id}`)
                        .then(() => {
                            setLoginToken(token);
                    })
                        .catch(() => {
                            loginCheckByToken();
                        })
                }
            }
            if(params.hasOwnProperty('id')) {
                const id = parseInt(params.id);
                accessStudentLoginCheckByToken(id);
            }
            else loginCheckByToken();

        }, []);

        return (
            SpecialComponent != null? <SpecialComponent /> : loginToken !== ""? <Redirect to='/students'/> : <Redirect to='/login'/>

        )

    };

    return AuthenticateCheck;

}

export default Auth