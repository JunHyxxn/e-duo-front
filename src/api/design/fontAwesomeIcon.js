import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faMinus,
  faUserPlus,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus, faUserPlus, faPeopleLine);
Vue.component("font-awesome-icon", FontAwesomeIcon);
