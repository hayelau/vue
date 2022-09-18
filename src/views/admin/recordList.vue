<script setup lang='ts'>
import { getRecordList } from '@/apis/record'
import { recordTableColumns } from '@/config/table'
import { ref, reactive } from 'vue'
import SingleFile from '@/components/upload/singleFile.vue'

const file = ref('')

const pageReq = reactive<SuccessRecordQueryRequest>({ pageNum: 1, pageSize: 10 })
const result = ref<RecordModel[]>([])

const refresh = async () => {
  // 在此刷新数据
  result.value = await getRecordList(pageReq).catch(e => {
    console.log(e)
    return []
  })
}

const handlePageChange = async (currentPage: number) => {
  pageReq.pageNum = currentPage
  // 在此刷新数据
  await refresh()
}

const handleSizeChange = async (pageSize: number) => {
  pageReq.pageSize = pageSize
  // 在此刷新数据
  await refresh()
}

const search = async (param: { searchFields: string[]; searchContent: string }) => {
  Object.keys(pageReq).forEach(key => {
    if ((key as string !== 'pageNum') && (key as string !== 'pageSize'))
    {
      delete pageReq[key]
    }
  })
  pageReq.pageNum = 1
  console.log('search', param)
  const { searchFields, searchContent } = param
  if (searchFields){
    switch (searchFields.toString()) {
      case 'guardId':
        console.log('search for guardId', searchContent)
        pageReq[searchFields.toString()] = Number(searchContent)
        break
      case 'insurantId':
        console.log('search for insurantId', searchContent)
        pageReq[searchFields.toString()] = Number(searchContent)
        break
      default:
        console.log('search for ', pageReq[searchFields.toString()], searchContent)
        pageReq[searchFields.toString()] = searchContent
        break
    }
  }
  // 在此刷新数据
  await refresh()
}

await refresh()

</script>

<template>
  <div class=''>
    <div class='header'>
      <SingleFile v-model='file' tip='上传打卡记录文件(Excel格式)' />
    </div>

    <HdTableRender
      :isMultipleSearchSelected='false'
      :data='result.list'
      :columns='recordTableColumns'
      @search='search'
    />

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
.header {
  margin-bottom: 22px;
  text-align: right;
}
</style>