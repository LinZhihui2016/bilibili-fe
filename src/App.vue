<template>
  <header class="flex-center">
    <div class="border border-top-left"></div>
    <div class="border border-bottom-left"></div>
    <div class="border border-top-right"></div>
    <div class="border border-bottom-right"></div>
    <div class="left-button">
      <BParallelogram direction="left" @click="onDialog('upList')">
        up主列表
      </BParallelogram>
<!--      <BParallelogram direction="left" @click="onDialog('fansUpList')">-->
<!--        关注up主-->
<!--      </BParallelogram>-->
    </div>
    <div class="title">
      哔哩哔哩 (゜-゜)つロ 干杯~-bilibili
    </div>
    <div class="right-button">
      <BParallelogram direction="right" @click="onDialog('videoList')">
        视频列表
      </BParallelogram>
<!--      <BParallelogram direction="right" @click="onDialog('fansVideoList')">-->
<!--        关注视频-->
<!--      </BParallelogram>-->
    </div>


  </header>
  <div class="content">
    <b-block id="SqlInfo">
      <CountInfo/>
    </b-block>
    <b-block id="RankRatioInWeek" title="7日排行榜占比">
      <RankRatioInWeek/>
    </b-block>
    <b-block id="CollectDaily" title="">
      <CollectDaily/>
    </b-block>
    <b-block id="videoRank" title="视频Top10">
      <VideoRank/>
    </b-block>
    <b-block id="upRank" title="up主Top10">
      <UpRank/>
    </b-block>
    <b-block id="DateRank" title="昨日Top10">
      <DateRank/>
    </b-block>
  </div>

  <DialogContainer/>
<!--  <DialogManage/>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DialogManage from "@/dialog/components/DialogManage.vue";
import VideoRank from "@/Home/VideoRank.vue";
import BBlock from "@components/BBlock.vue";
import UpRank from "@/Home/UpRank.vue";
import DateRank from "@/Home/DateRank.vue";
import RankRatio from "@/Home/RankRatio.vue";
import RankRatioInWeek from "@/Home/RankRatioInWeek.vue";
import CollectDaily from "@/Home/CollectDaily.vue";
import CountInfo from "@/Home/CountInfo.vue";
import BParallelogram from "@components/BParallelogram.vue";
import { $dialog } from "@/dialog";

export default defineComponent({
  name: "App",
  components: {
    BParallelogram,
    CountInfo,
    CollectDaily,
    RankRatioInWeek,
    RankRatio,
    DateRank,
    UpRank,
    BBlock,
    VideoRank,
    DialogManage
  },
  setup() {

    return {
      onDialog: (name: string) => $dialog.push(name)
    }
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/base";

header {
  position: fixed;
  width: 100%;
  margin-top: 15px;
  height: 25px;
  box-sizing: border-box;

  .border {
    position: absolute;
    content: '';
    height: calc(100% + 15px);
    border: 1px solid $color-5;
    box-sizing: border-box;
    top: -10px;
  }

  .title {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 30%;
    text-align: center;
    height: 32px;
    font-size: 18px;
    line-height: 32px;
    box-sizing: border-box;
    color: $color-primary;
  }

  .border-bottom-left, .border-bottom-right {
    width: 15%;
    border-width: 0 0 1px 0;
  }

  .border-bottom-left {
    left: 35%;
    border-image: linear-gradient(to left, $color-3, $color-5) 10 10 10 10;
  }

  .border-bottom-right {
    right: 35%;
    border-image: linear-gradient(to right, $color-3, $color-5) 10 10 10 10;
  }

  .border-top-left, .border-top-right {
    width: 35%;
  }

  .border-top-left {
    left: 0;
    border-width: 1px 1px 0 0;
    border-image: linear-gradient(to right, $color-1, $color-5) 10 10 10 10;
  }

  .border-top-right {
    right: 0;
    border-width: 1px 0 0 1px;
    border-image: linear-gradient(to left, $color-1, $color-5) 10 10 10 10;
  }

  .border-top-left, .border-bottom-left {
    transform: skew(30deg, 0);
  }

  .border-top-right, .border-bottom-right {
    transform: skew(-30deg, 0);
  }

  .left-button {
    position: absolute;
    display: flex;
    left: 0;
    width: 35%;
    flex-direction: row-reverse;
  }

  .right-button {
    position: absolute;
    display: flex;
    right: 0;
    width: 35%;
  }
}

.content {
  padding: 60px 20px 20px;
  box-sizing: border-box;
  height: calc(100vh - 15px);

  display: grid;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px 20px;
  min-width: 1600px;
  overflow: hidden;

  #DateRank {
    grid-column: 5/13;
    grid-row: 8/13;
  }

  #CollectDaily {
    grid-column: 5/9;
    grid-row: 1/4;
  }

  #RankRatioInWeek {
    grid-column: 5/13;
    grid-row: 4/8;
  }

  #SqlInfo {
    grid-column: 9/13;
    grid-row: 1/4;
  }

  #videoRank {
    grid-column: 1 / 5;
    grid-row: 8/13;
  }

  #upRank {
    grid-column: 1 / 5;
    grid-row: 1/8;
  }
}

</style>
