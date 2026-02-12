import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Staff\AttractionController::index
 * @see app/Http/Controllers/Staff/AttractionController.php:13
 * @route '/staff/attractions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/attractions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\AttractionController::index
 * @see app/Http/Controllers/Staff/AttractionController.php:13
 * @route '/staff/attractions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\AttractionController::index
 * @see app/Http/Controllers/Staff/AttractionController.php:13
 * @route '/staff/attractions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\AttractionController::index
 * @see app/Http/Controllers/Staff/AttractionController.php:13
 * @route '/staff/attractions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\AttractionController::index
 * @see app/Http/Controllers/Staff/AttractionController.php:13
 * @route '/staff/attractions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\AttractionController::index
 * @see app/Http/Controllers/Staff/AttractionController.php:13
 * @route '/staff/attractions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\AttractionController::index
 * @see app/Http/Controllers/Staff/AttractionController.php:13
 * @route '/staff/attractions'
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
/**
* @see \App\Http\Controllers\Staff\AttractionController::create
 * @see app/Http/Controllers/Staff/AttractionController.php:20
 * @route '/staff/attractions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/staff/attractions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\AttractionController::create
 * @see app/Http/Controllers/Staff/AttractionController.php:20
 * @route '/staff/attractions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\AttractionController::create
 * @see app/Http/Controllers/Staff/AttractionController.php:20
 * @route '/staff/attractions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\AttractionController::create
 * @see app/Http/Controllers/Staff/AttractionController.php:20
 * @route '/staff/attractions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\AttractionController::create
 * @see app/Http/Controllers/Staff/AttractionController.php:20
 * @route '/staff/attractions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\AttractionController::create
 * @see app/Http/Controllers/Staff/AttractionController.php:20
 * @route '/staff/attractions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\AttractionController::create
 * @see app/Http/Controllers/Staff/AttractionController.php:20
 * @route '/staff/attractions/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Staff\AttractionController::store
 * @see app/Http/Controllers/Staff/AttractionController.php:25
 * @route '/staff/attractions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/attractions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Staff\AttractionController::store
 * @see app/Http/Controllers/Staff/AttractionController.php:25
 * @route '/staff/attractions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\AttractionController::store
 * @see app/Http/Controllers/Staff/AttractionController.php:25
 * @route '/staff/attractions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Staff\AttractionController::store
 * @see app/Http/Controllers/Staff/AttractionController.php:25
 * @route '/staff/attractions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Staff\AttractionController::store
 * @see app/Http/Controllers/Staff/AttractionController.php:25
 * @route '/staff/attractions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Staff\AttractionController::show
 * @see app/Http/Controllers/Staff/AttractionController.php:0
 * @route '/staff/attractions/{attraction}'
 */
export const show = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/staff/attractions/{attraction}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\AttractionController::show
 * @see app/Http/Controllers/Staff/AttractionController.php:0
 * @route '/staff/attractions/{attraction}'
 */
show.url = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attraction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    attraction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attraction: args.attraction,
                }

    return show.definition.url
            .replace('{attraction}', parsedArgs.attraction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\AttractionController::show
 * @see app/Http/Controllers/Staff/AttractionController.php:0
 * @route '/staff/attractions/{attraction}'
 */
show.get = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\AttractionController::show
 * @see app/Http/Controllers/Staff/AttractionController.php:0
 * @route '/staff/attractions/{attraction}'
 */
show.head = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\AttractionController::show
 * @see app/Http/Controllers/Staff/AttractionController.php:0
 * @route '/staff/attractions/{attraction}'
 */
    const showForm = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\AttractionController::show
 * @see app/Http/Controllers/Staff/AttractionController.php:0
 * @route '/staff/attractions/{attraction}'
 */
        showForm.get = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\AttractionController::show
 * @see app/Http/Controllers/Staff/AttractionController.php:0
 * @route '/staff/attractions/{attraction}'
 */
        showForm.head = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Staff\AttractionController::edit
 * @see app/Http/Controllers/Staff/AttractionController.php:45
 * @route '/staff/attractions/{attraction}/edit'
 */
export const edit = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/staff/attractions/{attraction}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\AttractionController::edit
 * @see app/Http/Controllers/Staff/AttractionController.php:45
 * @route '/staff/attractions/{attraction}/edit'
 */
edit.url = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attraction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    attraction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attraction: args.attraction,
                }

    return edit.definition.url
            .replace('{attraction}', parsedArgs.attraction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\AttractionController::edit
 * @see app/Http/Controllers/Staff/AttractionController.php:45
 * @route '/staff/attractions/{attraction}/edit'
 */
edit.get = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\AttractionController::edit
 * @see app/Http/Controllers/Staff/AttractionController.php:45
 * @route '/staff/attractions/{attraction}/edit'
 */
edit.head = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\AttractionController::edit
 * @see app/Http/Controllers/Staff/AttractionController.php:45
 * @route '/staff/attractions/{attraction}/edit'
 */
    const editForm = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\AttractionController::edit
 * @see app/Http/Controllers/Staff/AttractionController.php:45
 * @route '/staff/attractions/{attraction}/edit'
 */
        editForm.get = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\AttractionController::edit
 * @see app/Http/Controllers/Staff/AttractionController.php:45
 * @route '/staff/attractions/{attraction}/edit'
 */
        editForm.head = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Staff\AttractionController::update
 * @see app/Http/Controllers/Staff/AttractionController.php:54
 * @route '/staff/attractions/{attraction}'
 */
export const update = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/staff/attractions/{attraction}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Staff\AttractionController::update
 * @see app/Http/Controllers/Staff/AttractionController.php:54
 * @route '/staff/attractions/{attraction}'
 */
update.url = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attraction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    attraction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attraction: args.attraction,
                }

    return update.definition.url
            .replace('{attraction}', parsedArgs.attraction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\AttractionController::update
 * @see app/Http/Controllers/Staff/AttractionController.php:54
 * @route '/staff/attractions/{attraction}'
 */
update.put = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Staff\AttractionController::update
 * @see app/Http/Controllers/Staff/AttractionController.php:54
 * @route '/staff/attractions/{attraction}'
 */
update.patch = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Staff\AttractionController::update
 * @see app/Http/Controllers/Staff/AttractionController.php:54
 * @route '/staff/attractions/{attraction}'
 */
    const updateForm = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Staff\AttractionController::update
 * @see app/Http/Controllers/Staff/AttractionController.php:54
 * @route '/staff/attractions/{attraction}'
 */
        updateForm.put = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Staff\AttractionController::update
 * @see app/Http/Controllers/Staff/AttractionController.php:54
 * @route '/staff/attractions/{attraction}'
 */
        updateForm.patch = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Staff\AttractionController::destroy
 * @see app/Http/Controllers/Staff/AttractionController.php:78
 * @route '/staff/attractions/{attraction}'
 */
export const destroy = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/attractions/{attraction}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Staff\AttractionController::destroy
 * @see app/Http/Controllers/Staff/AttractionController.php:78
 * @route '/staff/attractions/{attraction}'
 */
destroy.url = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attraction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    attraction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attraction: args.attraction,
                }

    return destroy.definition.url
            .replace('{attraction}', parsedArgs.attraction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\AttractionController::destroy
 * @see app/Http/Controllers/Staff/AttractionController.php:78
 * @route '/staff/attractions/{attraction}'
 */
destroy.delete = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Staff\AttractionController::destroy
 * @see app/Http/Controllers/Staff/AttractionController.php:78
 * @route '/staff/attractions/{attraction}'
 */
    const destroyForm = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Staff\AttractionController::destroy
 * @see app/Http/Controllers/Staff/AttractionController.php:78
 * @route '/staff/attractions/{attraction}'
 */
        destroyForm.delete = (args: { attraction: string | number } | [attraction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const attractions = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default attractions