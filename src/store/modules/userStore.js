import router from "@/router";
import {
    socialLogin,
} from "@/api/user"

const userStore = {
    namespaced: true,
    state : {
        isLogin: false,
        isLoginError: false,
        isValidToken: false,
        userInfo: null, // 여기에 회원정보 넣어줄 예정

        //회원가입(공통)
        userId: '',
        password: '',
        name: '',
        phone: '',
        role: '',

        //회원가입(학생)
        birthDate: '',//null 가능
        schoolName: '',
        grade: '',
        parent: '',
        parentPhone: '',

        //회원가입(강사)
        subject: '',
        imageSrc: '',//null 가능
        
        //회원가입(조교)
        teacherUserId: '',//강사한테 직접 받은 아이디
    },
    getters: {
        
    },
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
    },
    actions : {
        async socialLogin({ commit }, accessToken) {
            let config = {
                headers: {
                    'Authorization': 'Bearer' + accessToken
                }
            }
            console.log("여기옴");
            socialLogin(
                config,
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
                        let user = null;
                        user.name = response.data.name;
                        user.userId = response.data.userId;
                        user.role = response.data.role;
                        commit("SET_USER_INFO", user);
                    }
                },
                (error) => {
                    if(error.status === 400) {
                        let user = null;
                        user.name = error.data.name;
                        user.domain = error.data.domain;
                        user.password = error.data.password;
                        commit("SET_USER_INFO", user);
                        router.push("/login/role");
                    } else {
                        alert("소셜 로그인 아이디를 확인해주세요!");
                    }
                }
            );
        }
    }
}
export default userStore;