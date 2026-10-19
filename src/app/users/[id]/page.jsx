'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'

import './userDetails.css'

const users = [
    {
        name: 'Elena Vidal',
        email: 'elena.vidal@mail.com',
        initials: 'EV',
        role: 'Translator',
        status: 'ACTIVE',
        joined: 'Mar 2024',
        rating: '4.9★',
        jobs: '340',
        earnings: '$18,240',
        document: 'ATA Certification.pdf',
        documentDate: 'Uploaded Mar 2, 2024',
        documentStatus: 'APPROVED',
        jobsHistory: [
            {
                project: 'Product Launch Deck',
                client: 'Northwind Legal',
                amount: '$161.20',
                status: 'IN PROGRESS',
            },
            {
                project: 'SaaS Terms of Service',
                client: 'Lumen Studio',
                amount: '$312.00',
                status: 'COMPLETED',
            },
        ],
    },
    {
        name: 'Rafael Santos',
        email: 'r.santos@mail.com',
        initials: 'RS',
        role: 'Translator',
        status: 'SUSPENDED',
        joined: 'Jan 2024',
        rating: '4.1★',
        jobs: '210',
        earnings: '$12,840',
        document: 'Translation Certificate.pdf',
        documentDate: 'Uploaded Jan 12, 2024',
        documentStatus: 'APPROVED',
        jobsHistory: [
            {
                project: 'User Manual DE',
                client: 'Atlas Robotics',
                amount: '$280.00',
                status: 'COMPLETED',
            },
            {
                project: 'Legal Contract',
                client: 'Northwind Legal',
                amount: '$420.00',
                status: 'COMPLETED',
            },
        ],
    },
    {
        name: 'Wei Zhang',
        email: 'wei.zhang@mail.com',
        initials: 'WZ',
        role: 'Translator',
        status: 'ACTIVE',
        joined: 'Nov 2023',
        rating: '4.9★',
        jobs: '185',
        earnings: '$15,620',
        document: 'Translation Certificate.pdf',
        documentDate: 'Uploaded Nov 15, 2023',
        documentStatus: 'APPROVED',
        jobsHistory: [
            {
                project: 'Product Documentation',
                client: 'Tech Solutions',
                amount: '$240.00',
                status: 'IN PROGRESS',
            },
            {
                project: 'Marketing Translation',
                client: 'Digital World',
                amount: '$350.00',
                status: 'COMPLETED',
            },
        ],
    },
    {
        name: 'Camille Roux',
        email: 'c.roux@mail.com',
        initials: 'CR',
        role: 'Client',
        status: 'ACTIVE',
        joined: 'Jul 2024',
        rating: '4.7★',
        jobs: '98',
        earnings: '$8,420',
        document: 'Company Verification.pdf',
        documentDate: 'Uploaded Jul 8, 2024',
        documentStatus: 'APPROVED',
        jobsHistory: [
            {
                project: 'Product Launch Deck',
                client: 'Camille Roux',
                amount: '$500.00',
                status: 'COMPLETED',
            },
            {
                project: 'Website Localization',
                client: 'Camille Roux',
                amount: '$720.00',
                status: 'IN PROGRESS',
            },
        ],
    },
    {
        name: 'Camille',
        email: 'c.roux@ma.com',
        initials: 'CR',
        role: 'Client',
        status: 'ACTIVE',
        joined: 'Jul 2424',
        rating: '4.7★',
        jobs: '98',
        earnings: '$8,420',
        document: 'Company Verification.pdf',
        documentDate: 'Uploaded Jul 8, 2024',
        documentStatus: 'APPROVED',
        jobsHistory: [
            {
                project: 'Website Localization',
                client: 'Camille',
                amount: '$620.00',
                status: 'COMPLETED',
            },
        ],
    },
]

const page = () => {
    const params = useParams()
    const router = useRouter()

    const userId = decodeURIComponent(params.id)

    const user = users.find(
        (item) => item.email === userId
    )

    if (!user) {
        return (
            <div>

                <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none mb-4 text-capitalize"
                    onClick={() => router.push('/users')}
                >
                    ← Back to users
                </button>

                <div className="card border rounded-4 shadow-sm">
                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-2">
                            User not found
                        </h5>

                        <p className="text-secondary mb-0 fs-14">
                            The requested user could not be found.
                        </p>

                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>

            {/* BACK */}

            <button
                type="button"
                className="btn btn-link p-0 text-decoration-none text-secondary mb-3 fs-14"
                onClick={() => router.push('/users')}
            >
                ← Back to users
            </button>


            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">

                <div className="d-flex align-items-center gap-3">

                    <div className="userDetailsAvatar">
                        {user.initials}
                    </div>

                    <div>

                        <p className="fw-bold mb-1 fs-22">
                            {user.name}
                        </p>

                        <p className="text-secondary mb-0 fs-14">
                            {user.email} · {user.role} · Joined {user.joined}
                        </p>

                    </div>

                </div>

                <span className="userDetailsActive fs-12 text-uppercase">
                    {user.status}
                </span>

            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="card border rounded-4 shadow-sm mb-4">
                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-4 fs-18">
                                Verification documents
                            </h5>

                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">

                                <div className="d-flex align-items-center gap-3">

                                    <div className="documentIcon">
                                        📄
                                    </div>

                                    <div>

                                        <div className="fw-semibold fs-14 fw-bold">
                                            {user.document}
                                        </div>

                                        <div className="text-secondary fs-14">
                                            {user.documentDate}
                                        </div>

                                    </div>

                                </div>

                                <span className="documentApproved text-uppercase fs-14">
                                    {user.documentStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="card border rounded-4 shadow-sm mb-4">

                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4 fs-18">
                                Job history
                            </h5>

                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead>
                                        <tr>

                                            <th className="text-uppercase fs-13">
                                                Project
                                            </th>

                                            <th className="text-uppercase fs-13">
                                                Client
                                            </th>

                                            <th className="text-uppercase fs-13">
                                                Amount
                                            </th>

                                            <th className="text-uppercase fs-13">
                                                Status
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {user.jobsHistory.map((job, index) => (

                                            <tr key={index}>

                                                <td className="fs-14">
                                                    {job.project}
                                                </td>

                                                <td className="fs-14">
                                                    {job.client}
                                                </td>

                                                <td className="fs-14">
                                                    {job.amount}
                                                </td>

                                                <td>
                                                    <span className="jobStatus">
                                                        {job.status}
                                                    </span>
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>
                    <div className="card border rounded-4 shadow-sm">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-4 fs-18">
                                Internal notes
                            </h5>

                            <textarea
                                className="form-control fs-14 mb-3"
                                rows="4"
                                placeholder="Add a private note visible only to admins..."
                            ></textarea>

                            <button
                                type="button"
                                className="btn btn-light border fw-semibold fs-14"
                            >
                                Save note
                            </button>

                        </div>

                    </div>

                </div>
                <div className="col-12 col-lg-4">
                    <div className="card border rounded-4 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h6 className="fw-bold mb-4 fs-18">
                                Account actions
                            </h6>
                            <div className="d-grid gap-2">

                                <button
                                    type="button"
                                    className="btn btn-light border fw-semibold fs-14"
                                >
                                    Send message
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-light border fw-semibold fs-14"
                                >
                                    Reset password
                                </button>

                                <button
                                    type="button"
                                    style={{backgroundColor : "#f5aaba70"}}
                                    className="btn bg-opacity-10 text-danger border-0 fw-semibold fs-14"
                                >
                                    Suspend account
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4 fs-18">
                                Stats
                            </h5>

                            <div className="d-flex justify-content-between py-2 border-bottom">

                                <span className="fw-semibold fs-14">
                                    Rating
                                </span>

                                <span className="text-secondary fs-14 fs-14">
                                    {user.rating}
                                </span>

                            </div>

                            <div className="d-flex justify-content-between py-2 border-bottom">

                                <span className="fw-semibold fs-14">
                                    Jobs completed
                                </span>

                                <span className="text-secondary fs-14">
                                    {user.jobs}
                                </span>

                            </div>

                            <div className="d-flex justify-content-between py-2">

                                <span className="fw-semibold fs-14">
                                    Lifetime earnings
                                </span>

                                <span className="text-secondary fs-14 ">
                                    {user.earnings}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default page