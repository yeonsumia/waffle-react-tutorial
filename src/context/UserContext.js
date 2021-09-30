import {useContext, createContext, useState} from 'react'
import dummyData from '../dummyData/dummy'

const UserContext = createContext(null);
export const UserProvider = ({children}) => {
    // 전역으로 관리할 state 선언
    const [tableList, setTableList] = useState(dummyData);
    const [loginCheck, setLoginCheck] = useState(false);
    return (
        // value에는 앞으로 사용할 state 변수들 넣어주기
        <UserContext.Provider value={{tableList, setTableList, loginCheck, setLoginCheck}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)

