'use client'

import React, { useState } from 'react'
import './disputesSupport.css'

const tabs = [
    {
        label: 'Open',
        count: 7
    },
    {
        label: 'In review',
        count: 3
    },
    {
        label: 'Resolved',
        count: 48
    }
]

const disputes = [
    {
        title: 'Refund requested — User Manual',
        subtitle: 'Atlas Robotics vs. Rafael Santos',
        status: 'OPEN',
        type: 'open'
    },
    {
        title: 'Quality flag — User Manual DE',
        subtitle: 'Reported by automated QC scan',
        status: 'OPEN',
        type: 'open'
    },
    {
        title: 'Late delivery dispute',
        subtitle: 'Fenwick Capital vs. Rafael Santos',
        status: 'IN REVIEW',
        type: 'review'
    }
]

const resolutions = [
    'Issue partial refund',
    'Issue full refund',
    'Reassign job',
    'Dismiss claim'
]

const page = () => {

    const [activeTab, setActiveTab] = useState('Open')
    const [resolution, setResolution] = useState('Issue partial refund')

    return (
        <div>
            <div className="mb-4">
                <h5 className="fw-bold mb-0">
                    Disputes &amp; support
                </h5>
            </div>

            <div className="d-flex mb-4">
                <div className="d-flex flex-wrap gap-0 p-1 border rounded-3">
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`btn border-0 px-2 px-sm-3 fs-14 m-1 py-2 ${
                                activeTab === tab.label
                                    ? 'bg-white shadow-sm fw-semibold'
                                    : 'text-secondary'
                            }`}
                        >
                            {tab.label} ({tab.count})
                        </button>

                    ))}

                </div>
            </div> 

            <div className="row g-4"> 
                <div className="col-12 col-lg-8 col-md-12 col-sm-12">
                    <div className="card disputeCard h-100 border rounded-4 shadow-sm">
                        <div className="card-body">
                            {disputes.map((item) => (
                                <div
                                    key={item.title}
                                    className="disputeItem d-flex align-items-center justify-content-between"
                                >

                                    <div className="d-flex align-items-center gap-2">

                                        <div
                                            className={`disputeIcon ${
                                                item.type === 'review'
                                                    ? 'reviewIcon'
                                                    : 'openIcon'
                                            }`}
                                        >
                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                        </div>

                                        <div>

                                            <div className="fw-semibold  fs-14">
                                                {item.title}
                                            </div>

                                            <div className="text-secondary fs-13">
                                                {item.subtitle}
                                            </div>

                                        </div>

                                    </div>


                                    <span
                                        className={`disputeStatus ${
                                            item.type === 'review'
                                                ? 'reviewStatus'
                                                : 'openStatus'
                                        }`}
                                    >
                                        {item.status}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="col-12 col-lg-4">

                    <div className="card ticketCard border rounded-4 shadow-sm">

                        <div className="card-body">

                            <h6 className="fw-bold mb-4">
                                Ticket: Refund requested
                            </h6>


                            <p className="text-secondary ticketText fs-14 mb-3">
                                Client reports translation missed key technical
                                terminology and requests full refund.
                            </p>


                            <label className="fw-semibold mb-2">
                                Resolution
                            </label>


                            <select
                                value={resolution}
                                onChange={(event) => setResolution(event.target.value)}
                                className="form-select mb-3 fs-14"
                            >

                                {resolutions.map((item) => (

                                    <option
                                    className='fs-14'
                                        value={item}
                                        key={item}
                                    >
                                        {item}
                                    </option>

                                ))}

                            </select>


                            <button
                                type="button"
                                className="btn btn-primary w-100 fw-bold resolveButton fs-14"
                            >
                                Resolve ticket
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default page