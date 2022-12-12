import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { faCaretSquareUp } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faSquareCheck, faSquareMinus, faCaretSquareDown, faCaretSquareUp, faBell, faEnvelope, faEnvelopeOpen, faXmark, faPen, faMagnifyingGlass);
Vue.component("font-awesome-icon", FontAwesomeIcon);
