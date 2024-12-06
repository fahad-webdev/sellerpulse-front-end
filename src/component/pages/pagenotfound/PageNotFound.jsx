import { useNavigate} from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () =>{
    const Navigate = useNavigate();
return(
        <>
        <div className="PageNotFound-main-back">
            <h1>404</h1>
            <p>oops Sorry...! The page you're trying to access is not available please try again later...</p>
            <button className="home-back-btn" onClick={()=>{Navigate('/Login');}}>
                back to home
            </button>
        </div>
        </>

)
}
export default PageNotFound;