<template>
  <el-dialog :model-value='dialogFormVisible' :title='title' @close='handleClose'>
    <el-form :model-value='editRow'>
      <el-form-item label='ID' label-width='140px' v-if='editRow.id'>
        <el-input v-model='editRow.id' autocomplete='off' disabled='false' />
      </el-form-item>
      <el-form-item label='打卡人姓名' label-width='140px'>
        <el-input v-model='editRow.name' autocomplete='off' />
      </el-form-item>
      <el-form-item label='打卡人手机' label-width='140px'>
        <el-input v-model='editRow.phone' autocomplete='off' />
      </el-form-item>
      <el-form-item label='打卡人微信名称' label-width='140px'>
        <el-input v-model='editRow.wechatName' autocomplete='off' />
      </el-form-item>
      <el-form-item label='跟进客服微信名称' label-width='140px'>
        <el-input v-model='editRow.staffWechatName' autocomplete='off' />
      </el-form-item>
      <el-form-item label='状态' :label-width='formLabelWidth'>
        <el-select v-model='editRow.status' placeholder='选择状态'>
          <el-option label='禁用' :value='0' />
          <el-option label='激活' :value='1' />
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
import { addGuardian, editGuardian } from '@/apis/guardian'

const props = defineProps<{
  dialogFormVisible: boolean,
  editRow?: GuardianModel,
  gg:boolean
}>()

const title = ref<string>('新增')

// const emit = defineEmits<{
//   (e: 'update:dialogFormVisible', dialogFormVisible: boolean): void
// }>()
const emit = defineEmits(['update:dialogFormVisible', 'refresh', 'update:gg'])

const handleClose = () => {
  console.log('关闭')
  emit('update:dialogFormVisible', false)
  emit('update:gg', true)
}

const handleConfirm = async () => {
  console.log('确认关闭')
  const guardianModel:GuardianModel = props.editRow!
  if (guardianModel.id){
    await editGuardian(guardianModel)
  }else {
    await addGuardian(guardianModel)
  }

  emit('update:dialogFormVisible', false)
  emit('refresh')
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