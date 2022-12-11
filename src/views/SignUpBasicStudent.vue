<template>
    <v-form ref="form" v-model="isFormValid" @submit.prevent="signUp">
        <v-container>
            <v-card
                class="mx-auto pa-12"
                elevation="8"
                max-width="448"
                rounded="lg"
            >
                <v-row>
                    <v-col cols="12">
                        <h1 class="text-center">회원가입</h1>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field 
                            v-model="user_name" 
                            label="이름" 
                            :rules="user_name_rule" 
                            required
                            append-icon=mdi-account-plus
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="d-flex">
                            <v-text-field 
                                class='email-placeholder'
                                v-model="user_email" 
                                label="이메일을 입력하세요" 
                                :rules="user_email_rule"
                                outlined
                            ></v-text-field>
                            <v-btn 
                                class="ml-3"
                                :disabled="!isIdFormat"
                                v-on:click="checkDuplicate"
                                x-large 
                                color="#62929E"
                                >계정 확인
                            </v-btn>  
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" >
                        <v-text-field 
                            v-model="user_pw" 
                            label="비밀번호" 
                            :type="show ? 'text' : 'password'" 
                            :rules="user_pw_rule"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show=!show"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field 
                            v-model="user_pw_chk" 
                            label="비밀번호 재확인" 
                            :type="show2 ? 'text' : 'password'" 
                            :rules="user_pw_rule2"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show2=!show2"
                            outlined
                        ></v-text-field>
                        
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="d-flex">
                            <v-text-field 
                                class='phone-placeholder'
                                v-model="user_phone" 
                                label="휴대전화" 
                                :rules="user_phone_rule"
                                placeholder="'-'를 제외하고 입력하세요"
                                outlined
                            ></v-text-field>
                            <v-btn 
                                class="ml-3"
                                :disabled="!isPhoneFormat"
                                v-on:click="get_certificate"
                                x-large 
                                color="#62929E"
                                >인증번호 받기
                            </v-btn>  
                        </div>
                    </v-col>
                </v-row>
                <v-row v-if="certificationNumber">
                    <v-col cols="12">
                        <v-text-field 
                            v-model="user_phone_check" 
                            label="인증번호를 입력하세요" 
                            :disabled="!isPhoneFormat || !phone_check" 
                            filled
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="d-flex">
                            <v-text-field 
                                v-model="user_school" 
                                label="학교명" 
                                disabled
                                required
                                :rules="user_school_rule"
                                outlined
                            ></v-text-field>
                            <v-btn 
                                class="ml-3"
                                v-on:click="searchSchool"
                                x-large 
                                color="#62929E"
                                >학교 검색하기
                            </v-btn>  
                        </div>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-select
                            v-model="user_grade"
                            label="학년"
                            :items="gradeList"
                            item-text="grade"
                            item-value="value"
                            :rules="user_grade_rule"
                            required
                            outlined
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row> 
                    <v-col cols="12">
                        <v-radio-group
                            class="pb-2"
                            v-model="user_parent"
                            row
                            dense
                        >
                            <v-radio
                                label="아버지"
                                value="부"
                            ></v-radio>
                            <v-radio
                                label="어머니"
                                value="모"
                            ></v-radio>
                        </v-radio-group>
                        <v-text-field 
                            class='phone-placeholder'
                            v-model="user_parent_phone" 
                            label="부모님 휴대전화" 
                            :rules="user_parent_phone_rule"
                            placeholder="'-'를 제외하고 입력하세요"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="computedDateFormatted"
                                    label="생년월일 입력"
                                    hint="클릭해서 설정하십시오"
                                    persistent-hint
                                    append-icon=mdi-calendar
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date" 
                                    @input="menu2 = false"
                                    class="custom-picker"
                                    no-title
                                    :weekday-format="getDay"
                                    :month-format="getMonth"
                                    :header-date-format="getHeaderTitleMonth"
                                ></v-date-picker>
                            </v-menu>
                    </v-col>
                </v-row>
                <v-btn @click="signUp" :disabled="!isFormValid">회원가입</v-btn>
                <div v-if="isModalOn" class='modal-background'>
                    <school-search class='school-modal-container' :user_school="user_school" :setModalOn="setModalOn" @setSchool="setSchool"></school-search>
                </div>
            </v-card>
        </v-container>
    </v-form>
</template>
<script>
import http from "@/api/http";
import SchoolSearch from "@/components/SchoolSearch.vue"
export default {
    name: "SignUpBasicStudent",
    components: {
        SchoolSearch
    },
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.date)
        }
    },
    watch:{
        date (val) {
            this.user_birth = val;
            console.log(this.user_birth);
            this.dateFormatted = this.formatDate(this.date)
        }
    },
    data() {
        return {
            certificationNumber: '',
            isModalOn:false,
            dialog: false,
            state: 'ins',
            isIdFormat : false,
            phone_check : false,
            isPhoneFormat : false,
            user_name: '',
            user_name_rule: [
                v => !!v || '이름은 필수 입력사항입니다.',
                v => !(v && v.length >= 30) || '이름은 30자 이상 입력할 수 없습니다.',
                v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.'
            ],
            user_email: '',
            user_email_rule: [
                v => !!v || '이메일은 필수 입력 사항입니다.',
                v => /.+@.+/.test(v) || '유효하지 않은 이메일입니다.',
            ],
            user_pw: '',
            show:false,
            user_pw_chk: '',
            show2:false,
            user_pw_rule: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length < 8) || '패스워드는 8자리 이상 입력하세요',
                v => !!(v && /[^A-Za-z0-9]/.test(v)) || '하나 이상의 특수 문자가 포함되어야 합니다',
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
            ],
            user_pw_rule2: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length < 8) || '패스워드는 8자리 이상 입력하세요',
                v => !!(v && /[^A-Za-z0-9]/.test(v)) || '하나 이상의 특수 문자가 포함되어야 합니다',
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
                v => v === this.user_pw || '패스워드가 일치하지 않습니다.'
            ],
            user_phone: '',
            user_phone_rule: [
                v => !!v || '휴대폰은 필수 입력 사항입니다.',
                v => /^(?:(010\d{4})|(070\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/.test(v) || '유효하지 않은 번호입니다.',
            ],
            user_phone_check: '',
            user_school: '',
            user_school_rule: [
                v => !!v || '학교명은 필수 입력 사항입니다.',
            ],
            user_grade: '',
            gradeList: [
                {grade: '1학년', value: '1'},
                {grade: '2학년', value: '2'},
                {grade: '3학년', value: '3'},
                {grade: '4학년', value: '4'},
                {grade: '5학년', value: '5'},
                {grade: '6학년', value: '6'},
                {grade: 'N수생', value: '7'},
            ],
            user_grade_rule: [
                v => !!v || '학년은 필수 선택 사항입니다.'
            ],
            user_parent: '',
            user_parent_phone: '',
            user_parent_phone_rule: [
                v => !!v || '휴대폰은 필수 입력 사항입니다.',
                v => /^(?:(010\d{4})|(070\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/.test(v) || '유효하지 않은 번호입니다.',
            ],
            user_birth: '',
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu2: false,
            isFormValid: false,
        }
    },
    methods: {
        checkDuplicate(){
            alert("아이디 체크");
        },
        get_certificate(){

            this.certificationNumber = '1234';
            alert('인증번호 전송하기');
            this.phone_check = true;
        },
        searchSchool(){
            this.isModalOn = true;
            document.documentElement.style.overflow = 'hidden'
        },
        setSchool(name){    
            this.user_school = name;
        },
        setModalOn(){
            this.isModalOn = !this.isModalOn;
            if(this.isModalOn){
                console.log('hit')
                document.documentElement.style.overflow = 'hidden'
            }else{
                console.log('i')
                document.documentElement.style.overflow = 'auto'
            }
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${year}년 ${month}월 ${day}일`
        },
        getDay(date) {
            const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
            let i = new Date(date).getDay(date);
            return daysOfWeek[i];
        },
        getMonth(date) {
            const monthName = [
                '1월',
                '2월',
                '3월',
                '4월',
                '5월',
                '6월',
                '7월',
                '8월',
                '9월',
                '10월',
                '11월',
                '12월',
            ];

            let i = new Date(date).getMonth(date);
            return monthName[i];
        },
        getHeaderTitleMonth(date) {
            const monthName = [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
            ];
            let i = new Date(date).getMonth(date);
            const year = new Date(date).getFullYear(date);
            const month = monthName[i];
            return `${year}년 ${month}`;
        },
        async signUp(){
            const validate = this.$refs.form.validate();
            if(validate){
                // alert("회원가입 실시");
                console.log(this.user_name);
                console.log(this.user_email);
                console.log(this.user_pw);
                console.log(this.user_phone);
                console.log(this.user_school);
                console.log(this.user_grade);
                console.log(this.user_parent);
                console.log(this.user_parent_phone);
                console.log(this.user_birth);

                http.post('/auth/signup', {
                    userId: this.user_email,
                    password: this.user_pw,
                    name: this.user_name,
                    phone: this.user_phone,
                    role: 'ROLE_STUDENT',
                    birthDate: this.user_birth,
                    schoolName: this.user_school,
                    grade: this.user_grade,
                    parent: this.user_parent,
                    parentPhone: this.user_parent_phone
                }).then(()=>{
                    alert("회원가입이 성공했습니다.");
                    this.$router.push("/");
                }).catch(()=>{
                    alert("회원가입에 실패했습니다.");
                    this.$router.push("/");
                })
            }
        }
    },
    mounted() {
        const emailPlaceHolder = document.querySelector('.email-placeholder');

        emailPlaceHolder.addEventListener('input', (e) => {
            let Regex = new RegExp(/.+@.+/);
            
            if(Regex.test(e.target._value) && e.target._value.length>0){
                this.isIdFormat = true;
            }else{
                this.isIdFormat = false;
            }
        })

        const cellPhonePlaceHolder = document.querySelector('.phone-placeholder');
        
        cellPhonePlaceHolder.addEventListener('input' , (e) => {
            console.log('event 발생!');
            let Regex = new RegExp(/[0][17][01][0-9]{8}/);
            
            if(Regex.test(e.target._value) && e.target._value.length === 11){
                this.isPhoneFormat = true;
            }else{
                this.isPhoneFormat = false;
            }
        })
    },
}
</script>

<style>
</style>