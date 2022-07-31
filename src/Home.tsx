import axios from "axios";
import { useState } from "react";


const Home = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!email || !password) {
            alert('empty field')
        }
        else if (!regex.test(email)) {
            alert('invalid email format')
        }
        else {
            console.log(email, password)

            axios.post('http://localhost:3000/save-data', 
            {
                email,
                password
            }).then((res) => console.log({res}))
        }
    }

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter email '
                        type={'email'}
                        style={{ width: '250px', height: '30px', marginBottom: '20px' }}
                    />
                </div>

                <div>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        placeholder='Enter password '
                        style={{ width: '250px', height: '30px', marginBottom: '20px' }}
                    />
                </div>


                <button onClick={() => handleSubmit()}>
                    Submit
                </button>
            </div>
        </div>

    );
}

export default Home

