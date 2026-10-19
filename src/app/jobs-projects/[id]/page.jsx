'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'

import './jobsProjectsDetails.css'

const projects = [
    {
        project: 'Product Launch Deck',
        client: 'Northwind Legal',
        translator: 'Elena Vidal',
        value: '$161.20',
        translaterAmount: '$999',
        status: 'IN PROGRESS',
        statusType: 'inProgress',
        due: 'Aug 27',
        sourceLanguage: 'English',
        targetLanguage: 'Spanish',
        created: 'Aug 20, 2026',
        description:
            'Translation and localization of the Product Launch Deck for the upcoming product release.',
        pages: '24',
        words: '4,820',
        paymentStatus: 'PAID',
    },

    {
        project: 'Vendor Contract',
        client: 'Northwind Legal',
        translator: 'Jonas Richter',
        value: '$500.50',
        translaterAmount: '$100',
        status: 'IN REVIEW',
        statusType: 'inReview',
        due: 'Aug 26',
        sourceLanguage: 'English',
        targetLanguage: 'German',
        created: 'Aug 19, 2026',
        description:
            'Legal contract translation requiring detailed terminology and final review.',
        pages: '18',
        words: '6,240',
        paymentStatus: 'PAID',
    },

    {
        project: 'User Manual',
        client: 'Atlas Robotics',
        translator: 'Rafael Santos',
        value: '$392.60',
        translaterAmount: '$250',
        status: 'DISPUTED',
        statusType: 'disputed',
        due: 'Aug 24',
        sourceLanguage: 'English',
        targetLanguage: 'Portuguese',
        created: 'Aug 17, 2026',
        description:
            'Technical user manual translation for Atlas Robotics products.',
        pages: '42',
        words: '8,450',
        paymentStatus: 'ON HOLD',
    },

    {
        project: 'Support Docs',
        client: 'Northwind Legal',
        translator: 'Wei Zhang',
        value: '$210.00',
        translaterAmount: '$120',
        status: 'DELIVERED',
        statusType: 'delivered',
        due: 'Aug 25',
        sourceLanguage: 'English',
        targetLanguage: 'Chinese',
        created: 'Aug 18, 2026',
        description:
            'Customer support documentation translated for international users.',
        pages: '15',
        words: '3,620',
        paymentStatus: 'PAID',
    },

    {
        project: 'Website Translation',
        client: 'Global Tech',
        translator: 'Sofia Martin',
        value: '$350.00',
        translaterAmount: '$180',
        status: 'NEW JOB',
        statusType: 'newJob',
        due: 'Aug 30',
        sourceLanguage: 'English',
        targetLanguage: 'French',
        created: 'Aug 22, 2026',
        description:
            'Website content translation and localization for the Global Tech website.',
        pages: '30',
        words: '5,300',
        paymentStatus: 'PENDING',
    },

    {
        project: 'Mobile App Localization',
        client: 'Tech Solutions',
        translator: 'Daniel Kim',
        value: '$425.00',
        translaterAmount: '$220',
        status: 'NEW JOB',
        statusType: 'newJob',
        due: 'Sep 01',
        sourceLanguage: 'English',
        targetLanguage: 'Korean',
        created: 'Aug 23, 2026',
        description:
            'Mobile application localization including UI strings and help content.',
        pages: '20',
        words: '4,100',
        paymentStatus: 'PENDING',
    },

    {
        project: 'Marketing Campaign',
        client: 'Bright Media',
        translator: 'Emma Wilson',
        value: '$275.00',
        translaterAmount: '$140',
        status: 'CANCELLED',
        statusType: 'cancelled',
        due: 'Aug 20',
        sourceLanguage: 'English',
        targetLanguage: 'Italian',
        created: 'Aug 15, 2026',
        description:
            'Marketing campaign content translation for an international launch.',
        pages: '12',
        words: '2,450',
        paymentStatus: 'CANCELLED',
    },

    {
        project: 'Product Catalogue',
        client: 'Urban Store',
        translator: 'Lucas Brown',
        value: '$190.00',
        translaterAmount: '$95',
        status: 'CANCELLED',
        statusType: 'cancelled',
        due: 'Aug 19',
        sourceLanguage: 'English',
        targetLanguage: 'Spanish',
        created: 'Aug 14, 2026',
        description:
            'Product catalogue translation for Urban Store international customers.',
        pages: '10',
        words: '1,980',
        paymentStatus: 'CANCELLED',
    },
]

const page = () => {
    const params = useParams()
    const router = useRouter()

    const projectId = decodeURIComponent(params.id)

    const project = projects.find(
        (item) => item.project === projectId
    )

    if (!project) {
        return (
            <div>

                <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none text-secondary mb-4"
                    onClick={() => router.push('/jobs-projects')}
                >
                    ← Back to jobs & projects
                </button>

                <div className="card border rounded-4 shadow-sm">
                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-2">
                            Project not found
                        </h5>

                        <p className="text-secondary fs-14 mb-0">
                            The requested project could not be found.
                        </p>

                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>
            <button
                type="button"
                className="btn btn-link p-0 text-decoration-none text-secondary mb-4 fs-14"
                onClick={() => router.push('/jobs-projects')}
            >
                ← Back to jobs & projects
            </button>

            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-2">
                        {project.project}
                    </h4>

                    <p className="text-secondary fs-12 mb-0">
                        Project details and translation information
                    </p>
                </div>
                <span
                    className={`jobDetailsStatus ${project.statusType}`}
                >
                    {project.status}
                </span>
            </div>

            <div className="row g-4">
                <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                    <div className="card border rounded-4 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">
                                Project overview
                            </h5>
                            <div className="row g-4">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="text-secondary fs-13 mb-1">
                                        Project
                                    </div>
                                    <div className="fw-semibold">
                                        {project.project}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="text-secondary fs-13 mb-1">
                                        Client
                                    </div>
                                    <div className="fw-semibold">
                                        {project.client}
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Translator
                                    </div>

                                    <div className="fw-semibold">
                                        {project.translator}
                                    </div>

                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Created
                                    </div>

                                    <div className="fw-semibold">
                                        {project.created}
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Due date
                                    </div>

                                    <div className="fw-semibold">
                                        {project.due}
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Payment status
                                    </div>

                                    <div className="fw-semibold">
                                        {project.paymentStatus}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card border rounded-4 shadow-sm mb-4">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-4">
                                Translation details
                            </h5>

                            <div className="row g-4">

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Source language
                                    </div>

                                    <div className="fw-semibold">
                                        {project.sourceLanguage}
                                    </div>

                                </div>


                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Target language
                                    </div>

                                    <div className="fw-semibold">
                                        {project.targetLanguage}
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Total pages
                                    </div>

                                    <div className="fw-semibold">
                                        {project.pages}
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                    <div className="text-secondary fs-13 mb-1">
                                        Word count
                                    </div>

                                    <div className="fw-semibold">
                                        {project.words}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card border rounded-4 shadow-sm">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">
                                Project description
                            </h5>

                            <p className="text-secondary fs-14 mb-0">
                                {project.description}
                            </p>

                        </div>

                    </div>

                </div>

 

                <div className="col-12 col-lg-4">

                    <div className="card border rounded-4 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">
                                Payment
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-secondary fs-14">
                                    Project value
                                </span>
                                <span className="fw-bold">
                                    {project.value}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-secondary fs-14">
                                    Translator amount
                                </span>
                                <span className="fw-bold">
                                    {project.translaterAmount}
                                </span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-semibold">
                                    Payment status
                                </span>
                                <span className="fs-13 fw-semibold">
                                    {project.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card border rounded-4 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">
                                Project members
                            </h5>

                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="projectPersonAvatar">
                                    {project.client
                                        .split(' ')
                                        .map((name) => name[0])
                                        .join('')
                                        .slice(0, 2)}
                                </div>
                                <div>
                                    <div className="fw-semibold">
                                        {project.client}
                                    </div>
                                    <div className="text-secondary fs-13">
                                        Client
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="projectPersonAvatar">
                                    {project.translator
                                        .split(' ')
                                        .map((name) => name[0])
                                        .join('')
                                        .slice(0, 2)}
                                </div>
                                <div>
                                    <div className="fw-semibold">
                                        {project.translator}
                                    </div>
                                    <div className="text-secondary fs-13">
                                        Translator
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">
                                Actions
                            </h5>
                            <div className="d-grid gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light border fs-14 fw-semibold"
                                >
                                    Message client
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-light border fs-14 fw-semibold"
                                >
                                    Message translator
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger fs-14 fw-semibold"
                                >
                                    Open dispute
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page