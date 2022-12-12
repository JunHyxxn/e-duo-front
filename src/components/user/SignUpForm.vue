<template>
  <div>회원가입 폼</div>
</template>

<script>
export default {
    
  created() {
    let role = this.$route.params.role;
    console.log(role);
  },
};
</script>

<style></style>
