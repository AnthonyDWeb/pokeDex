// ----- Library -----
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
// ----- Style/CSS -----
import '../App.css';
// ----- Component -----
import { LoginContext } from "../LoginContext";

const Login = () => {
    const history = useHistory()
    const {isLogged ,setAuth} = useContext(LoginContext)
    const {register, handleSubmit} = useForm();

    // submit and display the form's information
    const onSubmit = (data) =>{
        console.log(JSON.stringify(data))
        setAuth()
        history.push("/pokeDex")
    }

    // const rememberMe = (e) =>{
    //     if (e.target.checked){

    //     }
    // }
    console.log('is logged in login -> ', isLogged)

    return (
        <div className="mainContaint">
            <h1 className="mainTitle">Login</h1>
            {/* <form> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {isLogged ? 
                    <input  className="input-submit" type="submit" value="Logout" /> :
                    <>
                        <div className="form" >
                            <label>
                                Username
                                <input className="input-username" {...register("Username")} type="text" maxLength={15} required />
                            </label>
                            <label>
                                Password
                                <input className="input-password" {...register("Password")} type="password" minLength={6} required />
                            </label>
                        </div>
                        <div className="input">
                            <div className="checkbox">
                                <input id="input-checkbox" className="input-checkbox" type="checkbox" value="remember me" />
                                <p>remember me!</p>
                            </div>
                            <input  className="input-submit" type="submit" value="Login" />
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default Login;