<template>
    <v-card
        class="mx-auto"
        max-width="400"
        style='border-radius:15px;'
    >
        <v-card-title class="white--text darken-4" style="background-color: #62929e">
            <h4 class="text-center">학교 검색</h4> 
        </v-card-title>
        <v-card-text class="pt-4">
            <v-row>
                <v-col>
                    <div class="d-flex">
                        <v-text-field
                            v-model="schoolName" 
                            label="학교명" 
                            required
                            @keyup.enter="searchSchool"
                        ></v-text-field>
                        <v-btn 
                            class="schoolSearch ml-3"
                            v-on:click="searchSchool"
                            x-large 
                            color="#62929E"
                            >검색
                        </v-btn>  
                    </div>
                </v-col>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-virtual-scroll
            :items="this.schools"
            :item-height="80"
            height="300"
        >
        <template v-slot="{ item }">
            <v-list-item @click="handleClick(item)">
                <v-list-item-content>
                    <v-list-item-title class="moveShowing">{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle class="moveShowing">{{ item.address }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn
                        depressed
                        small
                        :href="`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${item.address} ${item.name}`"
                        target="_blank"
                    >
                    위치보기
                    <v-icon
                        color="orange darken-4"
                        right
                    >
                        mdi-open-in-new
                    </v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </template>
        </v-virtual-scroll>
    </v-card>
</template>

<script>
import { 
    getApiInstance,
} from "@/api/index"
const api = getApiInstance();
export default {
    props : {
        userSchool : String,
        setModalOn : Function
    },
    watch:{
        userSchool :function(){
            console.log(this.userSchool)
        }
    },
    data: () => ({
        schoolName: '',
        schools: [],
    }),

    methods: {
        genRandomIndex (length) {
            return Math.ceil(Math.random() * (length - 1))
        },
        enterkey(){
            if (window.event.keyCode == 13) {
                // 엔터키가 눌림
                this.searchSchool();
            }
        },
        async searchSchool(){
            this.schools = [];
            const SERVICE_URL = 
                `https://open.neis.go.kr/hub/schoolInfo?key=bdbf6ceb247640308638aa55bdd26bef&type=json&schul_nm=${this.schoolName}`;
            await api
                .get(SERVICE_URL)
                .then(({data}) => {
                    // console.log(data.schoolInfo[1].row);
                    data.schoolInfo[1].row.forEach((school)=>{
                    this.schools.push({address: school.ORG_RDNMA, name: school.SCHUL_NM});
                    })
                })
                // console.log(this.schools);
        },
        handleClick(row){
            console.log('클릭했음', row);
            this.$emit("setSchool", row.name);
            this.setModalOn()
        }
    },

    mounted(){
        const modalBack = document.querySelector('.modal-background');
        const modal = document.querySelector('.school-modal-container');

        modalBack.addEventListener('click' , (e) => {
            if(modal.contains(e.target) || e.target === modal){
                return;
            }else{
                this.setModalOn()
            }

        })

        document.querySelector(".schoolSearch").addEventListener('keypress', function(e){
            // console.log(e);
            if(e.key === 'Enter' && this.schoolName.length!=0){
                // console.log('hit');
                this.searchSchool(this.schoolName);
            }
        })
    }
}
</script>

<style>
    .moveShowing:hover {
        overflow: visible;
        white-space: normal;
        height: auto;
    }
</style>
