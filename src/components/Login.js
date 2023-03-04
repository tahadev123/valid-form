import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { validate } from "./validate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from "./toast";
import styled from "./SignUp.module.css"

const Login = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        comfirmpassword: "",
        isAccepted : false
    })

    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors(validate(data, "login"))
    }, [data, touched])

    const changeHandeler = event => {
        setData({...data, [event.target.name] : event.target.value})
    }

    const focusHandeler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("you login successfully", "success")
        } else {
            notify("Invalid data!", "error")
            setTouched({
                email: true,
                password: true,
            })
        }
    }

    return(
    <div className={styled.container}>
        <form className={styled.formContainer} onSubmit={submitHandler}>
            <h2 className={styled.header}>Login</h2>
                <div className={styled.formField}>
                    <label>email</label>
                    <input 
                    className={(errors.email && touched.email) ? styled.uncompleted : styled.formInput}
                    type="text" 
                    name="email" 
                    value={data.email} 
                    onChange={changeHandeler} 
                    onFocus={focusHandeler}/>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styled.formField}>
                    <label>password</label>
                    <input 
                    className={(errors.password && touched.password) ? styled.uncompleted : styled.formInput}
                    type="password" 
                    name="password" 
                    value={data.password} 
                    onChange={changeHandeler} 
                    onFocus={focusHandeler}/>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styled.formButtons}>
                    <Link to="/signup">SignUp</Link>
                    <button type="submit">Login</button>
                </div>
        </form>
        <ToastContainer />
    </div>
    )
}

export default Login