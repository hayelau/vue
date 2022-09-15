<script setup lang="ts">
import { getGuardianList } from '@/apis/guardian'
import { guardianTableColumns } from '@/config/table'
import { ref, reactive } from 'vue'

const pageReq = reactive<PageRequst>({pageNum:1, pageSize: 10 })
const result = ref<GuardianModel[]>([])
result.value = await getGuardianList(pageReq).catch(e => {
  console.log(e)
  return []
})

const handlePageChange = async (currentPage: number) => {
    pageReq.pageNum = currentPage
  // 在此刷新数据
    result.value = await getGuardianList(pageReq)
}

const handleSizeChange = async (pageSize: number) => {
  pageReq.pageSize = pageSize
  // 在此刷新数据
  result.value = await getGuardianList(pageReq)
}
</script>

<template>
  <div class="">
    <HdTableRender
      :data="result.list"
      :columns="guardianTableColumns"
      :button-type="'default'"
      :buttons="[
        { title: '查看', type: 'success' },
        { title: '删除', type: 'danger' },
      ]" />

    <el-pagination
      background
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="result.total"
      :hide-on-single-page="true"
      @current-change="handlePageChange"
      @size-change='handleSizeChange'
      :currentPage="pageReq.pageNum"
      :page-size="pageReq.pageSize"
      class="bg-white !py-2 rounded-md" />
  </div>
</template>

<style lang='scss' scoped>

</style>