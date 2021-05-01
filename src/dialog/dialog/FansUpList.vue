<template>
  <el-table size="mini"
            :data="result.list"
            v-if="result"
            stripe
            max-height="400">
    <el-table-column prop="mid" label="编号" min-width="40"/>
    <el-table-column prop="face" label="up主">
      <template #default="scope">
        <b-up-link :mid="scope.row.mid">
          <el-space size="large">
            <b-image :src="scope.row.face" height="48px" width="48px" suffix="@48w_48h_1c.webp"></b-image>
            {{ scope.row.name }}
          </el-space>
        </b-up-link>
      </template>
    </el-table-column>
    <el-table-column
      align="right"
      min-width="65"
      prop="fans_time"
      label="关注时间"
    />
    <el-table-column
      align="right"
      min-width="40"
      prop="follower"
      label="粉丝数"/>
    <el-table-column
      align="right"
      min-width="40"
      prop="likes"
      label="获赞数"/>
    <el-table-column
      align="right"
      min-width="40"
      prop="archive"
      label="播放量"/>

    <el-table-column label="操作" min-width="50">
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
      :total="total">

    </el-pagination>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useNumber } from "@/hooks";
import { useRequest } from "@/hooks/useRequest";
import { apiUpFans, apiUpFansList, UpSql } from "@/api/up";
import BImage from "@components/BImage.vue";
import { $success } from "@/utils";
import BUpLink from "@components/BUpLink.vue";

export default defineComponent({
  name: "fansUpList",
  components: { BUpLink, BImage },
  props: {
    query: String
  },
  setup() {
    const [page] = useNumber(1);
    const { run, result } = useRequest(() => apiUpFansList(page.value, 10))
    return {
      result, run, page, pageCount: computed(() => result.value ? result.value.totalPage : 1),
      total: computed(() => result.value ? result.value.total : 0),
      onFans: (row: UpSql) => {
        apiUpFans(row.id, +!row.isFans).then(res => {
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

</style>