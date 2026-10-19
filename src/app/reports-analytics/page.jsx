import React from 'react'
import './reportsAnalytics.css'

const revenueData = [
    {
        month: 'Mar',
        height: '35%'
    },
    {
        month: 'Apr',
        height: '55%'
    },
    {
        month: 'May',
        height: '62%'
    },
    {
        month: 'Jun',
        height: '58%'
    },
    {
        month: 'Jul',
        height: '78%'
    },
    {
        month: 'Aug',
        height: '92%',
        last: true
    }
]

const translators = [
    {
        name: 'Elena Vidal',
        jobs: '18',
        revenue: '$2,140'
    },
    {
        name: 'Wei Zhang',
        jobs: '14',
        revenue: '$1,820'
    },
    {
        name: 'Amara Kofi',
        jobs: '12',
        revenue: '$1,560'
    }
]

const page = () => {
    return (
        <div>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
                <h4 className="fw-bold mb-0">
                    Reports &amp; analytics
                </h4>

                <button
                    type="button"
                    className="btn btn-light border fw-semibold px-2 py-2 exportButton"
                >
                    ↓ Export CSV
                </button>

            </div>

            <div className="card border rounded-4 shadow-sm mb-4">
                <div className="card-body p-3 p-md-4">
                    <h5 className="fw-bold mb-4">
                        Revenue trend
                    </h5>

                    <div className="revenueChart">

                        {revenueData.map((item) => (

                            <div
                                className="revenueBarItem"
                                key={item.month}
                            >

                                <div
                                    className={`revenueBar ${item.last
                                            ? 'lastRevenueBar'
                                            : ''
                                        }`}
                                    style={{
                                        height: item.height
                                    }}
                                />

                                <span className="revenueMonth">
                                    {item.month}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
            <div className="card border rounded-4 shadow-sm">
                <div className="card-body p-3 p-md-4">
                    <h6 className="fw-bold mb-3">
                        Top translators by volume
                    </h6>

                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead>

                                <tr>

                                    <th className="text-secondary fw-semibold ">
                                        TRANSLATOR
                                    </th>

                                    <th className="text-secondary fw-semibold">
                                        JOBS (MTD)
                                    </th>

                                    <th className="text-secondary fw-semibold">
                                        REVENUE GENERATED
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {translators.map((item) => (

                                    <tr key={item.name}>

                                        <td>
                                            {item.name}
                                        </td>

                                        <td>
                                            {item.jobs}
                                        </td>

                                        <td>
                                            {item.revenue}
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