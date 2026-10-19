'use client'

import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

import './feature.css'


const API_URL = 'http://localhost:8000/api/service-addons'


const emptyForm = {
    key: '',
    name: '',
    price: '',
    isActive: true,
}


const request = async (url, options = {}) => {

    const response = await fetch(url, { ...options, credentials: 'include' })

    const result = await response.json()

    if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Something went wrong.')
    }

    return result
}


const showSuccess = (title, text) => {

    Swal.fire({
        icon: 'success',
        title,
        text,
        timer: 1300,
        showConfirmButton: false,
    })

}


const showError = (title, text) => {

    Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#2563eb',
    })

}


const Page = () => {

    const [features, setFeatures] = useState([])

    const [form, setForm] = useState(emptyForm)

    const [editingId, setEditingId] = useState(null)

    const [search, setSearch] = useState('')


    // ========================================================
    // GET FEATURES
    // ========================================================

    const getFeatures = async () => {

        try {

            const result = await request(`${API_URL}?includeInactive=true`)

            setFeatures(Array.isArray(result.data) ? result.data : [])

        } catch (error) {

            console.error('GET FEATURES ERROR:', error)

            showError('Error', error.message)

        }
    }


    useEffect(() => {

        getFeatures()

    }, [])


    // ========================================================
    // INPUT CHANGE
    // ========================================================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target

        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))

    }


    // ========================================================
    // RESET
    // ========================================================

    const resetForm = () => {

        setForm({ ...emptyForm })

        setEditingId(null)

    }


    // ========================================================
    // EDIT
    // ========================================================

    const handleEdit = (feature) => {

        setEditingId(feature._id)

        setForm({
            key: feature.key || '',
            name: feature.name || '',
            price: feature.price ?? '',
            isActive: feature.isActive !== false,
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }


    // ========================================================
    // SUBMIT
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault()

        const key = form.key.trim()

        const name = form.name.trim()

        if (!key) {
            showError('Validation Error', 'Feature key is required.')
            return
        }

        if (!name) {
            showError('Validation Error', 'Feature name is required.')
            return
        }

        if (
            form.price === '' ||
            form.price === null ||
            form.price === undefined
        ) {
            showError('Validation Error', 'Price is required.')
            return
        }

        const price = Number(form.price)

        if (!Number.isFinite(price) || price < 0) {
            showError('Validation Error', 'Price must be 0 or greater.')
            return
        }

        const payload = {
            key,
            name,
            price,
            isActive: Boolean(form.isActive),
        }

        try {

            // UPDATE
            if (editingId) {

                const result = await request(
                    `${API_URL}/${editingId}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }
                )

                setFeatures(prev =>
                    prev.map(item =>
                        item._id === editingId ? result.data : item
                    )
                )

                showSuccess('Updated', 'Feature updated successfully.')

            }

            // CREATE
            else {

                const result = await request(
                    API_URL,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }
                )

                setFeatures(prev => [result.data, ...prev])

                showSuccess('Created', 'Feature created successfully.')

            }

            resetForm()

        } catch (error) {

            console.error('SAVE FEATURE ERROR:', error)

            showError('Error', error.message)

        }

    }


    // ========================================================
    // TOGGLE ACTIVE
    // ========================================================

    const handleToggle = async (feature) => {

        try {

            const result = await request(
                `${API_URL}/${feature._id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        isActive: !feature.isActive,
                    }),
                }
            )

            setFeatures(prev =>
                prev.map(item =>
                    item._id === feature._id ? result.data : item
                )
            )

            showSuccess(
                'Updated',
                feature.isActive
                    ? 'Feature deactivated.'
                    : 'Feature activated.'
            )

        } catch (error) {

            console.error('TOGGLE FEATURE ERROR:', error)

            showError('Error', error.message)

        }

    }


    // ========================================================
    // DELETE (PERMANENT)
    // ========================================================

    const handleDelete = async (feature) => {

        const confirm = await Swal.fire({
            icon: 'warning',
            title: 'Delete Feature?',
            text: `"${feature.name}" will be permanently deleted. This cannot be undone.`,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc2626',
        })

        if (!confirm.isConfirmed) {
            return
        }

        try {

            await request(
                `${API_URL}/${feature._id}`,
                { method: 'DELETE' }
            )

            setFeatures(prev =>
                prev.filter(item => item._id !== feature._id)
            )

            if (editingId === feature._id) {
                resetForm()
            }

            showSuccess('Deleted', 'Feature deleted successfully.')

        } catch (error) {

            console.error('DELETE FEATURE ERROR:', error)

            showError('Error', error.message)

        }

    }


    // ========================================================
    // FILTER
    // ========================================================

    const filteredFeatures = features.filter(feature => {

        const text = search.trim().toLowerCase()

        if (!text) {
            return true
        }

        return (
            feature.name?.toLowerCase().includes(text) ||
            feature.key?.toLowerCase().includes(text)
        )

    })


    return (

        <div className="feature-page">

            {/* HEADER */}

            <div className="feature-page-header">

                <div>

                    <h1 className="feature-page-title">
                        Features
                    </h1>

                    <p className="feature-page-description">
                        Manage common service features.
                    </p>

                </div>

            </div>


            {/* FORM */}

            <div className="card feature-card">

                <div className="card-header">

                    <div>

                        <h2>
                            {editingId ? 'Edit Feature' : 'Add Feature'}
                        </h2>

                        <p>
                            Fixed price feature (USD)
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="card-body">

                        <div className="row g-3">

                            {/* KEY */}

                            <div className="col-lg-4 col-md-6 col-sm-12">

                                <label className="form-label">
                                    Feature Key
                                </label>

                                <input
                                    type="text"
                                    name="key"
                                    className="form-control"
                                    placeholder="express"
                                    value={form.key}
                                    onChange={handleChange}
                                    disabled={Boolean(editingId)}
                                />

                                <small className="feature-help">
                                    Example: express
                                </small>

                            </div>


                            {/* NAME */}

                            <div className="col-lg-4 col-md-6 col-sm-12">

                                <label className="form-label">
                                    Feature Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Express"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* PRICE */}

                            <div className="col-lg-4 col-md-6 col-sm-12">

                                <label className="form-label">
                                    Price ($)
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    placeholder="30"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                />

                                <small className="feature-help">
                                    Example: 30 = $30
                                </small>

                            </div>


                            {/* ACTIVE */}

                            <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center">

                                <div className="form-check feature-active-check">

                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        className="form-check-input"
                                        id="featureActive"
                                        checked={form.isActive}
                                        onChange={handleChange}
                                    />

                                    <label
                                        htmlFor="featureActive"
                                        className="form-check-label"
                                    >
                                        Active
                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="card-footer feature-form-footer">

                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={resetForm}
                        >
                            Clear
                        </button>


                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {editingId ? 'Update Feature' : 'Add Feature'}
                        </button>

                    </div>

                </form>

            </div>


            {/* LIST */}

            <div className="card feature-card">

                <div className="card-header feature-list-header">

                    <div>

                        <h2>
                            Service Features
                        </h2>

                        <p>
                            Express and Certified are common
                            features for both purchase types.
                        </p>

                    </div>


                    <div className="feature-search">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search feature..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                    </div>

                </div>


                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table feature-table mb-0">

                            <thead>

                                <tr>
                                    <th>Feature</th>
                                    <th>Key</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th className="text-end">Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {filteredFeatures.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="feature-empty"
                                        >
                                            No features found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredFeatures.map(feature => (

                                        <tr key={feature._id}>

                                            <td>
                                                <div className="feature-name">
                                                    {feature.name}
                                                </div>
                                            </td>


                                            <td>
                                                <code>{feature.key}</code>
                                            </td>


                                            <td>
                                                <strong>
                                                    ${feature.price ?? 0}
                                                </strong>
                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        feature.isActive
                                                            ? 'feature-status active'
                                                            : 'feature-status inactive'
                                                    }
                                                >
                                                    {feature.isActive ? 'Active' : 'Inactive'}
                                                </span>

                                            </td>


                                            <td className="text-end">

                                                <div className="feature-actions">

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleEdit(feature)}
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className={
                                                            feature.isActive
                                                                ? 'btn btn-sm btn-outline-warning'
                                                                : 'btn btn-sm btn-outline-success'
                                                        }
                                                        onClick={() => handleToggle(feature)}
                                                    >
                                                        {feature.isActive ? 'Disable' : 'Enable'}
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(feature)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

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


export default Page