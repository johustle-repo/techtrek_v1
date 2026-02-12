import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import attractions from './attractions'
/**
 * @see routes/web.php:117
 * @route '/user/itinerary'
 */
export const itinerary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: itinerary.url(options),
    method: 'get',
})

itinerary.definition = {
    methods: ["get","head"],
    url: '/user/itinerary',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:117
 * @route '/user/itinerary'
 */
itinerary.url = (options?: RouteQueryOptions) => {
    return itinerary.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:117
 * @route '/user/itinerary'
 */
itinerary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: itinerary.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:117
 * @route '/user/itinerary'
 */
itinerary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: itinerary.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:117
 * @route '/user/itinerary'
 */
    const itineraryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: itinerary.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:117
 * @route '/user/itinerary'
 */
        itineraryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: itinerary.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:117
 * @route '/user/itinerary'
 */
        itineraryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: itinerary.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    itinerary.form = itineraryForm
/**
 * @see routes/web.php:118
 * @route '/user/bookings'
 */
export const bookings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bookings.url(options),
    method: 'get',
})

bookings.definition = {
    methods: ["get","head"],
    url: '/user/bookings',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:118
 * @route '/user/bookings'
 */
bookings.url = (options?: RouteQueryOptions) => {
    return bookings.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:118
 * @route '/user/bookings'
 */
bookings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bookings.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:118
 * @route '/user/bookings'
 */
bookings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bookings.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:118
 * @route '/user/bookings'
 */
    const bookingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bookings.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:118
 * @route '/user/bookings'
 */
        bookingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bookings.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:118
 * @route '/user/bookings'
 */
        bookingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bookings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bookings.form = bookingsForm
/**
 * @see routes/web.php:119
 * @route '/user/payments'
 */
export const payments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payments.url(options),
    method: 'get',
})

payments.definition = {
    methods: ["get","head"],
    url: '/user/payments',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:119
 * @route '/user/payments'
 */
payments.url = (options?: RouteQueryOptions) => {
    return payments.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:119
 * @route '/user/payments'
 */
payments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payments.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:119
 * @route '/user/payments'
 */
payments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payments.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:119
 * @route '/user/payments'
 */
    const paymentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: payments.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:119
 * @route '/user/payments'
 */
        paymentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payments.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:119
 * @route '/user/payments'
 */
        paymentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    payments.form = paymentsForm
/**
 * @see routes/web.php:120
 * @route '/user/recent-visits'
 */
export const recentVisits = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentVisits.url(options),
    method: 'get',
})

recentVisits.definition = {
    methods: ["get","head"],
    url: '/user/recent-visits',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:120
 * @route '/user/recent-visits'
 */
recentVisits.url = (options?: RouteQueryOptions) => {
    return recentVisits.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:120
 * @route '/user/recent-visits'
 */
recentVisits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentVisits.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:120
 * @route '/user/recent-visits'
 */
recentVisits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recentVisits.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:120
 * @route '/user/recent-visits'
 */
    const recentVisitsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: recentVisits.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:120
 * @route '/user/recent-visits'
 */
        recentVisitsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recentVisits.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:120
 * @route '/user/recent-visits'
 */
        recentVisitsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recentVisits.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    recentVisits.form = recentVisitsForm
const user = {
    attractions: Object.assign(attractions, attractions),
itinerary: Object.assign(itinerary, itinerary),
bookings: Object.assign(bookings, bookings),
payments: Object.assign(payments, payments),
recentVisits: Object.assign(recentVisits, recentVisits),
}

export default user