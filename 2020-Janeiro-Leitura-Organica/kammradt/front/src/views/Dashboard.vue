<template>
  <div>
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "./../components/Sidebar";

export default {
  name: 'Dashboard',
  components: {
    Sidebar
  }
}
</script>
