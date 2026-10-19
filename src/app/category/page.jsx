'use client'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './category.css'

const API_URL = 'http://localhost:8000/api/categories'

const request = async (url, options) => {
    // const response = await fetch(url, options)
    const response = await fetch(url, { ...options, credentials: 'include' })
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
    }

    return result
}

const showSuccess = (title, text) =>
    Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonColor: '#2563eb',
        timer: 1300,
        showConfirmButton: false
    })

const showError = (title, text) =>
    Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#2563eb'
    })

const Page = () => {

    const [categories, setCategories] = useState([])

    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState(null)
    const [editingId, setEditingId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const categoriesPerPage = 5

    const clearFileInput = () => {
        const fileInput = document.getElementById('categoryImage')

        if (fileInput) {
            fileInput.value = ''
        }
    }

    const getCategories = async () => {
        try {
            const result = await request(API_URL)

            setCategories(
                Array.isArray(result.data)
                    ? result.data
                    : []
            )
        } catch (error) {
            console.error('GET CATEGORIES ERROR:', error)
            showError('Error', error.message)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    // ADD / UPDATE — UI updates instantly, API runs in background.
    // If API fails, the change is rolled back and the error is shown.
    const handleSubmit = (e) => {
        e.preventDefault()

        const name = categoryName.trim()

        if (!name) {
            Swal.fire({
                icon: 'warning',
                title: 'Category Name Required',
                text: 'Please enter category name.',
                confirmButtonColor: '#2563eb'
            })

            return
        }

        const isEdit = Boolean(editingId)
        const id = editingId
        const image = categoryImage
        const previous = isEdit
            ? categories.find((category) => category._id === id)
            : null
        const previewUrl = image ? URL.createObjectURL(image) : null
        const tempId = `temp-${Date.now()}`

        const formData = new FormData()
        formData.append('categoryName', name)

        if (image) {
            formData.append('categoryImage', image)
        }

        // Instant UI update
        if (isEdit) {
            setCategories((prev) =>
                prev.map((category) =>
                    category._id === id
                        ? {
                            ...category,
                            categoryName: name,
                            categoryImage: previewUrl
                                ? { ...category.categoryImage, url: previewUrl }
                                : category.categoryImage,
                            _pending: true
                        }
                        : category
                )
            )
        } else {
            setCategories((prev) => [
                {
                    _id: tempId,
                    categoryName: name,
                    categoryImage: { url: previewUrl },
                    _pending: true
                },
                ...prev
            ])
        }

        setCategoryName('')
        setCategoryImage(null)
        setEditingId(null)
        setCurrentPage(1)
        clearFileInput()

        showSuccess(
            isEdit ? 'Category Updated' : 'Category Added',
            isEdit
                ? 'Category updated successfully.'
                : 'Category added successfully.'
        )

        // Real API call in background
        request(
            isEdit ? `${API_URL}/${id}` : API_URL,
            {
                method: isEdit ? 'PUT' : 'POST',
                body: formData
            }
        )
            .then((result) => {
                setCategories((prev) =>
                    prev.map((category) =>
                        category._id === (isEdit ? id : tempId)
                            ? result.data
                            : category
                    )
                )
            })
            .catch((error) => {
                console.error('CATEGORY SAVE ERROR:', error)

                if (isEdit) {
                    setCategories((prev) =>
                        prev.map((category) =>
                            category._id === id ? previous : category
                        )
                    )
                    setEditingId(id)
                } else {
                    setCategories((prev) =>
                        prev.filter((category) => category._id !== tempId)
                    )
                }

                setCategoryName(name)
                setCategoryImage(image)

                showError('Request Failed', error.message)
            })
            .finally(() => {
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl)
                }
            })
    }

    // EDIT — uses data already on screen, no API call
    const handleEdit = (id) => {
        const category = categories.find((item) => item._id === id)

        if (!category) {
            return
        }

        setEditingId(category._id)
        setCategoryName(category.categoryName || '')
        setCategoryImage(null)
        clearFileInput()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // DELETE — row disappears instantly, API runs in background
    const handleDelete = async (id) => {

        const confirmResult = await Swal.fire({
            title: 'Delete Category?',
            text: 'This category will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'Cancel'
        })

        if (!confirmResult.isConfirmed) {
            return
        }

        const index = categories.findIndex((category) => category._id === id)
        const removed = categories[index]

        if (!removed) {
            return
        }

        setCategories((prev) =>
            prev.filter((category) => category._id !== id)
        )

        showSuccess('Deleted', 'Category deleted successfully.')

        try {
            await request(`${API_URL}/${id}`, { method: 'DELETE' })
        } catch (error) {
            console.error('DELETE CATEGORY ERROR:', error)

            // Put the row back at the same position
            setCategories((prev) => {
                const copy = [...prev]
                copy.splice(Math.min(index, copy.length), 0, removed)
                return copy
            })

            showError('Delete Failed', error.message)
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setCategoryName('')
        setCategoryImage(null)
        clearFileInput()
    }

    const totalPages = Math.ceil(
        categories.length /
        categoriesPerPage
    )

    const startIndex =
        (currentPage - 1) *
        categoriesPerPage

    const currentCategories =
        categories.slice(
            startIndex,
            startIndex +
            categoriesPerPage
        )

    return (

        <main className="container-fluid category-page">
            <div className="d-flex align-items-center gap-2 mb-4">
                <span className="category-folder">
                    <i className="fa-solid fa-folder"></i>
                </span>

                <h1 className="category-title fw-bold mb-0">
                    Manage Categories
                </h1>

            </div>


            {/* =========================
                ADD CATEGORY CARD
            ========================= */}

            <section className="card category-card shadow-sm rounded-4 mb-4">

                <div className="card-body p-4">

                    <h2 className="category-add-title fw-bold mb-4">

                        <span className="category-plus me-2">
                            +
                        </span>

                        {editingId
                            ? 'Edit Category'
                            : 'Add Category'
                        }

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3 align-items-center">

                            {/* CATEGORY NAME */}

                            <div className="col-lg-5 col-md-5 col-sm-12 col-12">

                                <input
                                    type="text"
                                    className="form-control category-input"
                                    placeholder="Category Name"
                                    value={categoryName}
                                    onChange={(e) =>
                                        setCategoryName(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* IMAGE */}

                            <div className="col-lg-5 col-md-5 col-sm-12 col-12">

                                <div className="category-upload">

                                    <input
                                        id="categoryImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setCategoryImage(
                                                e.target.files?.[0] ||
                                                null
                                            )
                                        }
                                    />

                                    <label
                                        htmlFor="categoryImage"
                                        className="category-upload-button"
                                    >

                                        <i className="fa-solid fa-upload"></i>

                                        Choose Image

                                    </label>

                                    <span className="category-file-name">

                                        {categoryImage
                                            ? categoryImage.name
                                            : 'No image selected'
                                        }

                                    </span>

                                </div>

                            </div>

                            {/* ADD / UPDATE */}

                            <div className="col-lg-2 col-md-2 col-sm-12 col-12">

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 category-submit"
                                >

                                    {editingId
                                        ? 'Update'
                                        : 'Add'
                                    }

                                </button>

                            </div>

                        </div>

                        {/* CANCEL */}

                        {editingId && (

                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm mt-3"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        )}

                    </form>

                </div>

            </section>


            {/* =========================
                CATEGORY TABLE
            ========================= */}

            <section className="card category-card shadow-sm rounded-4">

                <div className="card-body p-3">

                    <div className="table-responsive">

                        <table className="table category-table align-middle mb-0">

                            <thead>

                                <tr>

                                    <th className="text-center">
                                        S No
                                    </th>

                                    <th className="text-center">
                                        Category
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

                                {currentCategories.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center py-5 text-muted"
                                        >
                                            No categories found
                                        </td>

                                    </tr>

                                ) : (

                                    currentCategories.map(
                                        (category, index) => (

                                            <tr
                                                key={category._id}
                                                style={{
                                                    opacity: category._pending ? 0.6 : 1
                                                }}
                                            >

                                                <td className="text-center">

                                                    {
                                                        startIndex +
                                                        index +
                                                        1
                                                    }

                                                </td>

                                                <td className="text-center category-name-cell">

                                                    {
                                                        category.categoryName
                                                    }

                                                </td>

                                                <td className="text-center">

                                                    {category.categoryImage?.url ? (

                                                        <img
                                                            src={
                                                                category.categoryImage.url
                                                            }
                                                            alt={
                                                                category.categoryName
                                                            }
                                                            className="category-image"
                                                        />

                                                    ) : (

                                                        <span className="text-muted">
                                                            No Image
                                                        </span>

                                                    )}

                                                </td>

                                                <td>

                                                    <div className="d-flex justify-content-center align-items-center gap-2">

                                                        <button
                                                            type="button"
                                                            className="btn btn-warning btn-sm category-edit-btn"
                                                            disabled={category._pending}
                                                            onClick={() =>
                                                                handleEdit(
                                                                    category._id
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm category-delete-btn"
                                                            disabled={category._pending}
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category._id
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

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* =========================
                        PAGINATION
                    ========================= */}

                    {totalPages > 1 && (

                        <div className="d-flex justify-content-center mt-4">

                            <div className="btn-group">

                                {Array.from(
                                    {
                                        length: totalPages
                                    },
                                    (_, index) => (

                                        <button
                                            key={index}
                                            type="button"
                                            className={`btn ${
                                                currentPage === index + 1
                                                    ? 'btn-primary'
                                                    : 'btn-outline-primary'
                                            }`}
                                            onClick={() =>
                                                setCurrentPage(
                                                    index + 1
                                                )
                                            }
                                        >
                                            {index + 1}
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
