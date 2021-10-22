<template>
  <transition name="notification">
    <div v-if="showNotif" id="notification-content">
      <div id="notification" class="notification-color">{{ message }}<i class="fa fa-check-circle" aria-hidden="true"></i></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: [
    'showNotifp',
    'notifp',
    'message'
  ],
  name: 'Notification',
  data () {
    return {
      showNotif: this.showNotif,
      notif: this.notifp
    }
  },
  methods: {
    hideNotification () {
      this.showNotif = false
    }
  },
  mounted () {
    // operation for notification
    if (this.notif) {
      this.showNotif = true
    }
    // animation on start
    setTimeout(() => {
      if (this.showNotif) {
        //  OPERATION
        document.getElementById('notification-content').style.opacity = '1'
        document.getElementById('notification-content').style.top = '40px'
      }
    }, 100)
    // hide notification automatically
    setTimeout(() => {
      if (this.showNotif) {
        this.hideNotification()
      }
    }, 3000)
    // end operation for notification
  }
}
</script>

<style>
  #notification-content {
    width: 100%;
    position: fixed;
    z-index: 1000000;
    display: flex;
    align-items: center;
    flex-direction: column;
    opacity: 0;
    transition: all 500ms ease-in;
    top: -100px;
  }
  .notification-color {
    background-color: rgb(0, 17, 255);
    color: grey
  }
  #notification {
    padding: 20px;
    font-size: 20px;
    font-weight: 700;
    color: wheat
  }
  .notification-leave-active {
    transition: all 500ms ease-out;
  }
  .notification-leave-to {
    opacity: 0;
    transform: translateY(-100px);
  }
</style>
