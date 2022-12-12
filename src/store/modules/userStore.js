import router from "@/router";
import {
    socialLogin,
    login,
} from "@/api/user"

const userStore = {
    namespaced: true,
    state : {
        isLogin: false,
        isLoginError: false,
        isValidToken: false,
        userInfo: null, // 여기에 회원정보 넣어줄 예정
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
    }
    }
}

export default userStore;