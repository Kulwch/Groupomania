import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faCog, faUsers, faUser, faQuoteLeft, faQuoteRight, faSignOutAlt, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'
dom.watch()
library.add(faCog, faUsers, faUser, faPhotoVideo, faQuoteRight, faQuoteLeft, faSignOutAlt)


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


createApp(App)
.use(router)

.mount('#app')
