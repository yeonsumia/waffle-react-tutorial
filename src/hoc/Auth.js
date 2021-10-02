import React, { useEffect } from 'react';
import {Redirect, useParams} from "react-router-dom";
import API from "../api/API";
const Auth = (SpecialComponent, option, adminRoute=null) => {

    /*
       예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                   true -> 로그인한 유저만 출입이 가능한 페이지
                   false -> 로그인한 유저는 출입이 불가능한 페이지
    */
    const AuthenticateCheck = (props) => {
        const loginToken = localStorage.getItem('loginToken');

        const config = {
            headers: { Authorization: `Bearer ${loginToken}` }
        };
        const params = useParams();

        useEffect(() => {
            async function loginCheckByToken () {
                if(sessionStorage.getItem('loginCheck') !== 'true') {
                    await API.get("/student/1", config)
                        .then(() => {
                            sessionStorage.setItem('loginCheck', 'true');
                            if(params.hasOwnProperty('id')) props.history.push('/students');
                        })
                        .catch(() => {
                            if(option) props.history.push('/login');
                        })
                }
            }
            async function accessStudentLoginCheckByToken (id) {
                if(sessionStorage.getItem('loginCheck') !== 'true') {
                    await API.get(`/student/${id}`, config)
                        .then(() => {
                            sessionStorage.setItem('loginCheck', 'true');
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

        }, [loginToken]);

        return (
            SpecialComponent != null? <SpecialComponent /> : sessionStorage.getItem('loginCheck') === 'true'? <Redirect to='/students'/> : <Redirect to='/login'/>

        )

    };

    return AuthenticateCheck;

}

export default Auth