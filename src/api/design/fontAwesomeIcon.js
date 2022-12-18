import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faMinus,
  faUserPlus,
  faPeopleLine,
  faCircleCheck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlus,
  faMinus,
  faUserPlus,
  faPeopleLine,
  faCircleCheck,
  faCheckCircle,
  faUserGroup
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
