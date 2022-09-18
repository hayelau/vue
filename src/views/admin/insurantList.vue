<script setup lang='ts'>
import { getInsurantList, editInsurant } from '@/apis/insurant'
import { insurantTableColumns } from '@/config/table'
import { ref, reactive, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import InsurantEdit from '@/views/admin/components/insurantEdit.vue'

const pageReq = reactive<InsurantQueryRequest>({ pageNum: 1, pageSize: 10 })
const result = ref<InsurantModel[]>([])
const editRow = ref<InsurantModel>()
const dialogFormVisible = ref<boolean>(false)

const addInsurantFn = () => {
  dialogFormVisible.value = true
  editRow.value = {} as InsurantModel
}

const editInsurantFn = async (r: any) => {
  console.log('编辑', r)
  editRow.value = r
  dialogFormVisible.value = true
}

const deleteInsurantFn = async (r: any) => {
  ElMessageBox.confirm('确认删除?',
    '确认删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      confirmButtonClass: 'confirmButton',
      type: 'warning',
    })
    .then(async () => {
      r.status = 0
      await editInsurant(r as InsurantModel)
      await refresh()
    })
    .catch(() => {
    })
}

const refresh = async (isAdd: boolean = false) => {
  console.log('rrrrrr', isAdd)
  if (isAdd){
    resetPageReq()
  }
  // 在此刷新数据
  result.value = await getInsurantList(pageReq).catch(e => {
    console.log(e)
    return []
  })
}

const search = async (param: { searchFields: string[]; searchContent: string }) => {
  // isSearch.value = true
  resetPageReq()
  console.log('search', param)
  const { searchFields, searchContent } = param

  if (searchFields) {
    switch (searchFields.toString()) {
      case 'id':
        pageReq[searchFields.toString()] = Number(searchContent)
        break
      // case 'name':
      //   searchReq[searchFields.toString()] = searchContent
      //   console.log('name', searchContent)
      //   break
      default:
        pageReq[searchFields.toString()] = searchContent
        break
    }
  }
  // pageShow.value = false
  await refresh()
  // await nextTick(()=>{
  //   console.log('tick.....')
  //   pageShow.value = true
  // })
  // result.value = await getGuardianList(searchReq)
  // console.log('souwan')
  // isSearch.value = false
}

// 保证每次打开重新获取用户角色数据
watch(dialogFormVisible, val => {
  console.log('dialogFormVisible变', val)
  if (!val) console.log('dialogFormVisible变', val)
})

const handlePageChange = async (currentPage: number) => {
  pageReq.pageNum = currentPage
  // 在此刷新数据
  result.value = await getInsurantList(pageReq)
}

const handleSizeChange = async (pageSize: number) => {
  pageReq.pageSize = pageSize
  // 在此刷新数据
  result.value = await getInsurantList(pageReq)
}

const resetPageReq = () => {
  Object.keys(pageReq).forEach(key => {
    if ((key as string !== 'pageNum') && (key as string !== 'pageSize')) {
      delete pageReq[key]
    }
  })
  pageReq.pageNum = 1
}

await refresh()
</script>

<template>
  <div class=''>
    <el-card class='header'>
      <div>
        <el-button
          type='primary'
          @click='addInsurantFn'
        >
          新增被保人信息
        </el-button
        >
      </div>
    </el-card>
    <insurant-edit v-model:dialogFormVisible='dialogFormVisible' v-model:editRow='editRow'
                   @refresh='refresh'></insurant-edit>
    <HdTableRender
      :data='result.list'
      :columns='insurantTableColumns'
      :button-type="'default'"
      :buttons="[
        { title: '编辑', type: 'success', action: editInsurantFn },
        { title: '删除', type: 'danger', action: deleteInsurantFn },
      ]"
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