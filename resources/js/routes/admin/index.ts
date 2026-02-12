import users from './users'
import attractions from './attractions'
import businesses from './businesses'
import events from './events'
const admin = {
    users: Object.assign(users, users),
attractions: Object.assign(attractions, attractions),
businesses: Object.assign(businesses, businesses),
events: Object.assign(events, events),
}

export default admin