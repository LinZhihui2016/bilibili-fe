<template>
  <el-table size="mini" :data="result.list" v-if="result" stripe max-height="500">
    <el-table-column width="110" prop="bvid" label="bv号"/>
    <el-table-column label="视频" width="340">
      <template #default="scope">
        <el-space size="large">
          <b-video-link :bvid="scope.row.bvid">
            <b-image :src="scope.row.pic" height="75px" width="114px" suffix="@114w_75h_1c.webp"></b-image>
          </b-video-link>
          <div>
            <b-video-link :bvid="scope.row.bvid">
              <h4 class="ellipsis-2">{{ scope.row.title }}</h4>
            </b-video-link>
            <h5>
              <b-up-link :mid="scope.row.up_mid" icon>
                {{ scope.row.up_name }}
              </b-up-link>
            </h5>
          </div>
        </el-space>
      </template>
    </el-table-column>
    <el-table-column
      align="right"
      min-width="100"
      prop="fans_time"
      label="关注时间"
    />
    <el-table-column align="right" min-width="55" prop="view" label="播放量"/>
    <el-table-column align="right" min-width="50" prop="coin" label="硬币"/>
    <el-table-column align="right" min-width="50" prop="danmaku" label="弹幕"/>
    <el-table-column align="right" min-width="50" prop="like" label="点赞"/>
    <el-table-column align="right" min-width="50" prop="favorite" label="收藏"/>
    <el-table-column align="right" min-width="50" prop="reply" label="评论"/>
    <el-table-column align="right" min-width="50" prop="share" label="分享"/>
    <el-table-column label="操作" min-width="80" align="center">
      <template #default="scope">
        <el-space>
          <el-button size="mini" plain :type="scope.row.isFans ?'warning':'primary'" @click="onFans(scope.row)">{{
              scope.row.isFans ? '取消关注' : '我要关注'
            }}
          </el-button>
        </el-space>
      </template>
    </el-table-column>
  </el-table>
  <div class="flex-end" style="margin-top:10px">
    <el-pagination
      background
      v-if="result"
      @size-change="run"
      @current-change="run"
      v-model:currentPage="page"
      :page-size="10"
      layout="total, prev, pager, next"
      :page-count="pageCount"
      :total="total"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useNumber } from "@/hooks";
import { useRequest } from "@/hooks/useRequest";
import { apiVideoFans, apiVideoFansList, VideoSql } from "@/api/video";
import BImage from "@components/BImage.vue";
import BVideoLink from "@components/BVideoLink.vue";
import BUpLink from "@components/BUpLink.vue";
import { $success } from "@/utils";

export default defineComponent({
  name: "fansVideoList",
  components: { BUpLink, BVideoLink, BImage },
  props: {
    query: String
  },
  setup() {
    const [page] = useNumber(1);
    const { run, result } = useRequest(() => apiVideoFansList(page.value, 10))
    return {
      result, run, page, pageCount: computed(() => result.value ? result.value.totalPage : 1),
      total: computed(() => result.value ? result.value.total : 0),
      onFans: (row: VideoSql) => {
        apiVideoFans(row.id!, +!row.isFans).then(res => {
          if (res.status) {
            row.isFans = +!row.isFans
            $success(res.data)
          }
        })
      },
    }
  }
});

</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 8px;
  line-height: 20px;
  max-height: 40px;
}
</style>