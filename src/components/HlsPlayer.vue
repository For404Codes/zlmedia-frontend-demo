<template>
    <el-card>
      <template #header>
        手机摄像头视频流（HLS 播放）
      </template>
      <video ref="videoRef" controls autoplay style="width: 100%; max-width: 800px; border-radius: 8px;" />
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import Hls from 'hls.js'
  
  const videoRef = ref<HTMLVideoElement | null>(null)
  let hls: Hls | null = null
  
  onMounted(() => {
    const video = videoRef.value
    if (video) {
       const hlsUrl = '/api/stream/hls/hls.m3u8'
  
      if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(hlsUrl)
        hls.attachMedia(video)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsUrl
      }
    }
  })
  
  onBeforeUnmount(() => {
    hls?.destroy()
  })
  </script>
  