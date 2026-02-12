import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AttractionController::index
 * @see app/Http/Controllers/AttractionController.php:14
 * @route '/destinations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/destinations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AttractionController::index
 * @see app/Http/Controllers/AttractionController.php:14
 * @route '/destinations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttractionController::index
 * @see app/Http/Controllers/AttractionController.php:14
 * @route '/destinations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AttractionController::index
 * @see app/Http/Controllers/AttractionController.php:14
 * @route '/destinations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AttractionController::index
 * @see app/Http/Controllers/AttractionController.php:14
 * @route '/destinations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AttractionController::index
 * @see app/Http/Controllers/AttractionController.php:14
 * @route '/destinations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AttractionController::index
 * @see app/Http/Controllers/AttractionController.php:14
 * @route '/destinations'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const destinations = {
    index: Object.assign(index, index),
}

export default destinations