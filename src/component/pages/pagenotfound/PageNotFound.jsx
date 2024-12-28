import { useNavigate} from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () =>{
    const Navigate = useNavigate();
return(
        <>
        <div className="PageNotFound-main-back">
            <div className="PageNotFound-main">
            <h1>404</h1>
            <h3>Oops Sorry...
                <img src="../../../../public/sad.png" alt="sad face emoji" className="sad-face-404" />
            </h3>
            <p> The page you're trying to access is not available please try again later...</p>
            <button className="home-back-btn" onClick={()=>{Navigate('/');}}>
                Back to home
            </button>
            </div>
        </div>
        </>

)
}
export default PageNotFound;