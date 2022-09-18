<script setup lang="ts">
import { deleteGroupBinding, getWechatGroupList } from '@/apis/wechatGroup'
import { wechatGroupTableColumns } from '@/config/table'
import { ref, reactive } from 'vue'
import GroupBindingEdit from '@/views/admin/components/groupBindingEdit.vue'
import { ElMessageBox } from 'element-plus'

const pageReq = reactive<WechatGroupBindingQueryRequest>({pageNum:1, pageSize: 10 })
const result = ref<GroupModel[]>([])
const editRow = ref<GroupModel>()
const dialogFormVisible = ref<boolean>(false)
//方式一
// getWechatGroupList(pageReq).then((r:GroupModel[]) => {result.value = r
//   console.log(456,result)}).catch(e => console.log(789, e))
//方式二
// result.value = await getWechatGroupList(pageReq).catch(e => {console.log(e)
//   return []})
//方式三 返回异常没捕捉异常会报错
// result.value = await getWechatGroupList(pageReq)

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

const addGroupBindingFn = () => {
  dialogFormVisible.value = true
  editRow.value = {} as GroupModel
}

const deleteGroupBindingFn = async (r: any) => {
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
      await deleteGroupBinding(r as GroupModel)
      await refresh()
    })
    .catch(() => {
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
      default:
        pageReq[searchFields.toString()] = searchContent
        break
    }
  }
  await refresh()
}

const refresh = async (isAdd: boolean = false) => {
  console.log('rrrrrr', isAdd)
  if (isAdd){
    resetPageReq()
  }
  // 在此刷新数据
  result.value = await getWechatGroupList(pageReq).catch(e => {
    console.log(e)
    return []
  })
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
  <div class="">
    <el-card class='header'>
      <div>
        <el-button
          type='primary'
          @click='addGroupBindingFn'
        >
          新增群绑定关系
        </el-button
        >
      </div>
    </el-card>
    <group-binding-edit v-model:dialogFormVisible='dialogFormVisible' v-model:editRow='editRow'
                   @refresh='refresh'></group-binding-edit>
    <HdTableRender
      :data="result.list"
      :columns="wechatGroupTableColumns"
      :button-type="'default'"
      :buttons="[
        // { title: '查看', type: 'success' },
        { title: '删除', type: 'danger', action: deleteGroupBindingFn},
      ]"
      @search='search'
    />

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
.header {
  margin-bottom: 22px;
  text-align: right;
}
</style>