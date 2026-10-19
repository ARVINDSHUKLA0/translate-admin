
// 'use client'

// import React, { useState } from 'react' 
// import { useRouter } from 'next/navigation'
// import './user.css'

// const users = [
//     {
//         name: 'Elena Vidal',
//         email: 'elena.vidal@mail.com',
//         initials: 'EV',
//         role: 'Translators',
//         status: 'ACTIVE',
//         joined: 'Mar 2024',
//         jobs: '340',
//         rating: '4.9★',
//     },
//     {
//         name: 'Rafael Santos',
//         email: 'r.santos@mail.com',
//         initials: 'RS',
//         role: 'Translators',
//         status: 'SUSPENDED',
//         joined: 'Jan 2024',
//         jobs: '210',
//         rating: '4.1★',
//     },
//     {
//         name: 'Wei Zhang',
//         email: 'wei.zhang@mail.com',
//         initials: 'WZ',
//         role: 'Translators',
//         status: 'ACTIVE',
//         joined: 'Nov 2023',
//         jobs: '185',
//         rating: '4.9★',
//     },
//     {
//         name: 'Camille Roux',
//         email: 'c.roux@mail.com',
//         initials: 'CR',
//         role: 'Clients',
//         status: 'ACTIVE',
//         joined: 'Jul 2024',
//         jobs: '98',
//         rating: '4.7★',
//     },
//     {
//         name: 'Camille ',
//         email: 'c.roux@ma.com',
//         initials: 'CR',
//         role: 'Clients',
//         status: 'ACTIVE',
//         joined: 'Jul 2424',
//         jobs: '98',
//         rating: '4.7★',
//     },
// ]

// const tabs = [
//     {
//         label: 'Clients',
//         count: '1,640',
//     },
//     {
//         label: 'Translators',
//         count: '2,270',
//     },
// ]

// const page = () => {
//     const router = useRouter()
//     const [activeTab, setActiveTab] = useState('Clients')
//     const [openAction, setOpenAction] = useState(null)
//     const filteredUsers = users.filter(
//         (user) => user.role === activeTab
//     )

//     return (
//         <div>

//             <div className="mb-4">

//                 <h4 className="fw-bold mb-1">
//                     Users
//                 </h4>

//                 <p className="text-secondary mb-0 fs-14">
//                     3,910 total accounts.
//                 </p>

//             </div>


//             <div className="d-flex flex-wrap mb-4">

//                 <div className="d-flex flex-wrap p-1 border rounded-3 w-100 w-sm-auto">

//                     {tabs.map((tab) => (

//                         <button
//                             type="button"
//                             key={tab.label}
//                             onClick={() => setActiveTab(tab.label)}
//                             className={`btn border-0 px-3 px-md-4 py-2 ${activeTab === tab.label
//                                 ? 'bg-white shadow-sm'
//                                 : 'text-secondary'
//                                 }`}
//                         >

//                             <span className="fw-semibold fs-14">
//                                 {tab.label}
//                             </span>

//                             <span className="fw-semibold ms-1 fs-14">
//                                 ({tab.count})
//                             </span>

//                         </button>

//                     ))}

//                 </div>

//             </div>


//             <div className="card border rounded-4 shadow-sm">

//                 <div className="card-body p-0">

//                     <div className="table-responsive">

//                         <table className="table align-middle mb-0 usersTable">

//                             <thead>

//                                 <tr>

//                                     <th className='text-uppercase'>
//                                         user
//                                     </th>

//                                     <th className='text-uppercase'>
//                                         status
//                                     </th>

//                                     <th className='text-uppercase'>
//                                         joined
//                                     </th>

//                                     <th className='text-uppercase'>
//                                         jobs
//                                     </th>

//                                     <th className='text-uppercase'>
//                                         rating
//                                     </th>

//                                     <th className='text-uppercase'>
//                                         Action
//                                     </th>

//                                     <th className="text-end">
//                                     </th>

//                                 </tr>

//                             </thead>


//                             <tbody>

//                                 {filteredUsers.map((user) => (

//                                     <tr key={user.email}>

//                                         <td className='fs-14'>

//                                             <div className="d-flex align-items-center ps-lg-4 gap-2">

//                                                 <div className="userAvatar">
//                                                     {user.initials}
//                                                 </div>

//                                                 <div>

//                                                     <div className="fw-semibold">
//                                                         {user.name}
//                                                     </div>

//                                                     <div className="small text-secondary">
//                                                         {user.email}
//                                                     </div>

//                                                 </div>

//                                             </div>

//                                         </td>


//                                         <td>

//                                             <span
//                                                 className={
//                                                     user.status === 'ACTIVE'
//                                                         ? 'userStatus userActive'
//                                                         : 'userStatus userSuspended'
//                                                 }
//                                             >
//                                                 {user.status}
//                                             </span>

//                                         </td>


//                                         <td className='fs-14'>
//                                             {user.joined}
//                                         </td>


//                                         <td className='fs-14'>
//                                             {user.jobs}
//                                         </td>


//                                         <td className='fs-14'>
//                                             {user.rating}
//                                         </td>


//                                         <td>

//                                             <div className="actionWrapper">

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-light border fs-14"
//                                                     onClick={() =>
//                                                         setOpenAction(
//                                                             openAction === user.email
//                                                                 ? null
//                                                                 : user.email
//                                                         )
//                                                     }
//                                                 >
//                                                     Action

//                                                     <span className="ms-2">
//                                                         ▾
//                                                     </span>

//                                                 </button>


//                                                 {openAction === user.email && (

//                                                     <div className="actionDropdown">

//                                                         <button
//                                                             type="button"
//                                                             className="actionOption"
//                                                             onClick={() =>
//                                                                 setOpenAction(null)
//                                                             }
//                                                         >
//                                                             ACTIVE
//                                                         </button>


//                                                         <button
//                                                             type="button"
//                                                             className="actionOption"
//                                                             onClick={() =>
//                                                                 setOpenAction(null)
//                                                             }
//                                                         >
//                                                             SUSPENDED
//                                                         </button>

//                                                     </div>

//                                                 )}

//                                             </div>

//                                         </td>


//                                         <td>

//                                             <button
//                                                 type="button"
//                                                 className="btn btn-light border fs-14"
//                                                 onClick={() =>
//                                                     router.push(
//                                                         `/users/${encodeURIComponent(user.email)}`
//                                                     )
//                                                 }
//                                             >
//                                                 View
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))}

//                             </tbody>

//                         </table>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     )
// }

// export default page















 
// 'use client'

// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import './user.css'

// const API_BASE = (
//     process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
// ).replace(/\/+$/, '')

// const getArray = (result) => {
//     if (Array.isArray(result)) return result
//     if (Array.isArray(result?.data)) return result.data
//     if (Array.isArray(result?.users)) return result.users
//     if (Array.isArray(result?.clients)) return result.clients
//     if (Array.isArray(result?.translators)) return result.translators
//     if (Array.isArray(result?.data?.users)) return result.data.users
//     if (Array.isArray(result?.data?.clients)) return result.data.clients
//     if (Array.isArray(result?.data?.translators)) return result.data.translators
//     return []
// }

// const getName = (user) =>
//     user.fullName ||
//     user.name ||
//     user.username ||
//     user.firstName ||
//     user.email ||
//     'Unnamed user'

// const getStatus = (user) => {
//     const status = String(
//         user.status ||
//         user.accountStatus ||
//         (user.isActive === false ? 'SUSPENDED' : 'ACTIVE')
//     ).toUpperCase()

//     if (['SUSPENDED', 'BLOCKED', 'INACTIVE', 'DISABLED'].includes(status)) {
//         return 'SUSPENDED'
//     }

//     if (['PENDING', 'UNDER_REVIEW'].includes(status)) {
//         return 'PENDING'
//     }

//     return 'ACTIVE'
// }

// const getInitials = (name) =>
//     String(name)
//         .trim()
//         .split(/\s+/)
//         .slice(0, 2)
//         .map((part) => part[0])
//         .join('')
//         .toUpperCase() || 'U'

// const formatJoined = (date) => {
//     if (!date) return '—'

//     const parsedDate = new Date(date)

//     if (Number.isNaN(parsedDate.getTime())) return '—'

//     return parsedDate.toLocaleDateString('en-US', {
//         month: 'short',
//         year: 'numeric',
//     })
// }

// const normalizeUser = (user, role) => {
//     const name = getName(user)

//     return {
//         id: String(user._id || user.id || user.email || name),
//         name,
//         email: user.email || user.emailAddress || '—',
//         initials: getInitials(name),
//         role,
//         status: getStatus(user),
//         joined: formatJoined(
//             user.createdAt || user.joinedAt || user.registrationDate
//         ),
//         jobs: user.jobsCount ?? user.totalJobs ?? user.completedJobs ?? '—',
//         rating: user.rating != null ? `${user.rating}★` : '—',
//     }
// }

// const page = () => {
//     const router = useRouter()

//     const [activeTab, setActiveTab] = useState('Clients')
//     const [openAction, setOpenAction] = useState(null)
//     const [clients, setClients] = useState([])
//     const [translators, setTranslators] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState('')

//     const loadUsers = useCallback(async (signal) => {
//         setLoading(true)
//         setError('')

//         try {
//             const [clientResponse, translatorResponse] = await Promise.all([
//                 fetch(`${API_BASE}/api/client`, {
//                     method: 'GET',
//                     credentials: 'include',
//                     cache: 'no-store',
//                     headers: { Accept: 'application/json' },
//                     signal,
//                 }),
//                 fetch(`${API_BASE}/api/translator`, {
//                     method: 'GET',
//                     credentials: 'include',
//                     cache: 'no-store',
//                     headers: { Accept: 'application/json' },
//                     signal,
//                 }),
//             ])

//             if (
//                 clientResponse.status === 401 ||
//                 clientResponse.status === 403 ||
//                 translatorResponse.status === 401 ||
//                 translatorResponse.status === 403
//             ) {
//                 throw new Error(
//                     'You are not authorized to view these users.'
//                 )
//             }

//             if (!clientResponse.ok || !translatorResponse.ok) {
//                 throw new Error(
//                     `Failed to load users. Clients API: ${clientResponse.status}, Translators API: ${translatorResponse.status}.`
//                 )
//             }

//             const [clientResult, translatorResult] = await Promise.all([
//                 clientResponse.json(),
//                 translatorResponse.json(),
//             ])

//             if (clientResult?.success === false) {
//                 throw new Error(
//                     clientResult.message || 'Failed to load clients.'
//                 )
//             }

//             if (translatorResult?.success === false) {
//                 throw new Error(
//                     translatorResult.message || 'Failed to load translators.'
//                 )
//             }

//             setClients(
//                 getArray(clientResult).map((user) =>
//                     normalizeUser(user, 'Clients')
//                 )
//             )

//             setTranslators(
//                 getArray(translatorResult).map((user) =>
//                     normalizeUser(user, 'Translators')
//                 )
//             )
//         } catch (err) {
//             if (err.name !== 'AbortError') {
//                 console.error('Users loading error:', err)
//                 setError(err.message || 'Unable to load users.')
//             }
//         } finally {
//             if (!signal?.aborted) {
//                 setLoading(false)
//             }
//         }
//     }, [])

//     useEffect(() => {
//         const controller = new AbortController()

//         loadUsers(controller.signal)

//         return () => controller.abort()
//     }, [loadUsers])

//     const allUsers = useMemo(
//         () => [...clients, ...translators],
//         [clients, translators]
//     )

//     const filteredUsers = useMemo(
//         () => activeTab === 'Clients' ? clients : translators,
//         [activeTab, clients, translators]
//     )

//     const tabs = [
//         { label: 'Clients', count: clients.length },
//         { label: 'Translators', count: translators.length },
//     ]

//     return (
//         <div>
//             <div className="mb-4">
//                 <h4 className="fw-bold mb-1">Users</h4>

//                 <p className="text-secondary mb-0 fs-14">
//                     {allUsers.length.toLocaleString('en-US')} total accounts.
//                 </p>
//             </div>

//             <div className="d-flex flex-wrap mb-4">
//                 <div className="d-flex flex-wrap p-1 border rounded-3 w-100 w-sm-auto">
//                     {tabs.map((tab) => (
//                         <button
//                             type="button"
//                             key={tab.label}
//                             onClick={() => {
//                                 setActiveTab(tab.label)
//                                 setOpenAction(null)
//                             }}
//                             className={`btn border-0 px-3 px-md-4 py-2 ${
//                                 activeTab === tab.label
//                                     ? 'bg-white shadow-sm'
//                                     : 'text-secondary'
//                             }`}
//                         >
//                             <span className="fw-semibold fs-14">
//                                 {tab.label}
//                             </span>

//                             <span className="fw-semibold ms-1 fs-14">
//                                 ({tab.count.toLocaleString('en-US')})
//                             </span>
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {error && (
//                 <div className="alert alert-danger" role="alert">
//                     <div>{error}</div>

//                     <button
//                         type="button"
//                         className="btn btn-sm btn-outline-danger mt-2"
//                         onClick={() => loadUsers()}
//                     >
//                         Retry
//                     </button>
//                 </div>
//             )}

//             <div className="card border rounded-4 shadow-sm">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table align-middle mb-0 usersTable">
//                             <thead>
//                                 <tr>
//                                     <th className="text-uppercase">User</th>
//                                     <th className="text-uppercase">Status</th>
//                                     <th className="text-uppercase">Joined</th>
//                                     <th className="text-uppercase">Jobs</th>
//                                     <th className="text-uppercase">Rating</th>
//                                     <th className="text-uppercase">Action</th>
//                                     <th className="text-end"></th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {loading ? (
//                                     <tr>
//                                         <td
//                                             colSpan={7}
//                                             className="text-center py-4 text-secondary"
//                                         >
//                                             Loading users...
//                                         </td>
//                                     </tr>
//                                 ) : filteredUsers.length === 0 ? (
//                                     <tr>
//                                         <td
//                                             colSpan={7}
//                                             className="text-center py-4 text-secondary"
//                                         >
//                                             {error
//                                                 ? 'Users could not be loaded.'
//                                                 : `No ${activeTab.toLowerCase()} found.`}
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredUsers.map((user) => (
//                                         <tr key={`${user.role}-${user.id}`}>
//                                             <td className="fs-14">
//                                                 <div className="d-flex align-items-center ps-lg-4 gap-2">
//                                                     <div className="userAvatar">
//                                                         {user.initials}
//                                                     </div>

//                                                     <div>
//                                                         <div className="fw-semibold">
//                                                             {user.name}
//                                                         </div>

//                                                         <div className="small text-secondary">
//                                                             {user.email}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </td>

//                                             <td>
//                                                 <span
//                                                     className={`userStatus ${
//                                                         user.status === 'ACTIVE'
//                                                             ? 'userActive'
//                                                             : user.status === 'SUSPENDED'
//                                                                 ? 'userSuspended'
//                                                                 : 'userPending'
//                                                     }`}
//                                                 >
//                                                     {user.status}
//                                                 </span>
//                                             </td>

//                                             <td className="fs-14">
//                                                 {user.joined}
//                                             </td>

//                                             <td className="fs-14">
//                                                 {user.jobs}
//                                             </td>

//                                             <td className="fs-14">
//                                                 {user.rating}
//                                             </td>

//                                             <td>
//                                                 <div className="actionWrapper">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-light border fs-14"
//                                                         onClick={() =>
//                                                             setOpenAction(
//                                                                 openAction === user.id
//                                                                     ? null
//                                                                     : user.id
//                                                             )
//                                                         }
//                                                     >
//                                                         Action
//                                                         <span className="ms-2">
//                                                             ▾
//                                                         </span>
//                                                     </button>

//                                                     {openAction === user.id && (
//                                                         <div className="actionDropdown">
//                                                             <button
//                                                                 type="button"
//                                                                 className="actionOption"
//                                                                 onClick={() =>
//                                                                     setOpenAction(null)
//                                                                 }
//                                                                 title="Status changes require a connected backend update endpoint."
//                                                             >
//                                                                 Current status: {user.status}
//                                                             </button>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </td>

//                                             <td>
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-light border fs-14"
//                                                     onClick={() => {
//                                                         const rolePath =
//                                                             user.role === 'Clients'
//                                                                 ? 'clients'
//                                                                 : 'translators'

//                                                         router.push(
//                                                             `/users/${rolePath}/${encodeURIComponent(user.id)}`
//                                                         )
//                                                     }}
//                                                 >
//                                                     View
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default page 






















 
'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import './user.css'
import { peek, fetchJson, USERS_URLS } from '@/lib/apiCache'

const API_BASE = (
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
).replace(/\/+$/, '')

const getArray = (result) => {
    if (Array.isArray(result)) return result
    if (Array.isArray(result?.data)) return result.data
    if (Array.isArray(result?.users)) return result.users
    if (Array.isArray(result?.clients)) return result.clients
    if (Array.isArray(result?.translators)) return result.translators
    if (Array.isArray(result?.data?.users)) return result.data.users
    if (Array.isArray(result?.data?.clients)) return result.data.clients
    if (Array.isArray(result?.data?.translators)) return result.data.translators
    return []
}

const getName = (user) =>
    user.fullName ||
    user.name ||
    user.username ||
    user.firstName ||
    user.email ||
    'Unnamed user'

const getStatus = (user) => {
    const status = String(
        user.status ||
        user.accountStatus ||
        (user.isActive === false ? 'SUSPENDED' : 'ACTIVE')
    ).toUpperCase()

    if (['SUSPENDED', 'BLOCKED', 'INACTIVE', 'DISABLED'].includes(status)) {
        return 'SUSPENDED'
    }

    if (['PENDING', 'UNDER_REVIEW'].includes(status)) {
        return 'PENDING'
    }

    return 'ACTIVE'
}

const getInitials = (name) =>
    String(name)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase() || 'U'

const formatJoined = (date) => {
    if (!date) return '—'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) return '—'

    return parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    })
}

const normalizeUser = (user, role) => {
    const name = getName(user)

    return {
        id: String(user._id || user.id || user.email || name),
        name,
        email: user.email || user.emailAddress || '—',
        initials: getInitials(name),
        role,
        status: getStatus(user),
        joined: formatJoined(
            user.createdAt || user.joinedAt || user.registrationDate
        ),
        jobs: user.jobsCount ?? user.totalJobs ?? user.completedJobs ?? '—',
        rating: user.rating != null ? `${user.rating}★` : '—',
    }
}

const page = () => {
    const router = useRouter()

    const [activeTab, setActiveTab] = useState('Clients')
    const [openAction, setOpenAction] = useState(null)
    const [clients, setClients] = useState(() => {
        const cached = peek(USERS_URLS.clients)
        return cached
            ? getArray(cached).map((user) => normalizeUser(user, 'Clients'))
            : []
    })
    const [translators, setTranslators] = useState(() => {
        const cached = peek(USERS_URLS.translators)
        return cached
            ? getArray(cached).map((user) => normalizeUser(user, 'Translators'))
            : []
    })
    // Only show the loader when nothing is cached yet.
    const [loading, setLoading] = useState(
        () =>
            peek(USERS_URLS.clients) === undefined ||
            peek(USERS_URLS.translators) === undefined
    )
    const [error, setError] = useState('')

    const loadUsers = useCallback(async () => {
        const hasCache =
            peek(USERS_URLS.clients) !== undefined &&
            peek(USERS_URLS.translators) !== undefined

        if (!hasCache) setLoading(true)
        setError('')

        try {
            const [clientResult, translatorResult] = await Promise.all([
                fetchJson(USERS_URLS.clients),
                fetchJson(USERS_URLS.translators),
            ])

            setClients(
                getArray(clientResult).map((user) =>
                    normalizeUser(user, 'Clients')
                )
            )

            setTranslators(
                getArray(translatorResult).map((user) =>
                    normalizeUser(user, 'Translators')
                )
            )
        } catch (err) {
            console.error('Users loading error:', err)

            setError(
                err.status === 401 || err.status === 403
                    ? 'You are not authorized to view these users.'
                    : err.message || 'Unable to load users.'
            )
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadUsers()
    }, [loadUsers])

    const allUsers = useMemo(
        () => [...clients, ...translators],
        [clients, translators]
    )

    const filteredUsers = useMemo(
        () => activeTab === 'Clients' ? clients : translators,
        [activeTab, clients, translators]
    )

    const tabs = [
        { label: 'Clients', count: clients.length },
        { label: 'Translators', count: translators.length },
    ]

    return (
        <div>
            <div className="mb-4">
                <h4 className="fw-bold mb-1">Users</h4>

                <p className="text-secondary mb-0 fs-14">
                    {allUsers.length.toLocaleString('en-US')} total accounts.
                </p>
            </div>

            <div className="d-flex flex-wrap mb-4">
                <div className="d-flex flex-wrap p-1 border rounded-3 w-100 w-sm-auto">
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab.label}
                            onClick={() => {
                                setActiveTab(tab.label)
                                setOpenAction(null)
                            }}
                            className={`btn border-0 px-3 px-md-4 py-2 ${
                                activeTab === tab.label
                                    ? 'bg-white shadow-sm'
                                    : 'text-secondary'
                            }`}
                        >
                            <span className="fw-semibold fs-14">
                                {tab.label}
                            </span>

                            <span className="fw-semibold ms-1 fs-14">
                                ({tab.count.toLocaleString('en-US')})
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    <div>{error}</div>

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => loadUsers()}
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="card border rounded-4 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 usersTable">
                            <thead>
                                <tr>
                                    <th className="text-uppercase">User</th>
                                    <th className="text-uppercase">Status</th>
                                    <th className="text-uppercase">Joined</th>
                                    <th className="text-uppercase">Jobs</th>
                                    <th className="text-uppercase">Rating</th>
                                    <th className="text-uppercase">Action</th>
                                    <th className="text-end"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="text-center py-4 text-secondary"
                                        >
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="text-center py-4 text-secondary"
                                        >
                                            {error
                                                ? 'Users could not be loaded.'
                                                : `No ${activeTab.toLowerCase()} found.`}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={`${user.role}-${user.id}`}>
                                            <td className="fs-14">
                                                <div className="d-flex align-items-center ps-lg-4 gap-2">
                                                    <div className="userAvatar">
                                                        {user.initials}
                                                    </div>

                                                    <div>
                                                        <div className="fw-semibold">
                                                            {user.name}
                                                        </div>

                                                        <div className="small text-secondary">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span
                                                    className={`userStatus ${
                                                        user.status === 'ACTIVE'
                                                            ? 'userActive'
                                                            : user.status === 'SUSPENDED'
                                                                ? 'userSuspended'
                                                                : 'userPending'
                                                    }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>

                                            <td className="fs-14">
                                                {user.joined}
                                            </td>

                                            <td className="fs-14">
                                                {user.jobs}
                                            </td>

                                            <td className="fs-14">
                                                {user.rating}
                                            </td>

                                            <td>
                                                <div className="actionWrapper">
                                                    <button
                                                        type="button"
                                                        className="btn btn-light border fs-14"
                                                        onClick={() =>
                                                            setOpenAction(
                                                                openAction === user.id
                                                                    ? null
                                                                    : user.id
                                                            )
                                                        }
                                                    >
                                                        Action
                                                        <span className="ms-2">
                                                            ▾
                                                        </span>
                                                    </button>

                                                    {openAction === user.id && (
                                                        <div className="actionDropdown">
                                                            <button
                                                                type="button"
                                                                className="actionOption"
                                                                onClick={() =>
                                                                    setOpenAction(null)
                                                                }
                                                                title="Status changes require a connected backend update endpoint."
                                                            >
                                                                Current status: {user.status}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-light border fs-14"
                                                    onClick={() => {
                                                        const rolePath =
                                                            user.role === 'Clients'
                                                                ? 'clients'
                                                                : 'translators'

                                                        router.push(
                                                            `/users/${rolePath}/${encodeURIComponent(user.id)}`
                                                        )
                                                    }}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page 