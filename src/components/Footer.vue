<template>
  <div id="footer">
    <h4>2021 Copyright  <i class="fa fa-copyright" aria-hidden="true"></i></h4>
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
#footer h4 {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
}
#footer h4 i {
  font-size: 15px;
  padding: 5px;
}
</style>
