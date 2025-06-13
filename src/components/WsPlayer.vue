<template>
    <div style="padding: 20px; background: #f0f0f0;">
      <video
        ref="videoRef"
        id="video"
        autoplay
        muted
        controls
        style="width: 100%; max-width: 800px; margin: 0 auto; background: #000;"
      ></video>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { config } from '../config'
  
  const videoRef = ref(null)
  
  onMounted(() => {
    const script1 = document.createElement('script')
    script1.src = '/wsplayer/mp4box.all.min.js'
    script1.onload = () => {
      const script2 = document.createElement('script')
      script2.src = '/wsplayer/wsPlayer.js'
      script2.onload = () => {
        const player = new window.wsPlayer('video', config.wsUrl)
        player.open()
      }
      document.body.appendChild(script2)
    }
    document.body.appendChild(script1)
  })
  </script>
  