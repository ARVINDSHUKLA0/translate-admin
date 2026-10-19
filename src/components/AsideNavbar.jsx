'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import '../componentsStyle/AsideNavbar.css'

const AsideNavbar = ({
    isSidebarOpen,
    closeSidebarOnPageClick
}) => {

    const pathname = usePathname()

    const [isServicesOpen, setIsServicesOpen] = useState(
        pathname === '/category' ||
        pathname === '/subcategory' ||
        pathname === '/package' ||
        pathname === '/feature' ||
        pathname === '/service'
    )


    const navSections = [
        {
            title: 'Overview',
            items: [
                {
                    label: 'Overview',
                    icon: '<i class="fa-solid fa-chart-column"></i>',
                    href: '/',
                },
            ],
        },

        {
            title: 'Operations',
            items: [

                {
                    label: 'Users',
                    icon: '<i class="fa-solid fa-users"></i>',
                    href: '/users',
                },

                {
                    label: 'Verification queue',
                    icon: '<i class="fa-solid fa-shield-halved"></i>',
                    href: '/verification-queue',
                },


                /* =========================
                   SERVICES DROPDOWN
                ========================= */

                {
                    type: 'dropdown',
                    label: 'Services',
                    icon: '<i class="fa-solid fa-wrench"></i>',

                    children: [

                        {
                            label: 'Category',
                            icon: '<i class="fa-solid fa-layer-group"></i>',
                            href: '/category',
                        },

                        {
                            label: 'Subcategory',
                            icon: '<i class="fa-solid fa-diagram-project"></i>',
                            href: '/subcategory',
                        },


                        {
                            label: 'Feature',
                            icon: '<i class="fa-solid fa-screwdriver-wrench"></i>',
                            href: '/feature',
                        },

                        /* =========================
                           NEW SERVICE PAGE
                        ========================= */

                        {
                            label: 'Service',
                            icon: '<i class="fa-solid fa-file-lines"></i>',
                            href: '/service',
                        },
                        
                        // {
                        //     label: 'Package',
                        //     icon: '<i class="fa-solid fa-box"></i>',
                        //     href: '/package',
                        // },

                    ],
                },
                
                  {
                    label: 'WordCountPrice',
                    icon: '<i class="fa-solid fa-font"></i>',
                    href: '/add-to-word-price',
                },

                {
                    label: 'Jobs & projects',
                    icon: '<i class="fa-solid fa-folder"></i>',
                    href: '/jobs-projects',
                },

                {
                    label: 'Payments & payouts',
                    icon: '<i class="fa-solid fa-credit-card"></i>',
                    href: '/payments-payouts',
                },

                {
                    label: 'Disputes & support',
                    icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
                    href: '/disputes-support',
                },

                {
                    label: 'Quality control',
                    icon: '<i class="fa-solid fa-magnifying-glass"></i>',
                    href: '/quality-control',
                },

                {
                    label: 'Messages',
                    icon: '<i class="fa-solid fa-message"></i>',
                    href: '/messages',
                },

                {
                    label: 'Help & Support',
                    icon: '<i class="fa-solid fa-circle-question"></i>',
                    href: '/',
                },

            ],
        },


        {
            title: 'System',
            items: [

                {
                    label: 'Reports & analytics',
                    icon: '<i class="fa-solid fa-chart-line"></i>',
                    href: '/reports-analytics',
                },

            ],
        },
    ]


    return (

        <aside
            className={`aside-navbar d-flex flex-column ${
                isSidebarOpen
                    ? 'sidebar-open'
                    : 'sidebar-closed'
            }`}
        >

            {/* LOGO */}

            <div className="d-flex align-items-center justify-content-between mb-lg-3 mb-3">

                <span className="fs-24 fw-bold">

                    <Link
                        className="text-decoration-none text-white"
                        href="/"
                    >
                        translate co
                    </Link>

                </span>

                <span className="admin-badge">
                    ADMIN
                </span>

            </div>


            {/* NAVIGATION */}

            <nav className="aside-navigation flex-grow-1">

                {navSections.map((section) => (

                    <div
                        className="aside-nav-section"
                        key={section.title}
                    >

                        <p className="aside-nav-section-title">
                            {section.title}
                        </p>


                        <div className="d-flex flex-column gap-1">

                            {section.items.map((item) => {


                                /* =========================
                                   SERVICES DROPDOWN
                                ========================= */

                                if (item.type === 'dropdown') {

                                    const isServiceActive =
                                        item.children?.some(
                                            (child) =>
                                                pathname === child.href
                                        )


                                    return (

                                        <div key={item.label}>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsServicesOpen(
                                                        !isServicesOpen
                                                    )
                                                }
                                                className={`aside-nav-item services-toggle d-flex align-items-center w-100 ${
                                                    isServiceActive
                                                        ? 'active'
                                                        : ''
                                                }`}
                                            >

                                                <span
                                                    className="aside-nav-icon"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.icon
                                                    }}
                                                />


                                                <span className="aside-nav-label flex-grow-1">
                                                    {item.label}
                                                </span>


                                                <span
                                                    className={`services-arrow ${
                                                        isServicesOpen
                                                            ? 'open'
                                                            : ''
                                                    }`}
                                                >

                                                    <i className="fa-solid fa-chevron-down"></i>

                                                </span>

                                            </button>


                                            {/* SERVICES CHILDREN */}

                                            {isServicesOpen && (

                                                <div className="services-submenu">

                                                    {item.children.map(
                                                        (child) => {

                                                            const isChildActive =
                                                                pathname ===
                                                                child.href


                                                            return (

                                                                <Link
                                                                    key={
                                                                        child.label
                                                                    }
                                                                    href={
                                                                        child.href
                                                                    }
                                                                    onClick={
                                                                        closeSidebarOnPageClick
                                                                    }
                                                                    className={`services-submenu-item ${
                                                                        isChildActive
                                                                            ? 'active'
                                                                            : ''
                                                                    }`}
                                                                >

                                                                    <span
                                                                        className="services-submenu-icon"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                child.icon
                                                                        }}
                                                                    />

                                                                    <span>
                                                                        {
                                                                            child.label
                                                                        }
                                                                    </span>

                                                                </Link>

                                                            )
                                                        }
                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    )
                                }


                                /* =========================
                                   NORMAL NAV ITEM
                                ========================= */

                                const isActive =
                                    pathname === item.href


                                return (

                                    <Link
                                        href={item.href}
                                        key={item.label}
                                        onClick={
                                            closeSidebarOnPageClick
                                        }
                                        className={`aside-nav-item d-flex align-items-center w-100 text-decoration-none ${
                                            isActive
                                                ? 'active'
                                                : ''
                                        }`}
                                    >

                                        <span
                                            className="aside-nav-icon"
                                            dangerouslySetInnerHTML={{
                                                __html: item.icon
                                            }}
                                        />

                                        <span className="aside-nav-label">
                                            {item.label}
                                        </span>

                                    </Link>

                                )

                            })}

                        </div>

                    </div>

                ))}

            </nav>


            {/* PROFILE */}

            <div className="aside-profile d-flex align-items-center">

                <div className="profile-avatar d-flex align-items-center justify-content-center">
                    AD
                </div>

                <div className="profile-info">

                    <p className="profile-name">
                        Admin Team
                    </p>

                    <p className="profile-role">
                        Super admin
                    </p>

                </div>

            </div>

        </aside>
    )
}

export default AsideNavbar