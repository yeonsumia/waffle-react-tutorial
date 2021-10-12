import './PopUpModal.css';
import fixIcon from '../../../resource/fix.png'
import cancelImg from "../../../resource/cancel.png";

const PopUpModal = ({popUpModal, setPopUpLater, modifyCookie}) => {
    const onChange = (e) => {
        setPopUpLater(e.target.checked)
    }
    return (
        popUpModal &&
        <div className="PopUpModalWrapper">
            <div className="PopUpModal">
                <div className="PopUpModalTitle">
                    <div className="PopUpModalIconWrapper">
                        <img className="PopUpModalIcon" src={fixIcon} alt="" />
                    </div>
                    <div className="PopUpModalTitleText">시스템 점검 안내</div>
                </div>
                <div className="PopUpModalText">와플 고등학교 명단 관리 시스템 홈페이지가 2021.10.4. - 2021.10.7. 중 리뉴얼 되어 돌아옵니다. 해당 기간 동안 시스템을 사용할 수 없으니 양해 바랍니다. </div>
                <div className="PopUpModalCloseCheckWrapper">
                    <div className="PopUpModalCloseCheck">
                        <input type="checkbox" className="PopUpModalCloseCheckBox" onChange={onChange} />
                        <div className="PopUpModalCloseCheckText">24시간 동안 보지 않기</div>
                    </div>
                </div>
                <div className="PopUpModalCloseWrapper">
                    <div className="PopUpModalClose" onClick={modifyCookie}>
                        <div className="PopUpModalCloseIconWrapper">
                            <img className="PopUpModalCloseIcon" src={cancelImg} alt="" />
                        </div>
                        <div className="PopUpModalCloseText">닫기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpModal;