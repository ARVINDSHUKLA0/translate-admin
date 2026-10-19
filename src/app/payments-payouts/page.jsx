'use client'
import React, { useState } from 'react'
import './paymentsPayouts.css'

const stats = [
    {
        title: 'In escrow',
        value: '$42.1K'
    },
    {
        title: 'Pending payouts',
        value: '$18.2K'
    },
    {
        title: 'Platform fees (MTD)',
        value: '$12.9K'
    },
    {
        title: 'Refunds (MTD)',
        value: '$1.4K'
    }
]

const payouts = [
    {
        translator: 'Elena Vidal',
        client: 'Acme Inc.',
        amount: '$480.00',
        projects: '2'
    },
    {
        translator: 'Camille Roux',
        client: 'Global Translate',
        amount: '$142.10',
        projects: '1'
    },
    {
        translator: 'Wei Zhang',
        client: 'Tech Solutions',
        amount: '$210.00',
        projects: '1'
    }
]

const Page = () => {

    const [activeButton, setActiveButton] = useState('translator')

    return (
        <div>

            <h4 className="fw-bold mb-4">
                Payments &amp; payouts
            </h4>

            <div className="row g-3 mb-4">

                {stats.map((item) => (

                    <div
                        className="col-12 col-sm-6 col-md-6 col-lg-3"
                        key={item.title}
                    >
                        <div className="card h-100 border rounded-4 shadow-sm">

                            <div className="card-body p-4">

                                <p className="text-secondary mb-2 fs-14">
                                    {item.title}
                                </p>

                                <h3 className="mb-0">
                                    {item.value}
                                </h3>

                            </div>

                        </div>

                    </div>

                ))}

            </div>
           
                <div className="payoutsPersonButtons m-1 d-flex gap-3 py-2 mb-3 px-2 border rounded-3 align-items-center">
                    <button
                        type="button"
                        className={`payoutsPersonBtn ${activeButton === 'translator'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() => setActiveButton('translator')}
                    >
                        TRANSLATOR
                    </button>

                    <button
                        type="button"
                        className={`payoutsPersonBtn ${activeButton === 'client'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() => setActiveButton('client')}
                    >
                        CLIENT
                    </button>

                </div>
 


            <div className="card border rounded-4 shadow-sm">

                <div className="card-body p-3 p-sm-4">

                    <div className="d-sm-flex d-block align-items-center justify-content-between gap-3 mb-3">

                        <h6 className="fw-bold mb-0">
                            Pending translator payouts
                        </h6>

                        <div className="mt-3">

                            <button
                                type="button"
                                className="btn payoutsApproveAll fw-semibold fs-14"
                            >
                                Approve all
                            </button>

                        </div>

                    </div>


                    <div className="table-responsive">

                        <table className="table align-middle mb-0 payoutsTable">

                            <thead>

                                <tr>

                                    <th>
                                        {activeButton === 'translator'
                                            ? 'TRANSLATOR'
                                            : 'CLIENT'
                                        }
                                    </th>

                                    <th>
                                        AMOUNT
                                    </th>

                                    <th>
                                        PROJECTS
                                    </th>

                                    <th></th>

                                </tr>

                            </thead>


                            <tbody>

                                {payouts.map((item) => (

                                    <tr key={item.translator}>

                                        <td>
                                            {activeButton === 'translator'
                                                ? item.translator
                                                : item.client
                                            }
                                        </td>

                                        <td>
                                            {item.amount}
                                        </td>

                                        <td>
                                            {item.projects}
                                        </td>

                                        <td className="text-end">

                                            <button
                                                type="button"
                                                className="btn btn-light border fw-semibold fs-14"
                                            >
                                                Approve
                                            </button>

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

export default Page