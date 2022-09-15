<template>
  <el-dialog v-model='dialogFormVisible' :title='title'>
    <el-form :model='formData'>
      <el-form-item label='打卡人姓名' :label-width='formLabelWidth'>
        <el-input v-model='formData.name' autocomplete='off' />
      </el-form-item>
<!--      <el-form-item label='Zones' :label-width='formLabelWidth'>-->
<!--        <el-select v-model='form.region' placeholder='Please select a zone'>-->
<!--          <el-option label='Zone No.1' value='shanghai' />-->
<!--          <el-option label='Zone No.2' value='beijing' />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='handleClose'>Cancel</el-button>
        <el-button type='primary' @click='dialogFormVisible = false'
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, defineProps, defineEmits, watch } from 'vue'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const props = defineProps<{
  isShow: boolean,
  editRow?: GuardianModel
}>()
console.log('FFFF', props.isShow)
console.log('editRow', props.editRow)
const dialogFormVisible = ref<boolean>(props.isShow)
const formData = ref<GuardianModel|undefined>(props.editRow)
const title = ref<string>('')
console.log('VVV', dialogFormVisible.value)

const emit = defineEmits<{
  (e: 'update:isShow', isShow: boolean): void
}>()

const handleClose = async () => {
  console.log('关闭')
  emit('update:isShow', false)
  dialogFormVisible.value = false
}

watch(() => props.isShow, () => {
  console.log('设置show', props.isShow)
  dialogFormVisible.value = props.isShow
})

watch(() => props.editRow, (value, oldValue, onCleanup) => {
  title.value = value?'编辑':'新增'
  console.log('设置title', value)
  formData.value = props.editRow
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