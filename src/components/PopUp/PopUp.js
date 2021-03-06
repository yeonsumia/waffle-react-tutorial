import {useCookies} from "react-cookie";
import PopUpModal from "./PopUpModal/PopUpModal";
import {useEffect, useState} from "react";

const PopUp = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['rememberPopUp']);
    const [popUpModal, setPopUpModal] = useState(true);
    const [popUpLater, setPopUpLater] = useState(false);
    const datetime = new Date();
    const newDatetime = new Date();
    useEffect(() => {
       if(cookies.twoFourHoursLater !== undefined){
           setPopUpModal(false)
       }
    }, [])

    const modifyCookie = () => {
        if(popUpLater){
            newDatetime.setHours(datetime.getHours() + 24)
            setCookie('twoFourHoursLater', true, { expires: newDatetime })
        } else {
            removeCookie('twoFourHoursLater')
        }
        setPopUpModal(false)
    }
    return (
        <PopUpModal popUpModal={popUpModal} setPopUpLater={setPopUpLater} modifyCookie={modifyCookie}/>
    )

}

export default PopUp;