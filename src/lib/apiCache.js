// // Tiny stale-while-revalidate cache for admin GET lists.
// // Pages read cached data instantly on mount, then refresh in the background.

// import Url from '@/Url'

// const store = new Map()     // url -> { data, ts }
// const inflight = new Map()  // url -> Promise (dedupes parallel requests)

// export const API_ENDPOINTS = {
//     categories: `${Url}/api/categories`,
//     subcategories: `${Url}/api/subcategories`,
//     features: `${Url}/api/service-addons?includeInactive=true`,
//     services: `${Url}/api/services`,
// }

// export const peek = (url) => store.get(url)?.data

// export const setCache = (url, data) => {
//     store.set(url, { data, ts: Date.now() })
// }

// export const fetchList = (url) => {
//     if (inflight.has(url)) return inflight.get(url)

//     const promise = fetch(url, { credentials: 'include' })
//         .then(async (response) => {
//             const result = await response.json()

//             if (!response.ok || result.success === false) {
//                 throw new Error(result.message || 'Request failed')
//             }

//             const list = Array.isArray(result.data) ? result.data : []
//             setCache(url, list)
//             return list
//         })
//         .finally(() => inflight.delete(url))

//     inflight.set(url, promise)
//     return promise
// }

// // Warm every list once the admin is logged in, so first visit is instant too.
// export const prefetchAll = () => {
//     Object.values(API_ENDPOINTS).forEach((url) => {
//         fetchList(url).catch(() => {})
//     })
// }






// Tiny stale-while-revalidate cache for admin GET lists.
// Pages read cached data instantly on mount, then refresh in the background.

import Url from '@/Url'

const store = new Map()     // url -> { data, ts }
const inflight = new Map()  // url -> Promise (dedupes parallel requests)

export const API_ENDPOINTS = {
    categories: `${Url}/api/categories`,
    subcategories: `${Url}/api/subcategories`,
    features: `${Url}/api/service-addons?includeInactive=true`,
    services: `${Url}/api/services`,
}

export const peek = (url) => store.get(url)?.data

export const setCache = (url, data) => {
    store.set(url, { data, ts: Date.now() })
}

export const fetchList = (url) => {
    if (inflight.has(url)) return inflight.get(url)

    const promise = fetch(url, { credentials: 'include' })
        .then(async (response) => {
            const result = await response.json()

            if (!response.ok || result.success === false) {
                throw new Error(result.message || 'Request failed')
            }

            const list = Array.isArray(result.data) ? result.data : []
            setCache(url, list)
            return list
        })
        .finally(() => inflight.delete(url))

    inflight.set(url, promise)
    return promise
}

// ---------------------------------------------------------------
// Raw JSON helper (users, verification queue, pricing settings).
// Keeps the full response so pages can read counts, nested data, etc.
// ---------------------------------------------------------------
export const fetchJson = (url) => {
    if (inflight.has(url)) return inflight.get(url)

    const promise = fetch(url, {
        credentials: 'include',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
    })
        .then(async (response) => {
            let result = null

            try {
                result = await response.json()
            } catch {
                result = null
            }

            if (!response.ok || result?.success === false) {
                const error = new Error(
                    result?.message || `Request failed (${response.status})`
                )
                error.status = response.status
                throw error
            }

            setCache(url, result)
            return result
        })
        .finally(() => inflight.delete(url))

    inflight.set(url, promise)
    return promise
}

// Remove cached entries whose url starts with prefix (call after a mutation).
export const invalidate = (prefix) => {
    for (const key of Array.from(store.keys())) {
        if (key.startsWith(prefix)) store.delete(key)
    }
}

export const clearAllCache = () => {
    store.clear()
    inflight.clear()
}

// ---------------------------------------------------------------
// Extra endpoints used by other admin pages
// ---------------------------------------------------------------
export const USERS_URLS = {
    clients: `${Url}/api/client`,
    translators: `${Url}/api/translator`,
}

export const queueUrl = (status) =>
    `${Url}/api/admin/translators/verification-queue?status=${status}`

export const QUEUE_STATUSES = ['pending', 'approved', 'rejected']

// Same URL rule the word-price page always used.
export const WORD_PRICE_URL = `${(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
)
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/api$/i, '')}/api/word-price-settings`

// ---------------------------------------------------------------
// Session hint: after a successful login the shell renders the admin
// layout right away and verifies the cookie in the background.
// (The server still protects every API with the real cookie.)
// ---------------------------------------------------------------
const SESSION_KEY = 'admin-session-ok'

export const hasSession = () => {
    try {
        return sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
        return false
    }
}

export const markSession = () => {
    try {
        sessionStorage.setItem(SESSION_KEY, '1')
    } catch {}
}

export const clearSession = () => {
    try {
        sessionStorage.removeItem(SESSION_KEY)
    } catch {}
    clearAllCache()
}

// Warm every list once the admin is logged in, so first visit is instant too.
export const prefetchAll = () => {
    Object.values(API_ENDPOINTS).forEach((url) => {
        fetchList(url).catch(() => {})
    })

    const json = [
        USERS_URLS.clients,
        USERS_URLS.translators,
        WORD_PRICE_URL,
        ...QUEUE_STATUSES.map(queueUrl),
    ]

    json.forEach((url) => {
        fetchJson(url).catch(() => {})
    })
}
