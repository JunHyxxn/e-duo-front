<template>
  <v-container style="max-width: 450px" fill-height>
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card style="border-radius: 20px">
          <div class="pa-10">
            <v-row align="center" justify="center" rows="6">
              <v-col align="center">
                <h1>직업 선택</h1>
              </v-col>
            </v-row>
            <v-row align="center" justify="center" rows="6">
              <v-radio-group v-model="role" row align="center">
                <v-col align="center">
                  <v-btn
                    fab
                    large
                    @click="chooseStudent"
                    :class="[activeStudent ? 'colorBtn' : 'white']"
                    >학생</v-btn
                  >
                </v-col>
                <v-col align="center">
                  <v-btn
                    fab
                    large
                    @click="chooseTeacher"
                    :class="[activeTeacher ? 'colorBtn' : 'white']"
                    >강사</v-btn
                  >
                </v-col>
              </v-radio-group>
            </v-row>
            <v-row align="center" justify="center" rows="6">
              <v-col align="center">
                <v-btn
                  large
                  @click="signUp"
                >
                회원가입
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      role: 'null',
      activeStudent: false,
      activeTeacher: false,
    };
  },
  methods: {
    chooseStudent() {
      this.role = "ROLE_STUDENT";
      this.activeStudent = !this.activeStudent;
      this.activeTeacher = false;
    },
    chooseTeacher() {
      this.role = "ROLE_STUDENT";
      this.activeTeacher = !this.activeTeacher;
      this.activeStudent = false;
    },
    signUp(){
      if(this.role=='null'){
        alert('직업을 선택하세요');
      }else{
        if(this.activeStudent){
          this.$router.push({
                    name: 'SignUpBasicStudent',
                    params: { role: this.role },
                  })
        }else if(this.activeTeacher){
          this.$router.push({
                    name: 'SignUpBasicTeacher',
                    params: { role: this.role },
                  })
        }
      }
    }
  },
};
</script>

<style>
.colorBtn {
  background-color: #C6C5B9 !important;
}
a{
  text-decoration: none;
  color: black;
}
</style>
