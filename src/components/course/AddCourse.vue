<template>
  <v-container style="max-width: 450px" fill-height>
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card class="pa-3 mb-5">
          <v-card outlined>
            <div id="map"></div>
            <div id="menu_wrap" class="bg_white">
              <input type="text" v-model="keyword" id="keyword" size="15" />
              <v-btn x-small @click="searchPlace">검색하기</v-btn>
            </div>
          </v-card>
          <v-text-field
            outlined
            dense
            :value="addressAndName"
            class="mt-3"
          ></v-text-field>
          <v-text-field label="CourseName" outlined dense></v-text-field>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            offset-y
            min-width="auto"
            outlined
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Date range"
                v-bind="attrs"
                v-on="on"
                readonly
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker v-model="dates" no-title range></v-date-picker>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-menu>
          <v-card outlined class="mb-10">
            <!-- 강의 계획 리스트 -->
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">요일</th>
                    <th class="text-center">시간</th>
                    <th class="text-center">과제</th>
                    <th class="text-center">시험</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in infos" :key="index">
                    <td class="text-center">{{ item.day }}</td>
                    <td class="text-center">
                      {{ item.startTime }}~{{ item.endTime }}
                    </td>
                    <td class="text-center">
                      <v-checkbox
                        v-model="infos[index].existAssignment"
                        class="d-inline-flex"
                      ></v-checkbox>
                    </td>
                    <td class="text-center">
                      <v-select
                        id="testSelect"
                        :items="testList"
                        v-model="infos[index].testType"
                      ></v-select>
                    </td>
                    <td>
                      <v-icon color="red" @click="removeLecture(index)"
                        >mdi-alpha-x-circle</v-icon
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-divider v-if="infos.length > 0"></v-divider>
            <!-- 강의 계획 입력 -->
            <v-row class="mx-auto" align="baseline" justify="center">
              <v-col cols="3">
                <v-select
                  v-model="selectedDay"
                  :items="days"
                  label="요일"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-dialog
                  ref="dialogStart"
                  v-model="showStartTime"
                  :return-value.sync="startTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startTime"
                      label="시작"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="showStartTime"
                    v-model="startTime"
                    ampm-in-title
                    full-width
                    :max="endTime"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="showStartTime = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialogStart.save(startTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
              <v-col cols="3">
                <v-dialog
                  ref="dialogEnd"
                  v-model="showEndTime"
                  :return-value.sync="endTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endTime"
                      label="끝"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="showEndTime"
                    v-model="endTime"
                    ampm-in-title
                    full-width
                    :min="startTime"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="showEndTime = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialogEnd.save(endTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
              <v-col cols="2">
                <v-btn @click="addLectureTime" :disabled="!isCanAdded"
                  >추가</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
          <v-textarea
            v-model="detail"
            label="강의 상세"
            auto-grow
            outlined
          ></v-textarea>
          <v-row justify="center" class="mb-1">
            <v-btn outlined class="mx-auto" @click="registCourse"
              >강좌등록</v-btn
            >
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "AddCourese",
  data() {
    return {
      ps: {},
      infoWindow: null,
      markers: [],
      keyword: "",
      address: " ",
      name: "",
      menu: false,
      dates: [],
      number: "",
      title: "",
      infos: [],
      days: ["월", "화", "수", "목", "금", "토", "일"],
      selectedDay: "",
      showStartTime: false,
      showEndTime: false,
      startTime: "",
      endTime: "",
      detail: "",
      testList: ["없음", "리뷰"],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      const appKey = "61fe0d6fd3c254bbcecb1bf376fa045b";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services`;
      document.head.appendChild(script);
    }
  },
  computed: {
    addressAndName() {
      return this.address + " " + this.name;
    },
    dateRangeText() {
      if (this.dates[0] > this.dates[1]) {
        [this.dates[0], this.dates[1]] = [this.dates[1], this.dates[0]];
      }
      return this.dates.join(" ~ ");
    },
    isCanAdded() {
      if (
        this.selectedDay === "" ||
        this.startTime === "" ||
        this.endTime === ""
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      // 장소 검색 객체를 생성합니다
      this.ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      this.infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    },
    searchPlace() {
      if (!this.keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요! ");
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      this.ps.keywordSearch(this.keyword, this.placesSearchCB);
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    },
    displayPlaces(places) {
      let bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = this.addMarker(placePosition, i);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        ((marker, title, address) => {
          kakao.maps.event.addListener(marker, "mouseover", () => {
            this.displayInfowindow(marker, title, address);
          });

          kakao.maps.event.addListener(marker, "mouseout", () => {
            this.infoWindow.close();
          });

          kakao.maps.event.addListener(marker, "click", () => {
            this.name = title;
            this.address = address;
          });
        })(marker, places[i].place_name, places[i].address_name);
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.map.setBounds(bounds);
    },
    // 검색결과 항목을 Element로 반환하는 함수입니다
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, idx) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    displayInfowindow(marker, title) {
      let content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      this.infoWindow.setContent(content);
      this.infoWindow.open(this.map, marker);
    },
    addLectureTime() {
      this.infos.push({
        day: this.selectedDay,
        startTime: this.startTime,
        endTime: this.endTime,
        existAssignment: false,
        existTest: false,
        testType: "",
      });
      this.selectedDay = "";
      this.startTime = "";
      this.endTime = "";
    },
    removeLecture(index) {
      this.infos.splice(index, 1);
    },
    registCourse() {
      // 강좌등록 api확정되면 변경 예정
    },
  },
};
</script>

<style>
#map {
  min-height: 25vh;
}
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgb(255, 255, 255);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
.name-card {
  border: 1px black;
  height: 40px;
  margin-top: 10px;
}
#testSelect {
  width: 30px;
}
</style>