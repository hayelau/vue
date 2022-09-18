<script setup lang='ts'>
import { getGuardianList, editGuardian } from '@/apis/guardian'
import { guardianTableColumns } from '@/config/table'
import { ref, reactive, watch, nextTick } from 'vue'
import GuardianEdit from './components/guardianEdit.vue'
import { ElMessageBox } from 'element-plus'

const pageReq = reactive<GuardianQueryRequest>({ pageNum: 1, pageSize: 10 })
const result = ref<GuardianModel[]>([])
const dialogFormVisible = ref<boolean>(false)
const gg = ref<boolean>(false)
const editRow = ref<GuardianModel>()
// const isSearch = ref<boolean>(false)
const pageShow = ref<boolean>(true)


const handlePageChange = (currentPage: number) => {
  console.log('gaib', currentPage)
  pageReq.pageNum = currentPage
  // if (isSearch.value){
  //   isSearch.value = false
  //   return
  // }
  refresh()
  // isSearch.value = false
}

const handleSizeChange = async (switchPageSize: number) => {
  pageReq.pageSize = switchPageSize
  // 在此刷新数据
  await refresh()
}

const addGuard = () => {
  dialogFormVisible.value = true
  editRow.value = { name: '' } as GuardianModel
}

const editGuard = async (r: any) => {
  console.log('编辑', r)
  editRow.value = r
  dialogFormVisible.value = true
}

const deleteGuard = async (r: any) => {
  ElMessageBox.confirm('确认删除?',
    '确认删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      confirmButtonClass: 'confirmButton',
      type: 'warning',
    })
    .then(async () => {
      console.log('删除:', r)
      r.status = 0
      console.log('删除2:', r)
      await editGuardian(r as GuardianModel)
      await refresh()
    })
    .catch(() => {
    })
}

const refresh = async () => {
  // 在此刷新数据
  result.value = await getGuardianList(pageReq).catch(e => {
    console.log(e)
    return []
  })
}

const search = async (param: { searchFields: string[]; searchContent: string }) => {
  // isSearch.value = true
  Object.keys(pageReq).forEach(key => {
    if ((key as string !== 'pageNum') && (key as string !== 'pageSize'))
    {
      delete pageReq[key]
    }
  })
  pageReq.pageNum = 1
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

//只有v-model传子组件，emit回来才会触发值改变
watch(gg, val => {
  console.log('gg变', val)
  if (!val) console.log('gg变', val)
})

refresh()
</script>

<template>
  <div class=''>
    <el-card class='header'>
      <div>
        <el-button
          type='primary'
          @click='addGuard'
        >
          新增打卡人信息
        </el-button
        >
      </div>
    </el-card>
    <guardian-edit v-model:dialogFormVisible='dialogFormVisible' v-model:editRow='editRow' :gg='gg'
                   @refresh='refresh'></guardian-edit>
    <HdTableRender
      :data='result.list'
      :columns='guardianTableColumns'
      :button-type="'default'"
      :buttons="[
        { title: '编辑', type: 'success', action: editGuard },
        { title: '删除', type: 'danger', action: deleteGuard },
      ]"
      @search='search'
    />

    <el-pagination
      v-if='pageShow'
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