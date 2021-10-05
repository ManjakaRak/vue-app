<template>
  <div id="footer">
    <h3>2021 Copyright <i class="fa fa-copyright" aria-hidden="true"></i></h3>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
#footer {
  width: 100%;
  height: 180px;
  color: rgb(200, 200, 200);
  background-color: #1b3558;
  display: flex;
  align-items: center;
  flex-direction: column;
}
#footer h3 {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
}
</style>
