import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import './BackHome.css'

function BackHome(props) {
    const navigate = useNavigate();
    return(
        <>
            <button className="btn backHomeBtn" onClick={() => navigate("/")}><AiOutlineArrowLeft /></button>
        </>
    )
}

export default BackHome;