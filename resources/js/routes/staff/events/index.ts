import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Staff\EventController::index
 * @see app/Http/Controllers/Staff/EventController.php:13
 * @route '/staff/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\EventController::index
 * @see app/Http/Controllers/Staff/EventController.php:13
 * @route '/staff/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\EventController::index
 * @see app/Http/Controllers/Staff/EventController.php:13
 * @route '/staff/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\EventController::index
 * @see app/Http/Controllers/Staff/EventController.php:13
 * @route '/staff/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\EventController::index
 * @see app/Http/Controllers/Staff/EventController.php:13
 * @route '/staff/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\EventController::index
 * @see app/Http/Controllers/Staff/EventController.php:13
 * @route '/staff/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\EventController::index
 * @see app/Http/Controllers/Staff/EventController.php:13
 * @route '/staff/events'
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
* @see \App\Http\Controllers\Staff\EventController::create
 * @see app/Http/Controllers/Staff/EventController.php:20
 * @route '/staff/events/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/staff/events/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\EventController::create
 * @see app/Http/Controllers/Staff/EventController.php:20
 * @route '/staff/events/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\EventController::create
 * @see app/Http/Controllers/Staff/EventController.php:20
 * @route '/staff/events/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\EventController::create
 * @see app/Http/Controllers/Staff/EventController.php:20
 * @route '/staff/events/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\EventController::create
 * @see app/Http/Controllers/Staff/EventController.php:20
 * @route '/staff/events/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\EventController::create
 * @see app/Http/Controllers/Staff/EventController.php:20
 * @route '/staff/events/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\EventController::create
 * @see app/Http/Controllers/Staff/EventController.php:20
 * @route '/staff/events/create'
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
* @see \App\Http\Controllers\Staff\EventController::store
 * @see app/Http/Controllers/Staff/EventController.php:25
 * @route '/staff/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Staff\EventController::store
 * @see app/Http/Controllers/Staff/EventController.php:25
 * @route '/staff/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\EventController::store
 * @see app/Http/Controllers/Staff/EventController.php:25
 * @route '/staff/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Staff\EventController::store
 * @see app/Http/Controllers/Staff/EventController.php:25
 * @route '/staff/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Staff\EventController::store
 * @see app/Http/Controllers/Staff/EventController.php:25
 * @route '/staff/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Staff\EventController::show
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
export const show = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/staff/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\EventController::show
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
show.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return show.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\EventController::show
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
show.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\EventController::show
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
show.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\EventController::show
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
    const showForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\EventController::show
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
        showForm.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\EventController::show
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
        showForm.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Staff\EventController::edit
 * @see app/Http/Controllers/Staff/EventController.php:40
 * @route '/staff/events/{event}/edit'
 */
export const edit = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/staff/events/{event}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Staff\EventController::edit
 * @see app/Http/Controllers/Staff/EventController.php:40
 * @route '/staff/events/{event}/edit'
 */
edit.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return edit.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\EventController::edit
 * @see app/Http/Controllers/Staff/EventController.php:40
 * @route '/staff/events/{event}/edit'
 */
edit.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Staff\EventController::edit
 * @see app/Http/Controllers/Staff/EventController.php:40
 * @route '/staff/events/{event}/edit'
 */
edit.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Staff\EventController::edit
 * @see app/Http/Controllers/Staff/EventController.php:40
 * @route '/staff/events/{event}/edit'
 */
    const editForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Staff\EventController::edit
 * @see app/Http/Controllers/Staff/EventController.php:40
 * @route '/staff/events/{event}/edit'
 */
        editForm.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Staff\EventController::edit
 * @see app/Http/Controllers/Staff/EventController.php:40
 * @route '/staff/events/{event}/edit'
 */
        editForm.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Staff\EventController::update
 * @see app/Http/Controllers/Staff/EventController.php:46
 * @route '/staff/events/{event}'
 */
export const update = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/staff/events/{event}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Staff\EventController::update
 * @see app/Http/Controllers/Staff/EventController.php:46
 * @route '/staff/events/{event}'
 */
update.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return update.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\EventController::update
 * @see app/Http/Controllers/Staff/EventController.php:46
 * @route '/staff/events/{event}'
 */
update.put = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Staff\EventController::update
 * @see app/Http/Controllers/Staff/EventController.php:46
 * @route '/staff/events/{event}'
 */
update.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Staff\EventController::update
 * @see app/Http/Controllers/Staff/EventController.php:46
 * @route '/staff/events/{event}'
 */
    const updateForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Staff\EventController::update
 * @see app/Http/Controllers/Staff/EventController.php:46
 * @route '/staff/events/{event}'
 */
        updateForm.put = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Staff\EventController::update
 * @see app/Http/Controllers/Staff/EventController.php:46
 * @route '/staff/events/{event}'
 */
        updateForm.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Staff\EventController::destroy
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
export const destroy = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/events/{event}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Staff\EventController::destroy
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
destroy.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return destroy.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Staff\EventController::destroy
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
destroy.delete = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Staff\EventController::destroy
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
    const destroyForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Staff\EventController::destroy
 * @see app/Http/Controllers/Staff/EventController.php:0
 * @route '/staff/events/{event}'
 */
        destroyForm.delete = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const events = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default events