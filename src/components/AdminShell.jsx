// // 'use client'

// // import React, { useEffect, useState } from 'react'
// // import { usePathname, useRouter } from 'next/navigation'

// // import AsideNavbar from '@/components/AsideNavbar'
// // import Navbar from '@/components/Navbar'
// // import Url from '@/Url'

// // const AdminShell = ({ children }) => {
// //     const pathname = usePathname()
// //     const router = useRouter()

// //     const [isSidebarOpen, setIsSidebarOpen] = useState(false)
// //     const [authChecking, setAuthChecking] = useState(true)
// //     const [authError, setAuthError] = useState('')

// //     const publicPages = ['/login', '/forgot-password']
// //     const isPublicPage = publicPages.includes(pathname)

// //     useEffect(() => {
// //         let active = true

// //         const checkAuthentication = async () => {
// //             setAuthError('')

// //             if (isPublicPage) {
// //                 setAuthChecking(false)
// //                 return
// //             }

// //             // setAuthChecking(true)

// //             try {
// //                 const response = await fetch(`${Url}/api/auth/me`, {
// //                     method: 'GET',
// //                     credentials: 'include',
// //                     cache: 'no-store',
// //                 })

// //                 if (!active) return

// //                 if (response.status === 401) {
// //                     router.replace('/login')
// //                     return
// //                 }

// //                 if (!response.ok) {
// //                     setAuthError(
// //                         'Unable to verify your session. Please try again.'
// //                     )
// //                     setAuthChecking(false)
// //                     return
// //                 }

// //                 const result = await response.json()

// //                 if (!result.success || !result.data) {
// //                     router.replace('/login')
// //                     return
// //                 }

// //                 setAuthChecking(false)
// //             } catch {
// //                 if (!active) return

// //                 setAuthError(
// //                     'Cannot connect to the authentication server. Please check the server and try again.'
// //                 )
// //                 setAuthChecking(false)
// //             }
// //         }

// //         checkAuthentication()

// //         return () => {
// //             active = false
// //         }
// //     }, [pathname, isPublicPage, router])

// //     useEffect(() => {
// //         if (isPublicPage) return

// //         const handleResize = () => {
// //             setIsSidebarOpen(window.innerWidth > 1024)
// //         }

// //         handleResize()
// //         window.addEventListener('resize', handleResize)

// //         return () => {
// //             window.removeEventListener('resize', handleResize)
// //         }
// //     }, [isPublicPage])

// //     const toggleSidebar = () => {
// //         setIsSidebarOpen(prev => !prev)
// //     }

// //     const closeSidebarOnPageClick = () => {
// //         if (window.innerWidth <= 1024) {
// //             setIsSidebarOpen(false)
// //         }
// //     }

// //     if (isPublicPage) {
// //         return children
// //     }

// //     if (authChecking) {
// //         return (
// //             <div className="container py-5 text-center">
// //                 <p className="mb-0">Verifying admin session...</p>
// //             </div>
// //         )
// //     }

// //     if (authError) {
// //         return (
// //             <div className="container py-5 text-center">
// //                 <div className="alert alert-danger" role="alert">
// //                     {authError}
// //                 </div>

// //                 <button
// //                     type="button"
// //                     className="btn btn-primary"
// //                     onClick={() => window.location.reload()}
// //                 >
// //                     Try again
// //                 </button>
// //             </div>
// //         )
// //     }

// //     return (
// //         <div
// //             className={`admin-layout ${
// //                 isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
// //             }`}
// //         >
// //             <AsideNavbar
// //                 isSidebarOpen={isSidebarOpen}
// //                 closeSidebarOnPageClick={closeSidebarOnPageClick}
// //             />

// //             <div className="admin-main">
// //                 <Navbar
// //                     toggleSidebar={toggleSidebar}
// //                     isSidebarOpen={isSidebarOpen}
// //                 />

// //                 <main className="admin-content">
// //                     {children}
// //                 </main>
// //             </div>
// //         </div>
// //     )
// // }

// // export default AdminShell







// 'use client'

// import React, { useEffect, useState } from 'react'
// import { usePathname, useRouter } from 'next/navigation'

// import AsideNavbar from '@/components/AsideNavbar'
// import Navbar from '@/components/Navbar'
// import Url from '@/Url'
// import { prefetchAll } from '@/lib/apiCache'

// const AdminShell = ({ children }) => {
//     const pathname = usePathname()
//     const router = useRouter()

//     const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//     const [authChecking, setAuthChecking] = useState(true)
//     const [authError, setAuthError] = useState('')

//     const publicPages = ['/login', '/forgot-password']
//     const isPublicPage = publicPages.includes(pathname)

//     useEffect(() => {
//         let active = true

//         const checkAuthentication = async () => {
//             setAuthError('')

//             if (isPublicPage) {
//                 setAuthChecking(false)
//                 return
//             }

//             // setAuthChecking(true)

//             try {
//                 const response = await fetch(`${Url}/api/auth/me`, {
//                     method: 'GET',
//                     credentials: 'include',
//                     cache: 'no-store',
//                 })

//                 if (!active) return

//                 if (response.status === 401) {
//                     router.replace('/login')
//                     return
//                 }

//                 if (!response.ok) {
//                     setAuthError(
//                         'Unable to verify your session. Please try again.'
//                     )
//                     setAuthChecking(false)
//                     return
//                 }

//                 const result = await response.json()

//                 if (!result.success || !result.data) {
//                     router.replace('/login')
//                     return
//                 }

//                 prefetchAll()
//                 setAuthChecking(false)
//             } catch {
//                 if (!active) return

//                 setAuthError(
//                     'Cannot connect to the authentication server. Please check the server and try again.'
//                 )
//                 setAuthChecking(false)
//             }
//         }

//         checkAuthentication()

//         return () => {
//             active = false
//         }
//     }, [pathname, isPublicPage, router])

//     useEffect(() => {
//         if (isPublicPage) return

//         const handleResize = () => {
//             setIsSidebarOpen(window.innerWidth > 1024)
//         }

//         handleResize()
//         window.addEventListener('resize', handleResize)

//         return () => {
//             window.removeEventListener('resize', handleResize)
//         }
//     }, [isPublicPage])

//     const toggleSidebar = () => {
//         setIsSidebarOpen(prev => !prev)
//     }

//     const closeSidebarOnPageClick = () => {
//         if (window.innerWidth <= 1024) {
//             setIsSidebarOpen(false)
//         }
//     }

//     if (isPublicPage) {
//         return children
//     }

//     if (authChecking) {
//         return (
//             <div className="container py-5 text-center">
//                 <p className="mb-0">Verifying admin session...</p>
//             </div>
//         )
//     }

//     if (authError) {
//         return (
//             <div className="container py-5 text-center">
//                 <div className="alert alert-danger" role="alert">
//                     {authError}
//                 </div>

//                 <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={() => window.location.reload()}
//                 >
//                     Try again
//                 </button>
//             </div>
//         )
//     }

//     return (
//         <div
//             className={`admin-layout ${
//                 isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
//             }`}
//         >
//             <AsideNavbar
//                 isSidebarOpen={isSidebarOpen}
//                 closeSidebarOnPageClick={closeSidebarOnPageClick}
//             />

//             <div className="admin-main">
//                 <Navbar
//                     toggleSidebar={toggleSidebar}
//                     isSidebarOpen={isSidebarOpen}
//                 />

//                 <main className="admin-content">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default AdminShell




















'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import AsideNavbar from '@/components/AsideNavbar'
import Navbar from '@/components/Navbar'
import Url from '@/Url'
import {
    prefetchAll,
    hasSession,
    markSession,
    clearSession,
} from '@/lib/apiCache'

const AdminShell = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [authChecking, setAuthChecking] = useState(true)
    const [authError, setAuthError] = useState('')

    const publicPages = ['/login', '/forgot-password']
    const isPublicPage = publicPages.includes(pathname)

    useEffect(() => {
        let active = true

        const checkAuthentication = async () => {
            setAuthError('')

            if (isPublicPage) {
                setAuthChecking(false)
                return
            }

            // Already signed in during this session: show the admin layout
            // right away and verify the cookie quietly in the background.
            const hadSession = hasSession()

            if (hadSession) {
                setAuthChecking(false)
                prefetchAll()
            }

            try {
                const response = await fetch(`${Url}/api/auth/me`, {
                    method: 'GET',
                    credentials: 'include',
                    cache: 'no-store',
                })

                if (!active) return

                if (response.status === 401) {
                    clearSession()
                    router.replace('/login')
                    return
                }

                if (!response.ok) {
                    setAuthError(
                        'Unable to verify your session. Please try again.'
                    )
                    setAuthChecking(false)
                    return
                }

                const result = await response.json()

                if (!result.success || !result.data) {
                    clearSession()
                    router.replace('/login')
                    return
                }

                markSession()
                if (!hadSession) prefetchAll()
                setAuthChecking(false)
            } catch {
                if (!active) return

                setAuthError(
                    'Cannot connect to the authentication server. Please check the server and try again.'
                )
                setAuthChecking(false)
            }
        }

        checkAuthentication()

        return () => {
            active = false
        }
    }, [pathname, isPublicPage, router])

    useEffect(() => {
        if (isPublicPage) return

        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [isPublicPage])

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    const closeSidebarOnPageClick = () => {
        if (window.innerWidth <= 1024) {
            setIsSidebarOpen(false)
        }
    }

    if (isPublicPage) {
        return children
    }

    if (authChecking) {
        return (
            <div className="container py-5 text-center">
                <p className="mb-0">Verifying admin session...</p>
            </div>
        )
    }

    if (authError) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger" role="alert">
                    {authError}
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                >
                    Try again
                </button>
            </div>
        )
    }

    return (
        <div
            className={`admin-layout ${
                isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
            }`}
        >
            <AsideNavbar
                isSidebarOpen={isSidebarOpen}
                closeSidebarOnPageClick={closeSidebarOnPageClick}
            />

            <div className="admin-main">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />

                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminShell
