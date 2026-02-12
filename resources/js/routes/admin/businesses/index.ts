import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BusinessController::index
 * @see app/Http/Controllers/Admin/BusinessController.php:13
 * @route '/admin/businesses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/businesses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BusinessController::index
 * @see app/Http/Controllers/Admin/BusinessController.php:13
 * @route '/admin/businesses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessController::index
 * @see app/Http/Controllers/Admin/BusinessController.php:13
 * @route '/admin/businesses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BusinessController::index
 * @see app/Http/Controllers/Admin/BusinessController.php:13
 * @route '/admin/businesses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessController::index
 * @see app/Http/Controllers/Admin/BusinessController.php:13
 * @route '/admin/businesses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessController::index
 * @see app/Http/Controllers/Admin/BusinessController.php:13
 * @route '/admin/businesses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessController::index
 * @see app/Http/Controllers/Admin/BusinessController.php:13
 * @route '/admin/businesses'
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
* @see \App\Http\Controllers\Admin\BusinessController::create
 * @see app/Http/Controllers/Admin/BusinessController.php:20
 * @route '/admin/businesses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/businesses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BusinessController::create
 * @see app/Http/Controllers/Admin/BusinessController.php:20
 * @route '/admin/businesses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessController::create
 * @see app/Http/Controllers/Admin/BusinessController.php:20
 * @route '/admin/businesses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BusinessController::create
 * @see app/Http/Controllers/Admin/BusinessController.php:20
 * @route '/admin/businesses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessController::create
 * @see app/Http/Controllers/Admin/BusinessController.php:20
 * @route '/admin/businesses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessController::create
 * @see app/Http/Controllers/Admin/BusinessController.php:20
 * @route '/admin/businesses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessController::create
 * @see app/Http/Controllers/Admin/BusinessController.php:20
 * @route '/admin/businesses/create'
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
* @see \App\Http\Controllers\Admin\BusinessController::store
 * @see app/Http/Controllers/Admin/BusinessController.php:25
 * @route '/admin/businesses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/businesses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BusinessController::store
 * @see app/Http/Controllers/Admin/BusinessController.php:25
 * @route '/admin/businesses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessController::store
 * @see app/Http/Controllers/Admin/BusinessController.php:25
 * @route '/admin/businesses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessController::store
 * @see app/Http/Controllers/Admin/BusinessController.php:25
 * @route '/admin/businesses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessController::store
 * @see app/Http/Controllers/Admin/BusinessController.php:25
 * @route '/admin/businesses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\BusinessController::show
 * @see app/Http/Controllers/Admin/BusinessController.php:0
 * @route '/admin/businesses/{business}'
 */
export const show = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/businesses/{business}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BusinessController::show
 * @see app/Http/Controllers/Admin/BusinessController.php:0
 * @route '/admin/businesses/{business}'
 */
show.url = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    business: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        business: args.business,
                }

    return show.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessController::show
 * @see app/Http/Controllers/Admin/BusinessController.php:0
 * @route '/admin/businesses/{business}'
 */
show.get = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BusinessController::show
 * @see app/Http/Controllers/Admin/BusinessController.php:0
 * @route '/admin/businesses/{business}'
 */
show.head = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessController::show
 * @see app/Http/Controllers/Admin/BusinessController.php:0
 * @route '/admin/businesses/{business}'
 */
    const showForm = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessController::show
 * @see app/Http/Controllers/Admin/BusinessController.php:0
 * @route '/admin/businesses/{business}'
 */
        showForm.get = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessController::show
 * @see app/Http/Controllers/Admin/BusinessController.php:0
 * @route '/admin/businesses/{business}'
 */
        showForm.head = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\BusinessController::edit
 * @see app/Http/Controllers/Admin/BusinessController.php:46
 * @route '/admin/businesses/{business}/edit'
 */
export const edit = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/businesses/{business}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BusinessController::edit
 * @see app/Http/Controllers/Admin/BusinessController.php:46
 * @route '/admin/businesses/{business}/edit'
 */
edit.url = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    business: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        business: args.business,
                }

    return edit.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessController::edit
 * @see app/Http/Controllers/Admin/BusinessController.php:46
 * @route '/admin/businesses/{business}/edit'
 */
edit.get = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BusinessController::edit
 * @see app/Http/Controllers/Admin/BusinessController.php:46
 * @route '/admin/businesses/{business}/edit'
 */
edit.head = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessController::edit
 * @see app/Http/Controllers/Admin/BusinessController.php:46
 * @route '/admin/businesses/{business}/edit'
 */
    const editForm = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessController::edit
 * @see app/Http/Controllers/Admin/BusinessController.php:46
 * @route '/admin/businesses/{business}/edit'
 */
        editForm.get = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessController::edit
 * @see app/Http/Controllers/Admin/BusinessController.php:46
 * @route '/admin/businesses/{business}/edit'
 */
        editForm.head = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\BusinessController::update
 * @see app/Http/Controllers/Admin/BusinessController.php:55
 * @route '/admin/businesses/{business}'
 */
export const update = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/businesses/{business}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\BusinessController::update
 * @see app/Http/Controllers/Admin/BusinessController.php:55
 * @route '/admin/businesses/{business}'
 */
update.url = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    business: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        business: args.business,
                }

    return update.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessController::update
 * @see app/Http/Controllers/Admin/BusinessController.php:55
 * @route '/admin/businesses/{business}'
 */
update.put = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\BusinessController::update
 * @see app/Http/Controllers/Admin/BusinessController.php:55
 * @route '/admin/businesses/{business}'
 */
update.patch = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessController::update
 * @see app/Http/Controllers/Admin/BusinessController.php:55
 * @route '/admin/businesses/{business}'
 */
    const updateForm = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessController::update
 * @see app/Http/Controllers/Admin/BusinessController.php:55
 * @route '/admin/businesses/{business}'
 */
        updateForm.put = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessController::update
 * @see app/Http/Controllers/Admin/BusinessController.php:55
 * @route '/admin/businesses/{business}'
 */
        updateForm.patch = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\BusinessController::destroy
 * @see app/Http/Controllers/Admin/BusinessController.php:80
 * @route '/admin/businesses/{business}'
 */
export const destroy = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/businesses/{business}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BusinessController::destroy
 * @see app/Http/Controllers/Admin/BusinessController.php:80
 * @route '/admin/businesses/{business}'
 */
destroy.url = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    business: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        business: args.business,
                }

    return destroy.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessController::destroy
 * @see app/Http/Controllers/Admin/BusinessController.php:80
 * @route '/admin/businesses/{business}'
 */
destroy.delete = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessController::destroy
 * @see app/Http/Controllers/Admin/BusinessController.php:80
 * @route '/admin/businesses/{business}'
 */
    const destroyForm = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessController::destroy
 * @see app/Http/Controllers/Admin/BusinessController.php:80
 * @route '/admin/businesses/{business}'
 */
        destroyForm.delete = (args: { business: string | number } | [business: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const businesses = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default businesses