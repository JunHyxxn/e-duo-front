import Vue from "vue";
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                accent: "#051367",
                primary: "#1F4690",
                success: "#066163",
                secondary: "#D8D9CF",
                info: "#222831",
                anchor: "#393E46",
                error: "#EA5455",
                warning: "#F8B739",
            },
        },
    },
});