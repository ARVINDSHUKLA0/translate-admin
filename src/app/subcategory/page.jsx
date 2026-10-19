'use client'

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './subcategory.css'

const API = 'http://localhost:8000/api'
const subApi = `${API}/subcategories`
const catApi = `${API}/categories`

const request = async (url, options) => {
    // const res = await fetch(url, options)
    const res = await fetch(url, { ...options, credentials: 'include' })
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Request failed')
    }

    return data
}

const showSuccess = (title, text) =>
    Swal.fire({
        icon: 'success',
        title,
        text,
        timer: 1300,
        showConfirmButton: false
    })

const showError = (text, title = 'Error') =>
    Swal.fire({
        icon: 'error',
        title,
        text
    })

const idOf = (item) => item.category?._id || item.category

const Page = () => {

    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null)
    const [editId, setEditId] = useState(null)
    const [page, setPage] = useState(1)

    const perPage = 5

    const clearFileInput = () => {
        const file = document.getElementById('subcategoryImage')
        if (file) file.value = ''
    }

    const load = async () => {
        try {
            const [catData, subData] = await Promise.all([
                request(catApi),
                request(subApi)
            ])

            setCategories(catData.data || [])
            setItems(subData.data || [])
        } catch (error) {
            showError(error.message)
        }
    }

    useEffect(() => {
        load()
    }, [])

    // Category select filters the list on screen — no API call
    const handleCategory = (value) => {
        setCategory(value)
        setPage(1)
    }

    const reset = () => {
        setName('')
        setCategory('')
        setImage(null)
        setEditId(null)
        clearFileInput()
    }

    // ADD / UPDATE — UI updates instantly, API runs in background.
    // If API fails, the change is rolled back and the error is shown.
    const submit = (e) => {
        e.preventDefault()

        if (!category || !name.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Required',
                text: 'Category and subcategory name are required.'
            })
            return
        }

        const isEdit = Boolean(editId)
        const id = editId
        const subName = name.trim()
        const categoryId = category
        const file = image
        const previous = isEdit
            ? items.find((item) => item._id === id)
            : null
        const previewUrl = file ? URL.createObjectURL(file) : null
        const tempId = `temp-${Date.now()}`

        const formData = new FormData()
        formData.append('subcategoryName', subName)
        formData.append('category', categoryId)

        if (file) {
            formData.append('subcategoryImage', file)
        }

        // Instant UI update
        if (isEdit) {
            setItems((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            subcategoryName: subName,
                            category: categoryId,
                            subcategoryImage: previewUrl
                                ? { ...item.subcategoryImage, url: previewUrl }
                                : item.subcategoryImage,
                            _pending: true
                        }
                        : item
                )
            )
        } else {
            setItems((prev) => [
                {
                    _id: tempId,
                    subcategoryName: subName,
                    category: categoryId,
                    subcategoryImage: { url: previewUrl },
                    _pending: true
                },
                ...prev
            ])
        }

        reset()
        setPage(1)

        showSuccess(
            isEdit ? 'Updated' : 'Added',
            isEdit
                ? 'Subcategory updated successfully.'
                : 'Subcategory added successfully.'
        )

        // Real API call in background
        request(
            isEdit ? `${subApi}/${id}` : subApi,
            {
                method: isEdit ? 'PUT' : 'POST',
                body: formData
            }
        )
            .then((result) => {
                setItems((prev) =>
                    prev.map((item) =>
                        item._id === (isEdit ? id : tempId)
                            ? result.data
                            : item
                    )
                )
            })
            .catch((error) => {
                if (isEdit) {
                    setItems((prev) =>
                        prev.map((item) =>
                            item._id === id ? previous : item
                        )
                    )
                    setEditId(id)
                } else {
                    setItems((prev) =>
                        prev.filter((item) => item._id !== tempId)
                    )
                }

                setName(subName)
                setCategory(categoryId)
                setImage(file)

                showError(error.message)
            })
            .finally(() => {
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl)
                }
            })
    }

    // EDIT — uses data already on screen, no API call
    const edit = (id) => {
        const item = items.find((entry) => entry._id === id)

        if (!item) return

        setEditId(item._id)
        setName(item.subcategoryName || '')
        setCategory(idOf(item) || '')
        setImage(null)
        clearFileInput()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // DELETE — row disappears instantly, API runs in background
    const remove = async (id) => {
        const confirm = await Swal.fire({
            icon: 'warning',
            title: 'Delete Subcategory?',
            text: 'This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#dc2626'
        })

        if (!confirm.isConfirmed) return

        const index = items.findIndex((item) => item._id === id)
        const removed = items[index]

        if (!removed) return

        setItems((prev) => prev.filter((item) => item._id !== id))

        showSuccess('Deleted', 'Subcategory deleted successfully.')

        try {
            await request(`${subApi}/${id}`, { method: 'DELETE' })
        } catch (error) {
            // Put the row back at the same position
            setItems((prev) => {
                const copy = [...prev]
                copy.splice(Math.min(index, copy.length), 0, removed)
                return copy
            })

            showError(error.message)
        }
    }

    const filteredItems = category
        ? items.filter((item) => idOf(item) === category)
        : items

    const totalPages = Math.ceil(filteredItems.length / perPage)

    const visibleItems = filteredItems.slice(
        (page - 1) * perPage,
        page * perPage
    )

    const categoryName = (item) => {
        if (item.category?.categoryName) {
            return item.category.categoryName
        }

        return categories.find(
            cat => cat._id === item.category
        )?.categoryName || '-'
    }

    return (
        <main className="container-fluid subcategory-page">

            <div className="d-flex align-items-center gap-2 mb-4">
                <span className="subcategory-folder">
                    <i className="fa-solid fa-folder"></i>
                </span>

                <h1 className="fw-bold mb-0">
                    Manage Subcategories
                </h1>
            </div>

            <section className="card shadow-sm border-0 rounded-4 mb-4">
                <div className="card-body p-4">

                    <h2 className="text-primary fw-bold h4 mb-4">
                        <span className="subcategory-plus">
                            +
                        </span>

                        {editId
                            ? ' Edit Subcategory'
                            : ' Add Subcategory'
                        }
                    </h2>

                    <form onSubmit={submit}>
                        <div className="row g-3">

                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                <select
                                    className="form-select subcategory-input"
                                    value={category}
                                    onChange={e =>
                                        handleCategory(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map(cat => (
                                        <option
                                            key={cat._id}
                                            value={cat._id}
                                        >
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <input
                                    type="text"
                                    className="form-control subcategory-input"
                                    placeholder="Subcategory Name"
                                    value={name}
                                    onChange={e =>
                                        setName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="subcategory-upload">
                                    <input
                                        id="subcategoryImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={e =>
                                            setImage(
                                                e.target.files?.[0] ||
                                                null
                                            )
                                        }
                                    />

                                    <label
                                        htmlFor="subcategoryImage"
                                        className="subcategory-upload-button"
                                    >
                                        <i className="fa-solid fa-upload"></i>
                                        Choose Image
                                    </label>

                                    <span>
                                        {image
                                            ? image.name
                                            : 'No image selected'}
                                    </span>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 subcategory-submit"
                                >
                                    {editId
                                        ? 'Update'
                                        : 'Add'}
                                </button>
                            </div>

                        </div>

                        {editId && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm mt-3"
                                onClick={reset}
                            >
                                Cancel
                            </button>
                        )}
                    </form>

                </div>
            </section>

            <section className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-3">

                    <div className="table-responsive">
                        <table className="table align-middle mb-0 subcategory-table">

                            <thead>
                                <tr>
                                    <th className="text-center">
                                        S No
                                    </th>

                                    <th className="text-center">
                                        Category
                                    </th>

                                    <th className="text-center">
                                        Subcategory
                                    </th>

                                    <th className="text-center">
                                        Image
                                    </th>

                                    <th className="text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {visibleItems.length ? (
                                    visibleItems.map(
                                        (item, index) => (
                                            <tr
                                                key={item._id}
                                                style={{
                                                    opacity: item._pending ? 0.6 : 1
                                                }}
                                            >

                                                <td className="text-center">
                                                    {(page - 1) *
                                                        perPage +
                                                        index +
                                                        1}
                                                </td>

                                                <td className="text-center fw-semibold">
                                                    {categoryName(item)}
                                                </td>

                                                <td className="text-center fw-semibold">
                                                    {item.subcategoryName}
                                                </td>

                                                <td className="text-center">
                                                    {item.subcategoryImage?.url ? (
                                                        <img
                                                            src={
                                                                item.subcategoryImage.url
                                                            }
                                                            alt={
                                                                item.subcategoryName
                                                            }
                                                            className="subcategory-image"
                                                        />
                                                    ) : (
                                                        <span className="text-muted">
                                                            No Image
                                                        </span>
                                                    )}
                                                </td>

                                                <td>
                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button
                                                            className="btn btn-warning btn-sm px-3"
                                                            disabled={item._pending}
                                                            onClick={() =>
                                                                edit(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-outline-danger btn-sm px-3"
                                                            disabled={item._pending}
                                                            onClick={() =>
                                                                remove(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-5 text-muted"
                                        >
                                            No subcategories found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <div className="btn-group">
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => (
                                        <button
                                            key={i}
                                            className={`btn ${
                                                page === i + 1
                                                    ? 'btn-primary'
                                                    : 'btn-outline-primary'
                                            }`}
                                            onClick={() =>
                                                setPage(i + 1)
                                            }
                                        >
                                            {i + 1}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </section>

        </main>
    )
}

export default Page
