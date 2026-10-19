'use client'

import React, { useState } from 'react'
import './jobsProjects.css'
import { useRouter } from 'next/navigation'

const tabs = [
    'All',
    'NEW JOBS',
    'IN PROGRESS',
    'IN REVIEW',
    'DISPUTED',
    'CANCELLEED'
]

const projects = [
    {
        project: 'Product Launch Deck',
        client: 'Northwind Legal',
        translator: 'Elena Vidal',
        value: '$161.20',
        translaterAmount: '$999',
        status: 'IN PROGRESS',
        statusType: 'inProgress',
        due: 'Aug 27'
    },
    {
        project: 'Vendor Contract',
        client: 'Northwind Legal',
        translator: 'Jonas Richter',
        value: '$500.50',
        translaterAmount: '$100',
        status: 'IN REVIEW',
        statusType: 'inReview',
        due: 'Aug 26'
    },
    {
        project: 'User Manual',
        client: 'Atlas Robotics',
        translator: 'Rafael Santos',
        value: '$392.60',
        translaterAmount: '$250',
        status: 'DISPUTED',
        statusType: 'disputed',
        due: 'Aug 24'
    },
    {
        project: 'Support Docs',
        client: 'Northwind Legal',
        translator: 'Wei Zhang',
        value: '$210.00',
        translaterAmount: '$120',
        status: 'DELIVERED',
        statusType: 'delivered',
        due: 'Aug 25'
    },

    {
        project: 'Website Translation',
        client: 'Global Tech',
        translator: 'Sofia Martin',
        value: '$350.00',
        translaterAmount: '$180',
        status: 'NEW JOB',
        statusType: 'newJob',
        due: 'Aug 30'
    },
    {
        project: 'Mobile App Localization',
        client: 'Tech Solutions',
        translator: 'Daniel Kim',
        value: '$425.00',
        translaterAmount: '$220',
        status: 'NEW JOB',
        statusType: 'newJob',
        due: 'Sep 01'
    },

    {
        project: 'Marketing Campaign',
        client: 'Bright Media',
        translator: 'Emma Wilson',
        value: '$275.00',
        translaterAmount: '$140',
        status: 'CANCELLED',
        statusType: 'cancelled',
        due: 'Aug 20'
    },
    {
        project: 'Product Catalogue',
        client: 'Urban Store',
        translator: 'Lucas Brown',
        value: '$190.00',
        translaterAmount: '$95',
        status: 'CANCELLED',
        statusType: 'cancelled',
        due: 'Aug 19'
    }
]

const page = () => {
    const router = useRouter()


    const [activeTab, setActiveTab] = useState('All')

    const filteredProjects = projects.filter((item) => {

        if (activeTab === 'All') {
            return true
        }

        if (activeTab === 'NEW JOBS') {
            return item.statusType === 'newJob'
        }

        if (activeTab === 'IN PROGRESS') {
            return item.statusType === 'inProgress'
        }

        if (activeTab === 'IN REVIEW') {
            return item.statusType === 'inReview'
        }

        if (activeTab === 'DISPUTED') {
            return item.statusType === 'disputed'
        }

        if (activeTab === 'CANCELLEED') {
            return item.statusType === 'cancelled'
        }

        return false
    })

    return (
        <div>

            <div className="mb-4">
                <h4 className="fw-bold mb-1 mb-2">
                    Jobs &amp; projects
                </h4>

                <p className="text-secondary mb-0 fs-14">
                    642 jobs currently in progress.
                </p>
            </div>

            <div className="d-flex mb-4">
                <div className="d-flex flex-wrap gap-0 gap-sm-1 p-0 p-sm-1 py-2 px-2 border rounded-3">
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`btn border-0 px-3 fs-13 px-md-4 py-2 my-1 mx-md-2 ${activeTab === tab
                                ? 'bg-white shadow-sm fw-semibold'
                                : 'text-secondary'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}

                </div>

            </div>

            <div className="card border rounded-4 shadow-sm">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table align-middle mb-0 jobsTable">

                            <thead>
                                <tr className="fs-14">

                                    <th className='text-uppercase'>
                                        project
                                    </th>

                                    <th className='text-uppercase' >
                                        client
                                    </th>

                                    <th className='text-uppercase'>
                                        translate
                                    </th>

                                    <th className='text-uppercase'>
                                        value
                                    </th>

                                    <th className='text-uppercase'>
                                        translate amount
                                    </th>

                                    <th className='text-uppercase'>
                                        status
                                    </th>

                                    <th className='text-uppercase'>
                                        due
                                    </th>
                                    <th className='text-uppercase'>
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="fs-14">

                                {filteredProjects.map((item) => (

                                    <tr key={item.project}>

                                        <td className="fw-medium text-capitalize">
                                            {item.project}
                                        </td>

                                        <td className='text-capitalize'>
                                            {item.client}
                                        </td>

                                        <td className='text-capitalize'>
                                            {item.translator}
                                        </td>

                                        <td>
                                            {item.value}
                                        </td>

                                        <td className="ps-lg-5">
                                            {item.translaterAmount}
                                        </td>

                                        <td>
                                            <span
                                                className={`jobStatus ${item.statusType}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className='text-capitalize'>
                                            {item.due}
                                        </td>
                                        <td>
                                            <button onClick={() =>
                                                router.push(
                                                    `/jobs-projects/${encodeURIComponent(item.project)}`
                                                )
                                            } type='button' className='btn btn-light border fs-14 text-capitalize'>View</button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default page





