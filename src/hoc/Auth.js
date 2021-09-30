import React, { useEffect } from 'react';
import {useUserContext} from "../context/UserContext";
import {Redirect} from "react-router-dom";

const Auth = (SpecialComponent, option, adminRoute=null) => {

    /*
       예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                   true -> 로그인한 유저만 출입이 가능한 페이지
                   false -> 로그인한 유저는 출입이 불가능한 페이지
    */
    const AuthenticateCheck = (props) => {
        const {loginCheck} = useUserContext();
        const sessionLoginCheck = sessionStorage.getItem('loginCheck');
        useEffect(() => {
            if (!loginCheck && sessionLoginCheck !== 'true' && option) {
                props.history.push('/login');
            }
        }, [loginCheck, props.history, sessionLoginCheck]);

        return (
            SpecialComponent != null? <SpecialComponent /> : sessionLoginCheck? <Redirect to='/students'/> : <Redirect to='/login'/>

        )

    };

    return AuthenticateCheck;

}

export default Auth