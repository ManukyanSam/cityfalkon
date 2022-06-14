<template>
  <nav class="main d-flex align-i-center justify-between">
    <div class="main__logo">
      <img src="@/assets/images/logo.svg" alt="Logo" />
    </div>
    <div class="main__user">
      <UserActions />
    </div>
  </nav>
</template>

<script>
import UserActions from "@/components/header/UserActions";

export default {
  name: "HeaderComponent",
  components: {
    UserActions,
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 50px;
  padding: 4px 20px;
  border-bottom: 1px solid #e2e2e2;
}
</style>
