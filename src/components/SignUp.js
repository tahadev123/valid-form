import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { validate } from "./validate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from "./toast";
import styled from "./SignUp.module.css"

const SignUp = () => {

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
        setErrors(validate(data, "signup"))
    }, [data, touched])

    const changeHandeler = event => {
        if (event.target.name === "isAccepted") {
            setData({...data, [event.target.name] : event.target.checked})
        } else {
            setData({...data, [event.target.name] : event.target.value})
        }
        console.log(data)
    }

    const focusHandeler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("you signed up successfully", "success")
        } else {
            notify("Invalid data!", "error")
            setTouched({
                name: true,
                email: true,
                password: true,
                comfirmpassword: true,
                isAccepted: true
            })
        }
    }

    return(
    <div className={styled.container}>
        <form className={styled.formContainer} onSubmit={submitHandler}>
            <h2 className={styled.header}>SignUp</h2>
                <div className={styled.formField}>
                    <label>Name</label>
                    <input 
                    className={(errors.name && touched.name) ? styled.uncompleted : styled.formInput}
                    type="text" 
                    name="name" 
                    value={data.name} 
                    onChange={changeHandeler} 
                    onFocus={focusHandeler}/>
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
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
                <div className={styled.formField}>
                    <label>comfirmpassword</label>
                    <input 
                    className={(errors.comfirmpassword && touched.comfirmpassword) ? styled.uncompleted : styled.formInput}
                    type="password" 
                    name="comfirmpassword" 
                    value={data.comfirmpassword} 
                    onChange={changeHandeler} 
                    onFocus={focusHandeler}/>
                    {errors.comfirmpassword && touched.comfirmpassword && <span>{errors.comfirmpassword}</span>}
                </div>
                <div className={styled.formField}>
                    <div className={styled.checkBoxContainer}>
                        <label>I accept terms of privacy policy</label>
                        <input 
                        type="checkbox" 
                        name="isAccepted" 
                        value={data.isAccepted} 
                        onChange={changeHandeler} 
                        onFocus={focusHandeler}/>
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styled.formButtons}>
                    <Link to="/Login">Login</Link>
                    <button type="submit">SignUp</button>
                </div>
        </form>
        <ToastContainer />
    </div>
    )
}

export default SignUp