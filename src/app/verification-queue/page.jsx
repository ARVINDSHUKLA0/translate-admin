// import React from 'react'
// import './verificationQueue.css'

// const applications = [
//     {
//         initials: 'JR',
//         name: 'Jonas Richter',
//         language: 'EN ⇄ DE',
//         document: 'ATA_Certificate.pdf'
//     },
//     {
//         initials: 'SK',
//         name: 'Sara Kim',
//         language: 'EN ⇄ KO',
//         document: 'NAATI_Certificate.pdf'
//     },
//     {
//         initials: 'LM',
//         name: 'Luca Moretti',
//         language: 'EN ⇄ IT',
//         document: 'Diploma_translation.pdf'
//     }
// ]

// const page = () => {

//     return (
//         <div> 
//             <div className="mb-4">
//                 <h4 className="fw-bold mb-1">
//                     Translator verification queue
//                 </h4>
//                 <p className="text-secondary mb-0 fs-14">
//                     4 applications pending review.
//                 </p>
//             </div>
 
//             <div className="card border rounded-4 shadow-sm">
//                 <div className="card-body p-3 p-md-4">
//                     {applications.map((item) => (

//                         <div
//                             key={item.name}
//                             className="verificationItem d-flex align-items-center justify-content-between gap-3"
//                         >
 

//                             <div className="d-flex align-items-center gap-3">

//                                 <div className="verificationAvatar">
//                                     {item.initials}
//                                 </div>

//                                 <div>

//                                     <div className="fw-semibold fs-14">
//                                         {item.name}
//                                     </div>

//                                     <div className="text-secondary fs-13">
//                                         {item.language} · {item.document} uploaded
//                                     </div>

//                                 </div>

//                             </div> 
//                             <div className="d-flex align-items-center gap-2 flex-shrink-0">
//                                 <button
//                                     type="button"
//                                     className="btn btn-light border fw-semibold fs-14"
//                                 >
//                                     View doc
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-danger bg-opacity-10 border-0 fw-semibold verificationReject fs-14"
//                                 >
//                                     Reject
//                                 </button>

//                                 <button
//                                     type="button"
//                                     className="btn btn-primary fw-semibold fs-14"
//                                 >
//                                     Approve
//                                 </button>

//                             </div>

//                         </div>

//                     ))}

//                 </div>

//             </div>

//         </div>
//     )
// }

// export default page










// 'use client'

// import React, { useEffect, useState } from 'react'
// import './verificationQueue.css'
// import Url from '@/Url'

// const getInitials = (name = '') =>
//     name
//         .split(' ')
//         .filter(Boolean)
//         .slice(0, 2)
//         .map((w) => w[0]?.toUpperCase())
//         .join('') || '?'

// const formatLanguagePairs = (pairs = []) =>
//     pairs.length ? pairs.map((p) => `${p.from} ⇄ ${p.to}`).join(', ') : 'No language pair set'

// const Page = () => {
//     const [applications, setApplications] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState('')
//     const [actioningId, setActioningId] = useState(null)

//     const fetchQueue = async () => {
//         setLoading(true)
//         setError('')
//         try {
//             const res = await fetch(
//                 `${Url}/api/admin/translators/verification-queue?status=pending`,
//                 { credentials: 'include' }
//             )
//             const json = await res.json()

//             if (!json.success) {
//                 setError(json.message || 'Failed to load verification queue.')
//                 setApplications([])
//                 return
//             }

//             setApplications(json.data)
//         } catch (err) {
//             console.error(err)
//             setError('Something went wrong while loading the queue.')
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchQueue()
//     }, [])

//     const handleViewDoc = (translatorId, docId) => {
//         if (!docId) return
//         window.open(
//             `${Url}/api/admin/translators/${translatorId}/documents/${docId}`,
//             '_blank'
//         )
//     }

//     const handleApprove = async (translatorId) => {
//         setActioningId(translatorId)
//         try {
//             const res = await fetch(
//                 `${Url}/api/admin/translators/${translatorId}/approve`,
//                 { method: 'PUT', credentials: 'include' }
//             )
//             const json = await res.json()
//             if (json.success) {
//                 setApplications((prev) => prev.filter((a) => a._id !== translatorId))
//             } else {
//                 alert(json.message || 'Failed to approve.')
//             }
//         } catch (err) {
//             console.error(err)
//             alert('Something went wrong. Please try again.')
//         } finally {
//             setActioningId(null)
//         }
//     }

//     const handleReject = async (translatorId) => {
//         const reason = window.prompt('Reason for rejection (optional):') || ''

//         setActioningId(translatorId)
//         try {
//             const res = await fetch(
//                 `${Url}/api/admin/translators/${translatorId}/reject`,
//                 {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     credentials: 'include',
//                     body: JSON.stringify({ reason }),
//                 }
//             )
//             const json = await res.json()
//             if (json.success) {
//                 setApplications((prev) => prev.filter((a) => a._id !== translatorId))
//             } else {
//                 alert(json.message || 'Failed to reject.')
//             }
//         } catch (err) {
//             console.error(err)
//             alert('Something went wrong. Please try again.')
//         } finally {
//             setActioningId(null)
//         }
//     }

//     return (
//         <div>
//             <div className="mb-4">
//                 <h4 className="fw-bold mb-1">
//                     Translator verification queue
//                 </h4>
//                 <p className="text-secondary mb-0 fs-14">
//                     {loading
//                         ? 'Loading...'
//                         : `${applications.length} application${applications.length === 1 ? '' : 's'} pending review.`}
//                 </p>
//             </div>

//             <div className="card border rounded-4 shadow-sm">
//                 <div className="card-body p-3 p-md-4">

//                     {error && (
//                         <div className="alert alert-danger py-2 px-3 small mb-3">{error}</div>
//                     )}

//                     {!loading && !error && applications.length === 0 && (
//                         <p className="text-secondary mb-0">No pending applications right now.</p>
//                     )}

//                     {applications.map((item) => {
//                         const latestDoc = item.documents?.[item.documents.length - 1]
//                         const isBusy = actioningId === item._id

//                         return (
//                             <div
//                                 key={item._id}
//                                 className="verificationItem d-flex align-items-center justify-content-between gap-3"
//                             >

//                                 <div className="d-flex align-items-center gap-3">

//                                     <div className="verificationAvatar">
//                                         {getInitials(item.fullName)}
//                                     </div>

//                                     <div>

//                                         <div className="fw-semibold fs-14">
//                                             {item.fullName}
//                                         </div>

//                                         <div className="text-secondary fs-13">
//                                             {formatLanguagePairs(item.languagePairs)}
//                                             {latestDoc ? ` · ${latestDoc.originalName} uploaded` : ' · No document uploaded yet'}
//                                         </div>

//                                     </div>

//                                 </div>

//                                 <div className="d-flex align-items-center gap-2 flex-shrink-0">
//                                     <button
//                                         type="button"
//                                         className="btn btn-light border fw-semibold fs-14"
//                                         disabled={!latestDoc}
//                                         onClick={() => handleViewDoc(item._id, latestDoc?._id)}
//                                     >
//                                         View doc
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="btn btn-danger bg-opacity-10 border-0 fw-semibold verificationReject fs-14"
//                                         disabled={isBusy}
//                                         onClick={() => handleReject(item._id)}
//                                     >
//                                         Reject
//                                     </button>

//                                     <button
//                                         type="button"
//                                         className="btn btn-primary fw-semibold fs-14"
//                                         disabled={isBusy}
//                                         onClick={() => handleApprove(item._id)}
//                                     >
//                                         {isBusy ? '...' : 'Approve'}
//                                     </button>

//                                 </div>

//                             </div>
//                         )
//                     })}

//                 </div>

//             </div>

//         </div>
//     )
// }

// export default Page






















// 'use client'

// import React, { useEffect, useState } from 'react'
// import './verificationQueue.css'
// import Url from '@/Url'

// const TABS = [
//     { key: 'pending', label: 'Pending' },
//     { key: 'approved', label: 'Approved' },
//     { key: 'rejected', label: 'Rejected' },
// ]

// const getInitials = (name = '') =>
//     name
//         .split(' ')
//         .filter(Boolean)
//         .slice(0, 2)
//         .map((w) => w[0]?.toUpperCase())
//         .join('') || '?'

// const formatLanguagePairs = (pairs = []) =>
//     pairs.length ? pairs.map((p) => `${p.from} ⇄ ${p.to}`).join(', ') : 'No language pair set'

// const formatDate = (d) => {
//     if (!d) return ''
//     try {
//         return new Date(d).toLocaleDateString('en-IN', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         })
//     } catch {
//         return ''
//     }
// }

// const Page = () => {
//     const [activeTab, setActiveTab] = useState('pending')
//     const [applications, setApplications] = useState([])
//     const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 })
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState('')
//     const [actioningId, setActioningId] = useState(null)

//     const fetchQueue = async (status) => {
//         setLoading(true)
//         setError('')
//         try {
//             const res = await fetch(
//                 `${Url}/api/admin/translators/verification-queue?status=${status}`,
//                 { credentials: 'include' }
//             )
//             const json = await res.json()

//             if (!json.success) {
//                 setError(json.message || 'Failed to load applications.')
//                 setApplications([])
//                 return
//             }

//             setApplications(json.data)
//             setCounts((prev) => ({ ...prev, [status]: json.count ?? json.data.length }))
//         } catch (err) {
//             console.error(err)
//             setError('Something went wrong while loading the queue.')
//         } finally {
//             setLoading(false)
//         }
//     }

//     // fetch counts for all tabs once, so the tab badges are correct
//     // even before the user clicks them
//     const fetchAllCounts = async () => {
//         try {
//             const results = await Promise.all(
//                 TABS.map((t) =>
//                     fetch(`${Url}/api/admin/translators/verification-queue?status=${t.key}`, {
//                         credentials: 'include',
//                     }).then((r) => r.json())
//                 )
//             )
//             const next = {}
//             TABS.forEach((t, i) => {
//                 next[t.key] = results[i]?.success ? (results[i].count ?? results[i].data.length) : 0
//             })
//             setCounts(next)
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     useEffect(() => {
//         fetchQueue(activeTab)
//         fetchAllCounts()
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     useEffect(() => {
//         fetchQueue(activeTab)
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [activeTab])

//     const handleViewDoc = (translatorId, docId) => {
//         if (!docId) return
//         window.open(
//             `${Url}/api/admin/translators/${translatorId}/documents/${docId}`,
//             '_blank'
//         )
//     }

//     const handleApprove = async (translatorId) => {
//         setActioningId(translatorId)
//         try {
//             const res = await fetch(
//                 `${Url}/api/admin/translators/${translatorId}/approve`,
//                 { method: 'PUT', credentials: 'include' }
//             )
//             const json = await res.json()
//             if (json.success) {
//                 setApplications((prev) => prev.filter((a) => a._id !== translatorId))
//                 setCounts((prev) => ({
//                     ...prev,
//                     pending: Math.max(0, prev.pending - 1),
//                     approved: prev.approved + 1,
//                 }))
//             } else {
//                 alert(json.message || 'Failed to approve.')
//             }
//         } catch (err) {
//             console.error(err)
//             alert('Something went wrong. Please try again.')
//         } finally {
//             setActioningId(null)
//         }
//     }

//     const handleReject = async (translatorId) => {
//         const reason = window.prompt('Reason for rejection (optional):') || ''

//         setActioningId(translatorId)
//         try {
//             const res = await fetch(
//                 `${Url}/api/admin/translators/${translatorId}/reject`,
//                 {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     credentials: 'include',
//                     body: JSON.stringify({ reason }),
//                 }
//             )
//             const json = await res.json()
//             if (json.success) {
//                 setApplications((prev) => prev.filter((a) => a._id !== translatorId))
//                 setCounts((prev) => ({
//                     ...prev,
//                     pending: Math.max(0, prev.pending - 1),
//                     rejected: prev.rejected + 1,
//                 }))
//             } else {
//                 alert(json.message || 'Failed to reject.')
//             }
//         } catch (err) {
//             console.error(err)
//             alert('Something went wrong. Please try again.')
//         } finally {
//             setActioningId(null)
//         }
//     }

//     return (
//         <div>
//             <div className="mb-4">
//                 <h4 className="fw-bold mb-1">Translator verification queue</h4>
//                 <p className="text-secondary mb-0 fs-14">
//                     Review, approve, or reject translator applications.
//                 </p>
//             </div>

//             {/* Tabs */}
//             <ul className="nav nav-pills gap-2 mb-3">
//                 {TABS.map((tab) => (
//                     <li className="nav-item" key={tab.key}>
//                         <button
//                             type="button"
//                             className={`btn fw-semibold fs-14 ${
//                                 activeTab === tab.key ? 'btn-primary' : 'btn-light border'
//                             }`}
//                             onClick={() => setActiveTab(tab.key)}
//                         >
//                             {tab.label}
//                             <span
//                                 className={`ms-2 badge rounded-pill ${
//                                     activeTab === tab.key ? 'bg-white text-primary' : 'bg-secondary bg-opacity-25 text-secondary'
//                                 }`}
//                             >
//                                 {counts[tab.key] ?? 0}
//                             </span>
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             <div className="card border rounded-4 shadow-sm">
//                 <div className="card-body p-3 p-md-4">

//                     {error && (
//                         <div className="alert alert-danger py-2 px-3 small mb-3">{error}</div>
//                     )}

//                     {loading && (
//                         <p className="text-secondary mb-0">Loading...</p>
//                     )}

//                     {!loading && !error && applications.length === 0 && (
//                         <p className="text-secondary mb-0">
//                             No {activeTab} applications right now.
//                         </p>
//                     )}

//                     {!loading && applications.map((item) => {
//                         const latestDoc = item.documents?.[item.documents.length - 1]
//                         const isBusy = actioningId === item._id

//                         return (
//                             <div
//                                 key={item._id}
//                                 className="verificationItem d-flex align-items-center justify-content-between gap-3"
//                             >
//                                 <div className="d-flex align-items-center gap-3">
//                                     <div className="verificationAvatar">
//                                         {getInitials(item.fullName)}
//                                     </div>

//                                     <div>
//                                         <div className="fw-semibold fs-14">
//                                             {item.fullName}
//                                         </div>

//                                         <div className="text-secondary fs-13">
//                                             {item.email}
//                                             {' · '}
//                                             {formatLanguagePairs(item.languagePairs)}
//                                             {latestDoc ? ` · ${latestDoc.originalName} uploaded` : ' · No document uploaded yet'}
//                                         </div>

//                                         {/* Status-specific extra info */}
//                                         {activeTab === 'approved' && item.verifiedAt && (
//                                             <div className="text-success fs-13 mt-1">
//                                                 Approved on {formatDate(item.verifiedAt)}
//                                             </div>
//                                         )}

//                                         {activeTab === 'rejected' && (
//                                             <div className="text-danger fs-13 mt-1">
//                                                 Rejected{item.verifiedAt ? ` on ${formatDate(item.verifiedAt)}` : ''}
//                                                 {item.rejectionReason ? ` · Reason: ${item.rejectionReason}` : ''}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="d-flex align-items-center gap-2 flex-shrink-0">
//                                     <button
//                                         type="button"
//                                         className="btn btn-light border fw-semibold fs-14"
//                                         disabled={!latestDoc}
//                                         onClick={() => handleViewDoc(item._id, latestDoc?._id)}
//                                     >
//                                         View doc
//                                     </button>

//                                     {activeTab === 'pending' && (
//                                         <>
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-danger bg-opacity-10 border-0 fw-semibold verificationReject fs-14"
//                                                 disabled={isBusy}
//                                                 onClick={() => handleReject(item._id)}
//                                             >
//                                                 Reject
//                                             </button>

//                                             <button
//                                                 type="button"
//                                                 className="btn btn-primary fw-semibold fs-14"
//                                                 disabled={isBusy}
//                                                 onClick={() => handleApprove(item._id)}
//                                             >
//                                                 {isBusy ? '...' : 'Approve'}
//                                             </button>
//                                         </>
//                                     )}

//                                     {activeTab === 'approved' && (
//                                         <span className="badge bg-success bg-opacity-10 text-success fw-semibold fs-13">
//                                             Approved
//                                         </span>
//                                     )}

//                                     {activeTab === 'rejected' && (
//                                         <span className="badge bg-danger bg-opacity-10 text-danger fw-semibold fs-13">
//                                             Rejected
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         )
//                     })}

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Page








'use client'

import React, { useEffect, useRef, useState } from 'react'
import './verificationQueue.css'
import Url from '@/Url'
import {
    peek,
    fetchJson,
    invalidate,
    queueUrl,
    QUEUE_STATUSES,
} from '@/lib/apiCache'

const TABS = [
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
]

const getInitials = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join('') || '?'

const formatLanguagePairs = (pairs = []) =>
    pairs.length ? pairs.map((p) => `${p.from} ⇄ ${p.to}`).join(', ') : 'No language pair set'

const formatDate = (d) => {
    if (!d) return ''
    try {
        return new Date(d).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    } catch {
        return ''
    }
}

const Page = () => {
    const [activeTab, setActiveTab] = useState('pending')
    const [applications, setApplications] = useState(
        () => peek(queueUrl('pending'))?.data || []
    )
    const [counts, setCounts] = useState(() => {
        const initial = { pending: 0, approved: 0, rejected: 0 }
        QUEUE_STATUSES.forEach((status) => {
            const cached = peek(queueUrl(status))
            if (cached) {
                initial[status] = cached.count ?? cached.data?.length ?? 0
            }
        })
        return initial
    })
    // Loader only when this tab has nothing cached.
    const [loading, setLoading] = useState(
        () => peek(queueUrl('pending')) === undefined
    )
    const latestStatusRef = useRef('pending')
    const [error, setError] = useState('')
    const [actioningId, setActioningId] = useState(null)

    const fetchQueue = async (status) => {
        latestStatusRef.current = status
        setError('')

        const cached = peek(queueUrl(status))

        if (cached) {
            // show cached rows instantly, refresh in the background
            setApplications(cached.data || [])
            setLoading(false)
        } else {
            setApplications([])
            setLoading(true)
        }

        try {
            const json = await fetchJson(queueUrl(status))

            // ignore a late response from a tab the admin already left
            if (latestStatusRef.current !== status) return

            setApplications(json.data || [])
            setCounts((prev) => ({
                ...prev,
                [status]: json.count ?? json.data?.length ?? 0,
            }))
        } catch (err) {
            if (latestStatusRef.current !== status) return

            console.error(err)
            setError(err.message || 'Something went wrong while loading the queue.')
        } finally {
            if (latestStatusRef.current === status) setLoading(false)
        }
    }

    // fetch counts for all tabs once, so the tab badges are correct
    // even before the user clicks them
    const fetchAllCounts = async () => {
        try {
            const results = await Promise.all(
                TABS.map((t) =>
                    fetchJson(queueUrl(t.key)).catch(() => null)
                )
            )
            const next = {}
            TABS.forEach((t, i) => {
                next[t.key] = results[i]
                    ? (results[i].count ?? results[i].data?.length ?? 0)
                    : 0
            })
            setCounts(next)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchAllCounts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchQueue(activeTab)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab])

    const handleViewDoc = (translatorId, docId) => {
        if (!docId) return
        window.open(
            `${Url}/api/admin/translators/${translatorId}/documents/${docId}`,
            '_blank'
        )
    }

    const handleApprove = async (translatorId) => {
        setActioningId(translatorId)
        try {
            const res = await fetch(
                `${Url}/api/admin/translators/${translatorId}/approve`,
                { method: 'PUT', credentials: 'include' }
            )
            const json = await res.json()
            if (json.success) {
                invalidate(queueUrl('').replace('status=', ''))
                setApplications((prev) => prev.filter((a) => a._id !== translatorId))
                setCounts((prev) => ({
                    ...prev,
                    pending: Math.max(0, prev.pending - 1),
                    approved: prev.approved + 1,
                }))
            } else {
                alert(json.message || 'Failed to approve.')
            }
        } catch (err) {
            console.error(err)
            alert('Something went wrong. Please try again.')
        } finally {
            setActioningId(null)
        }
    }

    const handleReject = async (translatorId) => {
        const reason = window.prompt('Reason for rejection (optional):') || ''

        setActioningId(translatorId)
        try {
            const res = await fetch(
                `${Url}/api/admin/translators/${translatorId}/reject`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ reason }),
                }
            )
            const json = await res.json()
            if (json.success) {
                invalidate(queueUrl('').replace('status=', ''))
                setApplications((prev) => prev.filter((a) => a._id !== translatorId))
                setCounts((prev) => ({
                    ...prev,
                    pending: Math.max(0, prev.pending - 1),
                    rejected: prev.rejected + 1,
                }))
            } else {
                alert(json.message || 'Failed to reject.')
            }
        } catch (err) {
            console.error(err)
            alert('Something went wrong. Please try again.')
        } finally {
            setActioningId(null)
        }
    }

    return (
        <div>
            <div className="mb-4">
                <h4 className="fw-bold mb-1">Translator verification queue</h4>
                <p className="text-secondary mb-0 fs-14">
                    Review, approve, or reject translator applications.
                </p>
            </div>

            {/* Tabs */}
            <ul className="nav nav-pills gap-2 mb-3">
                {TABS.map((tab) => (
                    <li className="nav-item" key={tab.key}>
                        <button
                            type="button"
                            className={`btn fw-semibold fs-14 ${
                                activeTab === tab.key ? 'btn-primary' : 'btn-light border'
                            }`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                            <span
                                className={`ms-2 badge rounded-pill ${
                                    activeTab === tab.key ? 'bg-white text-primary' : 'bg-secondary bg-opacity-25 text-secondary'
                                }`}
                            >
                                {counts[tab.key] ?? 0}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="card border rounded-4 shadow-sm">
                <div className="card-body p-3 p-md-4">

                    {error && (
                        <div className="alert alert-danger py-2 px-3 small mb-3">{error}</div>
                    )}

                    {loading && (
                        <p className="text-secondary mb-0">Loading...</p>
                    )}

                    {!loading && !error && applications.length === 0 && (
                        <p className="text-secondary mb-0">
                            No {activeTab} applications right now.
                        </p>
                    )}

                    {!loading && applications.map((item) => {
                        const latestDoc = item.documents?.[item.documents.length - 1]
                        const isBusy = actioningId === item._id

                        return (
                            <div
                                key={item._id}
                                className="verificationItem d-flex align-items-center justify-content-between gap-3"
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div className="verificationAvatar">
                                        {getInitials(item.fullName)}
                                    </div>

                                    <div>
                                        <div className="fw-semibold fs-14">
                                            {item.fullName}
                                        </div>

                                        <div className="text-secondary fs-13">
                                            {item.email}
                                            {' · '}
                                            {formatLanguagePairs(item.languagePairs)}
                                            {latestDoc ? ` · ${latestDoc.originalName} uploaded` : ' · No document uploaded yet'}
                                        </div>

                                        {/* Status-specific extra info */}
                                        {activeTab === 'approved' && item.verifiedAt && (
                                            <div className="text-success fs-13 mt-1">
                                                Approved on {formatDate(item.verifiedAt)}
                                            </div>
                                        )}

                                        {activeTab === 'rejected' && (
                                            <div className="text-danger fs-13 mt-1">
                                                Rejected{item.verifiedAt ? ` on ${formatDate(item.verifiedAt)}` : ''}
                                                {item.rejectionReason ? ` · Reason: ${item.rejectionReason}` : ''}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-2 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="btn btn-light border fw-semibold fs-14"
                                        disabled={!latestDoc}
                                        onClick={() => handleViewDoc(item._id, latestDoc?._id)}
                                    >
                                        View doc
                                    </button>

                                    {activeTab === 'pending' && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-danger bg-opacity-10 border-0 fw-semibold verificationReject fs-14"
                                                disabled={isBusy}
                                                onClick={() => handleReject(item._id)}
                                            >
                                                Reject
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-primary fw-semibold fs-14"
                                                disabled={isBusy}
                                                onClick={() => handleApprove(item._id)}
                                            >
                                                {isBusy ? '...' : 'Approve'}
                                            </button>
                                        </>
                                    )}

                                    {activeTab === 'approved' && (
                                        <span className="badge bg-success bg-opacity-10 text-success fw-semibold fs-13">
                                            Approved
                                        </span>
                                    )}

                                    {activeTab === 'rejected' && (
                                        <span className="badge bg-danger bg-opacity-10 text-danger fw-semibold fs-13">
                                            Rejected
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Page