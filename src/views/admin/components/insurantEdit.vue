<template>
  <el-dialog :model-value='dialogFormVisible' :title='title' @close='handleClose'>
    <el-form :model-value='editRow'>
      <el-form-item label='ID' label-width='140px' v-if='editRow.id'>
        <el-input v-model='editRow.id' autocomplete='off' disabled='false' />
      </el-form-item>
      <el-form-item label='被保人姓名' label-width='140px'>
        <el-input v-model='editRow.insurantName' autocomplete='off' />
      </el-form-item>
      <el-form-item label='被保人身份证' label-width='140px'>
        <el-input v-model='editRow.insurantIdNum' autocomplete='off' />
      </el-form-item>
      <el-form-item label='医保类型' :label-width='formLabelWidth'>
        <el-select v-model='editRow.dataSource' placeholder='选择医保类型'>
          <el-option label='职工' value='职工' />
          <el-option label='居民' value='居民' />
          <el-option label='省直' value='省直' />
          <el-option label='市直' value='市直' />
        </el-select>
      </el-form-item>
      <el-form-item label='能力等级' :label-width='formLabelWidth'>
        <el-select v-model='editRow.guardLevel' placeholder='请选择能力等级'>
          <el-option label='长护1级' value='长护1级' />
          <el-option label='长护2级' value='长护2级' />
          <el-option label='长护3级' value='长护3级' />
          <el-option label='老年人能力等级1级' value='老年人能力等级1级' />
          <el-option label='老年人能力等级2级' value='老年人能力等级2级' />
          <el-option label='老年人能力等级3级' value='老年人能力等级3级' />
          <el-option label='老年人能力等级4级' value='老年人能力等级4级' />
          <el-option label='老年人能力等级5级' value='老年人能力等级5级' />
        </el-select>
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
import { addInsurant, editInsurant } from '@/apis/insurant'

const props = defineProps<{
  dialogFormVisible: boolean,
  editRow?: InsurantModel,
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
  const insurantModel:InsurantModel = props.editRow!
  let isAdd:boolean = false
  if (insurantModel.id){
    await editInsurant(insurantModel)
  }else {
    await addInsurant(insurantModel)
    isAdd = true
  }

  emit('update:dialogFormVisible', false)
  emit('refresh', isAdd)
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