<template lang="">
<div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="showSort">
            <div class="all-sort-list2" @click="goSearch">
                <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{current:currentIndex === index}">
                    <h3 @mouseenter="changeIndex(index)">
                        <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                    </h3>
                    <!-- 二三级分类 -->
                    <div class="item-list clearfix" :style="{display: currentIndex === index ? 'block' : 'none'}">
                        <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                            <dl class="fore">
                                <dt>
                                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                </dt>
                                <dd>
                                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                    </em>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
</div>
</template>
<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      showSort: true,
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.showSort = false;
    }
    // if (this.$store.state.home.categoryList.length === 0) {
    //   this.$store.dispatch("categoryList");
    // }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.showSort = false;
      }
    },
    goSearch(event) {
      // 利用编程式导航和事件委派进行路由跳转
      const element = event.target;

      const { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        if (this.$route.params) {
          location.params = this.$route.params;
        }

        location.query = query;
        this.$router.push(location);
      }
    },
    enterShow() {
      this.showSort = true;
    },
  },
};
</script>
<style lang="less" scoped>
//所有a标签有下划线，并且显示鼠标光标
a {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 510px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 510px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //   &:hover {
          //     .item-list {
          //       display: block;
          //     }
          //   }
        }

        .current {
          background-color: skyblue;
        }
      }
    }

    //过渡动画
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 510px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }

  }
}
</style>