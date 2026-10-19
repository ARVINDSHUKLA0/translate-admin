// // 'use client'

// // import React, { useEffect, useRef, useState } from 'react'
// // import { useRouter } from 'next/navigation'

// // import '../componentsStyle/Navbar.css'

// // const Navbar = ({
// //     toggleSidebar,
// //     isSidebarOpen
// // }) => {

// //     const router = useRouter()

// //     const [isProfileOpen, setIsProfileOpen] =
// //         useState(false)

// //     const profileRef = useRef(null)
 
// //     useEffect(() => {
// //         const handleOutsideClick = (event) => {

// //             if (
// //                 profileRef.current &&
// //                 !profileRef.current.contains(event.target)
// //             ) {
// //                 setIsProfileOpen(false)
// //             }

// //         }

// //         document.addEventListener(
// //             'mousedown',
// //             handleOutsideClick
// //         )

// //         return () => {

// //             document.removeEventListener(
// //                 'mousedown',
// //                 handleOutsideClick
// //             )

// //         }

// //     }, [])

// //     const handleLogout = () => {
 
// //         document.cookie =
// //             'admin-auth=; path=/; max-age=0; SameSite=Lax'
// //         localStorage.removeItem('admin-auth')

// //         setIsProfileOpen(false) 
// //         router.replace('/login')
// //     }


// //     const handleSettings = () => {

// //         setIsProfileOpen(false)

// //         router.push('/settings')
// //     }


// //     return (

// //         <header className="admin-navbar d-flex align-items-center justify-content-between">
// //             <div className="navbar-left d-flex align-items-center gap-2">
// //                 <button
// //                     type="button"
// //                     className="navbar-menu-button navbar-menu-desktop border-0 bg-transparent"
// //                     onClick={toggleSidebar}
// //                     aria-label={
// //                         isSidebarOpen
// //                             ? 'Close sidebar'
// //                             : 'Open sidebar'
// //                     }
// //                 >

// //                     <i
// //                         className={`fa-solid ${
// //                             isSidebarOpen
// //                                 ? 'fa-xmark'
// //                                 : 'fa-bars'
// //                         }`}
// //                     />

// //                 </button>
// //                 <div className="navbar-search d-flex align-items-center">
// //                     <i className="fa-solid fa-magnifying-glass navbar-search-icon" />
// //                     <input
// //                         type="text"
// //                         placeholder="Search users, jobs, transactions..."
// //                     />

// //                 </div>

// //             </div> 

// //             <div className="navbar-right d-flex align-items-center gap-3">
// //                 <button
// //                     type="button"
// //                     className="navbar-notification d-flex align-items-center justify-content-center border-0"
// //                     aria-label="Notifications"
// //                 >

// //                     <i className="fa-solid fa-bell" />
// //                 </button>
// //                 <button
// //                     type="button"
// //                     className="navbar-menu-button navbar-menu-mobile border-0 bg-transparent"
// //                     onClick={toggleSidebar}
// //                     aria-label={
// //                         isSidebarOpen
// //                             ? 'Close sidebar'
// //                             : 'Open sidebar'
// //                     }
// //                 >

// //                     <i
// //                         className={`fa-solid ${
// //                             isSidebarOpen
// //                                 ? 'fa-xmark'
// //                                 : 'fa-bars'
// //                         }`}
// //                     />

// //                 </button>
// //                 <div
// //                     className="navbar-profile-wrapper"
// //                     ref={profileRef}
// //                 >

// //                     <button
// //                         type="button"
// //                         className="navbar-avatar"
// //                         onClick={() =>
// //                             setIsProfileOpen(
// //                                 prev => !prev
// //                             )
// //                         }
// //                         aria-label="Admin profile"
// //                         aria-expanded={isProfileOpen}
// //                     >
// //                         AD
// //                     </button>


// //                     {isProfileOpen && (

// //                         <div className="navbar-profile-dropdown">

// //                             <div className="profile-dropdown-header">

// //                                 <div className="profile-dropdown-avatar">
// //                                     AD
// //                                 </div>


// //                                 <div className="profile-dropdown-info">

// //                                     <div className="profile-dropdown-name">
// //                                         Admin Team
// //                                     </div>

// //                                     <div className="profile-dropdown-email">
// //                                         gigbiggroup@gmail.com
// //                                     </div>

// //                                 </div>

// //                             </div>


// //                             <div className="profile-dropdown-divider" /> 
// //                             <button
// //                                 type="button"
// //                                 className="profile-dropdown-item"
// //                                 onClick={handleSettings}
// //                             >

// //                                 <i className="fa-solid fa-gear" />

// //                                 <span>
// //                                     Settings
// //                                 </span>

// //                             </button> 

// //                             <button
// //                                 type="button"
// //                                 className="profile-dropdown-item logout-item"
// //                                 onClick={handleLogout}
// //                             >

// //                                 <i className="fa-solid fa-right-from-bracket" />

// //                                 <span>
// //                                     Logout
// //                                 </span>

// //                             </button>

// //                         </div>

// //                     )}

// //                 </div>

// //             </div>

// //         </header>
// //     )
// // }

// // export default Navbar







// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/navigation'

// import Url from '@/Url'
// import '../componentsStyle/Navbar.css'

// const Navbar = ({
//     toggleSidebar,
//     isSidebarOpen
// }) => {
//     const router = useRouter()

//     const [isProfileOpen, setIsProfileOpen] = useState(false)
//     const [isLoggingOut, setIsLoggingOut] = useState(false)

//     const profileRef = useRef(null)

//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (
//                 profileRef.current &&
//                 !profileRef.current.contains(event.target)
//             ) {
//                 setIsProfileOpen(false)
//             }
//         }

//         document.addEventListener('mousedown', handleOutsideClick)

//         return () => {
//             document.removeEventListener('mousedown', handleOutsideClick)
//         }
//     }, [])

//     const handleLogout = async () => {
//         if (isLoggingOut) return

//         setIsLoggingOut(true)
//         setIsProfileOpen(false)

//         try {
//             const response = await fetch(`${Url}/api/auth/logout`, {
//                 method: 'POST',
//                 credentials: 'include',
//                 cache: 'no-store',
//             })

//             if (!response.ok) {
//                 throw new Error(`Logout failed with status ${response.status}`)
//             }

//             // Clear legacy client-side authentication data.
//             document.cookie =
//                 'admin-auth=; path=/; max-age=0; SameSite=Lax'

//             localStorage.removeItem('admin-auth')

//             router.replace('/login')
//             router.refresh()
//         } catch (error) {
//             console.error('Logout failed:', error)

//             setIsLoggingOut(false)

//             alert(
//                 'Logout failed. Please check your server connection and try again.'
//             )
//         }
//     }

//     const handleSettings = () => {
//         setIsProfileOpen(false)
//         router.push('/settings')
//     }

//     return (
//         <header className="admin-navbar d-flex align-items-center justify-content-between">
//             <div className="navbar-left d-flex align-items-center gap-2">
//                 <button
//                     type="button"
//                     className="navbar-menu-button navbar-menu-desktop border-0 bg-transparent"
//                     onClick={toggleSidebar}
//                     aria-label={
//                         isSidebarOpen
//                             ? 'Close sidebar'
//                             : 'Open sidebar'
//                     }
//                 >
//                     <i
//                         className={`fa-solid ${
//                             isSidebarOpen ? 'fa-xmark' : 'fa-bars'
//                         }`}
//                     />
//                 </button>

//                 <div className="navbar-search d-flex align-items-center">
//                     <i className="fa-solid fa-magnifying-glass navbar-search-icon" />

//                     <input
//                         type="text"
//                         placeholder="Search users, jobs, transactions..."
//                     />
//                 </div>
//             </div>

//             <div className="navbar-right d-flex align-items-center gap-3">
//                 <button
//                     type="button"
//                     className="navbar-notification d-flex align-items-center justify-content-center border-0"
//                     aria-label="Notifications"
//                 >
//                     <i className="fa-solid fa-bell" />
//                 </button>

//                 <button
//                     type="button"
//                     className="navbar-menu-button navbar-menu-mobile border-0 bg-transparent"
//                     onClick={toggleSidebar}
//                     aria-label={
//                         isSidebarOpen
//                             ? 'Close sidebar'
//                             : 'Open sidebar'
//                     }
//                 >
//                     <i
//                         className={`fa-solid ${
//                             isSidebarOpen ? 'fa-xmark' : 'fa-bars'
//                         }`}
//                     />
//                 </button>

//                 <div
//                     className="navbar-profile-wrapper"
//                     ref={profileRef}
//                 >
//                     <button
//                         type="button"
//                         className="navbar-avatar"
//                         onClick={() =>
//                             setIsProfileOpen(prev => !prev)
//                         }
//                         aria-label="Admin profile"
//                         aria-expanded={isProfileOpen}
//                     >
//                         AD
//                     </button>

//                     {isProfileOpen && (
//                         <div className="navbar-profile-dropdown">
//                             <div className="profile-dropdown-header">
//                                 <div className="profile-dropdown-avatar">
//                                     AD
//                                 </div>

//                                 <div className="profile-dropdown-info">
//                                     <div className="profile-dropdown-name">
//                                         Admin Team
//                                     </div>

//                                     <div className="profile-dropdown-email">
//                                         gigbiggroup@gmail.com
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="profile-dropdown-divider" />

//                             <button
//                                 type="button"
//                                 className="profile-dropdown-item"
//                                 onClick={handleSettings}
//                                 disabled={isLoggingOut}
//                             >
//                                 <i className="fa-solid fa-gear" />

//                                 <span>Settings</span>
//                             </button>

//                             <button
//                                 type="button"
//                                 className="profile-dropdown-item logout-item"
//                                 onClick={handleLogout}
//                                 disabled={isLoggingOut}
//                             >
//                                 <i className="fa-solid fa-right-from-bracket" />

//                                 <span>
//                                     {isLoggingOut ? 'Logging out...' : 'Logout'}
//                                 </span>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Navbar



























// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/navigation'

// import Swal from 'sweetalert2'
// import Url from '@/Url'
// import { clearSession } from '@/lib/apiCache'
// import '../componentsStyle/Navbar.css'

// const Navbar = ({
//     toggleSidebar,
//     isSidebarOpen
// }) => {
//     const router = useRouter()

//     const [isProfileOpen, setIsProfileOpen] = useState(false)
//     const [isLoggingOut, setIsLoggingOut] = useState(false)

//     const profileRef = useRef(null)

//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (
//                 profileRef.current &&
//                 !profileRef.current.contains(event.target)
//             ) {
//                 setIsProfileOpen(false)
//             }
//         }

//         document.addEventListener('mousedown', handleOutsideClick)

//         return () => {
//             document.removeEventListener('mousedown', handleOutsideClick)
//         }
//     }, [])

//     const handleLogout = async () => {
//         if (isLoggingOut) return

//         setIsLoggingOut(true)
//         setIsProfileOpen(false)

//         try {
//             const response = await fetch(`${Url}/api/auth/logout`, {
//                 method: 'POST',
//                 credentials: 'include',
//                 cache: 'no-store',
//             })

//             if (!response.ok) {
//                 throw new Error(`Logout failed with status ${response.status}`)
//             }

//             // Clear legacy client-side authentication data and cached admin data.
//             document.cookie =
//                 'admin-auth=; path=/; max-age=0; SameSite=Lax'

//             localStorage.removeItem('admin-auth')
//             clearSession()

//             Swal.fire({
//                 toast: true,
//                 position: 'top-end',
//                 icon: 'success',
//                 title: 'Logged out successfully',
//                 showConfirmButton: false,
//                 timer: 1800,
//                 timerProgressBar: true,
//             })

//             router.replace('/login')
//         } catch (error) {
//             console.error('Logout failed:', error)

//             setIsLoggingOut(false)

//             Swal.fire({
//                 icon: 'error',
//                 title: 'Logout Failed',
//                 text: 'Please check your server connection and try again.',
//                 confirmButtonText: 'OK',
//             })
//         }
//     }

//     const handleSettings = () => {
//         setIsProfileOpen(false)
//         router.push('/settings')
//     }

//     return (
//         <header className="admin-navbar d-flex align-items-center justify-content-between">
//             <div className="navbar-left d-flex align-items-center gap-2">
//                 <button
//                     type="button"
//                     className="navbar-menu-button navbar-menu-desktop border-0 bg-transparent"
//                     onClick={toggleSidebar}
//                     aria-label={
//                         isSidebarOpen
//                             ? 'Close sidebar'
//                             : 'Open sidebar'
//                     }
//                 >
//                     <i
//                         className={`fa-solid ${
//                             isSidebarOpen ? 'fa-xmark' : 'fa-bars'
//                         }`}
//                     />
//                 </button>

//                 <div className="navbar-search d-flex align-items-center">
//                     <i className="fa-solid fa-magnifying-glass navbar-search-icon" />

//                     <input
//                         type="text"
//                         placeholder="Search users, jobs, transactions..."
//                     />
//                 </div>
//             </div>

//             <div className="navbar-right d-flex align-items-center gap-3">
//                 <button
//                     type="button"
//                     className="navbar-notification d-flex align-items-center justify-content-center border-0"
//                     aria-label="Notifications"
//                 >
//                     <i className="fa-solid fa-bell" />
//                 </button>

//                 <button
//                     type="button"
//                     className="navbar-menu-button navbar-menu-mobile border-0 bg-transparent"
//                     onClick={toggleSidebar}
//                     aria-label={
//                         isSidebarOpen
//                             ? 'Close sidebar'
//                             : 'Open sidebar'
//                     }
//                 >
//                     <i
//                         className={`fa-solid ${
//                             isSidebarOpen ? 'fa-xmark' : 'fa-bars'
//                         }`}
//                     />
//                 </button>

//                 <div
//                     className="navbar-profile-wrapper"
//                     ref={profileRef}
//                 >
//                     <button
//                         type="button"
//                         className="navbar-avatar"
//                         onClick={() =>
//                             setIsProfileOpen(prev => !prev)
//                         }
//                         aria-label="Admin profile"
//                         aria-expanded={isProfileOpen}
//                     >
//                         AD
//                     </button>

//                     {isProfileOpen && (
//                         <div className="navbar-profile-dropdown">
//                             <div className="profile-dropdown-header">
//                                 <div className="profile-dropdown-avatar">
//                                     AD
//                                 </div>

//                                 <div className="profile-dropdown-info">
//                                     <div className="profile-dropdown-name">
//                                         Admin Team
//                                     </div>

//                                     <div className="profile-dropdown-email">
//                                         gigbiggroup@gmail.com
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="profile-dropdown-divider" />

//                             <button
//                                 type="button"
//                                 className="profile-dropdown-item"
//                                 onClick={handleSettings}
//                                 disabled={isLoggingOut}
//                             >
//                                 <i className="fa-solid fa-gear" />

//                                 <span>Settings</span>
//                             </button>

//                             <button
//                                 type="button"
//                                 className="profile-dropdown-item logout-item"
//                                 onClick={handleLogout}
//                                 disabled={isLoggingOut}
//                             >
//                                 <i className="fa-solid fa-right-from-bracket" />

//                                 <span>
//                                     {isLoggingOut ? 'Logging out...' : 'Logout'}
//                                 </span>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Navbar




















'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import Swal from 'sweetalert2'
import Url from '@/Url'
import { clearSession } from '@/lib/apiCache'
import '../componentsStyle/Navbar.css'

const Navbar = ({
    toggleSidebar,
    isSidebarOpen
}) => {
    const router = useRouter()

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const profileRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    const handleLogout = () => {
        if (isLoggingOut) return

        setIsLoggingOut(true)
        setIsProfileOpen(false)

        // 1) Leave immediately: clear local session + cached admin data.
        document.cookie =
            'admin-auth=; path=/; max-age=0; SameSite=Lax'

        localStorage.removeItem('admin-auth')
        clearSession()

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        })

        router.replace('/login')

        // 2) Tell the server in the background (httpOnly cookie can only be
        //    cleared by the server). keepalive lets it finish after navigation.
        const notifyServer = () =>
            fetch(`${Url}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                cache: 'no-store',
                keepalive: true,
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`Logout failed with status ${response.status}`)
                }
            })

        notifyServer().catch(() => {
            // one silent retry, then tell the admin honestly
            notifyServer().catch((error) => {
                console.error('Logout failed:', error)

                Swal.fire({
                    icon: 'error',
                    title: 'Logout Not Confirmed',
                    text: 'Could not reach the server. Your session may still be active - please log out again.',
                    confirmButtonText: 'OK',
                })
            })
        })
    }

    const handleSettings = () => {
        setIsProfileOpen(false)
        router.push('/settings')
    }

    return (
        <header className="admin-navbar d-flex align-items-center justify-content-between">
            <div className="navbar-left d-flex align-items-center gap-2">
                <button
                    type="button"
                    className="navbar-menu-button navbar-menu-desktop border-0 bg-transparent"
                    onClick={toggleSidebar}
                    aria-label={
                        isSidebarOpen
                            ? 'Close sidebar'
                            : 'Open sidebar'
                    }
                >
                    <i
                        className={`fa-solid ${
                            isSidebarOpen ? 'fa-xmark' : 'fa-bars'
                        }`}
                    />
                </button>

                <div className="navbar-search d-flex align-items-center">
                    <i className="fa-solid fa-magnifying-glass navbar-search-icon" />

                    <input
                        type="text"
                        placeholder="Search users, jobs, transactions..."
                    />
                </div>
            </div>

            <div className="navbar-right d-flex align-items-center gap-3">
                <button
                    type="button"
                    className="navbar-notification d-flex align-items-center justify-content-center border-0"
                    aria-label="Notifications"
                >
                    <i className="fa-solid fa-bell" />
                </button>

                <button
                    type="button"
                    className="navbar-menu-button navbar-menu-mobile border-0 bg-transparent"
                    onClick={toggleSidebar}
                    aria-label={
                        isSidebarOpen
                            ? 'Close sidebar'
                            : 'Open sidebar'
                    }
                >
                    <i
                        className={`fa-solid ${
                            isSidebarOpen ? 'fa-xmark' : 'fa-bars'
                        }`}
                    />
                </button>

                <div
                    className="navbar-profile-wrapper"
                    ref={profileRef}
                >
                    <button
                        type="button"
                        className="navbar-avatar"
                        onClick={() =>
                            setIsProfileOpen(prev => !prev)
                        }
                        aria-label="Admin profile"
                        aria-expanded={isProfileOpen}
                    >
                        AD
                    </button>

                    {isProfileOpen && (
                        <div className="navbar-profile-dropdown">
                            <div className="profile-dropdown-header">
                                <div className="profile-dropdown-avatar">
                                    AD
                                </div>

                                <div className="profile-dropdown-info">
                                    <div className="profile-dropdown-name">
                                        Admin Team
                                    </div>

                                    <div className="profile-dropdown-email">
                                        gigbiggroup@gmail.com
                                    </div>
                                </div>
                            </div>

                            <div className="profile-dropdown-divider" />

                            <button
                                type="button"
                                className="profile-dropdown-item"
                                onClick={handleSettings}
                                disabled={isLoggingOut}
                            >
                                <i className="fa-solid fa-gear" />

                                <span>Settings</span>
                            </button>

                            <button
                                type="button"
                                className="profile-dropdown-item logout-item"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                <i className="fa-solid fa-right-from-bracket" />

                                <span>
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
