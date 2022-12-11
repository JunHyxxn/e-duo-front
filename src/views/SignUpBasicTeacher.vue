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
                    <v-col cols="12" >
                        <v-text-field 
                            v-model="user_subject" 
                            label="과목"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" >
                        <v-file-input 
                            v-model="user_image" 
                            label="Profile 이미지 업로드"
                            append-icon=mdi-camera 
                            prepend-icon=""
                            accept=".jpg, .jpeg, .png"
                            outlined
                        ></v-file-input>
                    </v-col>
                </v-row>
                <v-btn @click="signUp" :disabled="!isFormValid">회원가입</v-btn>
            </v-card>
        </v-container>
    </v-form>
</template>
<script>
import http from "@/api/http";
export default {
    name: "SignUpBasicTeacher",
    watch:{
        user_image(val){
            console.log(val);
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e);
                console.log(e.target.result);
            }
        }
    },

    data() {
        return {
            certificationNumber: '',
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
            user_pw_chk: '',
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
            show:false,
            show2:false,
            user_phone: '',
            user_phone_rule: [
                v => !!v || '휴대폰은 필수 입력 사항입니다.',
                v => /^(?:(010\d{4})|(070\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/.test(v) || '유효하지 않은 번호입니다.',
            ],
            user_subject: '',
            user_image: null,
            isFormValid: false,
        }
    },
    methods: {
        checkDuplicate(){
            alert("아이디가 중복됩니다.");
            this.user_id = null;
            this.isIdFormat = false;
        },
        get_certificate(){
            this.certificationNumber = '1234';
            alert('인증번호 전송하기');
            this.phone_check = true;
        },
        async signUp(){
            const validate = this.$refs.form.validate();
            if(validate){
                // alert("회원가입 실시");
                console.log(this.user_name);
                console.log(this.user_email);
                console.log(this.user_pw);
                console.log(this.user_phone);
                console.log(this.user_subject);
                console.log(this.user_image);

                http.post('/auth/signup', {
                    userId: this.user_email,
                    password: this.user_pw,
                    name: this.user_name,
                    phone: this.user_phone,
                    role: 'ROLE_TEACHER',
                    subject: this.user_subject,
                    imageSrc: this.user_image
                }).then(()=>{
                    alert("회원가입이 성공했습니다.");
                    this.$router.push("/");
                }).catch(()=>{
                    alert("회원가입에 실패했습니다.");
                    this.$router.push("/");
                })
            }else{
                alert("다 입력하세요");
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