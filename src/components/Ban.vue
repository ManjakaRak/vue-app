<template>
  <div class="entry-image">
    <img src="../../static/img/vercors-2.jpg" class="img-fluid" alt="">
    <div class="bg-image"></div>
    <div class="title-content">
      <div class="title">
        <b-carousel
          id="carousel-1"
          fade
          :interval="3000"
          controls
          indicators
          style="text-shadow: 1px 1px 2px #333;"
        >
          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide caption="Consultez nos panoplis de propriété et choissez votre critère" img-blank img-alt="Blank image">
          </b-carousel-slide>
          <b-carousel-slide caption="Nous vous offrons des prix très abordables" img-blank img-alt="Blank image">
          </b-carousel-slide>
          <b-carousel-slide caption="Nous vous aidons à allouez ou à vendez votre propriété" img-blank img-alt="Blank image">
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ban'
}
</script>

<style>
  .carousel-indicators {
    position: static;
  }
  .entry-image {
    padding-top: 98px;
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 100%;
    /* max-height: max-content; */
  }
  .entry-image img {
    width: 100%;
    height: 100%;
    max-height: 300px;
  }
  .bg-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.479);
  }
  .entry-image .title-content {
    display: table;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .title {
    display: table-cell;
    vertical-align: bottom;
    text-align: center;
    color: rgba(255, 255, 255, 0.76);
    overflow: hidden;
    z-index: -1;
  }
  .title h3 {
    padding: 20px;
    text-align: center;
    font-family: 'AnjaliOldLipi';
    font-size: 2.5em;
    color: #b4b4b4;
  }
  /* RESEZING ELEMENT */
  @media screen and (max-width:900px) {
    .title h3 {
      font-size: 20px;
    }
  }
  @media screen and (max-width:600px) {
    .title h3 {
      font-size: 16px;
      padding: 20px 0;
    }
  }
  @media screen and (max-width:575px) {
    .entry-image {
      height: max-content;
    }
    .entry-image img {
      height: 200px;
    }
  }
</style>
