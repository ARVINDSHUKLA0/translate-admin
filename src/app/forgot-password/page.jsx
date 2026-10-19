'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import './ForgotPassword.css'

const Page = () => {
    const [email, setEmail] = useState('gigbiggroup@gmail.com')
    const [sent, setSent] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email.trim()) return

        setSent(true)
    }

    return (
        <main className="forgot-page container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <section className="forgot-brand col-lg-6 d-none d-lg-flex flex-column">
                    <div className="px-5 pt-5">
                        <div className="d-flex align-items-center">
                            <div className="logo-grid me-3">
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <span key={index}></span>
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
                    <div className="forgot-brand-content px-5 my-auto">
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
                    <div className="px-5 pb-5 forgot-brand-footer">
                        Secure admin workspace
                    </div>

                </section>
                <section className="forgot-form-side col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-sm-4">
                    <div className="forgot-card w-100">
                        <div className="mb-4">
                            <h2 className="fw-bold mb-2">
                                Forgot your password?
                            </h2>

                            <p className="text-secondary mb-0">
                                Enter the email address associated
                                with your admin account and we'll
                                send you a reset link.
                            </p>
                        </div>
 
                        {sent ? (
                            <div>

                                <div className="alert alert-success small mb-4">
                                    Reset link request submitted
                                    successfully.
                                </div>

                                <Link
                                    href="/login"
                                    className="forgot-back d-inline-flex align-items-center text-decoration-none fw-semibold"
                                >
                                    ← Back to sign in
                                </Link>

                            </div>
                        ) : (

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">

                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold"
                                    >
                                        Work email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control forgot-input"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        required
                                    />

                                </div>
                                <button
                                    type="submit"
                                    className="btn forgot-button w-100 fw-semibold"
                                >
                                    Send reset link
                                    <span className="ms-2">
                                        →
                                    </span>
                                </button>
 
                                <div className="border-top mt-4 pt-3">

                                    <Link
                                        href="/login"
                                        className="forgot-back text-decoration-none fw-semibold"
                                    >
                                        ← Back to sign in
                                    </Link>

                                </div>

                            </form>
                        )}

                    </div>

                </section>

            </div>
        </main>
    )
}

export default Page