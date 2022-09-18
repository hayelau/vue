<template>
  <el-dialog :model-value='dialogFormVisible' :title='title' @close='handleClose'>
    <el-form :model-value='editRow'>
      <el-form-item label='ID' label-width='140px' v-if='editRow.id'>
        <el-input v-model='editRow.id' autocomplete='off' :disabled='false' />
      </el-form-item>
      <el-form-item label='微信群名称' label-width='140px'>
        <el-input v-model='editRow.groupName' autocomplete='off' />
      </el-form-item>
      <el-form-item label='被保人ID' label-width='140px'>
        <el-input v-model='editRow.insurantId' autocomplete='off' />
      </el-form-item>
      <el-form-item label='被保人姓名' label-width='140px'>
        <el-input v-model='editRow.insurantName' autocomplete='off' />
      </el-form-item>
      <el-form-item label='打卡人ID' label-width='140px'>
        <el-input v-model='editRow.guardId' autocomplete='off' />
      </el-form-item>
      <el-form-item label='打卡人姓名' label-width='140px'>
        <el-input v-model='editRow.guardName' autocomplete='off' />
      </el-form-item>
      <el-form-item label='打卡人优先级' :label-width='formLabelWidth'>
        <el-select v-model='editRow.priority' placeholder='选择打卡人优先级'>
          <el-option label='主要' :value=1 />
          <el-option label='次要' :value=2 />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='handleClose'>Cancel</el-button>
        <el-button type='primary' @click='handleConfirm'
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { addGroupBinding } from '@/apis/wechatGroup'

const props = defineProps<{
  dialogFormVisible: boolean,
  editRow?: GroupModel,
}>()

const title = ref<string>('新增')

// const emit = defineEmits<{
//   (e: 'update:dialogFormVisible', dialogFormVisible: boolean): void
// }>()
const emit = defineEmits(['update:dialogFormVisible', 'refresh'])

const handleClose = () => {
  console.log('关闭')
  emit('update:dialogFormVisible', false)
}

const handleConfirm = async () => {
  console.log('确认关闭')
  const groupModel:GroupModel = props.editRow!
  await addGroupBinding(groupModel)

  emit('update:dialogFormVisible', false)
  emit('refresh', true)
  console.log('确认:', props.editRow)
}

watch(() => props.editRow, (value, oldValue, onCleanup) => {
  console.log('设置title', value)
  if (value) {
    title.value = '编辑'
  } else {
    title.value = '新增'
  }

})
</script>

<style lang='scss' scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>