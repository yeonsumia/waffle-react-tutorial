import {useContext, createContext, useState} from 'react'
// import dummyData from '../dummyData/dummy'

const UserContext = createContext(null);
export const UserProvider = ({children}) => {
    // 전역으로 관리할 state 선언
    const [loginToken, setLoginToken] = useState("");
    return (
        // value 에는 앞으로 사용할 state 변수들 넣어주기
        // loginCheck -> sessionStorage, loginToken -> localStorage 에 저장하여 useContext 는 사용하지 않았음.
        <UserContext.Provider value={{loginToken, setLoginToken}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)

