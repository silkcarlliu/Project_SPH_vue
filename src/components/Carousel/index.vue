<template lang="">
  <div class="swiper-container" ref="cur">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in list" :key="item.id">
              <img :src="item.imgUrl">
          </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  data() {
    return {
      swiper: null,
    };
  },
  props: ["list"],
  watch: {
    list: {
      handler: function () {
        this.$nextTick(() => {
          this.swiper = new Swiper(this.$refs.cur, {
            // 配置项
            loop: true, // 循环模式选项
            autoplay: {
              delay: 3000, // 自动切换时间间隔
              disableOnInteraction: true, // 用户操作后是否停止自动切换
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
          })
        })
      },
      immediate: true,
    }
  }
};
</script>
<style lang="">
</style>