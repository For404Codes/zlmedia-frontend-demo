<template>
    <el-card style="max-width:700px; margin: 20px auto;">
      <div style="display:flex; gap:10px; margin-bottom: 10px;">
        <el-input v-model="streamId" placeholder="请输入流ID" clearable />
        <el-button type="primary" @click="startPlay" :loading="loading" :disabled="isPlaying">
          播放
        </el-button>
        <el-button @click="stopPlay" :disabled="!isPlaying">
          停止
        </el-button>
      </div>
  
      <video ref="videoEl" autoplay playsinline controls style="width: 100%; height: 360px; background: black;"></video>
  
      <el-alert v-if="status" :title="status" type="info" show-icon style="margin-top: 12px;" />
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { ref, onBeforeUnmount } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const videoEl = ref<HTMLVideoElement | null>(null)
  const streamId = ref('testStream')
  const status = ref('')
  const loading = ref(false)
  const isPlaying = ref(false)
  
  let ws: WebSocket | null = null
  let pc: RTCPeerConnection | null = null
  
  // ZLMediaKit 信令服务器地址（wss协议）
  const signalingUrl = 'wss://124.220.17.14:8800/webrtc'
  
  function createPeerConnection() {
    pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })
  
    pc.onicecandidate = (event) => {
      if (event.candidate && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            cmd: 'trickle',
            candidate: event.candidate,
            streamurl: `webrtc://${streamId.value}`,
          }),
        )
      }
    }
  
    pc.ontrack = (event) => {
      if (videoEl.value) {
        videoEl.value.srcObject = event.streams[0]
      }
    }
  }
  
  async function startPlay() {
    if (!streamId.value.trim()) {
      ElMessage.warning('请输入流ID')
      return
    }
    if (!videoEl.value) {
      ElMessage.error('视频元素未准备好')
      return
    }
  
    loading.value = true
    status.value = '连接信令服务器...'
  
    ws = new WebSocket(signalingUrl)
  
    ws.onopen = async () => {
      status.value = '创建 WebRTC 连接...'
      createPeerConnection()
  
      if (!pc) return
  
      // 创建offer
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
  
      // 发送play命令，zlm文档要求的json格式
      ws!.send(
        JSON.stringify({
          cmd: 'play',
          streamurl: `webrtc://${streamId.value}`,
          sdp: offer.sdp,
          type: 'offer',
        }),
      )
    }
  
    ws.onmessage = async (evt) => {
      const msg = JSON.parse(evt.data)
      if (msg.cmd === 'playres') {
        if (!pc) return
        status.value = '收到服务器回答，设置远端描述...'
        await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: msg.sdp }))
        status.value = '播放中'
        isPlaying.value = true
        loading.value = false
      } else if (msg.cmd === 'trickle') {
        if (pc && msg.candidate) {
          try {
            await pc.addIceCandidate(msg.candidate)
          } catch (e) {
            console.warn('添加ICE候选失败', e)
          }
        }
      } else if (msg.code && msg.code !== 0) {
        ElMessage.error(`信令服务器返回错误：${msg.msg}`)
        stopPlay()
      }
    }
  
    ws.onerror = (err) => {
      console.error('WebSocket错误', err)
      ElMessage.error('信令连接错误')
      loading.value = false
    }
  
    ws.onclose = () => {
      status.value = '信令连接关闭'
      loading.value = false
      isPlaying.value = false
    }
  }
  
  function stopPlay() {
    if (pc) {
      pc.close()
      pc = null
    }
    if (ws) {
      ws.close()
      ws = null
    }
    if (videoEl.value) {
      videoEl.value.srcObject = null
    }
    status.value = '已停止播放'
    isPlaying.value = false
    loading.value = false
  }
  
  onBeforeUnmount(() => {
    stopPlay()
  })
  </script>
  