// 'use client'

// import { useEffect, useMemo, useRef, useState } from 'react'
// import dynamic from 'next/dynamic'
// import Swal from 'sweetalert2'
// import 'react-quill-new/dist/quill.snow.css'
// import './Service.css'

// const API = 'http://localhost:8000/api'

// const serviceApi = `${API}/services`
// const categoryApi = `${API}/categories`
// const subcategoryApi = `${API}/subcategories`

// const ReactQuill = dynamic(
//     () => import('react-quill-new'),
//     { ssr: false }
// )

// const request = async (url, options = {}) => {

//     const response = await fetch(url, options)

//     const result = await response.json()

//     if (!response.ok || result.success === false) {
//         throw new Error(
//             result.message || 'Request failed.'
//         )
//     }

//     return result
// }


// const showSuccess = (title, text) => {

//     Swal.fire({
//         icon: 'success',
//         title,
//         text,
//         timer: 1300,
//         showConfirmButton: false
//     })

// }


// const showError = (title, text) => {

//     Swal.fire({
//         icon: 'error',
//         title,
//         text,
//         confirmButtonColor: '#2563eb'
//     })

// }


// const emptyForm = {

//     category: '',
//     subcategory: '',

//     title: '',
//     slug: '',

//     smallDescription: '',
//     longDescription: '',

//     tabs: [],

//     numberOfTranslators: 0,

//     ratingAverage: 0,
//     totalReviews: 0,

//     deliveryValue: 1,
//     deliveryUnit: 'day',

//     images: [],

//     purchaseFixed: true,
//     purchaseFileUpload: false,

//     startingPrice: 0,
//     startingPriceCurrency: 'USD',

//     discountEnabled: false,
//     discountType: 'percentage',
//     discountValue: 0,
//     discountCurrency: 'USD',

//     status: 'draft',

//     sortOrder: 0,

//     isFeatured: false,

// }


// const Page = () => {

//     const [services, setServices] = useState([])

//     const [categories, setCategories] = useState([])

//     const [subcategories, setSubcategories] = useState([])

//     // Mutations are optimistic: the table updates immediately while the API runs in the background.
//     const mutationVersionRef = useRef(0)
//     const pendingMutationsRef = useRef(0)
//     const rowMutationRef = useRef(new Map())

//     const [formOpen, setFormOpen] = useState(false)

//     const [editingId, setEditingId] = useState(null)

//     const [search, setSearch] = useState('')

//     const [filterCategory, setFilterCategory] = useState('')

//     const [filterSubcategory, setFilterSubcategory] =
//         useState('')

//     const [filterStatus, setFilterStatus] =
//         useState('')

//     const [form, setForm] = useState(emptyForm)

//     // Active Service Tab editor
//     const [activeTabIndex, setActiveTabIndex] = useState(-1)
//     const [newTabText, setNewTabText] = useState('')

//     // ============================================================
//     // FILE UPLOAD STATE
//     // ============================================================

//     const [thumbnailFile, setThumbnailFile] = useState(null)
//     const [imageFiles, setImageFiles] = useState([])
//     const [existingThumbnail, setExistingThumbnail] = useState(null)
//     const [existingImages, setExistingImages] = useState([])


//     // ============================================================
//     // LOAD CATEGORIES
//     // ============================================================

//     const loadCategories = async () => {

//         try {

//             const result =
//                 await request(categoryApi)

//             setCategories(
//                 Array.isArray(result.data)
//                     ? result.data
//                     : []
//             )

//         } catch (error) {

//             console.error(
//                 'GET CATEGORIES ERROR:',
//                 error
//             )

//             showError(
//                 'Categories Error',
//                 error.message
//             )
//         }
//     }


//     // ============================================================
//     // LOAD SUBCATEGORIES
//     // ============================================================

//     const loadSubcategories = async () => {

//         try {

//             const result =
//                 await request(subcategoryApi)

//             setSubcategories(
//                 Array.isArray(result.data)
//                     ? result.data
//                     : []
//             )

//         } catch (error) {

//             console.error(
//                 'GET SUBCATEGORIES ERROR:',
//                 error
//             )

//             showError(
//                 'Subcategories Error',
//                 error.message
//             )
//         }
//     }


//     // ============================================================
//     // LOAD SERVICES
//     // ============================================================

//     const loadServices = async () => {

//         const requestVersion = mutationVersionRef.current

//         try {

//             const params =
//                 new URLSearchParams()

//             if (filterStatus) {
//                 params.append('status', filterStatus)
//             }

//             if (filterCategory) {
//                 params.append('category', filterCategory)
//             }

//             if (filterSubcategory) {
//                 params.append('subcategory', filterSubcategory)
//             }

//             const query = params.toString()

//             const url =
//                 query
//                     ? `${serviceApi}?${query}`
//                     : serviceApi

//             const result = await request(url)

//             // Never let an older GET overwrite an optimistic mutation.
//             // Also ignore GET responses while a mutation is still pending.
//             if (
//                 requestVersion !== mutationVersionRef.current ||
//                 pendingMutationsRef.current > 0
//             ) {
//                 return
//             }

//             const serviceList =
//                 Array.isArray(result.data)
//                     ? result.data
//                     : []

//             setServices(
//                 filterStatus === 'archived'
//                     ? serviceList
//                     : serviceList.filter(
//                         (service) => service.status !== 'archived'
//                     )
//             )

//         } catch (error) {

//             console.error(
//                 'GET SERVICES ERROR:',
//                 error
//             )

//         }
//     }


//     // ============================================================
//     // INITIAL LOAD
//     // ============================================================

//     useEffect(() => {

//         loadCategories()
//         loadSubcategories()

//     }, [])


//     useEffect(() => {

//         loadServices()

//     }, [
//         filterStatus,
//         filterCategory,
//         filterSubcategory
//     ])


//     // ============================================================
//     // FILTERED SUBCATEGORIES
//     // ============================================================

//     const availableSubcategories =
//         useMemo(() => {

//             if (!filterCategory) {
//                 return subcategories
//             }

//             return subcategories.filter(
//                 (item) => {

//                     const categoryId =
//                         item.category?._id ||
//                         item.category

//                     return (
//                         categoryId ===
//                         filterCategory
//                     )
//                 }
//             )

//         }, [
//             subcategories,
//             filterCategory
//         ])


//     const formSubcategories =
//         useMemo(() => {

//             if (!form.category) {
//                 return []
//             }

//             return subcategories.filter(
//                 (item) => {

//                     const categoryId =
//                         item.category?._id ||
//                         item.category

//                     return (
//                         categoryId ===
//                         form.category
//                     )
//                 }
//             )

//         }, [
//             subcategories,
//             form.category
//         ])


//     // ============================================================
//     // SEARCH
//     // ============================================================

//     const visibleServices =
//         services.filter((service) => {

//             if (!search.trim()) {
//                 return true
//             }

//             const value =
//                 search
//                     .trim()
//                     .toLowerCase()


//             return (

//                 service.title
//                     ?.toLowerCase()
//                     .includes(value)

//                 ||

//                 service.slug
//                     ?.toLowerCase()
//                     .includes(value)

//                 ||

//                 service.category?.categoryName
//                     ?.toLowerCase()
//                     .includes(value)

//                 ||

//                 service.subcategory?.subcategoryName
//                     ?.toLowerCase()
//                     .includes(value)
//             )

//         })


//     // ============================================================
//     // FORM FIELD
//     // ============================================================

//     const updateForm = (field, value) => {

//         setForm((previous) => ({
//             ...previous,
//             [field]: value
//         }))

//     }


//     // ============================================================
//     // CATEGORY CHANGE IN FORM
//     // ============================================================

//     const handleFormCategory = (value) => {

//         setForm((previous) => ({
//             ...previous,
//             category: value,
//             subcategory: ''
//         }))

//     }


//     // ============================================================
//     // ADD TAB
//     // ============================================================

//     const addTab = (text = newTabText) => {

//         const title = String(text || '').trim()

//         if (!title) return false

//         const newTabIndex = form.tabs.length

//         setForm((previous) => ({
//             ...previous,
//             tabs: [
//                 ...(Array.isArray(previous.tabs) ? previous.tabs : []),
//                 title
//             ]
//         }))

//         setActiveTabIndex(newTabIndex)
//         setNewTabText('')
//         return true
//     }

//     const handleNewTabKeyDown = (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault()
//             addTab()
//         }
//     }


//     // ============================================================
//     // REMOVE TAB
//     // ============================================================

//     const removeTab = (index) => {

//         setForm((previous) => {

//             const nextTabs = previous.tabs.filter(
//                 (_, tabIndex) => tabIndex !== index
//             )

//             return {
//                 ...previous,
//                 tabs: nextTabs
//             }
//         })

//         setActiveTabIndex((previousIndex) => {
//             if (form.tabs.length <= 1) return -1
//             if (index < previousIndex) return previousIndex - 1
//             if (index === previousIndex) {
//                 return Math.min(previousIndex, form.tabs.length - 2)
//             }
//             return previousIndex
//         })
//     }


//     // ============================================================
//     // FILE UPLOAD
//     // ============================================================

//     const handleThumbnailChange = (event) => {
//         setThumbnailFile(event.target.files?.[0] || null)
//     }

//     const handleImagesChange = (event) => {
//         setImageFiles(Array.from(event.target.files || []))
//     }

//     const removeSelectedImage = (index) => {
//         setImageFiles((previous) =>
//             previous.filter((_, fileIndex) => fileIndex !== index)
//         )
//     }

//     const removeExistingImage = (index) => {
//         setExistingImages((previous) =>
//             previous.filter((_, imageIndex) => imageIndex !== index)
//         )
//     }

//     // ============================================================
//     // RESET FORM
//     // ============================================================

//     const resetForm = () => {

//         setForm({
//             ...emptyForm,
//             tabs: []
//         })

//         setActiveTabIndex(-1)
//         setNewTabText('')
//         setEditingId(null)

//         setThumbnailFile(null)
//         setImageFiles([])
//         setExistingThumbnail(null)
//         setExistingImages([])
//     }


//     // ============================================================
//     // OPEN CREATE
//     // ============================================================

//     const openCreate = () => {

//         resetForm()

//         setFormOpen(true)

//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         })

//     }


//     // ============================================================
//     // OPEN EDIT
//     // ============================================================

//     const openEdit = (service) => {

//         setEditingId(service._id)
//         setActiveTabIndex(
//             Array.isArray(service.tabs) && service.tabs.length > 0 ? 0 : -1
//         )

//         setForm({

//             category:
//                 service.category?._id ||
//                 service.category ||
//                 '',

//             subcategory:
//                 service.subcategory?._id ||
//                 service.subcategory ||
//                 '',

//             title:
//                 service.title || '',

//             slug:
//                 service.slug || '',

//             smallDescription:
//                 service.smallDescription || '',

//             longDescription:
//                 service.longDescription || '',

//             tabs:
//                 Array.isArray(service.tabs)
//                     ? service.tabs.map((tab) =>
//                         typeof tab === 'string'
//                             ? tab
//                             : (typeof tab?.title === 'string' ? tab.title : '')
//                     ).filter(Boolean)
//                     : [],

//             numberOfTranslators:
//                 service.translatorInfo
//                     ?.numberOfTranslators || 0,

//             ratingAverage:
//                 service.translatorInfo
//                     ?.rating?.average || 0,

//             totalReviews:
//                 service.translatorInfo
//                     ?.rating?.totalReviews || 0,

//             deliveryValue:
//                 service.delivery?.value || 1,

//             deliveryUnit:
//                 service.delivery?.unit || 'day',

//             images: [],

//             purchaseFixed:
//                 Boolean(
//                     service.purchaseModes?.fixed
//                 ),

//             purchaseFileUpload:
//                 Boolean(
//                     service.purchaseModes?.fileUpload
//                 ),

//             startingPrice:
//                 service.startingPrice || 0,

//             startingPriceCurrency:
//                 service.startingPriceCurrency ||
//                 'USD',

//             discountEnabled:
//                 Boolean(service.discount?.enabled),

//             discountType:
//                 service.discount?.type || 'percentage',

//             discountValue:
//                 service.discount?.value || 0,

//             discountCurrency:
//                 service.discount?.currency ||
//                 service.startingPriceCurrency ||
//                 'USD',

//             status:
//                 service.status || 'draft',

//             sortOrder:
//                 service.sortOrder || 0,

//             isFeatured:
//                 Boolean(
//                     service.isFeatured
//                 ),

//         })

//         setThumbnailFile(null)
//         setImageFiles([])

//         setExistingThumbnail(
//             service.thumbnail?.url
//                 ? {
//                     publicId: service.thumbnail?.publicId || '',
//                     url: service.thumbnail.url
//                 }
//                 : null
//         )

//         setExistingImages(
//             Array.isArray(service.images)
//                 ? service.images
//                 : []
//         )

//         setFormOpen(true)

//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         })

//     }


//     // ============================================================
//     // CREATE / UPDATE SERVICE
//     // ============================================================

//     const handleSubmit = (event) => {

//         event.preventDefault()

//         if (!form.category) {
//             showError(
//                 'Category Required',
//                 'Please select a category.'
//             )
//             return
//         }

//         if (!form.subcategory) {
//             showError(
//                 'Subcategory Required',
//                 'Please select a subcategory.'
//             )
//             return
//         }

//         if (!form.title || !form.title.trim()) {
//             showError(
//                 'Title Required',
//                 'Please enter service title.'
//             )
//             return
//         }

//         if (!form.slug || !form.slug.trim()) {
//             showError(
//                 'Slug Required',
//                 'Please enter service slug.'
//             )
//             return
//         }

//         const selectedCategory = String(form.category).trim()
//         const selectedSubcategory = String(form.subcategory).trim()

//         if (!selectedCategory || !selectedSubcategory) {
//             showError(
//                 'Category Required',
//                 'Please select category and subcategory again.'
//             )
//             return
//         }

//         const isEdit = Boolean(editingId)
//         const id = editingId

//         const previousIndex = isEdit
//             ? services.findIndex((service) => service._id === id)
//             : -1

//         const previous = isEdit && previousIndex >= 0
//             ? services[previousIndex]
//             : null

//         const selectedCategoryObject =
//             categories.find(
//                 (category) => String(category._id) === selectedCategory
//             ) || {
//                 _id: selectedCategory,
//                 categoryName: '-'
//             }

//         const selectedSubcategoryObject =
//             subcategories.find(
//                 (subcategory) => String(subcategory._id) === selectedSubcategory
//             ) || {
//                 _id: selectedSubcategory,
//                 subcategoryName: '-'
//             }

//         const thumbnailPreviewUrl =
//             thumbnailFile
//                 ? URL.createObjectURL(thumbnailFile)
//                 : null

//         // Local previews of newly selected images so they show instantly.
//         const newImagePreviews = imageFiles.map((file) => ({
//             url: URL.createObjectURL(file),
//             _local: true
//         }))

//         const keptImages = Array.isArray(existingImages)
//             ? [...existingImages]
//             : (previous?.images || [])

//         const uploadedImageCount = imageFiles.length
//         const expectedImageCount = keptImages.length + uploadedImageCount
//         const hadThumbnailFile = Boolean(thumbnailFile)
//         const oldThumbnailUrl = previous?.thumbnail?.url || ''

//         const releasePreviews = () => {
//             if (thumbnailPreviewUrl) {
//                 URL.revokeObjectURL(thumbnailPreviewUrl)
//             }
//             newImagePreviews.forEach((image) => {
//                 URL.revokeObjectURL(image.url)
//             })
//         }

//         const tempId = `temp-service-${Date.now()}`

//         const optimisticService = {
//             ...(previous || {}),
//             _id: isEdit ? id : tempId,
//             category: selectedCategoryObject,
//             subcategory: selectedSubcategoryObject,
//             title: form.title.trim(),
//             slug: form.slug.trim(),
//             smallDescription: form.smallDescription.trim(),
//             longDescription: form.longDescription,
//             tabs: Array.isArray(form.tabs) ? [...form.tabs] : [],
//             translatorInfo: {
//                 numberOfTranslators:
//                     Number(form.numberOfTranslators) || 0,
//                 rating: {
//                     average:
//                         Number(form.ratingAverage) || 0,
//                     totalReviews:
//                         Number(form.totalReviews) || 0
//                 }
//             },
//             delivery: {
//                 value: Number(form.deliveryValue) || 1,
//                 unit: form.deliveryUnit
//             },
//             purchaseModes: {
//                 fixed: Boolean(form.purchaseFixed),
//                 fileUpload: Boolean(form.purchaseFileUpload)
//             },
//             startingPrice: Number(form.startingPrice) || 0,
//             startingPriceCurrency:
//                 form.startingPriceCurrency.toUpperCase(),
//             discount: {
//                 enabled: Boolean(form.discountEnabled),
//                 type: form.discountType,
//                 value: Number(form.discountValue) || 0,
//                 currency: form.discountCurrency.toUpperCase()
//             },
//             status: form.status,
//             sortOrder: Number(form.sortOrder) || 0,
//             isFeatured: Boolean(form.isFeatured),
//             thumbnail: thumbnailPreviewUrl
//                 ? {
//                     ...(previous?.thumbnail || {}),
//                     url: thumbnailPreviewUrl
//                 }
//                 : (previous?.thumbnail || null),
//             images: [...keptImages, ...newImagePreviews],
//             _pending: true
//         }

//         // The current filters must continue to be respected by the optimistic row.
//         const matchesCurrentFilters = (service) => {

//             if (
//                 filterStatus &&
//                 service.status !== filterStatus
//             ) {
//                 return false
//             }

//             if (
//                 !filterStatus &&
//                 service.status === 'archived'
//             ) {
//                 return false
//             }

//             const categoryId =
//                 service.category?._id ||
//                 service.category

//             if (
//                 filterCategory &&
//                 String(categoryId) !== String(filterCategory)
//             ) {
//                 return false
//             }

//             const subcategoryId =
//                 service.subcategory?._id ||
//                 service.subcategory

//             if (
//                 filterSubcategory &&
//                 String(subcategoryId) !== String(filterSubcategory)
//             ) {
//                 return false
//             }

//             return true
//         }

//         // Backend uploads to Cloudinary in the background, so the API response
//         // does not contain the new image URLs yet. Poll this one service until
//         // the uploaded media is saved, then swap local previews for real URLs.
//         const syncUploadedMedia = (serviceId, attempt = 0) => {

//             setTimeout(async () => {

//                 try {

//                     const result = await request(
//                         `${serviceApi}/${serviceId}`
//                     )

//                     const latest =
//                         result?.data &&
//                             typeof result.data === 'object'
//                             ? result.data
//                             : {}

//                     const latestImages =
//                         Array.isArray(latest.images)
//                             ? latest.images
//                             : []

//                     const latestThumbnailUrl =
//                         latest.thumbnail?.url || ''

//                     const imagesReady =
//                         uploadedImageCount === 0 ||
//                         latestImages.length >= expectedImageCount

//                     const thumbnailReady =
//                         !hadThumbnailFile ||
//                         (
//                             latestThumbnailUrl &&
//                             latestThumbnailUrl !== oldThumbnailUrl
//                         )

//                     if (imagesReady && thumbnailReady) {

//                         setServices((current) =>
//                             current.map((service) =>
//                                 service._id === serviceId
//                                     ? {
//                                         ...service,
//                                         images: latestImages,
//                                         thumbnail:
//                                             latest.thumbnail?.url
//                                                 ? latest.thumbnail
//                                                 : service.thumbnail
//                                     }
//                                     : service
//                             )
//                         )

//                         releasePreviews()
//                         return
//                     }

//                 } catch (syncError) {

//                     console.error(
//                         'SYNC MEDIA ERROR:',
//                         syncError
//                     )
//                 }

//                 if (attempt < 14) {
//                     syncUploadedMedia(serviceId, attempt + 1)
//                 }

//             }, 2000)
//         }

//         // Invalidate every GET that was already in flight.
//         mutationVersionRef.current += 1
//         pendingMutationsRef.current += 1

//         const mutationToken = mutationVersionRef.current

//         if (isEdit) {
//             rowMutationRef.current.set(id, mutationToken)
//         } else {
//             rowMutationRef.current.set(tempId, mutationToken)
//         }

//         // ========================================================
//         // INSTANT UI UPDATE
//         // ========================================================

//         if (isEdit) {

//             setServices((current) => {

//                 const exists = current.some(
//                     (service) => service._id === id
//                 )

//                 if (!matchesCurrentFilters(optimisticService)) {
//                     return current.filter(
//                         (service) => service._id !== id
//                     )
//                 }

//                 if (!exists) {
//                     return [optimisticService, ...current]
//                 }

//                 return current.map((service) =>
//                     service._id === id
//                         ? optimisticService
//                         : service
//                 )
//             })

//         } else if (matchesCurrentFilters(optimisticService)) {

//             setServices((current) => [
//                 optimisticService,
//                 ...current
//             ])
//         }

//         setFormOpen(false)
//         resetForm()

//         // Same behavior as Category: success is shown immediately.
//         showSuccess(
//             isEdit
//                 ? 'Service Updated'
//                 : 'Service Created',
//             isEdit
//                 ? 'Service updated successfully.'
//                 : 'Service created successfully.'
//         )

//         const hasFiles = Boolean(
//             thumbnailFile || imageFiles.length > 0
//         )

//         const formData = new FormData()

//         formData.append('category', selectedCategory)
//         formData.append('subcategory', selectedSubcategory)
//         formData.append('title', form.title.trim())
//         formData.append('slug', form.slug.trim())
//         formData.append(
//             'smallDescription',
//             form.smallDescription.trim()
//         )
//         formData.append('longDescription', form.longDescription)
//         formData.append('tabs', JSON.stringify(form.tabs))

//         formData.append(
//             'translatorInfo',
//             JSON.stringify({
//                 numberOfTranslators:
//                     Number(form.numberOfTranslators) || 0,
//                 rating: {
//                     average:
//                         Number(form.ratingAverage) || 0,
//                     totalReviews:
//                         Number(form.totalReviews) || 0
//                 }
//             })
//         )

//         formData.append(
//             'delivery',
//             JSON.stringify({
//                 value: Number(form.deliveryValue) || 1,
//                 unit: form.deliveryUnit
//             })
//         )

//         formData.append(
//             'purchaseModes',
//             JSON.stringify({
//                 fixed: Boolean(form.purchaseFixed),
//                 fileUpload: Boolean(form.purchaseFileUpload)
//             })
//         )

//         formData.append(
//             'startingPrice',
//             String(Number(form.startingPrice) || 0)
//         )
//         formData.append(
//             'startingPriceCurrency',
//             form.startingPriceCurrency.toUpperCase()
//         )

//         formData.append(
//             'discount',
//             JSON.stringify({
//                 enabled: Boolean(form.discountEnabled),
//                 type: form.discountType,
//                 value: Number(form.discountValue) || 0,
//                 currency: form.discountCurrency.toUpperCase()
//             })
//         )

//         formData.append('status', form.status)
//         formData.append(
//             'sortOrder',
//             String(Number(form.sortOrder) || 0)
//         )
//         formData.append(
//             'isFeatured',
//             String(Boolean(form.isFeatured))
//         )

//         if (existingThumbnail?.url) {
//             formData.append(
//                 'existingThumbnail',
//                 JSON.stringify(existingThumbnail)
//             )
//         }

//         // Always send the kept images list on edit (even when empty).
//         if (isEdit) {
//             formData.append(
//                 'existingImages',
//                 JSON.stringify(existingImages)
//             )
//         }

//         if (thumbnailFile) {
//             formData.append('thumbnail', thumbnailFile)
//         }

//         imageFiles.forEach((file) => {
//             formData.append('images', file)
//         })

//         const serviceIdPart = isEdit ? `/${id}` : ''

//         const queryParams = new URLSearchParams({
//             category: selectedCategory,
//             subcategory: selectedSubcategory
//         })

//         const url =
//             `${serviceApi}${serviceIdPart}?${queryParams.toString()}`

//         const body = hasFiles
//             ? formData
//             : JSON.stringify({
//                 category: selectedCategory,
//                 subcategory: selectedSubcategory,
//                 title: form.title.trim(),
//                 slug: form.slug.trim(),
//                 smallDescription: form.smallDescription.trim(),
//                 longDescription: form.longDescription,
//                 tabs: form.tabs,
//                 translatorInfo: {
//                     numberOfTranslators:
//                         Number(form.numberOfTranslators) || 0,
//                     rating: {
//                         average: Number(form.ratingAverage) || 0,
//                         totalReviews:
//                             Number(form.totalReviews) || 0
//                     }
//                 },
//                 delivery: {
//                     value: Number(form.deliveryValue) || 1,
//                     unit: form.deliveryUnit
//                 },
//                 purchaseModes: {
//                     fixed: Boolean(form.purchaseFixed),
//                     fileUpload: Boolean(form.purchaseFileUpload)
//                 },
//                 startingPrice:
//                     Number(form.startingPrice) || 0,
//                 startingPriceCurrency:
//                     form.startingPriceCurrency.toUpperCase(),
//                 discount: {
//                     enabled: Boolean(form.discountEnabled),
//                     type: form.discountType,
//                     value: Number(form.discountValue) || 0,
//                     currency:
//                         form.discountCurrency.toUpperCase()
//                 },
//                 status: form.status,
//                 sortOrder: Number(form.sortOrder) || 0,
//                 isFeatured: Boolean(form.isFeatured),
//                 // Send kept images list on edit (even when empty).
//                 ...(isEdit ? { existingImages } : {})
//             })

//         const options = {
//             method: isEdit ? 'PUT' : 'POST',
//             headers: hasFiles
//                 ? undefined
//                 : { 'Content-Type': 'application/json' },
//             body
//         }

//         // ========================================================
//         // BACKGROUND API — UI does not wait for this.
//         // ========================================================

//         request(url, options)
//             .then((result) => {

//                 const currentMutationToken =
//                     rowMutationRef.current.get(
//                         isEdit ? id : tempId
//                     )

//                 if (currentMutationToken !== mutationToken) {
//                     return
//                 }

//                 const serverService =
//                     result?.data &&
//                         typeof result.data === 'object'
//                         ? result.data
//                         : {}

//                 const realId =
//                     serverService._id ||
//                     optimisticService._id

//                 // The service API may return category/subcategory as raw
//                 // ObjectIds. Keep the populated objects already visible in
//                 // the UI so the row does not turn into "-" until refresh.
//                 //
//                 // Cloudinary upload runs in the background on the server, so
//                 // when files were selected the response still has the OLD
//                 // thumbnail / images. Keep the local previews in that case
//                 // and let syncUploadedMedia swap in the real URLs.
//                 const finalService = {
//                     ...optimisticService,
//                     ...serverService,
//                     _id: realId,
//                     category:
//                         serverService.category &&
//                             typeof serverService.category === 'object'
//                             ? serverService.category
//                             : optimisticService.category,
//                     subcategory:
//                         serverService.subcategory &&
//                             typeof serverService.subcategory === 'object'
//                             ? serverService.subcategory
//                             : optimisticService.subcategory,
//                     thumbnail:
//                         hadThumbnailFile
//                             ? optimisticService.thumbnail
//                             : (
//                                 serverService.thumbnail?.url
//                                     ? serverService.thumbnail
//                                     : optimisticService.thumbnail
//                             ),
//                     images:
//                         uploadedImageCount > 0
//                             ? [...keptImages, ...newImagePreviews]
//                             : (
//                                 Array.isArray(serverService.images)
//                                     ? serverService.images
//                                     : optimisticService.images
//                             ),
//                     _pending: false
//                 }

//                 setServices((current) => {

//                     if (isEdit) {

//                         if (!matchesCurrentFilters(finalService)) {
//                             return current.filter(
//                                 (service) => service._id !== id
//                             )
//                         }

//                         return current.map((service) =>
//                             service._id === id
//                                 ? finalService
//                                 : service
//                         )
//                     }

//                     return current.map((service) =>
//                         service._id === tempId
//                             ? finalService
//                             : service
//                     )
//                 })

//                 if (uploadedImageCount > 0 || hadThumbnailFile) {
//                     syncUploadedMedia(realId)
//                 }
//             })
//             .catch((error) => {

//                 const currentMutationToken =
//                     rowMutationRef.current.get(
//                         isEdit ? id : tempId
//                     )

//                 if (currentMutationToken !== mutationToken) {
//                     return
//                 }

//                 console.error(
//                     'SERVICE SAVE ERROR:',
//                     error
//                 )

//                 releasePreviews()

//                 // Roll back exactly the row that was changed.
//                 if (isEdit) {

//                     setServices((current) => {

//                         if (!previous) {
//                             return current
//                         }

//                         const exists = current.some(
//                             (service) => service._id === id
//                         )

//                         if (exists) {
//                             return current.map((service) =>
//                                 service._id === id
//                                     ? previous
//                                     : service
//                             )
//                         }

//                         const copy = [...current]
//                         copy.splice(
//                             Math.min(
//                                 Math.max(previousIndex, 0),
//                                 copy.length
//                             ),
//                             0,
//                             previous
//                         )
//                         return copy
//                     })

//                 } else {

//                     setServices((current) =>
//                         current.filter(
//                             (service) => service._id !== tempId
//                         )
//                     )
//                 }

//                 showError(
//                     'Save Failed',
//                     error.message
//                 )
//             })
//             .finally(() => {

//                 const currentMutationToken =
//                     rowMutationRef.current.get(
//                         isEdit ? id : tempId
//                     )

//                 if (currentMutationToken === mutationToken) {
//                     rowMutationRef.current.delete(
//                         isEdit ? id : tempId
//                     )
//                 }

//                 pendingMutationsRef.current = Math.max(
//                     0,
//                     pendingMutationsRef.current - 1
//                 )

//                 // Local previews are released inside syncUploadedMedia
//                 // once the real uploaded URLs are available.
//             })
//     }


//     // ============================================================
//     // DELETE / ARCHIVE
//     // ============================================================

//     const handleDelete = async (service) => {

//         const result =
//             await Swal.fire({
//                 title: 'Archive Service?',
//                 text: `"${service.title}" will be archived.`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#dc2626',
//                 cancelButtonColor: '#64748b',
//                 confirmButtonText: 'Yes, Archive',
//                 cancelButtonText: 'Cancel'
//             })

//         if (!result.isConfirmed) {
//             return
//         }

//         const index = services.findIndex(
//             (item) => item._id === service._id
//         )

//         const removed =
//             index >= 0
//                 ? services[index]
//                 : null

//         if (!removed) {
//             return
//         }

//         mutationVersionRef.current += 1
//         pendingMutationsRef.current += 1

//         const mutationToken = mutationVersionRef.current
//         rowMutationRef.current.set(
//             service._id,
//             mutationToken
//         )

//         // Remove immediately — exactly like Category.
//         if (filterStatus !== 'archived') {
//             setServices((current) =>
//                 current.filter(
//                     (item) => item._id !== service._id
//                 )
//             )
//         }

//         showSuccess(
//             'Archived',
//             'Service archived successfully.'
//         )

//         request(
//             `${serviceApi}/${service._id}`,
//             {
//                 method: 'DELETE'
//             }
//         )
//             .catch((error) => {

//                 if (
//                     rowMutationRef.current.get(service._id) !==
//                     mutationToken
//                 ) {
//                     return
//                 }

//                 console.error(
//                     'DELETE SERVICE ERROR:',
//                     error
//                 )

//                 // Roll back the deleted row at its original position.
//                 if (filterStatus !== 'archived') {
//                     setServices((current) => {
//                         const copy = [...current]

//                         if (!copy.some(
//                             (item) => item._id === removed._id
//                         )) {
//                             copy.splice(
//                                 Math.min(index, copy.length),
//                                 0,
//                                 removed
//                             )
//                         }

//                         return copy
//                     })
//                 }

//                 showError(
//                     'Delete Failed',
//                     error.message
//                 )
//             })
//             .finally(() => {
//                 if (
//                     rowMutationRef.current.get(service._id) ===
//                     mutationToken
//                 ) {
//                     rowMutationRef.current.delete(service._id)
//                 }

//                 pendingMutationsRef.current = Math.max(
//                     0,
//                     pendingMutationsRef.current - 1
//                 )
//             })
//     }


//     return (

//         <div className="service-page">


//             {/* ====================================================
//                 HEADER
//             ==================================================== */}

//             <div className="service-page-header">

//                 <div>

//                     <h1 className="service-page-title">
//                         Services
//                     </h1>

//                     <p className="service-page-description">
//                         Manage translation services,
//                         pricing modes and availability.
//                     </p>

//                 </div>


//                 <button
//                     type="button"
//                     className="btn btn-primary service-add-btn"
//                     onClick={openCreate}
//                 >

//                     <i className="fa-solid fa-plus me-2"></i>

//                     Add Service

//                 </button>

//             </div>


//             {/* ====================================================
//                 CREATE / EDIT FORM
//             ==================================================== */}

//             {formOpen && (

//                 <div className="card service-form-card">

//                     <div className="card-header">

//                         <div>

//                             <h2>
//                                 {editingId
//                                     ? 'Edit Service'
//                                     : 'Create Service'}
//                             </h2>

//                             <p>
//                                 Add complete service information.
//                             </p>

//                         </div>


//                         <button
//                             type="button"
//                             className="btn btn-light"
//                             onClick={() => {
//                                 setFormOpen(false)
//                                 resetForm()
//                             }}
//                         >

//                             <i className="fa-solid fa-xmark"></i>

//                         </button>

//                     </div>


//                     <form onSubmit={handleSubmit}>

//                         <div className="card-body">


//                             {/* ==================================================
//                                 BASIC INFORMATION
//                             ================================================== */}

//                             <div className="service-section">

//                                 <h3>
//                                     Basic Information
//                                 </h3>


//                                 <div className="row g-3">


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Category *
//                                         </label>

//                                         <select
//                                             required
//                                             className="form-select"
//                                             value={form.category}
//                                             onChange={(event) =>
//                                                 handleFormCategory(
//                                                     event.target.value
//                                                 )
//                                             }
//                                         >

//                                             <option value="">
//                                                 Select Category
//                                             </option>

//                                             {categories.map(
//                                                 (category) => (

//                                                     <option
//                                                         key={
//                                                             category._id
//                                                         }
//                                                         value={
//                                                             category._id
//                                                         }
//                                                     >
//                                                         {
//                                                             category.categoryName
//                                                         }
//                                                     </option>

//                                                 )
//                                             )}

//                                         </select>

//                                     </div>


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Subcategory *
//                                         </label>

//                                         <select
//                                             required
//                                             className="form-select"
//                                             value={form.subcategory}
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'subcategory',
//                                                     event.target.value
//                                                 )
//                                             }
//                                             disabled={
//                                                 !form.category
//                                             }
//                                         >

//                                             <option value="">
//                                                 Select Subcategory
//                                             </option>

//                                             {formSubcategories.map(
//                                                 (item) => (

//                                                     <option
//                                                         key={
//                                                             item._id
//                                                         }
//                                                         value={
//                                                             item._id
//                                                         }
//                                                     >
//                                                         {
//                                                             item.subcategoryName
//                                                         }
//                                                     </option>

//                                                 )
//                                             )}

//                                         </select>

//                                     </div>


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Service Title
//                                         </label>

//                                         <input
//                                             required
//                                             type="text"
//                                             className="form-control"
//                                             value={form.title}
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'title',
//                                                     event.target.value
//                                                 )
//                                             }
//                                             placeholder="Professional Banking Translation"
//                                         />

//                                     </div>


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Slug
//                                         </label>

//                                         <input
//                                             required
//                                             type="text"
//                                             className="form-control"
//                                             value={form.slug}
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'slug',
//                                                     event.target.value
//                                                 )
//                                             }
//                                             placeholder="professional-banking-translation"
//                                         />

//                                     </div>


//                                     <div className="col-lg-12 col-md-12 col-sm-12">

//                                         <label className="form-label">
//                                             Small Description
//                                         </label>

//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={
//                                                 form.smallDescription
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'smallDescription',
//                                                     event.target.value
//                                                 )
//                                             }
//                                             placeholder="Short service description"
//                                         />

//                                     </div>


//                                     <div className="col-lg-12 col-md-12 col-sm-12">

//                                         <label className="form-label">
//                                             Long Description
//                                         </label>

//                                         <ReactQuill
//                                             theme="snow"
//                                             value={form.longDescription || ''}
//                                             onChange={(value) =>
//                                                 updateForm(
//                                                     'longDescription',
//                                                     value
//                                                 )
//                                             }
//                                             placeholder="Complete service description..."
//                                         />

//                                     </div>

//                                 </div>

//                             </div>


//                             {/* ==================================================
//                                 TABS
//                             ================================================== */}

//                             <div className="service-section p-2">

//                                 <div className="service-section-heading">
//                                     <h3>
//                                         Service Tabs
//                                     </h3>
//                                 </div>

//                                 <div className="d-flex gap-2 mb-3">

//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={newTabText}
//                                         onChange={(event) =>
//                                             setNewTabText(event.target.value)
//                                         }
//                                         onKeyDown={handleNewTabKeyDown}
//                                         placeholder="Type tab name and press Enter..."
//                                     />

//                                     <button
//                                         type="button"
//                                         className="btn btn-primary px-4"
//                                         onClick={() => addTab()}
//                                     >
//                                         <i className="fa-solid fa-plus me-1"></i>
//                                         Add Tab
//                                     </button>

//                                 </div>

//                                 {form.tabs.length > 0 && (
//                                     <div
//                                         className="d-flex align-items-center gap-2 flex-wrap mb-3"
//                                         style={{
//                                             borderBottom: '1px solid #dee2e6',
//                                             paddingBottom: '12px'
//                                         }}
//                                     >

//                                         {form.tabs.map((tab, index) => (
//                                             <div
//                                                 key={`service-tab-${index}`}
//                                                 className="d-flex align-items-center gap-1"
//                                             >
//                                                 <button
//                                                     type="button"
//                                                     onClick={() =>
//                                                         setActiveTabIndex(index)
//                                                     }
//                                                     className={
//                                                         activeTabIndex === index
//                                                             ? 'btn btn-primary rounded-pill px-4'
//                                                             : 'btn btn-outline-primary rounded-pill px-4'
//                                                     }
//                                                 >
//                                                     {typeof tab === 'string' ? tab : (tab?.title?.trim() || `Tab ${index + 1}`)}
//                                                 </button>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-sm btn-outline-danger rounded-circle"
//                                                     onClick={() => removeTab(index)}
//                                                     title="Remove tab"
//                                                     style={{ width: '32px', height: '32px', padding: 0 }}
//                                                 >
//                                                     <i className="fa-solid fa-xmark"></i>
//                                                 </button>
//                                             </div>
//                                         ))}

//                                     </div>
//                                 )}

//                                 {form.tabs.length === 0 && (
//                                     <div className="border rounded p-4 text-center text-muted">
//                                         Type a tab name above and press <strong>Enter</strong> to create a tab.
//                                     </div>
//                                 )}

//                             </div>


//                             <div className="service-section">

//                                 <h3>
//                                     Translator Information
//                                 </h3>


//                                 <div className="row g-3">

//                                     <div className="col-lg-4 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Number of Translators
//                                         </label>

//                                         <input
//                                             type="number"
//                                             min="0"
//                                             className="form-control"
//                                             value={
//                                                 form.numberOfTranslators
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'numberOfTranslators',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         />

//                                     </div>


//                                     <div className="col-lg-4 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Rating Average
//                                         </label>

//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="5"
//                                             step="0.1"
//                                             className="form-control"
//                                             value={
//                                                 form.ratingAverage
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'ratingAverage',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         />

//                                     </div>


//                                     <div className="col-lg-4 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Total Reviews
//                                         </label>

//                                         <input
//                                             type="number"
//                                             min="0"
//                                             className="form-control"
//                                             value={
//                                                 form.totalReviews
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'totalReviews',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         />

//                                     </div>

//                                 </div>

//                             </div>


//                             {/* ==================================================
//                                 DELIVERY
//                             ================================================== */}

//                             <div className="service-section">

//                                 <h3>
//                                     Delivery
//                                 </h3>


//                                 <div className="row g-3">

//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Delivery Value
//                                         </label>

//                                         <input
//                                             type="number"
//                                             min="1"
//                                             className="form-control"
//                                             value={
//                                                 form.deliveryValue
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'deliveryValue',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         />

//                                     </div>


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Delivery Unit
//                                         </label>

//                                         <select
//                                             className="form-select"
//                                             value={
//                                                 form.deliveryUnit
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'deliveryUnit',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         >

//                                             <option value="hour">
//                                                 Hour
//                                             </option>

//                                             <option value="day">
//                                                 Day
//                                             </option>

//                                             <option value="business_day">
//                                                 Business Day
//                                             </option>

//                                         </select>

//                                     </div>

//                                 </div>

//                             </div>


//                             {/* ==================================================
//                                 PURCHASE MODES
//                             ================================================== */}

//                             <div className="service-section">

//                                 <h3>
//                                     Purchase Modes
//                                 </h3>


//                                 <div className="row g-3">

//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <div className="service-checkbox-card">

//                                             <input
//                                                 type="checkbox"
//                                                 className="form-check-input"
//                                                 checked={
//                                                     form.purchaseFixed
//                                                 }
//                                                 onChange={(event) =>
//                                                     updateForm(
//                                                         'purchaseFixed',
//                                                         event.target.checked
//                                                     )
//                                                 }
//                                                 id="purchaseFixed"
//                                             />

//                                             <label
//                                                 htmlFor="purchaseFixed"
//                                             >
//                                                 <strong>
//                                                     Fixed Purchase
//                                                 </strong>

//                                                 <small>
//                                                     Customer purchases a predefined service.
//                                                 </small>

//                                             </label>

//                                         </div>

//                                     </div>


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <div className="service-checkbox-card">

//                                             <input
//                                                 type="checkbox"
//                                                 className="form-check-input"
//                                                 checked={
//                                                     form.purchaseFileUpload
//                                                 }
//                                                 onChange={(event) =>
//                                                     updateForm(
//                                                         'purchaseFileUpload',
//                                                         event.target.checked
//                                                     )
//                                                 }
//                                                 id="purchaseFileUpload"
//                                             />

//                                             <label
//                                                 htmlFor="purchaseFileUpload"
//                                             >
//                                                 <strong>
//                                                     File Upload
//                                                 </strong>

//                                                 <small>
//                                                     Customer uploads document for translation.
//                                                 </small>

//                                             </label>

//                                         </div>

//                                     </div>

//                                 </div>

//                             </div>


//                             {/* ==================================================
//                                 PRICE
//                             ================================================== */}

//                             <div className="service-section">

//                                 <h3>
//                                     Starting Price
//                                 </h3>


//                                 <div className="row g-3">

//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Starting Price (cents)
//                                         </label>

//                                         <input
//                                             type="number"
//                                             min="0"
//                                             className="form-control"
//                                             value={
//                                                 form.startingPrice
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'startingPrice',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         />

//                                         <small className="text-muted">
//                                             Example: $50 = 5000 cents.
//                                         </small>

//                                     </div>


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Currency
//                                         </label>

//                                         <select
//                                             className="form-select"
//                                             value={
//                                                 form.startingPriceCurrency
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'startingPriceCurrency',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         >

//                                             <option value="USD">
//                                                 USD
//                                             </option>

//                                             <option value="GBP">
//                                                 GBP
//                                             </option>

//                                             <option value="EUR">
//                                                 EUR
//                                             </option>

//                                             <option value="CAD">
//                                                 CAD
//                                             </option>

//                                             <option value="INR">
//                                                 INR
//                                             </option>

//                                         </select>

//                                     </div>

//                                 </div>

//                                 <div className="row g-3 mt-1">

//                                     <div className="col-lg-3 col-md-6 col-sm-12">

//                                         <div className="form-check form-switch mt-4">
//                                             <input
//                                                 type="checkbox"
//                                                 className="form-check-input"
//                                                 id="discountEnabled"
//                                                 checked={form.discountEnabled}
//                                                 onChange={(event) =>
//                                                     updateForm('discountEnabled', event.target.checked)
//                                                 }
//                                             />

//                                             <label
//                                                 className="form-check-label"
//                                                 htmlFor="discountEnabled"
//                                             >
//                                                 Enable Discount
//                                             </label>
//                                         </div>

//                                     </div>

//                                     <div className="col-lg-3 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Discount Type
//                                         </label>

//                                         <select
//                                             className="form-select"
//                                             value={form.discountType}
//                                             onChange={(event) =>
//                                                 updateForm('discountType', event.target.value)
//                                             }
//                                             disabled={!form.discountEnabled}
//                                         >
//                                             <option value="percentage">Percentage</option>
//                                             <option value="fixed">Fixed Amount</option>
//                                         </select>

//                                     </div>

//                                     <div className="col-lg-3 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Discount Value
//                                         </label>

//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max={form.discountType === 'percentage' ? '100' : undefined}
//                                             step="0.01"
//                                             className="form-control"
//                                             value={form.discountValue}
//                                             onChange={(event) =>
//                                                 updateForm('discountValue', event.target.value)
//                                             }
//                                             disabled={!form.discountEnabled}
//                                             placeholder={form.discountType === 'percentage' ? '20' : '1500'}
//                                         />

//                                     </div>

//                                     <div className="col-lg-3 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Discount Currency
//                                         </label>

//                                         <select
//                                             className="form-select"
//                                             value={form.discountCurrency}
//                                             onChange={(event) =>
//                                                 updateForm('discountCurrency', event.target.value)
//                                             }
//                                             disabled={!form.discountEnabled || form.discountType !== 'fixed'}
//                                         >
//                                             <option value="USD">USD</option>
//                                             <option value="GBP">GBP</option>
//                                             <option value="EUR">EUR</option>
//                                             <option value="CAD">CAD</option>
//                                             <option value="INR">INR</option>
//                                         </select>

//                                     </div>

//                                 </div>

//                             </div>


//                             {/* ==================================================
//                                 MEDIA
//                             ================================================== */}

//                             <div className="service-section">

//                                 <h3>
//                                     Media
//                                 </h3>

//                                 <div className="row g-3">

//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Thumbnail
//                                         </label>

//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             accept="image/jpeg,image/png,image/webp"
//                                             onChange={handleThumbnailChange}
//                                         />

//                                         <small className="text-muted">
//                                             JPG, PNG or WEBP
//                                         </small>

//                                         {existingThumbnail?.url && !thumbnailFile && (

//                                             <div className="service-existing-image mt-3">

//                                                 <img
//                                                     src={existingThumbnail.url}
//                                                     alt="Current thumbnail"
//                                                 />

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-sm btn-outline-danger"
//                                                     onClick={() =>
//                                                         setExistingThumbnail(null)
//                                                     }
//                                                 >
//                                                     <i className="fa-solid fa-trash me-1"></i>
//                                                     Remove Current
//                                                 </button>

//                                             </div>

//                                         )}

//                                         {thumbnailFile && (

//                                             <div className="service-selected-file mt-2">
//                                                 <i className="fa-solid fa-image me-2"></i>
//                                                 {thumbnailFile.name}
//                                             </div>

//                                         )}

//                                     </div>


//                                     <div className="col-lg-6 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Additional Images
//                                         </label>

//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             accept="image/jpeg,image/png,image/webp"
//                                             multiple
//                                             onChange={handleImagesChange}
//                                         />

//                                         <small className="text-muted">
//                                             You can select multiple images.
//                                         </small>

//                                     </div>


//                                     {existingImages.length > 0 && (

//                                         <div className="col-lg-12 col-md-12 col-sm-12">

//                                             <label className="form-label">
//                                                 Existing Images
//                                             </label>

//                                             <div className="service-image-grid">

//                                                 {existingImages.map(
//                                                     (image, index) => (

//                                                         <div
//                                                             className="service-image-preview"
//                                                             key={`${image.public_id || image.url || index}-${index}`}
//                                                         >

//                                                             {image.url && (

//                                                                 <img
//                                                                     src={image.url}
//                                                                     alt={`Existing ${index + 1}`}
//                                                                 />

//                                                             )}

//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-sm btn-danger"
//                                                                 onClick={() =>
//                                                                     removeExistingImage(index)
//                                                                 }
//                                                                 title="Remove image"
//                                                             >
//                                                                 <i className="fa-solid fa-xmark"></i>
//                                                             </button>

//                                                         </div>

//                                                     )
//                                                 )}

//                                             </div>

//                                         </div>

//                                     )}


//                                     {imageFiles.length > 0 && (

//                                         <div className="col-lg-12 col-md-12 col-sm-12">

//                                             <label className="form-label">
//                                                 Selected Images
//                                             </label>

//                                             <div className="service-selected-files">

//                                                 {imageFiles.map(
//                                                     (file, index) => (

//                                                         <div
//                                                             className="service-selected-file"
//                                                             key={`${file.name}-${file.lastModified}-${index}`}
//                                                         >

//                                                             <i className="fa-solid fa-image me-2"></i>

//                                                             <span>
//                                                                 {file.name}
//                                                             </span>

//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-sm btn-outline-danger ms-auto"
//                                                                 onClick={() =>
//                                                                     removeSelectedImage(index)
//                                                                 }
//                                                             >
//                                                                 <i className="fa-solid fa-xmark"></i>
//                                                             </button>

//                                                         </div>

//                                                     )
//                                                 )}

//                                             </div>

//                                         </div>

//                                     )}

//                                 </div>

//                             </div>


//                             {/* ==================================================
//                                 STATUS
//                             ================================================== */}

//                             <div className="service-section">

//                                 <h3>
//                                     Publishing
//                                 </h3>


//                                 <div className="row g-3">

//                                     <div className="col-lg-4 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Status
//                                         </label>

//                                         <select
//                                             className="form-select"
//                                             value={
//                                                 form.status
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'status',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         >

//                                             <option value="draft">
//                                                 Draft
//                                             </option>

//                                             <option value="active">
//                                                 Active
//                                             </option>

//                                             <option value="inactive">
//                                                 Inactive
//                                             </option>

//                                             <option value="archived">
//                                                 Archived
//                                             </option>

//                                         </select>

//                                     </div>


//                                     <div className="col-lg-4 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Sort Order
//                                         </label>

//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={
//                                                 form.sortOrder
//                                             }
//                                             onChange={(event) =>
//                                                 updateForm(
//                                                     'sortOrder',
//                                                     event.target.value
//                                                 )
//                                             }
//                                         />

//                                     </div>


//                                     <div className="col-lg-4 col-md-6 col-sm-12">

//                                         <label className="form-label">
//                                             Featured
//                                         </label>

//                                         <div className="form-check form-switch mt-2">

//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 checked={
//                                                     form.isFeatured
//                                                 }
//                                                 onChange={(event) =>
//                                                     updateForm(
//                                                         'isFeatured',
//                                                         event.target.checked
//                                                     )
//                                                 }
//                                             />

//                                             <label className="form-check-label">
//                                                 Show as featured
//                                             </label>

//                                         </div>

//                                     </div>

//                                 </div>

//                             </div>

//                         </div>


//                         {/* ==================================================
//                             FORM FOOTER
//                         ================================================== */}

//                         <div className="card-footer service-form-footer">

//                             <button
//                                 type="button"
//                                 className="btn btn-light"
//                                 onClick={() => {

//                                     setFormOpen(false)
//                                     resetForm()

//                                 }}
//                             >
//                                 Cancel
//                             </button>


//                             <button
//                                 type="submit"
//                                 className="btn btn-primary"
//                             >

//                                 <i className="fa-solid fa-check me-2"></i>

//                                 {editingId
//                                     ? 'Update Service'
//                                     : 'Create Service'}

//                             </button>

//                         </div>

//                     </form>

//                 </div>

//             )}


//             {/* ====================================================
//                 FILTER
//             ==================================================== */}

//             <div className="card service-filter-card">

//                 <div className="card-body">

//                     <div className="row g-3">

//                         <div className="col-lg-4 col-md-6 col-sm-12">

//                             <label className="form-label">
//                                 Search Service
//                             </label>

//                             <div className="input-group">

//                                 <span className="input-group-text">
//                                     <i className="fa-solid fa-magnifying-glass"></i>
//                                 </span>

//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={search}
//                                     onChange={(event) =>
//                                         setSearch(
//                                             event.target.value
//                                         )
//                                     }
//                                     placeholder="Search by service name..."
//                                 />

//                             </div>

//                         </div>


//                         <div className="col-lg-3 col-md-6 col-sm-12">

//                             <label className="form-label">
//                                 Category
//                             </label>

//                             <select
//                                 className="form-select"
//                                 value={filterCategory}
//                                 onChange={(event) => {

//                                     setFilterCategory(
//                                         event.target.value
//                                     )

//                                     setFilterSubcategory('')

//                                 }}
//                             >

//                                 <option value="">
//                                     All Categories
//                                 </option>

//                                 {categories.map(
//                                     (category) => (

//                                         <option
//                                             key={
//                                                 category._id
//                                             }
//                                             value={
//                                                 category._id
//                                             }
//                                         >
//                                             {
//                                                 category.categoryName
//                                             }
//                                         </option>

//                                     )
//                                 )}

//                             </select>

//                         </div>


//                         <div className="col-lg-3 col-md-6 col-sm-12">

//                             <label className="form-label">
//                                 Subcategory
//                             </label>

//                             <select
//                                 className="form-select"
//                                 value={
//                                     filterSubcategory
//                                 }
//                                 onChange={(event) =>
//                                     setFilterSubcategory(
//                                         event.target.value
//                                     )
//                                 }
//                                 disabled={
//                                     !filterCategory
//                                 }
//                             >

//                                 <option value="">
//                                     All Subcategories
//                                 </option>

//                                 {availableSubcategories.map(
//                                     (item) => (

//                                         <option
//                                             key={
//                                                 item._id
//                                             }
//                                             value={
//                                                 item._id
//                                             }
//                                         >
//                                             {
//                                                 item.subcategoryName
//                                             }
//                                         </option>

//                                     )
//                                 )}

//                             </select>

//                         </div>


//                         <div className="col-lg-2 col-md-6 col-sm-12">

//                             <label className="form-label">
//                                 Status
//                             </label>

//                             <select
//                                 className="form-select"
//                                 value={
//                                     filterStatus
//                                 }
//                                 onChange={(event) =>
//                                     setFilterStatus(
//                                         event.target.value
//                                     )
//                                 }
//                             >

//                                 <option value="">
//                                     All
//                                 </option>

//                                 <option value="active">
//                                     Active
//                                 </option>

//                                 <option value="draft">
//                                     Draft
//                                 </option>

//                                 <option value="inactive">
//                                     Inactive
//                                 </option>

//                                 <option value="archived">
//                                     Archived
//                                 </option>

//                             </select>

//                         </div>

//                     </div>

//                 </div>

//             </div>


//             {/* ====================================================
//                 TABLE
//             ==================================================== */}

//             <div className="card service-table-card">

//                 <div className="card-body p-0">

//                     <div className="table-responsive">

//                         <table className="table service-table align-middle mb-0">

//                             <thead>

//                                 <tr>

//                                     <th>
//                                         Service
//                                     </th>

//                                     <th>
//                                         Category
//                                     </th>

//                                     <th>
//                                         Subcategory
//                                     </th>

//                                     <th>
//                                         Purchase Mode
//                                     </th>

//                                     <th>
//                                         Status
//                                     </th>

//                                     <th>
//                                         Featured
//                                     </th>

//                                     <th className="text-end">
//                                         Action
//                                     </th>

//                                 </tr>

//                             </thead>


//                             <tbody>

//                                 {visibleServices.length === 0 && (

//                                     <tr>

//                                         <td
//                                             colSpan="7"
//                                             className="text-center py-5"
//                                         >

//                                             <i className="fa-solid fa-inbox fs-2 text-muted"></i>

//                                             <div className="mt-2">
//                                                 No services found.
//                                             </div>

//                                         </td>

//                                     </tr>

//                                 )}


//                                 {visibleServices.map(
//                                     (service) => (

//                                         <tr
//                                             key={
//                                                 service._id
//                                             }
//                                         >

//                                             <td>

//                                                 <div className="service-info">

//                                                     <div className="service-image">

//                                                         {service.thumbnail?.url ? (

//                                                             <img
//                                                                 src={
//                                                                     service.thumbnail.url
//                                                                 }
//                                                                 alt={
//                                                                     service.title
//                                                                 }
//                                                             />

//                                                         ) : (

//                                                             <i className="fa-solid fa-language"></i>

//                                                         )}

//                                                     </div>


//                                                     <div>

//                                                         <h6 className="service-name">
//                                                             {
//                                                                 service.title
//                                                             }
//                                                         </h6>

//                                                         <span className="service-description">
//                                                             {
//                                                                 service.smallDescription ||
//                                                                 'No description'
//                                                             }
//                                                         </span>

//                                                     </div>

//                                                 </div>

//                                             </td>


//                                             <td>
//                                                 {
//                                                     service.category
//                                                         ?.categoryName ||
//                                                     '-'
//                                                 }
//                                             </td>


//                                             <td>
//                                                 {
//                                                     service.subcategory
//                                                         ?.subcategoryName ||
//                                                     '-'
//                                                 }
//                                             </td>


//                                             <td>

//                                                 <div className="service-mode">

//                                                     {service.purchaseModes?.fixed && (

//                                                         <span className="badge bg-light text-dark">
//                                                             Fixed
//                                                         </span>

//                                                     )}

//                                                     {service.purchaseModes?.fileUpload && (

//                                                         <span className="badge bg-light text-dark">
//                                                             File Upload
//                                                         </span>

//                                                     )}

//                                                 </div>

//                                             </td>


//                                             <td>

//                                                 {service.status === 'active' && (

//                                                     <span className="badge bg-success-subtle text-success">
//                                                         Active
//                                                     </span>

//                                                 )}

//                                                 {service.status === 'draft' && (

//                                                     <span className="badge bg-warning-subtle text-warning">
//                                                         Draft
//                                                     </span>

//                                                 )}

//                                                 {service.status === 'inactive' && (

//                                                     <span className="badge bg-secondary-subtle text-secondary">
//                                                         Inactive
//                                                     </span>

//                                                 )}

//                                                 {service.status === 'archived' && (

//                                                     <span className="badge bg-danger-subtle text-danger">
//                                                         Archived
//                                                     </span>

//                                                 )}

//                                             </td>


//                                             <td>

//                                                 {service.isFeatured ? (

//                                                     <span className="badge bg-warning-subtle text-warning">
//                                                         Yes
//                                                     </span>

//                                                 ) : (

//                                                     <span className="badge bg-light text-dark">
//                                                         No
//                                                     </span>

//                                                 )}

//                                             </td>


//                                             <td className="text-end">

//                                                 <div className="service-actions">

//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-sm btn-light"
//                                                         title="Edit"
//                                                         onClick={() =>
//                                                             openEdit(
//                                                                 service
//                                                             )
//                                                         }
//                                                     >

//                                                         <i className="fa-solid fa-pen"></i>

//                                                     </button>


//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-sm btn-light text-danger"
//                                                         title="Archive"
//                                                         onClick={() =>
//                                                             handleDelete(
//                                                                 service
//                                                             )
//                                                         }
//                                                     >

//                                                         <i className="fa-solid fa-trash"></i>

//                                                     </button>

//                                                 </div>

//                                             </td>

//                                         </tr>

//                                     )
//                                 )}

//                             </tbody>

//                         </table>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     )

// }


// export default Page





















































'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Swal from 'sweetalert2'
import 'react-quill-new/dist/quill.snow.css'
import './Service.css'

const API = 'http://localhost:8000/api'

const serviceApi = `${API}/services`
const categoryApi = `${API}/categories`
const subcategoryApi = `${API}/subcategories`

const ReactQuill = dynamic(
    () => import('react-quill-new'),
    { ssr: false }
)

const request = async (url, options = {}) => {

    // const response = await fetch(url, options)
    const response = await fetch(url, { ...options, credentials: 'include' })
    const result = await response.json()

    if (!response.ok || result.success === false) {
        throw new Error(
            result.message || 'Request failed.'
        )
    }

    return result
}


const showSuccess = (title, text) => {

    Swal.fire({
        icon: 'success',
        title,
        text,
        timer: 1300,
        showConfirmButton: false
    })

}


const showError = (title, text) => {

    Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#2563eb'
    })

}


const emptyForm = {

    category: '',
    subcategory: '',

    title: '',
    slug: '',

    smallDescription: '',
    longDescription: '',

    tabs: [],

    numberOfTranslators: 0,

    ratingAverage: 0,
    totalReviews: 0,

    deliveryRange: '1',
    deliveryUnit: 'day',

    images: [],

    purchaseFixed: true,
    purchaseFileUpload: false,

    startingPrice: 0,
    startingPriceCurrency: 'USD',

    discountEnabled: false,
    discountValue: 0,
    discountCurrency: 'USD',

    status: 'draft',

    sortOrder: 0,

    isFeatured: false,

}


const Page = () => {

    const [services, setServices] = useState([])

    const [categories, setCategories] = useState([])

    const [subcategories, setSubcategories] = useState([])

    // Mutations are optimistic: the table updates immediately while the API runs in the background.
    const mutationVersionRef = useRef(0)
    const pendingMutationsRef = useRef(0)
    const rowMutationRef = useRef(new Map())

    const [formOpen, setFormOpen] = useState(false)

    const [editingId, setEditingId] = useState(null)

    const [search, setSearch] = useState('')

    const [filterCategory, setFilterCategory] = useState('')

    const [filterSubcategory, setFilterSubcategory] =
        useState('')

    const [filterStatus, setFilterStatus] =
        useState('')

    const [form, setForm] = useState(emptyForm)

    // Active Service Tab editor
    const [activeTabIndex, setActiveTabIndex] = useState(-1)
    const [newTabText, setNewTabText] = useState('')

    // ============================================================
    // FILE UPLOAD STATE
    // ============================================================

    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [imageFiles, setImageFiles] = useState([])
    const [existingThumbnail, setExistingThumbnail] = useState(null)
    const [existingImages, setExistingImages] = useState([])


    // ============================================================
    // LOAD CATEGORIES
    // ============================================================

    const loadCategories = async () => {

        try {

            const result =
                await request(categoryApi)

            setCategories(
                Array.isArray(result.data)
                    ? result.data
                    : []
            )

        } catch (error) {

            console.error(
                'GET CATEGORIES ERROR:',
                error
            )

            showError(
                'Categories Error',
                error.message
            )
        }
    }


    // ============================================================
    // LOAD SUBCATEGORIES
    // ============================================================

    const loadSubcategories = async () => {

        try {

            const result =
                await request(subcategoryApi)

            setSubcategories(
                Array.isArray(result.data)
                    ? result.data
                    : []
            )

        } catch (error) {

            console.error(
                'GET SUBCATEGORIES ERROR:',
                error
            )

            showError(
                'Subcategories Error',
                error.message
            )
        }
    }


    // ============================================================
    // LOAD SERVICES
    // ============================================================

    const loadServices = async () => {

        const requestVersion = mutationVersionRef.current

        try {

            const params =
                new URLSearchParams()

            if (filterStatus) {
                params.append('status', filterStatus)
            }

            if (filterCategory) {
                params.append('category', filterCategory)
            }

            if (filterSubcategory) {
                params.append('subcategory', filterSubcategory)
            }

            const query = params.toString()

            const url =
                query
                    ? `${serviceApi}?${query}`
                    : serviceApi

            const result = await request(url)

            // Never let an older GET overwrite an optimistic mutation.
            // Also ignore GET responses while a mutation is still pending.
            if (
                requestVersion !== mutationVersionRef.current ||
                pendingMutationsRef.current > 0
            ) {
                return
            }

            const serviceList =
                Array.isArray(result.data)
                    ? result.data
                    : []

            setServices(
                filterStatus === 'archived'
                    ? serviceList
                    : serviceList.filter(
                        (service) => service.status !== 'archived'
                    )
            )

        } catch (error) {

            console.error(
                'GET SERVICES ERROR:',
                error
            )

        }
    }


    // ============================================================
    // INITIAL LOAD
    // ============================================================

    useEffect(() => {

        loadCategories()
        loadSubcategories()

    }, [])


    useEffect(() => {

        loadServices()

    }, [
        filterStatus,
        filterCategory,
        filterSubcategory
    ])


    // ============================================================
    // FILTERED SUBCATEGORIES
    // ============================================================

    const availableSubcategories =
        useMemo(() => {

            if (!filterCategory) {
                return subcategories
            }

            return subcategories.filter(
                (item) => {

                    const categoryId =
                        item.category?._id ||
                        item.category

                    return (
                        categoryId ===
                        filterCategory
                    )
                }
            )

        }, [
            subcategories,
            filterCategory
        ])


    const formSubcategories =
        useMemo(() => {

            if (!form.category) {
                return []
            }

            return subcategories.filter(
                (item) => {

                    const categoryId =
                        item.category?._id ||
                        item.category

                    return (
                        categoryId ===
                        form.category
                    )
                }
            )

        }, [
            subcategories,
            form.category
        ])


    // ============================================================
    // SEARCH
    // ============================================================

    const visibleServices =
        services.filter((service) => {

            if (!search.trim()) {
                return true
            }

            const value =
                search
                    .trim()
                    .toLowerCase()


            return (

                service.title
                    ?.toLowerCase()
                    .includes(value)

                ||

                service.slug
                    ?.toLowerCase()
                    .includes(value)

                ||

                service.category?.categoryName
                    ?.toLowerCase()
                    .includes(value)

                ||

                service.subcategory?.subcategoryName
                    ?.toLowerCase()
                    .includes(value)
            )

        })


    // ============================================================
    // FORM FIELD
    // ============================================================

    const updateForm = (field, value) => {

        setForm((previous) => ({
            ...previous,
            [field]: value
        }))

    }


    // ============================================================
    // CATEGORY CHANGE IN FORM
    // ============================================================

    const handleFormCategory = (value) => {

        setForm((previous) => ({
            ...previous,
            category: value,
            subcategory: ''
        }))

    }


    // ============================================================
    // ADD TAB
    // ============================================================

    const addTab = (text = newTabText) => {

        const title = String(text || '').trim()

        if (!title) return false

        const newTabIndex = form.tabs.length

        setForm((previous) => ({
            ...previous,
            tabs: [
                ...(Array.isArray(previous.tabs) ? previous.tabs : []),
                title
            ]
        }))

        setActiveTabIndex(newTabIndex)
        setNewTabText('')
        return true
    }

    const handleNewTabKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            addTab()
        }
    }


    // ============================================================
    // REMOVE TAB
    // ============================================================

    const removeTab = (index) => {

        setForm((previous) => {

            const nextTabs = previous.tabs.filter(
                (_, tabIndex) => tabIndex !== index
            )

            return {
                ...previous,
                tabs: nextTabs
            }
        })

        setActiveTabIndex((previousIndex) => {
            if (form.tabs.length <= 1) return -1
            if (index < previousIndex) return previousIndex - 1
            if (index === previousIndex) {
                return Math.min(previousIndex, form.tabs.length - 2)
            }
            return previousIndex
        })
    }


    // ============================================================
    // FILE UPLOAD
    // ============================================================

    const handleThumbnailChange = (event) => {
        setThumbnailFile(event.target.files?.[0] || null)
    }

    const handleImagesChange = (event) => {
        setImageFiles(Array.from(event.target.files || []))
    }

    const removeSelectedImage = (index) => {
        setImageFiles((previous) =>
            previous.filter((_, fileIndex) => fileIndex !== index)
        )
    }

    const removeExistingImage = (index) => {
        setExistingImages((previous) =>
            previous.filter((_, imageIndex) => imageIndex !== index)
        )
    }

    // ============================================================
    // RESET FORM
    // ============================================================

    const resetForm = () => {

        setForm({
            ...emptyForm,
            tabs: []
        })

        setActiveTabIndex(-1)
        setNewTabText('')
        setEditingId(null)

        setThumbnailFile(null)
        setImageFiles([])
        setExistingThumbnail(null)
        setExistingImages([])
    }


    // ============================================================
    // OPEN CREATE
    // ============================================================

    const openCreate = () => {

        resetForm()

        setFormOpen(true)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    // ============================================================
    // OPEN EDIT
    // ============================================================

    const openEdit = (service) => {

        setEditingId(service._id)
        setActiveTabIndex(
            Array.isArray(service.tabs) && service.tabs.length > 0 ? 0 : -1
        )

        setForm({

            category:
                service.category?._id ||
                service.category ||
                '',

            subcategory:
                service.subcategory?._id ||
                service.subcategory ||
                '',

            title:
                service.title || '',

            slug:
                service.slug || '',

            smallDescription:
                service.smallDescription || '',

            longDescription:
                service.longDescription || '',

            tabs:
                Array.isArray(service.tabs)
                    ? service.tabs.map((tab) =>
                        typeof tab === 'string'
                            ? tab
                            : (typeof tab?.title === 'string' ? tab.title : '')
                    ).filter(Boolean)
                    : [],

            numberOfTranslators:
                service.translatorInfo
                    ?.numberOfTranslators || 0,

            ratingAverage:
                service.translatorInfo
                    ?.rating?.average || 0,

            totalReviews:
                service.translatorInfo
                    ?.rating?.totalReviews || 0,

            deliveryRange:
                service.delivery?.range ||
                (service.delivery?.value !== undefined
                    ? String(service.delivery.value)
                    : '1'),

            deliveryUnit:
                service.delivery?.unit || 'day',

            images: [],

            purchaseFixed:
                Boolean(
                    service.purchaseModes?.fixed
                ),

            purchaseFileUpload:
                Boolean(
                    service.purchaseModes?.fileUpload
                ),

            startingPrice:
                service.startingPrice || 0,

            startingPriceCurrency:
                service.startingPriceCurrency ||
                'USD',

            discountEnabled:
                Boolean(service.discount?.enabled),


            discountValue:
                service.discount?.value || 0,

            discountCurrency:
                service.discount?.currency ||
                service.startingPriceCurrency ||
                'USD',

            status:
                service.status || 'draft',

            sortOrder:
                service.sortOrder || 0,

            isFeatured:
                Boolean(
                    service.isFeatured
                ),

        })

        setThumbnailFile(null)
        setImageFiles([])

        setExistingThumbnail(
            service.thumbnail?.url
                ? {
                    publicId: service.thumbnail?.publicId || '',
                    url: service.thumbnail.url
                }
                : null
        )

        setExistingImages(
            Array.isArray(service.images)
                ? service.images
                : []
        )

        setFormOpen(true)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    // ============================================================
    // CREATE / UPDATE SERVICE
    // ============================================================

    const handleSubmit = (event) => {

        event.preventDefault()

        if (!form.category) {
            showError(
                'Category Required',
                'Please select a category.'
            )
            return
        }

        if (!form.subcategory) {
            showError(
                'Subcategory Required',
                'Please select a subcategory.'
            )
            return
        }

        if (!form.title || !form.title.trim()) {
            showError(
                'Title Required',
                'Please enter service title.'
            )
            return
        }

        if (!form.slug || !form.slug.trim()) {
            showError(
                'Slug Required',
                'Please enter service slug.'
            )
            return
        }

        const selectedCategory = String(form.category).trim()
        const selectedSubcategory = String(form.subcategory).trim()

        if (!selectedCategory || !selectedSubcategory) {
            showError(
                'Category Required',
                'Please select category and subcategory again.'
            )
            return
        }

        const isEdit = Boolean(editingId)
        const id = editingId

        const previousIndex = isEdit
            ? services.findIndex((service) => service._id === id)
            : -1

        const previous = isEdit && previousIndex >= 0
            ? services[previousIndex]
            : null

        const selectedCategoryObject =
            categories.find(
                (category) => String(category._id) === selectedCategory
            ) || {
                _id: selectedCategory,
                categoryName: '-'
            }

        const selectedSubcategoryObject =
            subcategories.find(
                (subcategory) => String(subcategory._id) === selectedSubcategory
            ) || {
                _id: selectedSubcategory,
                subcategoryName: '-'
            }

        const thumbnailPreviewUrl =
            thumbnailFile
                ? URL.createObjectURL(thumbnailFile)
                : null

        // Local previews of newly selected images so they show instantly.
        const newImagePreviews = imageFiles.map((file) => ({
            url: URL.createObjectURL(file),
            _local: true
        }))

        const keptImages = Array.isArray(existingImages)
            ? [...existingImages]
            : (previous?.images || [])

        const uploadedImageCount = imageFiles.length
        const expectedImageCount = keptImages.length + uploadedImageCount
        const hadThumbnailFile = Boolean(thumbnailFile)
        const oldThumbnailUrl = previous?.thumbnail?.url || ''

        const releasePreviews = () => {
            if (thumbnailPreviewUrl) {
                URL.revokeObjectURL(thumbnailPreviewUrl)
            }
            newImagePreviews.forEach((image) => {
                URL.revokeObjectURL(image.url)
            })
        }

        const tempId = `temp-service-${Date.now()}`

        const optimisticService = {
            ...(previous || {}),
            _id: isEdit ? id : tempId,
            category: selectedCategoryObject,
            subcategory: selectedSubcategoryObject,
            title: form.title.trim(),
            slug: form.slug.trim(),
            smallDescription: form.smallDescription.trim(),
            longDescription: form.longDescription,
            tabs: Array.isArray(form.tabs) ? [...form.tabs] : [],
            translatorInfo: {
                numberOfTranslators:
                    Number(form.numberOfTranslators) || 0,
                rating: {
                    average:
                        Number(form.ratingAverage) || 0,
                    totalReviews:
                        Number(form.totalReviews) || 0
                }
            },
            delivery: {
                range: String(form.deliveryRange || '').trim(),
                unit: form.deliveryUnit
            },
            purchaseModes: {
                fixed: Boolean(form.purchaseFixed),
                fileUpload: Boolean(form.purchaseFileUpload)
            },
            startingPrice: Number(form.startingPrice) || 0,
            startingPriceCurrency:
                form.startingPriceCurrency.toUpperCase(),
            discount: {
                enabled: Boolean(form.discountEnabled),
                value: Number(form.discountValue) || 0,
                currency: form.discountCurrency.toUpperCase()
            },
            status: form.status,
            sortOrder: Number(form.sortOrder) || 0,
            isFeatured: Boolean(form.isFeatured),
            thumbnail: thumbnailPreviewUrl
                ? {
                    ...(previous?.thumbnail || {}),
                    url: thumbnailPreviewUrl
                }
                : (previous?.thumbnail || null),
            images: [...keptImages, ...newImagePreviews],
            _pending: true
        }

        // The current filters must continue to be respected by the optimistic row.
        const matchesCurrentFilters = (service) => {

            if (
                filterStatus &&
                service.status !== filterStatus
            ) {
                return false
            }

            if (
                !filterStatus &&
                service.status === 'archived'
            ) {
                return false
            }

            const categoryId =
                service.category?._id ||
                service.category

            if (
                filterCategory &&
                String(categoryId) !== String(filterCategory)
            ) {
                return false
            }

            const subcategoryId =
                service.subcategory?._id ||
                service.subcategory

            if (
                filterSubcategory &&
                String(subcategoryId) !== String(filterSubcategory)
            ) {
                return false
            }

            return true
        }

        // Backend uploads to Cloudinary in the background, so the API response
        // does not contain the new image URLs yet. Poll this one service until
        // the uploaded media is saved, then swap local previews for real URLs.
        const syncUploadedMedia = (serviceId, attempt = 0) => {

            setTimeout(async () => {

                try {

                    const result = await request(
                        `${serviceApi}/${serviceId}`
                    )

                    const latest =
                        result?.data &&
                            typeof result.data === 'object'
                            ? result.data
                            : {}

                    const latestImages =
                        Array.isArray(latest.images)
                            ? latest.images
                            : []

                    const latestThumbnailUrl =
                        latest.thumbnail?.url || ''

                    const imagesReady =
                        uploadedImageCount === 0 ||
                        latestImages.length >= expectedImageCount

                    const thumbnailReady =
                        !hadThumbnailFile ||
                        (
                            latestThumbnailUrl &&
                            latestThumbnailUrl !== oldThumbnailUrl
                        )

                    if (imagesReady && thumbnailReady) {

                        setServices((current) =>
                            current.map((service) =>
                                service._id === serviceId
                                    ? {
                                        ...service,
                                        images: latestImages,
                                        thumbnail:
                                            latest.thumbnail?.url
                                                ? latest.thumbnail
                                                : service.thumbnail
                                    }
                                    : service
                            )
                        )

                        releasePreviews()
                        return
                    }

                } catch (syncError) {

                    console.error(
                        'SYNC MEDIA ERROR:',
                        syncError
                    )
                }

                if (attempt < 14) {
                    syncUploadedMedia(serviceId, attempt + 1)
                }

            }, 2000)
        }

        // Invalidate every GET that was already in flight.
        mutationVersionRef.current += 1
        pendingMutationsRef.current += 1

        const mutationToken = mutationVersionRef.current

        if (isEdit) {
            rowMutationRef.current.set(id, mutationToken)
        } else {
            rowMutationRef.current.set(tempId, mutationToken)
        }

        // ========================================================
        // INSTANT UI UPDATE
        // ========================================================

        if (isEdit) {

            setServices((current) => {

                const exists = current.some(
                    (service) => service._id === id
                )

                if (!matchesCurrentFilters(optimisticService)) {
                    return current.filter(
                        (service) => service._id !== id
                    )
                }

                if (!exists) {
                    return [optimisticService, ...current]
                }

                return current.map((service) =>
                    service._id === id
                        ? optimisticService
                        : service
                )
            })

        } else if (matchesCurrentFilters(optimisticService)) {

            setServices((current) => [
                optimisticService,
                ...current
            ])
        }

        setFormOpen(false)
        resetForm()

        // Same behavior as Category: success is shown immediately.
        showSuccess(
            isEdit
                ? 'Service Updated'
                : 'Service Created',
            isEdit
                ? 'Service updated successfully.'
                : 'Service created successfully.'
        )

        const hasFiles = Boolean(
            thumbnailFile || imageFiles.length > 0
        )

        const formData = new FormData()

        formData.append('category', selectedCategory)
        formData.append('subcategory', selectedSubcategory)
        formData.append('title', form.title.trim())
        formData.append('slug', form.slug.trim())
        formData.append(
            'smallDescription',
            form.smallDescription.trim()
        )
        formData.append('longDescription', form.longDescription)
        formData.append('tabs', JSON.stringify(form.tabs))

        formData.append(
            'translatorInfo',
            JSON.stringify({
                numberOfTranslators:
                    Number(form.numberOfTranslators) || 0,
                rating: {
                    average:
                        Number(form.ratingAverage) || 0,
                    totalReviews:
                        Number(form.totalReviews) || 0
                }
            })
        )

        formData.append(
            'delivery',
            JSON.stringify({
                range: String(form.deliveryRange || '').trim(),
                unit: form.deliveryUnit
            })
        )

        formData.append(
            'purchaseModes',
            JSON.stringify({
                fixed: Boolean(form.purchaseFixed),
                fileUpload: Boolean(form.purchaseFileUpload)
            })
        )

        formData.append(
            'startingPrice',
            String(Number(form.startingPrice) || 0)
        )
        formData.append(
            'startingPriceCurrency',
            form.startingPriceCurrency.toUpperCase()
        )

        formData.append(
            'discount',
            JSON.stringify({
                enabled: Boolean(form.discountEnabled),
                value: Number(form.discountValue) || 0,
                currency: form.discountCurrency.toUpperCase()
            })
        )

        formData.append('status', form.status)
        formData.append(
            'sortOrder',
            String(Number(form.sortOrder) || 0)
        )
        formData.append(
            'isFeatured',
            String(Boolean(form.isFeatured))
        )

        if (existingThumbnail?.url) {
            formData.append(
                'existingThumbnail',
                JSON.stringify(existingThumbnail)
            )
        }

        // Always send the kept images list on edit (even when empty).
        if (isEdit) {
            formData.append(
                'existingImages',
                JSON.stringify(existingImages)
            )
        }

        if (thumbnailFile) {
            formData.append('thumbnail', thumbnailFile)
        }

        imageFiles.forEach((file) => {
            formData.append('images', file)
        })

        const serviceIdPart = isEdit ? `/${id}` : ''

        const queryParams = new URLSearchParams({
            category: selectedCategory,
            subcategory: selectedSubcategory
        })

        const url =
            `${serviceApi}${serviceIdPart}?${queryParams.toString()}`

        const body = hasFiles
            ? formData
            : JSON.stringify({
                category: selectedCategory,
                subcategory: selectedSubcategory,
                title: form.title.trim(),
                slug: form.slug.trim(),
                smallDescription: form.smallDescription.trim(),
                longDescription: form.longDescription,
                tabs: form.tabs,
                translatorInfo: {
                    numberOfTranslators:
                        Number(form.numberOfTranslators) || 0,
                    rating: {
                        average: Number(form.ratingAverage) || 0,
                        totalReviews:
                            Number(form.totalReviews) || 0
                    }
                },
                delivery: {
                    range: String(form.deliveryRange || '').trim(),
                    unit: form.deliveryUnit
                },
                purchaseModes: {
                    fixed: Boolean(form.purchaseFixed),
                    fileUpload: Boolean(form.purchaseFileUpload)
                },
                startingPrice:
                    Number(form.startingPrice) || 0,
                startingPriceCurrency:
                    form.startingPriceCurrency.toUpperCase(),
                discount: {
                    enabled: Boolean(form.discountEnabled),
                    value: Number(form.discountValue) || 0,
                    currency:
                        form.discountCurrency.toUpperCase()
                },
                status: form.status,
                sortOrder: Number(form.sortOrder) || 0,
                isFeatured: Boolean(form.isFeatured),
                // Send kept images list on edit (even when empty).
                ...(isEdit ? { existingImages } : {})
            })

        const options = {
            method: isEdit ? 'PUT' : 'POST',
            headers: hasFiles
                ? undefined
                : { 'Content-Type': 'application/json' },
            body
        }

        // ========================================================
        // BACKGROUND API — UI does not wait for this.
        // ========================================================

        request(url, options)
            .then((result) => {

                const currentMutationToken =
                    rowMutationRef.current.get(
                        isEdit ? id : tempId
                    )

                if (currentMutationToken !== mutationToken) {
                    return
                }

                const serverService =
                    result?.data &&
                        typeof result.data === 'object'
                        ? result.data
                        : {}

                const realId =
                    serverService._id ||
                    optimisticService._id

                // The service API may return category/subcategory as raw
                // ObjectIds. Keep the populated objects already visible in
                // the UI so the row does not turn into "-" until refresh.
                //
                // Cloudinary upload runs in the background on the server, so
                // when files were selected the response still has the OLD
                // thumbnail / images. Keep the local previews in that case
                // and let syncUploadedMedia swap in the real URLs.
                const finalService = {
                    ...optimisticService,
                    ...serverService,
                    _id: realId,
                    category:
                        serverService.category &&
                            typeof serverService.category === 'object'
                            ? serverService.category
                            : optimisticService.category,
                    subcategory:
                        serverService.subcategory &&
                            typeof serverService.subcategory === 'object'
                            ? serverService.subcategory
                            : optimisticService.subcategory,
                    thumbnail:
                        hadThumbnailFile
                            ? optimisticService.thumbnail
                            : (
                                serverService.thumbnail?.url
                                    ? serverService.thumbnail
                                    : optimisticService.thumbnail
                            ),
                    images:
                        uploadedImageCount > 0
                            ? [...keptImages, ...newImagePreviews]
                            : (
                                Array.isArray(serverService.images)
                                    ? serverService.images
                                    : optimisticService.images
                            ),
                    _pending: false
                }

                setServices((current) => {

                    if (isEdit) {

                        if (!matchesCurrentFilters(finalService)) {
                            return current.filter(
                                (service) => service._id !== id
                            )
                        }

                        return current.map((service) =>
                            service._id === id
                                ? finalService
                                : service
                        )
                    }

                    return current.map((service) =>
                        service._id === tempId
                            ? finalService
                            : service
                    )
                })

                if (uploadedImageCount > 0 || hadThumbnailFile) {
                    syncUploadedMedia(realId)
                }
            })
            .catch((error) => {

                const currentMutationToken =
                    rowMutationRef.current.get(
                        isEdit ? id : tempId
                    )

                if (currentMutationToken !== mutationToken) {
                    return
                }

                console.error(
                    'SERVICE SAVE ERROR:',
                    error
                )

                releasePreviews()

                // Roll back exactly the row that was changed.
                if (isEdit) {

                    setServices((current) => {

                        if (!previous) {
                            return current
                        }

                        const exists = current.some(
                            (service) => service._id === id
                        )

                        if (exists) {
                            return current.map((service) =>
                                service._id === id
                                    ? previous
                                    : service
                            )
                        }

                        const copy = [...current]
                        copy.splice(
                            Math.min(
                                Math.max(previousIndex, 0),
                                copy.length
                            ),
                            0,
                            previous
                        )
                        return copy
                    })

                } else {

                    setServices((current) =>
                        current.filter(
                            (service) => service._id !== tempId
                        )
                    )
                }

                showError(
                    'Save Failed',
                    error.message
                )
            })
            .finally(() => {

                const currentMutationToken =
                    rowMutationRef.current.get(
                        isEdit ? id : tempId
                    )

                if (currentMutationToken === mutationToken) {
                    rowMutationRef.current.delete(
                        isEdit ? id : tempId
                    )
                }

                pendingMutationsRef.current = Math.max(
                    0,
                    pendingMutationsRef.current - 1
                )

                // Local previews are released inside syncUploadedMedia
                // once the real uploaded URLs are available.
            })
    }


    // ============================================================
    // DELETE / ARCHIVE
    // ============================================================

    const handleDelete = async (service) => {

        const result =
            await Swal.fire({
                title: 'Archive Service?',
                text: `"${service.title}" will be archived.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#64748b',
                confirmButtonText: 'Yes, Archive',
                cancelButtonText: 'Cancel'
            })

        if (!result.isConfirmed) {
            return
        }

        const index = services.findIndex(
            (item) => item._id === service._id
        )

        const removed =
            index >= 0
                ? services[index]
                : null

        if (!removed) {
            return
        }

        mutationVersionRef.current += 1
        pendingMutationsRef.current += 1

        const mutationToken = mutationVersionRef.current
        rowMutationRef.current.set(
            service._id,
            mutationToken
        )

        // Remove immediately — exactly like Category.
        if (filterStatus !== 'archived') {
            setServices((current) =>
                current.filter(
                    (item) => item._id !== service._id
                )
            )
        }

        showSuccess(
            'Archived',
            'Service archived successfully.'
        )

        request(
            `${serviceApi}/${service._id}`,
            {
                method: 'DELETE'
            }
        )
            .catch((error) => {

                if (
                    rowMutationRef.current.get(service._id) !==
                    mutationToken
                ) {
                    return
                }

                console.error(
                    'DELETE SERVICE ERROR:',
                    error
                )

                // Roll back the deleted row at its original position.
                if (filterStatus !== 'archived') {
                    setServices((current) => {
                        const copy = [...current]

                        if (!copy.some(
                            (item) => item._id === removed._id
                        )) {
                            copy.splice(
                                Math.min(index, copy.length),
                                0,
                                removed
                            )
                        }

                        return copy
                    })
                }

                showError(
                    'Delete Failed',
                    error.message
                )
            })
            .finally(() => {
                if (
                    rowMutationRef.current.get(service._id) ===
                    mutationToken
                ) {
                    rowMutationRef.current.delete(service._id)
                }

                pendingMutationsRef.current = Math.max(
                    0,
                    pendingMutationsRef.current - 1
                )
            })
    }


    return (

        <div className="service-page">


            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="service-page-header">

                <div>

                    <h1 className="service-page-title">
                        Services
                    </h1>

                    <p className="service-page-description">
                        Manage translation services,
                        pricing modes and availability.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-primary service-add-btn"
                    onClick={openCreate}
                >

                    <i className="fa-solid fa-plus me-2"></i>

                    Add Service

                </button>

            </div>


            {/* ====================================================
                CREATE / EDIT FORM
            ==================================================== */}

            {formOpen && (

                <div className="card service-form-card">

                    <div className="card-header">

                        <div>

                            <h2>
                                {editingId
                                    ? 'Edit Service'
                                    : 'Create Service'}
                            </h2>

                            <p>
                                Add complete service information.
                            </p>

                        </div>


                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                                setFormOpen(false)
                                resetForm()
                            }}
                        >

                            <i className="fa-solid fa-xmark"></i>

                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="card-body">


                            {/* ==================================================
                                BASIC INFORMATION
                            ================================================== */}

                            <div className="service-section">

                                <h3>
                                    Basic Information
                                </h3>


                                <div className="row g-3">


                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Category *
                                        </label>

                                        <select
                                            required
                                            className="form-select"
                                            value={form.category}
                                            onChange={(event) =>
                                                handleFormCategory(
                                                    event.target.value
                                                )
                                            }
                                        >

                                            <option value="">
                                                Select Category
                                            </option>

                                            {categories.map(
                                                (category) => (

                                                    <option
                                                        key={
                                                            category._id
                                                        }
                                                        value={
                                                            category._id
                                                        }
                                                    >
                                                        {
                                                            category.categoryName
                                                        }
                                                    </option>

                                                )
                                            )}

                                        </select>

                                    </div>


                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Subcategory *
                                        </label>

                                        <select
                                            required
                                            className="form-select"
                                            value={form.subcategory}
                                            onChange={(event) =>
                                                updateForm(
                                                    'subcategory',
                                                    event.target.value
                                                )
                                            }
                                            disabled={
                                                !form.category
                                            }
                                        >

                                            <option value="">
                                                Select Subcategory
                                            </option>

                                            {formSubcategories.map(
                                                (item) => (

                                                    <option
                                                        key={
                                                            item._id
                                                        }
                                                        value={
                                                            item._id
                                                        }
                                                    >
                                                        {
                                                            item.subcategoryName
                                                        }
                                                    </option>

                                                )
                                            )}

                                        </select>

                                    </div>


                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Service Title
                                        </label>

                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={form.title}
                                            onChange={(event) =>
                                                updateForm(
                                                    'title',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Professional Banking Translation"
                                        />

                                    </div>


                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Slug
                                        </label>

                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={form.slug}
                                            onChange={(event) =>
                                                updateForm(
                                                    'slug',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="professional-banking-translation"
                                        />

                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12">

                                        <label className="form-label">
                                            Small Description
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                form.smallDescription
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    'smallDescription',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Short service description"
                                        />

                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12">

                                        <label className="form-label">
                                            Long Description
                                        </label>

                                        <ReactQuill
                                            theme="snow"
                                            value={form.longDescription || ''}
                                            onChange={(value) =>
                                                updateForm(
                                                    'longDescription',
                                                    value
                                                )
                                            }
                                            placeholder="Complete service description..."
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* ==================================================
                                TABS
                            ================================================== */}

                            <div className="service-section p-2">

                                <div className="service-section-heading">
                                    <h3>
                                        Service Tabs
                                    </h3>
                                </div>

                                <div className="d-flex gap-2 mb-3">

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newTabText}
                                        onChange={(event) =>
                                            setNewTabText(event.target.value)
                                        }
                                        onKeyDown={handleNewTabKeyDown}
                                        placeholder="Type tab name and press Enter..."
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-primary px-4"
                                        onClick={() => addTab()}
                                    >
                                        <i className="fa-solid fa-plus me-1"></i>
                                        Add Tab
                                    </button>

                                </div>

                                {form.tabs.length > 0 && (
                                    <div
                                        className="d-flex align-items-center gap-2 flex-wrap mb-3"
                                        style={{
                                            borderBottom: '1px solid #dee2e6',
                                            paddingBottom: '12px'
                                        }}
                                    >

                                        {form.tabs.map((tab, index) => (
                                            <div
                                                key={`service-tab-${index}`}
                                                className="d-flex align-items-center gap-1"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveTabIndex(index)
                                                    }
                                                    className={
                                                        activeTabIndex === index
                                                            ? 'btn btn-primary rounded-pill px-4'
                                                            : 'btn btn-outline-primary rounded-pill px-4'
                                                    }
                                                >
                                                    {typeof tab === 'string' ? tab : (tab?.title?.trim() || `Tab ${index + 1}`)}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger rounded-circle"
                                                    onClick={() => removeTab(index)}
                                                    title="Remove tab"
                                                    style={{ width: '32px', height: '32px', padding: 0 }}
                                                >
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        ))}

                                    </div>
                                )}

                                {form.tabs.length === 0 && (
                                    <div className="border rounded p-4 text-center text-muted">
                                        Type a tab name above and press <strong>Enter</strong> to create a tab.
                                    </div>
                                )}

                            </div>


                            <div className="service-section">

                                <h3>
                                    Translator Information
                                </h3>


                                <div className="row g-3">

                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Number of Translators
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={
                                                form.numberOfTranslators
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    'numberOfTranslators',
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Rating Average
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            className="form-control"
                                            value={
                                                form.ratingAverage
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    'ratingAverage',
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Total Reviews
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={
                                                form.totalReviews
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    'totalReviews',
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* ==================================================
                                DELIVERY
                            ================================================== */}

                            <div className="service-section">

                                <h3>
                                    Delivery
                                </h3>


                                <div className="row g-3">

                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Delivery Range
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={form.deliveryRange}
                                            onChange={(event) =>
                                                updateForm(
                                                    'deliveryRange',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="2-4"
                                            inputMode="numeric"
                                        />

                                        <small className="text-muted">
                                            Example: 2-4 or 0-1
                                        </small>

                                    </div>


                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Delivery Unit
                                        </label>

                                        <select
                                            className="form-select"
                                            value={
                                                form.deliveryUnit
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    'deliveryUnit',
                                                    event.target.value
                                                )
                                            }
                                        >

                                            <option value="hour">
                                                Hour
                                            </option>

                                            <option value="day">
                                                Day
                                            </option>

                                            <option value="business_day">
                                                Business Day
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================================
                                PURCHASE MODES
                            ================================================== */}

                            <div className="service-section">

                                <h3>
                                    Purchase Modes
                                </h3>


                                <div className="row g-3">

                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <div className="service-checkbox-card">

                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={
                                                    form.purchaseFixed
                                                }
                                                onChange={(event) =>
                                                    updateForm(
                                                        'purchaseFixed',
                                                        event.target.checked
                                                    )
                                                }
                                                id="purchaseFixed"
                                            />

                                            <label
                                                htmlFor="purchaseFixed"
                                            >
                                                <strong>
                                                    Fixed Purchase
                                                </strong>

                                                <small>
                                                    Customer purchases a predefined service.
                                                </small>

                                            </label>

                                        </div>

                                    </div>


                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <div className="service-checkbox-card">

                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={
                                                    form.purchaseFileUpload
                                                }
                                                onChange={(event) =>
                                                    updateForm(
                                                        'purchaseFileUpload',
                                                        event.target.checked
                                                    )
                                                }
                                                id="purchaseFileUpload"
                                            />

                                            <label
                                                htmlFor="purchaseFileUpload"
                                            >
                                                <strong>
                                                    File Upload
                                                </strong>

                                                <small>
                                                    Customer uploads document for translation.
                                                </small>

                                            </label>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================================
                                PRICE
                            ================================================== */}

                            <div className="service-section">

                                <h3>
                                    Starting Price
                                </h3>

                                <div className="row g-3">

                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Starting Price
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="form-control"
                                            value={form.startingPrice}
                                            onChange={(event) =>
                                                updateForm(
                                                    'startingPrice',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="20.00"
                                        />

                                        <small className="text-muted">
                                            Enter the price directly, e.g. $20 or $25.50.
                                        </small>

                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Currency
                                        </label>

                                        <select
                                            className="form-select"
                                            value={form.startingPriceCurrency}
                                            onChange={(event) =>
                                                updateForm(
                                                    'startingPriceCurrency',
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option value="USD">USD</option>
                                            <option value="GBP">GBP</option>
                                            <option value="EUR">EUR</option>
                                            <option value="CAD">CAD</option>
                                            <option value="INR">INR</option>
                                        </select>

                                    </div>

                                </div>

                                <div className="row g-3 mt-1">

                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="discountEnabled"
                                                checked={form.discountEnabled}
                                                onChange={(event) =>
                                                    updateForm(
                                                        'discountEnabled',
                                                        event.target.checked
                                                    )
                                                }
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="discountEnabled"
                                            >
                                                Enable Discount
                                            </label>
                                        </div>

                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Discount Amount
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="form-control"
                                            value={form.discountValue}
                                            onChange={(event) =>
                                                updateForm(
                                                    'discountValue',
                                                    event.target.value
                                                )
                                            }
                                            disabled={!form.discountEnabled}
                                            placeholder="5.00"
                                        />

                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Discount Currency
                                        </label>

                                        <select
                                            className="form-select"
                                            value={form.discountCurrency}
                                            onChange={(event) =>
                                                updateForm(
                                                    'discountCurrency',
                                                    event.target.value
                                                )
                                            }
                                            disabled={!form.discountEnabled}
                                        >
                                            <option value="USD">USD</option>
                                            <option value="GBP">GBP</option>
                                            <option value="EUR">EUR</option>
                                            <option value="CAD">CAD</option>
                                            <option value="INR">INR</option>
                                        </select>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================================
                                MEDIA
                            ================================================== */}

                            <div className="service-section">

                                <h3>
                                    Media
                                </h3>

                                <div className="row g-3">

                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Thumbnail
                                        </label>

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleThumbnailChange}
                                        />

                                        <small className="text-muted">
                                            JPG, PNG or WEBP
                                        </small>

                                        {existingThumbnail?.url && !thumbnailFile && (

                                            <div className="service-existing-image mt-3">

                                                <img
                                                    src={existingThumbnail.url}
                                                    alt="Current thumbnail"
                                                />

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        setExistingThumbnail(null)
                                                    }
                                                >
                                                    <i className="fa-solid fa-trash me-1"></i>
                                                    Remove Current
                                                </button>

                                            </div>

                                        )}

                                        {thumbnailFile && (

                                            <div className="service-selected-file mt-2">
                                                <i className="fa-solid fa-image me-2"></i>
                                                {thumbnailFile.name}
                                            </div>

                                        )}

                                    </div>


                                    <div className="col-lg-6 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Additional Images
                                        </label>

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/jpeg,image/png,image/webp"
                                            multiple
                                            onChange={handleImagesChange}
                                        />

                                        <small className="text-muted">
                                            You can select multiple images.
                                        </small>

                                    </div>


                                    {existingImages.length > 0 && (

                                        <div className="col-lg-12 col-md-12 col-sm-12">

                                            <label className="form-label">
                                                Existing Images
                                            </label>

                                            <div className="service-image-grid">

                                                {existingImages.map(
                                                    (image, index) => (

                                                        <div
                                                            className="service-image-preview"
                                                            key={`${image.public_id || image.url || index}-${index}`}
                                                        >

                                                            {image.url && (

                                                                <img
                                                                    src={image.url}
                                                                    alt={`Existing ${index + 1}`}
                                                                />

                                                            )}

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() =>
                                                                    removeExistingImage(index)
                                                                }
                                                                title="Remove image"
                                                            >
                                                                <i className="fa-solid fa-xmark"></i>
                                                            </button>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    )}


                                    {imageFiles.length > 0 && (

                                        <div className="col-lg-12 col-md-12 col-sm-12">

                                            <label className="form-label">
                                                Selected Images
                                            </label>

                                            <div className="service-selected-files">

                                                {imageFiles.map(
                                                    (file, index) => (

                                                        <div
                                                            className="service-selected-file"
                                                            key={`${file.name}-${file.lastModified}-${index}`}
                                                        >

                                                            <i className="fa-solid fa-image me-2"></i>

                                                            <span>
                                                                {file.name}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger ms-auto"
                                                                onClick={() =>
                                                                    removeSelectedImage(index)
                                                                }
                                                            >
                                                                <i className="fa-solid fa-xmark"></i>
                                                            </button>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ==================================================
                                STATUS
                            ================================================== */}

                            <div className="service-section">

                                <h3>
                                    Publishing
                                </h3>


                                <div className="row g-3">

                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Status
                                        </label>

                                        <select
                                            className="form-select"
                                            value={
                                                form.status
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    'status',
                                                    event.target.value
                                                )
                                            }
                                        >

                                            <option value="draft">
                                                Draft
                                            </option>

                                            <option value="active">
                                                Active
                                            </option>

                                            <option value="inactive">
                                                Inactive
                                            </option>

                                            <option value="archived">
                                                Archived
                                            </option>

                                        </select>

                                    </div>


                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Sort Order
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={
                                                form.sortOrder
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    'sortOrder',
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                        <label className="form-label">
                                            Featured
                                        </label>

                                        <div className="form-check form-switch mt-2">

                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={
                                                    form.isFeatured
                                                }
                                                onChange={(event) =>
                                                    updateForm(
                                                        'isFeatured',
                                                        event.target.checked
                                                    )
                                                }
                                            />

                                            <label className="form-check-label">
                                                Show as featured
                                            </label>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ==================================================
                            FORM FOOTER
                        ================================================== */}

                        <div className="card-footer service-form-footer">

                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => {

                                    setFormOpen(false)
                                    resetForm()

                                }}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="btn btn-primary"
                            >

                                <i className="fa-solid fa-check me-2"></i>

                                {editingId
                                    ? 'Update Service'
                                    : 'Create Service'}

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ====================================================
                FILTER
            ==================================================== */}

            <div className="card service-filter-card">

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-lg-4 col-md-6 col-sm-12">

                            <label className="form-label">
                                Search Service
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Search by service name..."
                                />

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6 col-sm-12">

                            <label className="form-label">
                                Category
                            </label>

                            <select
                                className="form-select"
                                value={filterCategory}
                                onChange={(event) => {

                                    setFilterCategory(
                                        event.target.value
                                    )

                                    setFilterSubcategory('')

                                }}
                            >

                                <option value="">
                                    All Categories
                                </option>

                                {categories.map(
                                    (category) => (

                                        <option
                                            key={
                                                category._id
                                            }
                                            value={
                                                category._id
                                            }
                                        >
                                            {
                                                category.categoryName
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div className="col-lg-3 col-md-6 col-sm-12">

                            <label className="form-label">
                                Subcategory
                            </label>

                            <select
                                className="form-select"
                                value={
                                    filterSubcategory
                                }
                                onChange={(event) =>
                                    setFilterSubcategory(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    !filterCategory
                                }
                            >

                                <option value="">
                                    All Subcategories
                                </option>

                                {availableSubcategories.map(
                                    (item) => (

                                        <option
                                            key={
                                                item._id
                                            }
                                            value={
                                                item._id
                                            }
                                        >
                                            {
                                                item.subcategoryName
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div className="col-lg-2 col-md-6 col-sm-12">

                            <label className="form-label">
                                Status
                            </label>

                            <select
                                className="form-select"
                                value={
                                    filterStatus
                                }
                                onChange={(event) =>
                                    setFilterStatus(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All
                                </option>

                                <option value="active">
                                    Active
                                </option>

                                <option value="draft">
                                    Draft
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                                <option value="archived">
                                    Archived
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* ====================================================
                TABLE
            ==================================================== */}

            <div className="card service-table-card">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table service-table align-middle mb-0">

                            <thead>

                                <tr>

                                    <th>
                                        Service
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Subcategory
                                    </th>

                                    <th>
                                        Purchase Mode
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Featured
                                    </th>

                                    <th className="text-end">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {visibleServices.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-5"
                                        >

                                            <i className="fa-solid fa-inbox fs-2 text-muted"></i>

                                            <div className="mt-2">
                                                No services found.
                                            </div>

                                        </td>

                                    </tr>

                                )}


                                {visibleServices.map(
                                    (service) => (

                                        <tr
                                            key={
                                                service._id
                                            }
                                        >

                                            <td>

                                                <div className="service-info">

                                                    <div className="service-image">

                                                        {service.thumbnail?.url ? (

                                                            <img
                                                                src={
                                                                    service.thumbnail.url
                                                                }
                                                                alt={
                                                                    service.title
                                                                }
                                                            />

                                                        ) : (

                                                            <i className="fa-solid fa-language"></i>

                                                        )}

                                                    </div>


                                                    <div>

                                                        <h6 className="service-name">
                                                            {
                                                                service.title
                                                            }
                                                        </h6>

                                                        <span className="service-description">
                                                            {
                                                                service.smallDescription ||
                                                                'No description'
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            <td>
                                                {
                                                    service.category
                                                        ?.categoryName ||
                                                    '-'
                                                }
                                            </td>


                                            <td>
                                                {
                                                    service.subcategory
                                                        ?.subcategoryName ||
                                                    '-'
                                                }
                                            </td>


                                            <td>

                                                <div className="service-mode">

                                                    {service.purchaseModes?.fixed && (

                                                        <span className="badge bg-light text-dark">
                                                            Fixed
                                                        </span>

                                                    )}

                                                    {service.purchaseModes?.fileUpload && (

                                                        <span className="badge bg-light text-dark">
                                                            File Upload
                                                        </span>

                                                    )}

                                                </div>

                                            </td>


                                            <td>

                                                {service.status === 'active' && (

                                                    <span className="badge bg-success-subtle text-success">
                                                        Active
                                                    </span>

                                                )}

                                                {service.status === 'draft' && (

                                                    <span className="badge bg-warning-subtle text-warning">
                                                        Draft
                                                    </span>

                                                )}

                                                {service.status === 'inactive' && (

                                                    <span className="badge bg-secondary-subtle text-secondary">
                                                        Inactive
                                                    </span>

                                                )}

                                                {service.status === 'archived' && (

                                                    <span className="badge bg-danger-subtle text-danger">
                                                        Archived
                                                    </span>

                                                )}

                                            </td>


                                            <td>

                                                {service.isFeatured ? (

                                                    <span className="badge bg-warning-subtle text-warning">
                                                        Yes
                                                    </span>

                                                ) : (

                                                    <span className="badge bg-light text-dark">
                                                        No
                                                    </span>

                                                )}

                                            </td>


                                            <td className="text-end">

                                                <div className="service-actions">

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light"
                                                        title="Edit"
                                                        onClick={() =>
                                                            openEdit(
                                                                service
                                                            )
                                                        }
                                                    >

                                                        <i className="fa-solid fa-pen"></i>

                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light text-danger"
                                                        title="Archive"
                                                        onClick={() =>
                                                            handleDelete(
                                                                service
                                                            )
                                                        }
                                                    >

                                                        <i className="fa-solid fa-trash"></i>

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
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