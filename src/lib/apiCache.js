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

// Warm every list once the admin is logged in, so first visit is instant too.
export const prefetchAll = () => {
    Object.values(API_ENDPOINTS).forEach((url) => {
        fetchList(url).catch(() => {})
    })
}
