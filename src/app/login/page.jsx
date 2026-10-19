// 'use client'

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import './login.css'

// const Page = () => {
//     const router = useRouter()

//     const [email, setEmail] = useState('gigbiggroup@gmail.com')
//     const [password, setPassword] = useState('')
//     const [showPassword, setShowPassword] = useState(false)
//     const [rememberMe, setRememberMe] = useState(true)
//     const [error, setError] = useState('')

//     const handleLogin = (e) => {
//         e.preventDefault()
//         setError('')

//         if (!email.trim() || !password) {
//             setError('Please enter your email and password.')
//             return
//         }

//         if (
//             email.trim().toLowerCase() === 'gigbiggroup@gmail.com' &&
//             password === '12345'
//         ) {
//             document.cookie =
//                 'admin-auth=1; path=/; max-age=86400; SameSite=Lax'

//             if (rememberMe) {
//                 localStorage.setItem('admin-auth', 'true')
//             } else {
//                 localStorage.removeItem('admin-auth')
//             }

//             router.replace('/')
//         } else {
//             setError('Invalid email or password.')
//         }
//     }

//     return (
//         <main className="login-page container-fluid p-0">
//             <div className="row g-0 min-vh-100">

//                 {/* LEFT BRAND */}
//                 <section className="login-brand col-lg-6 d-none d-lg-flex flex-column">

//                     <div className="px-5 pt-5">
//                         <div className="login-logo d-flex align-items-center">

//                             <div className="logo-grid me-3">
//                                 {Array.from({ length: 9 }).map((_, index) => (
//                                     <span key={index} />
//                                 ))}
//                             </div>

//                             <span className="logo-text">
//                                 translate co
//                             </span>

//                             <span className="logo-admin ms-3">
//                                 ADMIN
//                             </span>

//                         </div>
//                     </div>

//                     <div className="login-brand-content px-5 my-auto">
//                         <h1 className="fw-bold mb-3">
//                             Translation operations,
//                             <br />
//                             managed in one place.
//                         </h1>

//                         <p className="mb-0">
//                             Manage users, translation jobs,
//                             verification, disputes and
//                             payouts from the admin workspace.
//                         </p>
//                     </div>

//                     <div className="login-brand-footer px-5 pb-5">
//                         Secure admin workspace
//                     </div>

//                 </section>

//                 {/* LOGIN */}
//                 <section className="login-form-side col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-sm-4">

//                     <div className="login-card w-100 p-4 p-sm-5">

//                         <div className="mb-4">
//                             <h2 className="fw-bold mb-2">
//                                 Welcome back
//                             </h2>

//                             <p className="text-secondary mb-0">
//                                 Sign in to your admin account
//                                 to continue.
//                             </p>
//                         </div>

//                         <form onSubmit={handleLogin}>

//                             {/* EMAIL */}
//                             <div className="mb-3">
//                                 <label
//                                     htmlFor="email"
//                                     className="form-label fw-semibold"
//                                 >
//                                     Email address
//                                 </label>

//                                 <input
//                                     id="email"
//                                     type="email"
//                                     className="form-control login-input"
//                                     value={email}
//                                     onChange={(e) =>
//                                         setEmail(e.target.value)
//                                     }
//                                     placeholder="Enter your email"
//                                     autoComplete="email"
//                                 />
//                             </div> 
//                             <div className="mb-3">
//                                 <label
//                                     htmlFor="password"
//                                     className="form-label fw-semibold"
//                                 >
//                                     Password
//                                 </label>

//                                 <div className="position-relative">

//                                     <input
//                                         id="password"
//                                         type={showPassword ? 'text' : 'password'}
//                                         className="form-control login-input pe-5"
//                                         value={password}
//                                         onChange={(e) =>
//                                             setPassword(e.target.value)
//                                         }
//                                         placeholder="Enter your password"
//                                         autoComplete="current-password"
//                                     />

//                                     <button
//                                         type="button"
//                                         className="password-toggle border-0 bg-transparent"
//                                         onClick={() =>
//                                             setShowPassword(prev => !prev)
//                                         }
//                                     >
//                                         <i
//                                             className={
//                                                 showPassword
//                                                     ? 'fa-solid fa-eye-slash'
//                                                     : 'fa-solid fa-eye'
//                                             }
//                                         />
//                                     </button>

//                                 </div>
//                             </div> 
//                             {error && (
//                                 <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
//                                     <i className="fa-solid fa-circle-exclamation" />
//                                     <span>{error}</span>
//                                 </div>
//                             )} 
//                             <div className="d-flex align-items-center justify-content-between mb-4">

//                                 <div className="form-check m-0">
//                                     <input
//                                         id="remember"
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         checked={rememberMe}
//                                         onChange={(e) =>
//                                             setRememberMe(e.target.checked)
//                                         }
//                                     />

//                                     <label
//                                         htmlFor="remember"
//                                         className="form-check-label small"
//                                     >
//                                         Remember me
//                                     </label>
//                                 </div>

//                                 <Link
//                                     href="/forgot-password"
//                                     className="forgot-link small fw-semibold text-decoration-none"
//                                 >
//                                     Forgot password?
//                                 </Link>

//                             </div>

//                             {/* BUTTON */}
//                             <button
//                                 type="submit"
//                                 className="btn login-button w-100 fw-semibold"
//                             >
//                                 Sign in
//                                 <span className="ms-2">→</span>
//                             </button>

//                         </form>

//                         <div className="login-card-footer mt-4 pt-3 border-top">
//                             Secure admin access
//                         </div>

//                     </div>

//                 </section>

//             </div>
//         </main>
//     )
// }

// export default Page









// 'use client'

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import './login.css'
// import Url from '@/Url'

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// const Page = () => {
//     const router = useRouter()

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [showPassword, setShowPassword] = useState(false)
//     const [rememberMe, setRememberMe] = useState(true)
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState(false)

//     const handleLogin = async (e) => {
//         e.preventDefault()
//         setError('')

//         if (!email.trim() || !password) {
//             setError('Please enter your email and password.')
//             return
//         }

//         setLoading(true)

//         try {
//             const res = await fetch(`${Url}/api/auth/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include', // required so the httpOnly auth cookie from the server is saved
//                 body: JSON.stringify({ email: email.trim(), password }),
//             })

//             const json = await res.json()

//             if (!json.success) {
//                 setError(json.message || 'Invalid email or password.')
//                 setLoading(false)
//                 return
//             }

//             // middleware.js checks this cookie to decide route access —
//             // without it, router.replace('/') below gets bounced straight back to /login
//             // document.cookie = 'admin-auth=1; path=/; max-age=86400; SameSite=Lax'

//             // if (rememberMe) {
//             //     localStorage.setItem('admin-auth', 'true')
//             // } else {
//             //     localStorage.removeItem('admin-auth')
//             // }

//             router.replace('/')
//             router.refresh()
//         } catch (err) {
//             setError('Something went wrong. Please try again.')
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <main className="login-page container-fluid p-0">
//             <div className="row g-0 min-vh-100">

//                 {/* LEFT BRAND */}
//                 <section className="login-brand col-lg-6 d-none d-lg-flex flex-column">

//                     <div className="px-5 pt-5">
//                         <div className="login-logo d-flex align-items-center">

//                             <div className="logo-grid me-3">
//                                 {Array.from({ length: 9 }).map((_, index) => (
//                                     <span key={index} />
//                                 ))}
//                             </div>

//                             <span className="logo-text">
//                                 translate co
//                             </span>

//                             <span className="logo-admin ms-3">
//                                 ADMIN
//                             </span>

//                         </div>
//                     </div>

//                     <div className="login-brand-content px-5 my-auto">
//                         <h1 className="fw-bold mb-3">
//                             Translation operations,
//                             <br />
//                             managed in one place.
//                         </h1>

//                         <p className="mb-0">
//                             Manage users, translation jobs,
//                             verification, disputes and
//                             payouts from the admin workspace.
//                         </p>
//                     </div>

//                     <div className="login-brand-footer px-5 pb-5">
//                         Secure admin workspace
//                     </div>

//                 </section>

//                 {/* LOGIN */}
//                 <section className="login-form-side col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-sm-4">

//                     <div className="login-card w-100 p-4 p-sm-5">

//                         <div className="mb-4">
//                             <h2 className="fw-bold mb-2">
//                                 Welcome back
//                             </h2>

//                             <p className="text-secondary mb-0">
//                                 Sign in to your admin account
//                                 to continue.
//                             </p>
//                         </div>

//                         <form onSubmit={handleLogin}>

//                             {/* EMAIL */}
//                             <div className="mb-3">
//                                 <label
//                                     htmlFor="email"
//                                     className="form-label fw-semibold"
//                                 >
//                                     Email address
//                                 </label>

//                                 <input
//                                     id="email"
//                                     type="email"
//                                     className="form-control login-input"
//                                     value={email}
//                                     onChange={(e) =>
//                                         setEmail(e.target.value)
//                                     }
//                                     placeholder="Enter your email"
//                                     autoComplete="email"
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label
//                                     htmlFor="password"
//                                     className="form-label fw-semibold"
//                                 >
//                                     Password
//                                 </label>

//                                 <div className="position-relative">

//                                     <input
//                                         id="password"
//                                         type={showPassword ? 'text' : 'password'}
//                                         className="form-control login-input pe-5"
//                                         value={password}
//                                         onChange={(e) =>
//                                             setPassword(e.target.value)
//                                         }
//                                         placeholder="Enter your password"
//                                         autoComplete="current-password"
//                                     />

//                                     <button
//                                         type="button"
//                                         className="password-toggle border-0 bg-transparent"
//                                         onClick={() =>
//                                             setShowPassword(prev => !prev)
//                                         }
//                                     >
//                                         <i
//                                             className={
//                                                 showPassword
//                                                     ? 'fa-solid fa-eye-slash'
//                                                     : 'fa-solid fa-eye'
//                                             }
//                                         />
//                                     </button>

//                                 </div>
//                             </div>
//                             {error && (
//                                 <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
//                                     <i className="fa-solid fa-circle-exclamation" />
//                                     <span>{error}</span>
//                                 </div>
//                             )}
//                             <div className="d-flex align-items-center justify-content-between mb-4">

//                                 <div className="form-check m-0">
//                                     <input
//                                         id="remember"
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         checked={rememberMe}
//                                         onChange={(e) =>
//                                             setRememberMe(e.target.checked)
//                                         }
//                                     />

//                                     <label
//                                         htmlFor="remember"
//                                         className="form-check-label small"
//                                     >
//                                         Remember me
//                                     </label>
//                                 </div>

//                                 <Link
//                                     href="/forgot-password"
//                                     className="forgot-link small fw-semibold text-decoration-none"
//                                 >
//                                     Forgot password?
//                                 </Link>

//                             </div>

//                             {/* BUTTON */}
//                             <button
//                                 type="submit"
//                                 className="btn login-button w-100 fw-semibold"
//                                 disabled={loading}
//                             >
//                                 {loading ? 'Signing in...' : 'Sign in'}
//                                 <span className="ms-2">→</span>
//                             </button>

//                         </form>

//                         <div className="login-card-footer mt-4 pt-3 border-top">
//                             Secure admin access
//                         </div>

//                     </div>

//                 </section>

//             </div>
//         </main>
//     )
// }

// export default Page


















'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Swal from 'sweetalert2'
import './login.css'
import Url from '@/Url'
import { markSession, prefetchAll } from '@/lib/apiCache'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

const Page = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (loading) return

        setError('')

        if (!email.trim() || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Details',
                text: 'Please enter your email and password.',
                confirmButtonText: 'OK',
            })
            return
        }

        setLoading(true)

        try {
            const res = await fetch(`${Url}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // httpOnly auth cookie from the server
                body: JSON.stringify({ email: email.trim(), password }),
            })

            const json = await res.json().catch(() => ({}))

            if (!res.ok || !json.success) {
                setLoading(false)

                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: json.message || 'Invalid email or password.',
                    confirmButtonText: 'Try Again',
                })
                return
            }

            // Session is valid: the admin layout can render immediately,
            // and all list data starts loading while we navigate.
            markSession()
            prefetchAll()

            // Small toast: does not block, stays visible after navigation.
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
            })

            router.replace('/')
        } catch (err) {
            setLoading(false)

            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Cannot connect to the server. Please try again.',
                confirmButtonText: 'OK',
            })
        }
    }

    return (
        <main className="login-page container-fluid p-0">
            <div className="row g-0 min-vh-100">

                {/* LEFT BRAND */}
                <section className="login-brand col-lg-6 d-none d-lg-flex flex-column">

                    <div className="px-5 pt-5">
                        <div className="login-logo d-flex align-items-center">

                            <div className="logo-grid me-3">
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <span key={index} />
                                ))}
                            </div>

                            <span className="logo-text">
                                translate co
                            </span>

                            <span className="logo-admin ms-3">
                                ADMIN
                            </span>

                        </div>
                    </div>

                    <div className="login-brand-content px-5 my-auto">
                        <h1 className="fw-bold mb-3">
                            Translation operations,
                            <br />
                            managed in one place.
                        </h1>

                        <p className="mb-0">
                            Manage users, translation jobs,
                            verification, disputes and
                            payouts from the admin workspace.
                        </p>
                    </div>

                    <div className="login-brand-footer px-5 pb-5">
                        Secure admin workspace
                    </div>

                </section>

                {/* LOGIN */}
                <section className="login-form-side col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-sm-4">

                    <div className="login-card w-100 p-4 p-sm-5">

                        <div className="mb-4">
                            <h2 className="fw-bold mb-2">
                                Welcome back
                            </h2>

                            <p className="text-secondary mb-0">
                                Sign in to your admin account
                                to continue.
                            </p>
                        </div>

                        <form onSubmit={handleLogin}>

                            {/* EMAIL */}
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label fw-semibold"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    className="form-control login-input"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label fw-semibold"
                                >
                                    Password
                                </label>

                                <div className="position-relative">

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control login-input pe-5"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle border-0 bg-transparent"
                                        onClick={() =>
                                            setShowPassword(prev => !prev)
                                        }
                                    >
                                        <i
                                            className={
                                                showPassword
                                                    ? 'fa-solid fa-eye-slash'
                                                    : 'fa-solid fa-eye'
                                            }
                                        />
                                    </button>

                                </div>
                            </div>
                            {error && (
                                <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                                    <i className="fa-solid fa-circle-exclamation" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <div className="d-flex align-items-center justify-content-between mb-4">

                                <div className="form-check m-0">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(e.target.checked)
                                        }
                                    />

                                    <label
                                        htmlFor="remember"
                                        className="form-check-label small"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <Link
                                    href="/forgot-password"
                                    className="forgot-link small fw-semibold text-decoration-none"
                                >
                                    Forgot password?
                                </Link>

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="btn login-button w-100 fw-semibold"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                                <span className="ms-2">→</span>
                            </button>

                        </form>

                        <div className="login-card-footer mt-4 pt-3 border-top">
                            Secure admin access
                        </div>

                    </div>

                </section>

            </div>
        </main>
    )
}

export default Page