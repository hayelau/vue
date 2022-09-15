<script setup lang='ts'>
import { getRecordList } from '@/apis/record'
import { recordTableColumns } from '@/config/table'
import { ref, reactive } from 'vue'
import SingleFile from '@/components/upload/singleFile.vue'

const file = ref('')

const pageReq = reactive<PageRequst>({ pageNum: 1, pageSize: 10 })
const result = ref<RecordModel[]>([])
result.value = await getRecordList(pageReq).catch(e => {
  console.log(e)
  return []
})
console.log(result)

const handlePageChange = async (currentPage: number) => {
  pageReq.pageNum = currentPage
  // 在此刷新数据
  result.value = await getRecordList(pageReq)
}

const handleSizeChange = async (pageSize: number) => {
  pageReq.pageSize = pageSize
  // 在此刷新数据
  result.value = await getRecordList(pageReq)
}
</script>

<template>
  <div class=''>
    <SingleFile v-model='file' />

    <HdTableRender
      :data='result.list'
      :columns='recordTableColumns'
      :button-type="'default'"
      :buttons="[
        { title: '查看', type: 'success' },
        { title: '删除', type: 'danger' },
      ]" />

    <el-pagination
      background
      :page-sizes='[10, 20, 50]'
      layout='total, sizes, prev, pager, next, jumper'
      :total='result.total'
      :hide-on-single-page='true'
      @current-change='handlePageChange'
      @size-change='handleSizeChange'
      :currentPage='pageReq.pageNum'
      :page-size='pageReq.pageSize'
      class='bg-white !py-2 rounded-md' />
  </div>
</template>

<style lang='scss' scoped>

</style>