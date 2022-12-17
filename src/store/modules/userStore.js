import router from "@/router";
import {
    socialLogin,
    login,
} from "@/api/user"
import { 
    getApiInstance,
} from "@/api/index"
const api = getApiInstance();
import email from "@/api/email";

const userStore = {
    namespaced: true,
    state : {
        isLogin: false,
        isLoginError: false,
        isValidToken: false,
        userInfo: null, // 여기에 회원정보 넣어줄 예정
        emailCertification: '',
        phoneCertification: '',
    },
    getters : {},
    mutations : {
        SET_IS_LOGIN: function (state, isLogin) {
        state.isLogin = isLogin;
        },
        SET_IS_LOGIN_ERROR: (state, isLoginError) => {
        state.isLoginError = isLoginError;
        },
        SET_IS_VALID_TOKEN: (state, isValidToken) => {
        state.isValidToken = isValidToken;
        },
        SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo;
        },
        SET_EMAIL_CERTIFICATION: (state, emailCertification) => { 
            state.emailCertification = emailCertification;
            console.log('mutations', state.emailCertification);
        },
        SET_PHONE_CERTIFICATION: (state, phoneCertification) => { 
            state.phoneCertification = phoneCertification;
        }
    },
    actions : {
        async userConfirm({ commit }, user) {
            await login(
                user,
                (res) => { 
                    if (res.status === 200) {
                        let accessToken = res.data.accessToken;
                        let refreshToken = res.data.refreshToken;
                        commit("SET_IS_LOGIN", true);
                        commit("SET_IS_VALID_TOKEN", true);
                        let user = {};
                        user.userId = res.data.userId;
                        user.name = res.data.name;
                        user.role = res.data.role;
                        commit("SET_USER_INFO", user);
                        localStorage.setItem("access-token", accessToken);
                        localStorage.setItem("refresh-token", refreshToken);
                    } else {
                        commit("SET_IS_LOGIN", false);
                        commit("SET_IS_VALID_TOKEN", false);
                    }
                },
                (err) => { console.log(err); })
        },
        async socialLogin({ commit }, accessToken) {
            console.log("여기옴");
            socialLogin(
                accessToken,
                ( response ) => {
                    if(response.status === 200) {
                        // 소셜 로그인 성공
                        let accessToken = response.data.accessToken;
                        let refreshToken = response.data.refreshToken;
                        localStorage.setItem("access-token", accessToken);
                        localStorage.setItem("refresh-token", refreshToken);
                        commit("SET_IS_LOGIN", true);
                        commit("SET_IS_LOGIN_ERROR", false);
                        commit("SET_IS_VALID_TOKEN", true);
                        let user = {};
                        console.log(response);
                        user.name = response.data.name;
                        user.userId = response.data.userId;
                        user.role = response.data.role;
                        commit("SET_USER_INFO", user);
                        router.push("/login/role");
                    } else {
                        alert("2000 말고 다른거 뜸");
                    }
                },
                (error) => {
                    if(error.response.status === 400) {
                        let user = {};
                        user.userId = error.response.data.userId;
                        user.password = error.response.data.password;
                        commit("SET_USER_INFO", user);
                        router.push("/login/role");
                    } else {
                        alert("소셜 로그인 아이디!");
                    }
                }
            );
        },
        async emailSending({ commit }, userEmail) { 
            const response = await email.post("/auth/email", 
                userEmail
            ).catch((error) => {
                if (error.response.status == 409) {
                    alert('중복되는 아이디입니다.');
                }
            });
            console.log(response.data);
            commit('SET_EMAIL_CERTIFICATION', response.data);
        },
        async phoneSending({ commit }, userPhone) { 
            const response = await email.post("auth/phone", {
                phone: userPhone
            }).catch((error) => {
                console.log(error);
            });
            console.log(response.data);
            commit('SET_PHONE_CERTIFICATION', response.data);
        },
        async signUpTeacher({ commit }, {userId, password, name, phone, role, subject, imageSrc}) {
            const response = await api.post('/auth/signup', {
                userId: userId,
                password: password,
                name: name,
                phone: phone,
                role: role,
                subject: subject,
                imageSrc: imageSrc
            }).catch(() => {
                alert("회원가입에 실패했습니다.");
                router.push("/");
            });
            alert("회원가입이 성공했습니다.");
            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;
            localStorage.setItem("access-token", accessToken);
            localStorage.setItem("refresh-token", refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            let user = {};
            console.log(response);
            user.name = response.data.name;
            user.userId = response.data.userId;
            user.role = response.data.role;
            commit("SET_USER_INFO", user);
            router.push("/main");//메인 페이지로 이동
        },
        async signUpAssistant({ commit }, {userId, password, name, phone, role, teacherUserId}) {
            const response = await api.post('/auth/signup', {
                userId: userId,
                password: password,
                name: name,
                phone: phone,
                role: role,
                teacherUserId: teacherUserId
            }).catch(() => {
                alert("회원가입에 실패했습니다.");
                router.push("/");
            });
            alert("회원가입이 성공했습니다.");
            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;
            localStorage.setItem("access-token", accessToken);
            localStorage.setItem("refresh-token", refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            let user = {};
            console.log(response);
            user.name = response.data.name;
            user.userId = response.data.userId;
            user.role = response.data.role;
            commit("SET_USER_INFO", user);
            router.push("/main");//메인 페이지로 이동
        },
        async signUpStudent({ commit }, {userId, password, name, phone, role, birthDate, schoolName, grade, parent, parentPhone}) {
            const response = await api.post('/auth/signup', {
                userId: userId,
                password: password,
                name: name,
                phone: phone,
                role: role,
                birthDate: birthDate,
                schoolName: schoolName,
                grade: grade,
                parent: parent,
                parentPhone: parentPhone
            }).catch(() => {
                alert("회원가입에 실패했습니다.");
                router.push("/");
            });
            alert("회원가입이 성공했습니다.");
            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;
            localStorage.setItem("access-token", accessToken);
            localStorage.setItem("refresh-token", refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            let user = {};
            console.log(response);
            user.name = response.data.name;
            user.userId = response.data.userId;
            user.role = response.data.role;
            commit("SET_USER_INFO", user);
            router.push("/main");//메인 페이지로 이동
        }
    }
}

export default userStore;