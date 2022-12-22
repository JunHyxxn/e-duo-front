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
                            v-model="userName" 
                            label="이름" 
                            :rules="userName_rule" 
                            required
                            append-icon=mdi-account-plus
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="this.userInfo==null">
                    <v-col cols="12">
                        <div class="d-flex">
                            <v-text-field 
                                class='email-placeholder'
                                :disabled="finalValidateUserEmail" 
                                v-model="userEmail" 
                                label="이메일을 입력하세요" 
                                :rules="userEmail_rule"
                                outlined
                            ></v-text-field>
                            <v-btn 
                                class="ml-3"
                                :disabled="!isIdFormat || finalValidateUserEmail"
                                v-on:click="get_certificate_email"
                                x-large 
                                color="#62929E"
                                >계정 확인
                            </v-btn>  
                        </div>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12">
                        <div class="d-flex">
                            <v-text-field 
                                class='email-placeholder'
                                disabled
                                v-model="this.userInfo.userId"
                                outlined
                            ></v-text-field>
                            <v-btn 
                                class="ml-3"
                                :disabled="!isIdFormat || finalValidateUserEmail"
                                v-on:click="get_certificate_email"
                                x-large 
                                color="#62929E"
                                >카카오 계정
                            </v-btn>  
                        </div>
                    </v-col>
                </v-row>
                <v-row v-if="this.emailCertificationCopy">
                    <v-col cols="12">
                        <v-text-field 
                            v-model="userEmailCheck" 
                            label="이메일로 전송된 인증번호를 입력하세요" 
                            :disabled="finalValidateUserEmail" 
                            filled
                            append-icon=mdi-send
                            @click:append='confirmEmail'
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="this.userInfo==null">
                    <v-col cols="12" >
                        <v-text-field 
                            v-model="userPw" 
                            label="비밀번호" 
                            :type="show ? 'text' : 'password'" 
                            :rules="userPw_rule"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show=!show"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="this.userInfo==null">
                    <v-col cols="12">
                        <v-text-field 
                            v-model="userPwChk" 
                            label="비밀번호 재확인" 
                            :type="show2 ? 'text' : 'password'" 
                            :rules="userPw_rule2"
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
                                :disabled="finalValidateUserPhone"
                                v-model="userPhone" 
                                label="휴대전화" 
                                :rules="userPhone_rule"
                                placeholder="'-'를 제외하고 입력하세요"
                                outlined
                            ></v-text-field>
                            <v-btn 
                                class="ml-3"
                                :disabled="!isPhoneFormat || finalValidateUserPhone"
                                v-on:click="get_certificate_phone"
                                x-large 
                                color="#62929E"
                                >인증번호 받기
                            </v-btn>  
                        </div>
                    </v-col>
                </v-row>
                <v-row v-if="this.phoneCertificationCopy">
                    <v-col cols="12">
                        <v-text-field 
                            v-model="userPhoneCheck" 
                            label="휴대전화로 전송된 인증번호를 입력하세요" 
                            :disabled="finalValidateUserPhone" 
                            filled
                            append-icon=mdi-send
                            @click:append='confirmPhone'
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" >
                        <v-text-field 
                            v-model="userTeacherUserId" 
                            label="담당 강사님 계정 입력"
                            :rules="userTeacherUserId_rule"
                            append-icon=mdi-account-star
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-btn @click="signUp" :disabled="!isFormValid || !finalValidateUserPhone || !finalValidateUserEmail">회원가입</v-btn>
            </v-card>
        </v-container>
    </v-form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "SignUpBasicAssistant",
    computed: {
        ...mapState("userStore", ["emailCertification", "phoneCertification", "userInfo"]),
    },
    created(){
        console.log('create', this.userInfo);
        if(this.userInfo){
            this.userEmail = this.userInfo.userId;
            this.finalValidateUserEmail = true;
        }
    },
    data() {
        return {
            dialog: false,
            state: 'ins',
            isIdFormat : false,
            isPhoneFormat : false,
            userName: '',
            userName_rule: [
                v => !!v || '이름은 필수 입력사항입니다.',
                v => !(v && v.length >= 30) || '이름은 30자 이상 입력할 수 없습니다.',
                v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.'
            ],
            userEmail: '',
            userEmail_rule: [
                v => !!v || '이메일은 필수 입력 사항입니다.',
                v => /.+@.+/.test(v) || '유효하지 않은 이메일입니다.',
            ],
            userEmailCheck: '',
            emailCertificationCopy: '',
            finalValidateUserEmail: false,
            userPw: '',
            userPwChk: '',
            userPw_rule: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length < 8) || '패스워드는 8자리 이상 입력하세요',
                v => !!(v && /[^A-Za-z0-9]/.test(v)) || '하나 이상의 특수 문자가 포함되어야 합니다',
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
            ],
            userPw_rule2: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length < 8) || '패스워드는 8자리 이상 입력하세요',
                v => !!(v && /[^A-Za-z0-9]/.test(v)) || '하나 이상의 특수 문자가 포함되어야 합니다',
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
                v => v === this.userPw || '패스워드가 일치하지 않습니다.'
            ],
            show:false,
            show2:false,
            userPhone: '',
            userPhone_rule: [
                v => !!v || '휴대폰은 필수 입력 사항입니다.',
                v => /^(?:(010\d{4})|(070\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/.test(v) || '유효하지 않은 번호입니다.',
            ],
            userPhoneCheck: '',
            phoneCertificationCopy: '',
            finalValidateUserPhone: false,
            userTeacherUserId: null,
            userTeacherUserId_rule:[
                v => !!v || '담당 강사님 계정은 필수 입력 사항입니다.',
            ],
            isFormValid: false,
        }
    },
    methods: {
        ...mapActions("userStore", ["emailSending", "phoneSending", "signUpAssistant"]),
        async get_certificate_email(){
            await this.emailSending(this.userEmail);
            this.userEmailCheck = '';
            this.finalValidateUserEmail = false;
            this.emailCertificationCopy = this.emailCertification;
        },
        async get_certificate_phone(){
            // await this.phoneSending(this.userPhone);
            this.userPhoneCheck = '';
            this.finalValidateUserPhone = false;
            this.phoneCertificationCopy = '1234';
            // this.phoneCertificationCopy = this.phoneCertification;
        },
        confirmEmail(){
            if(this.userEmailCheck == this.emailCertificationCopy){
                alert('확인되었습니다');
                this.finalValidateUserEmail = true;
            }else{
                alert('인증번호가 틀렸습니다.');
                this.userEmailCheck = '';
            }
        },
        confirmPhone(){
            if(this.userPhoneCheck == this.phoneCertificationCopy){
                alert('확인되었습니다');
                this.finalValidateUserPhone = true;
            }else{
                alert('인증번호가 틀렸습니다.');
                this.userPhoneCheck = '';
            }
        },
        async signUp(){
            const validate = this.$refs.form.validate();
            if(validate){
                // alert("회원가입 실시");
                // console.log(this.userName);
                // console.log(this.userEmail);
                // console.log(this.userPw);
                // console.log(this.userPhone);
                // console.log(this.$route.params.role);
                // console.log(this.user_subject);
                // console.log(this.user_image);
                await this.signUpAssistant({
                    userId: this.userEmail,
                    password: this.userPw,
                    name: this.userName,
                    phone: this.userPhone,
                    role: this.$route.params.role,
                    teacherUserId: this.userTeacherUserId});
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