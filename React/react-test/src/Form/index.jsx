import { Outlet, useNavigate } from "react-router-dom"

function Form() {
    const navigate = useNavigate()
    return (
        <div>
            <h2>Form</h2>
            <button onClick={() => navigate('form1')}>Form1</button>
            <Outlet />
        </div>
    )
}

export default Form
