'use client'

import React, { useState } from 'react'
import './qualityControl.css'

const qualityItems = [
    {
        language: 'DE',
        title: 'User Manual — EN → DE',
        description: 'Flagged: inconsistent terminology (auto-QC)'
    },
    {
        language: 'FR',
        title: 'Vendor Contract — EN → FR',
        description: 'Flagged: missing section (client report)'
    }
]

const page = () => {

    const [qualityScore, setQualityScore] = useState(50)

    return (
        <div>

            <div className="mb-4">

                <h4 className="fw-bold mb-0">
                    Quality control
                </h4>

                <p className="text-secondary mb-0 fs-14">
                    3 deliveries flagged for review.
                </p>

            </div>


            {/* QUALITY LIST */}

            <div className="card border rounded-4 shadow-sm mb-4">

                <div className="card-body p-3 p-sm-2">

                    {qualityItems.map((item) => (

                        <div
                            className="qualityItem d-flex align-items-center justify-content-between gap-3"
                            key={item.title}
                        >

                            <div className="d-flex align-items-center gap-3">

                                <div className="languageBox">
                                    {item.language}
                                </div>

                                <div>

                                    <div className="fw-semibold fs-14">
                                        {item.title}
                                    </div>

                                    <div className="text-secondary qualityDescription fs-14">
                                        {item.description}
                                    </div>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="btn btn-primary fw-semibold reviewButton fs-14"
                            >
                                Review
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            <div className="card rounded-4 shadow-sm reviewCard">

                <div className="card-body p-3 p-md-4">

                    <h5 className="fw-bold mb-4">
                        Review: User Manual (EN → DE)
                    </h5>

                    <div className="row g-3 mb-3">

                        <div className="col-12 col-md-6">

                            <label className="form-label text-secondary fs-12">
                                SOURCE
                            </label>

                            <div className="reviewText rounded-3 p-3 fs-14  ">
                                Attach the power cable only after confirming the unit is powered off...
                            </div>

                        </div>


                        <div className="col-12 col-md-6">

                            <label className="form-label text-secondary fs-12">
                                DELIVERED
                            </label>

                            <div className="reviewText rounded-3 p-3 fs-14">
                                Schließen Sie das Netzkabel erst an, nachdem Sie sichergestellt haben...
                            </div>

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold fs-14">
                            Quality score
                        </label>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={qualityScore}
                            onChange={(e) => setQualityScore(e.target.value)}
                            className="form-range qualityRange"
                            style={{
                                background: `linear-gradient(
                                    to right,
                                    var(--color-focus) 0%,
                                    var(--color-focus) ${qualityScore}%,
                                    var(--color-border) ${qualityScore}%,
                                    var(--color-border) 100%
                                )`
                            }}
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold fs-14">
                            Feedback to translator
                        </label>

                        <textarea
                            className="form-control rounded-3 feedbackBox"
                            placeholder="Optional notes..."
                        />

                    </div>

                    <button
                        type="button"
                        className="btn btn-primary fw-semibold px-3 py-2 fs-14"
                    >
                        Submit review
                    </button>

                </div>

            </div>

        </div>
    )
}

export default page