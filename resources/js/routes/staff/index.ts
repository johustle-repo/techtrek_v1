import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import attractions from './attractions'
import businesses from './businesses'
import events from './events'
/**
 * @see routes/web.php:129
 * @route '/staff/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/staff/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:129
 * @route '/staff/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:129
 * @route '/staff/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:129
 * @route '/staff/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:129
 * @route '/staff/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:129
 * @route '/staff/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:129
 * @route '/staff/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
 * @see routes/web.php:143
 * @route '/staff/fees'
 */
export const fees = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fees.url(options),
    method: 'get',
})

fees.definition = {
    methods: ["get","head"],
    url: '/staff/fees',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:143
 * @route '/staff/fees'
 */
fees.url = (options?: RouteQueryOptions) => {
    return fees.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:143
 * @route '/staff/fees'
 */
fees.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fees.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:143
 * @route '/staff/fees'
 */
fees.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fees.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:143
 * @route '/staff/fees'
 */
    const feesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fees.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:143
 * @route '/staff/fees'
 */
        feesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fees.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:143
 * @route '/staff/fees'
 */
        feesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fees.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    fees.form = feesForm
const staff = {
    dashboard: Object.assign(dashboard, dashboard),
attractions: Object.assign(attractions, attractions),
businesses: Object.assign(businesses, businesses),
events: Object.assign(events, events),
fees: Object.assign(fees, fees),
}

export default staff