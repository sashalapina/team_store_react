import { useEffect, useState } from "react";
import './Login.css'

function Login({ isOpen, closeModal }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const sessionId = localStorage.getItem('session_id');
        if (sessionId) {
            setIsLoggedIn(true);
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                localStorage.setItem('session_id', token);
                setIsLoggedIn(true);
            } else {
                setError('Login failed: ' + data.message);
                console.error('Login failed', data);
            }
        } catch (error) {
            console.error('An error occurred', error);
            setError('An error occurred. Please try again');
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem('session_id');
        closeModal();
        window.location.reload();
    }

    if (!isOpen) return null;

    return (
        <>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal">
            <div className="modal-content">
                {isLoggedIn ? (
                    <div className="user-profile">
                        <h1 className="user-profile-title">User Profile</h1>
                        <button className="user-profile-close-modal-btn" onClick={closeModal}></button>
                        <p className="user-profile-text">Your sign in was successful</p>
                        <div className="user-profile-group-btn">
                            <button className="logout-btn" onClick={handleLogOut}>Log out</button>
                        </div>
                    </div>
                ) : (
                    <>
                    <h1 className="login-title">Sign In</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            Username:
                            <input
                                type="text"
                                id="username"
                                className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label htmlFor="password">
                            Password:
                            <input
                                type="password"
                                id="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" className="login-submit-btn">Sign In</button>
                    </form>
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default Login;