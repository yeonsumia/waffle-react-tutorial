import './Header.css'
import mainIcon from '../../resource/img.png'

const Header = () => (
    <div className="HeaderWrapper">
        <img className="mainImg" src={mainIcon} onClick={()=> window.open("https://wafflestudio.com/")}  />
        <div className="mainText">와플고등학교 명단 관리 프로그램</div>
    </div>



)



export default Header;