
// 'use client'

// import React, { useState } from 'react'
// import './settings.css'

// const menuItems = [
//     ['Profile', 'fa-user'],
//     ['Security', 'fa-lock'],
//     ['Notifications', 'fa-bell'],
//     ['Appearance', 'fa-gear'],
//     ['Platform', 'fa-sliders'],
//     ['Billing', 'fa-dollar-sign'],
//     ['Team', 'fa-users'],
// ]

// const Page = () => {

//     const [activeTab, setActiveTab] = useState('Profile')

//     const [form, setForm] = useState({
//         name: 'Admin Team',
//         email: 'admin@translate.co',
//         phone: '+1 555 000 0000',
//     })

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         })
//     }

//     const handleSave = (e) => {
//         e.preventDefault()

//         // API will be connected here later.
//         console.log('Save profile:', form)
//     }

//     return (
//         <div className="container-fluid px-3 px-lg-4 py-4">

//             {/* HEADER */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-4">

//                 <div>
//                     <div className="settings-kicker mb-1">
//                         SYSTEM
//                     </div>

//                     <h1 className="fw-bold mb-1 settings-title">
//                         Settings
//                     </h1>

//                     <p className="text-secondary mb-0">
//                         Manage your admin profile, security preferences,
//                         notifications and platform configuration.
//                     </p>
//                 </div>

//                 <div className="system-status d-inline-flex align-items-center">
//                     <span />
//                     System operational
//                 </div>

//             </div>

//             {/* MAIN */}
//             <div className="row g-3">

//                 {/* SIDEBAR */}
//                 <div className="col-12 col-lg-2">

//                     <div className="card border shadow-sm settings-menu">

//                         <div className="card-body p-2">

//                             {menuItems.map(([name, icon]) => (

//                                 <button
//                                     key={name}
//                                     type="button"
//                                     onClick={() => setActiveTab(name)}
//                                     className={`btn w-100 text-start d-flex align-items-center gap-3 settings-tab ${
//                                         activeTab === name ? 'active' : ''
//                                     }`}
//                                 >
//                                     <i className={`fa-solid ${icon}`} />
//                                     <span>{name}</span>
//                                 </button>

//                             ))}

//                         </div>

//                     </div>

//                 </div>

//                 {/* CONTENT */}
//                 <div className="col-12 col-lg-10">

//                     {activeTab === 'Profile' ? (

//                         <>

//                             {/* PROFILE CARD */}
//                             <div className="card border shadow-sm mb-3">

//                                 <div className="card-body p-4">

//                                     <h3 className="fw-bold fs-5 mb-1">
//                                         Admin profile
//                                     </h3>

//                                     <p className="text-secondary small mb-4">
//                                         Manage the information associated
//                                         with your admin account.
//                                     </p>

//                                     {/* PROFILE */}
//                                     <div className="d-flex align-items-center gap-3 mb-4">

//                                         <div className="profile-avatar-setting">
//                                             AD
//                                         </div>

//                                         <div>
//                                             <h4 className="fw-bold fs-6 mb-1">
//                                                 Admin Team
//                                             </h4>

//                                             <span className="role-badge">
//                                                 SUPER ADMIN
//                                             </span>
//                                         </div>

//                                     </div>

//                                     {/* FORM */}
//                                     <form onSubmit={handleSave}>

//                                         <div className="row g-3">

//                                             <div className="col-12 col-md-6">
//                                                 <label className="form-label fw-semibold small">
//                                                     Full name
//                                                 </label>

//                                                 <input
//                                                     type="text"
//                                                     name="name"
//                                                     value={form.name}
//                                                     onChange={handleChange}
//                                                     className="form-control settings-input"
//                                                 />
//                                             </div>

//                                             <div className="col-12 col-md-6">
//                                                 <label className="form-label fw-semibold small">
//                                                     Email address
//                                                 </label>

//                                                 <input
//                                                     type="email"
//                                                     name="email"
//                                                     value={form.email}
//                                                     onChange={handleChange}
//                                                     className="form-control settings-input"
//                                                 />
//                                             </div>

//                                             <div className="col-12 col-md-6">
//                                                 <label className="form-label fw-semibold small">
//                                                     Phone number
//                                                 </label>

//                                                 <input
//                                                     type="text"
//                                                     name="phone"
//                                                     value={form.phone}
//                                                     onChange={handleChange}
//                                                     className="form-control settings-input"
//                                                 />
//                                             </div>

//                                             <div className="col-12 col-md-6">
//                                                 <label className="form-label fw-semibold small">
//                                                     Role
//                                                 </label>

//                                                 <input
//                                                     type="text"
//                                                     value="Super admin"
//                                                     className="form-control settings-input bg-light"
//                                                     disabled
//                                                     readOnly
//                                                 />
//                                             </div>

//                                         </div>

//                                         {/* ACTIONS */}
//                                         <div className="border-top mt-4 pt-3 d-flex justify-content-end gap-2">

//                                             <button
//                                                 type="button"
//                                                 className="btn btn-light border px-3"
//                                             >
//                                                 Cancel
//                                             </button>

//                                             <button
//                                                 type="submit"
//                                                 className="btn save-btn px-3 fw-semibold"
//                                             >
//                                                 Save changes
//                                             </button>

//                                         </div>

//                                     </form>

//                                 </div>

//                             </div>

//                             {/* DANGER ZONE */}
//                             <div className="card danger-card">

//                                 <div className="card-body p-4">

//                                     <h3 className="fw-bold fs-5 mb-1 text-danger">
//                                         Danger zone
//                                     </h3>

//                                     <p className="small text-secondary mb-4">
//                                         These actions affect your admin session
//                                         or account preferences. They cannot be
//                                         undone automatically.
//                                     </p>

//                                     <div className="d-flex flex-wrap gap-2">

//                                         <button
//                                             type="button"
//                                             className="btn danger-btn"
//                                         >
//                                             Reset account preferences
//                                         </button>

//                                         <button
//                                             type="button"
//                                             className="btn danger-btn"
//                                         >
//                                             Sign out all devices
//                                         </button>

//                                         <button
//                                             type="button"
//                                             className="btn danger-btn"
//                                         >
//                                             Delete admin account
//                                         </button>

//                                     </div>

//                                 </div>

//                             </div>

//                         </>

//                     ) : (

//                         /* OTHER TABS */
//                         <div className="card border shadow-sm">

//                             <div className="card-body p-4">

//                                 <h3 className="fw-bold fs-5 mb-2">
//                                     {activeTab}
//                                 </h3>

//                                 <p className="text-secondary mb-0">
//                                     {activeTab} settings will be available
//                                     here. This section is ready for API
//                                     integration later.
//                                 </p>

//                             </div>

//                         </div>

//                     )}

//                 </div>

//             </div>

//         </div>
//     )
// }

// export default Page











'use client'

import React, { useState, useEffect } from 'react'
import './settings.css'
import Url from '@/Url'

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

const baseMenuItems = [
    ['Profile', 'fa-user'],
    ['Security', 'fa-lock'],
    ['Notifications', 'fa-bell'],
    ['Appearance', 'fa-gear'],
    ['Platform', 'fa-sliders'],
    ['Billing', 'fa-dollar-sign'],
]

const teamMenuItem = ['Team', 'fa-users']

const Page = () => {

    const [activeTab, setActiveTab] = useState('Profile')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    // ---- Logged-in user / profile state ----
    const [currentUser, setCurrentUser] = useState(null)

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        matchingJobs: true,
        deadlineAlerts: false,
    })

    // ---- Staff / permissions module state ----
    const [permissionsList, setPermissionsList] = useState([])
    const [staffList, setStaffList] = useState([])
    const [newStaff, setNewStaff] = useState({
        fullName: '',
        email: '',
        password: '',
        permissions: [],
    })
    const [staffLoading, setStaffLoading] = useState(false)
    const [staffError, setStaffError] = useState('')
    const [staffMessage, setStaffMessage] = useState('')

    const canManageStaff =
        currentUser?.role === 'superadmin' ||
        currentUser?.permissions?.includes('manage_staff')

    const menuItems = canManageStaff
        ? [...baseMenuItems, teamMenuItem]
        : baseMenuItems

    const roleLabel = currentUser?.role
        ? currentUser.role.replace(/_/g, ' ').toUpperCase()
        : ''

    const initials = (currentUser?.fullName || form.fullName || '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join('') || 'AD'

    // Load logged-in user's own profile
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await fetch(`${Url}/api/auth/me`, {
                    credentials: 'include',
                })
                const json = await res.json()
                if (json.success) {
                    setCurrentUser(json.data)
                    setForm((prev) => ({
                        ...prev,
                        fullName: json.data.fullName || '',
                        email: json.data.email || '',
                        phone: json.data.phone || '',
                        matchingJobs:
                            json.data.matchingJobs ?? prev.matchingJobs,
                        deadlineAlerts:
                            json.data.deadlineAlerts ?? prev.deadlineAlerts,
                    }))
                }
            } catch (err) {
                console.error('Failed to load profile', err)
            }
        }
        fetchMe()
    }, [])

    // Load master permission list + staff list (only if user can manage staff)
    useEffect(() => {
        if (!canManageStaff) return

        const fetchStaffData = async () => {
            try {
                const [permRes, staffRes] = await Promise.all([
                    fetch(`${Url}/api/staff/permissions`, { credentials: 'include' }),
                    fetch(`${Url}/api/staff`, { credentials: 'include' }),
                ])
                const permJson = await permRes.json()
                const staffJson = await staffRes.json()

                if (permJson.success) setPermissionsList(permJson.data)
                if (staffJson.success) setStaffList(staffJson.data)
            } catch (err) {
                console.error('Failed to load staff data', err)
            }
        }

        fetchStaffData()
    }, [canManageStaff])

    // If the active tab becomes unavailable (e.g. permissions changed), fall back to Profile
    useEffect(() => {
        if (!menuItems.some(([name]) => name === activeTab)) {
            setActiveTab('Profile')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canManageStaff])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    // Generic save: pushes whichever fields are passed to /api/profile
    const saveProfile = async (fields) => {
        setLoading(true)
        setMessage('')

        try {
            const res = await fetch(`${Url}/api/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(fields),
            })
            const json = await res.json()
            setMessage(json.message || (json.success ? 'Saved.' : 'Something went wrong.'))
            if (json.success && json.data) {
                setCurrentUser(json.data)
            }
        } catch (err) {
            setMessage('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleSaveProfile = (e) => {
        e.preventDefault()
        saveProfile({
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
        })
    }

    const handleSaveNotifications = (e) => {
        e.preventDefault()
        saveProfile({
            matchingJobs: form.matchingJobs,
            deadlineAlerts: form.deadlineAlerts,
        })
    }

    // ---- Staff handlers ----
    const handleNewStaffChange = (e) => {
        const { name, value } = e.target
        setNewStaff((prev) => ({ ...prev, [name]: value }))
    }

    const toggleNewStaffPermission = (key) => {
        setNewStaff((prev) => {
            const has = prev.permissions.includes(key)
            return {
                ...prev,
                permissions: has
                    ? prev.permissions.filter((p) => p !== key)
                    : [...prev.permissions, key],
            }
        })
    }

    const handleAddStaff = async (e) => {
        e.preventDefault()
        setStaffError('')
        setStaffMessage('')
        setStaffLoading(true)

        try {
            const res = await fetch(`${Url}/api/staff`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newStaff),
            })
            const json = await res.json()

            if (!json.success) {
                setStaffError(json.message || 'Failed to add staff.')
                return
            }

            setStaffList((prev) => [json.data, ...prev])
            setNewStaff({ fullName: '', email: '', password: '', permissions: [] })
            setStaffMessage('Staff added successfully.')
        } catch (err) {
            setStaffError('Something went wrong. Please try again.')
        } finally {
            setStaffLoading(false)
        }
    }

    const toggleStaffPermission = (staffId, key) => {
        setStaffList((prev) =>
            prev.map((s) => {
                if (s._id !== staffId) return s
                const has = s.permissions.includes(key)
                return {
                    ...s,
                    permissions: has
                        ? s.permissions.filter((p) => p !== key)
                        : [...s.permissions, key],
                }
            })
        )
    }

    const saveStaffPermissions = async (staffId) => {
        const staff = staffList.find((s) => s._id === staffId)
        if (!staff) return

        try {
            const res = await fetch(`${Url}/api/staff/${staffId}/permissions`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ permissions: staff.permissions }),
            })
            const json = await res.json()
            setStaffMessage(json.success ? 'Permissions updated.' : json.message)
        } catch (err) {
            setStaffMessage('Failed to update permissions.')
        }
    }

    const handleToggleActive = async (staffId) => {
        try {
            const res = await fetch(`${Url}/api/staff/${staffId}/toggle-active`, {
                method: 'PUT',
                credentials: 'include',
            })
            const json = await res.json()
            if (json.success) {
                setStaffList((prev) => prev.map((s) => (s._id === staffId ? json.data : s)))
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDeleteStaff = async (staffId) => {
        try {
            const res = await fetch(`${Url}/api/staff/${staffId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            const json = await res.json()
            if (json.success) {
                setStaffList((prev) => prev.filter((s) => s._id !== staffId))
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="container-fluid px-3 px-lg-4 py-4">

            {/* HEADER */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-4">

                <div>
                    <div className="settings-kicker mb-1">
                        SYSTEM
                    </div>

                    <h1 className="fw-bold mb-1 settings-title">
                        Settings
                    </h1>

                    <p className="text-secondary mb-0">
                        Manage your admin profile, security preferences,
                        notifications and platform configuration.
                    </p>
                </div>

                <div className="system-status d-inline-flex align-items-center">
                    <span />
                    System operational
                </div>

            </div>

            {/* MAIN */}
            <div className="row g-3">

                {/* SIDEBAR */}
                <div className="col-12 col-lg-2">

                    <div className="card border shadow-sm settings-menu">

                        <div className="card-body p-2">

                            {menuItems.map(([name, icon]) => (

                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setActiveTab(name)}
                                    className={`btn w-100 text-start d-flex align-items-center gap-3 settings-tab ${
                                        activeTab === name ? 'active' : ''
                                    }`}
                                >
                                    <i className={`fa-solid ${icon}`} />
                                    <span>{name}</span>
                                </button>

                            ))}

                        </div>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="col-12 col-lg-10">

                    {activeTab === 'Profile' && (

                        <>

                            {/* PROFILE CARD */}
                            <div className="card border shadow-sm mb-3">

                                <div className="card-body p-4">

                                    <h3 className="fw-bold fs-5 mb-1">
                                        Admin profile
                                    </h3>

                                    <p className="text-secondary small mb-4">
                                        Manage the information associated
                                        with your admin account.
                                    </p>

                                    {message && (
                                        <div className="alert alert-info py-2 px-3 small mb-3">{message}</div>
                                    )}

                                    {/* PROFILE */}
                                    <div className="d-flex align-items-center gap-3 mb-4">

                                        <div className="profile-avatar-setting">
                                            {initials}
                                        </div>

                                        <div>
                                            <h4 className="fw-bold fs-6 mb-1">
                                                {currentUser?.fullName || form.fullName || 'Admin'}
                                            </h4>

                                            {roleLabel && (
                                                <span className="role-badge">
                                                    {roleLabel}
                                                </span>
                                            )}
                                        </div>

                                    </div>

                                    {/* FORM */}
                                    <form onSubmit={handleSaveProfile}>

                                        <div className="row g-3">

                                            <div className="col-12 col-md-6">
                                                <label className="form-label fw-semibold small">
                                                    Full name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={form.fullName}
                                                    onChange={handleChange}
                                                    className="form-control settings-input"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label fw-semibold small">
                                                    Email address
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    className="form-control settings-input"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label fw-semibold small">
                                                    Phone number
                                                </label>

                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    className="form-control settings-input"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label fw-semibold small">
                                                    Role
                                                </label>

                                                <input
                                                    type="text"
                                                    value={roleLabel || '—'}
                                                    className="form-control settings-input bg-light"
                                                    disabled
                                                    readOnly
                                                />
                                            </div>

                                        </div>

                                        {/* ACTIONS */}
                                        <div className="border-top mt-4 pt-3 d-flex justify-content-end gap-2">

                                            <button
                                                type="button"
                                                className="btn btn-light border px-3"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                className="btn save-btn px-3 fw-semibold"
                                                disabled={loading}
                                            >
                                                {loading ? 'Saving...' : 'Save changes'}
                                            </button>

                                        </div>

                                    </form>

                                </div>

                            </div>

                            {/* DANGER ZONE */}
                            <div className="card danger-card">

                                <div className="card-body p-4">

                                    <h3 className="fw-bold fs-5 mb-1 text-danger">
                                        Danger zone
                                    </h3>

                                    <p className="small text-secondary mb-4">
                                        These actions affect your admin session
                                        or account preferences. They cannot be
                                        undone automatically.
                                    </p>

                                    <div className="d-flex flex-wrap gap-2">

                                        <button
                                            type="button"
                                            className="btn danger-btn"
                                        >
                                            Reset account preferences
                                        </button>

                                        <button
                                            type="button"
                                            className="btn danger-btn"
                                        >
                                            Sign out all devices
                                        </button>

                                        <button
                                            type="button"
                                            className="btn danger-btn"
                                        >
                                            Delete admin account
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </>

                    )}

                    {activeTab === 'Notifications' && (

                        <div className="card border shadow-sm">

                            <div className="card-body p-4">

                                <h3 className="fw-bold fs-5 mb-1">
                                    Notifications
                                </h3>

                                <p className="text-secondary small mb-4">
                                    Choose how you want to be notified.
                                </p>

                                {message && (
                                    <div className="alert alert-info py-2 px-3 small mb-3">{message}</div>
                                )}

                                <form onSubmit={handleSaveNotifications}>

                                    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
                                        <label htmlFor="matchingJobs" className="fw-semibold mb-0 fs-14">
                                            Email me about new matching jobs
                                        </label>

                                        <div className="form-check form-switch m-0">
                                            <input
                                                className="form-check-input settings-switch"
                                                type="checkbox"
                                                role="switch"
                                                id="matchingJobs"
                                                name="matchingJobs"
                                                checked={form.matchingJobs}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
                                        <label htmlFor="deadlineAlerts" className="fw-semibold mb-0 fs-14">
                                            SMS alerts for deadlines
                                        </label>

                                        <div className="form-check form-switch m-0">
                                            <input
                                                className="form-check-input settings-switch"
                                                type="checkbox"
                                                role="switch"
                                                id="deadlineAlerts"
                                                name="deadlineAlerts"
                                                checked={form.deadlineAlerts}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="border-top mt-4 pt-3 d-flex justify-content-end gap-2">
                                        <button
                                            type="submit"
                                            className="btn save-btn px-3 fw-semibold"
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save changes'}
                                        </button>
                                    </div>

                                </form>

                            </div>

                        </div>

                    )}

                    {activeTab === 'Team' && canManageStaff && (

                        <>

                            {/* ADD STAFF */}
                            <div className="card border shadow-sm mb-3">

                                <div className="card-body p-4">

                                    <h3 className="fw-bold fs-5 mb-1">
                                        Add staff
                                    </h3>

                                    <p className="text-secondary small mb-4">
                                        Invite a teammate and choose what they
                                        can access.
                                    </p>

                                    {staffError && (
                                        <div className="alert alert-danger py-2 px-3 small mb-3">{staffError}</div>
                                    )}
                                    {staffMessage && (
                                        <div className="alert alert-success py-2 px-3 small mb-3">{staffMessage}</div>
                                    )}

                                    <form onSubmit={handleAddStaff}>

                                        <div className="row g-3">

                                            <div className="col-12 col-md-6">
                                                <label className="form-label fw-semibold small">Full name</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={newStaff.fullName}
                                                    onChange={handleNewStaffChange}
                                                    className="form-control settings-input"
                                                    required
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label fw-semibold small">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={newStaff.email}
                                                    onChange={handleNewStaffChange}
                                                    className="form-control settings-input"
                                                    required
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label fw-semibold small">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={newStaff.password}
                                                    onChange={handleNewStaffChange}
                                                    className="form-control settings-input"
                                                    required
                                                />
                                            </div>

                                        </div>

                                        {/* Permission checkboxes render dynamically from the backend list */}
                                        <div className="mt-3 mb-2">
                                            <label className="form-label fw-semibold small d-block">Permissions</label>
                                            <div className="d-flex flex-wrap gap-3">
                                                {permissionsList.map((perm) => (
                                                    <div className="form-check" key={perm.key}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`new-${perm.key}`}
                                                            checked={newStaff.permissions.includes(perm.key)}
                                                            onChange={() => toggleNewStaffPermission(perm.key)}
                                                        />
                                                        <label className="form-check-label fs-13" htmlFor={`new-${perm.key}`}>
                                                            {perm.label}
                                                        </label>
                                                    </div>
                                                ))}
                                                {permissionsList.length === 0 && (
                                                    <span className="text-secondary small">No permissions configured yet.</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="border-top mt-4 pt-3 d-flex justify-content-end gap-2">
                                            <button
                                                type="submit"
                                                className="btn save-btn px-3 fw-semibold"
                                                disabled={staffLoading}
                                            >
                                                {staffLoading ? 'Adding...' : 'Add staff'}
                                            </button>
                                        </div>

                                    </form>

                                </div>

                            </div>

                            {/* STAFF LIST */}
                            <div className="card border shadow-sm">

                                <div className="card-body p-4">

                                    <h3 className="fw-bold fs-5 mb-1">
                                        Staff members
                                    </h3>

                                    <p className="text-secondary small mb-4">
                                        Manage access and status for your team.
                                    </p>

                                    {staffList.length === 0 && (
                                        <p className="text-secondary mb-0">No staff added yet.</p>
                                    )}

                                    {staffList.map((staff) => (
                                        <div key={staff._id} className="border-bottom py-3">

                                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                                                <div>
                                                    <div className="fw-semibold fs-14">{staff.fullName}</div>
                                                    <div className="text-secondary fs-13">{staff.email}</div>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        type="button"
                                                        className={`btn btn-sm ${staff.isActive ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                                                        onClick={() => handleToggleActive(staff._id)}
                                                    >
                                                        {staff.isActive ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteStaff(staff._id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-wrap gap-3 mb-2">
                                                {permissionsList.map((perm) => (
                                                    <div className="form-check" key={perm.key}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`${staff._id}-${perm.key}`}
                                                            checked={staff.permissions.includes(perm.key)}
                                                            onChange={() => toggleStaffPermission(staff._id, perm.key)}
                                                        />
                                                        <label
                                                            className="form-check-label fs-13"
                                                            htmlFor={`${staff._id}-${perm.key}`}
                                                        >
                                                            {perm.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-sm save-btn"
                                                onClick={() => saveStaffPermissions(staff._id)}
                                            >
                                                Save permissions
                                            </button>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </>

                    )}

                    {!['Profile', 'Notifications', 'Team'].includes(activeTab) && (

                        /* OTHER TABS (placeholders, ready for future API integration) */
                        <div className="card border shadow-sm">

                            <div className="card-body p-4">

                                <h3 className="fw-bold fs-5 mb-2">
                                    {activeTab}
                                </h3>

                                <p className="text-secondary mb-0">
                                    {activeTab} settings will be available
                                    here. This section is ready for API
                                    integration later.
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}

export default Page

 