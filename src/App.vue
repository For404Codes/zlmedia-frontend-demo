<script setup lang="ts">
    // import HlsPlayer from './components/HlsPlayer.vue'
    // import MetaRTCPlayer from './components/WebRTCPlayer.vue'
    import WsPlayer from './components/WsPlayer.vue'
</script>
    
<template>
  <el-container style="padding: 20px">
    <el-header>
      <h2>ZLMediaKit 拉流演示</h2>
    </el-header>
    <el-main>
      <WsPlayer />
    </el-main>
  </el-container>
</template>

