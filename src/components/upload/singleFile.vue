<script lang='ts' setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { uploadExcelFile } from '@/apis/upload'

const props = defineProps<{
  modelValue: string | null
  tip: string
}>()
const fileName = ref(props.modelValue)

const emit = defineEmits<{
  (e: 'update:modelValue', url: string): void
}>()

const request = async (options: any) => {
  const form = new FormData()
  form.append('file', options.file)

  try {
    const { data } = await uploadExcelFile(form)
    fileName.value = data.fileName
    emit('update:modelValue', fileName.value!)
  }catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class=''>
    <el-upload action='' class='avatar-uploader' :http-request='request' :show-file-list='true'>
      <el-icon class='avatar-uploader-icon'>
        <Plus />
      </el-icon>
      <template #tip>
        <div class='el-upload__tip'>
          {{ tip ?? '上传文件' }}
        </div>
      </template>
    </el-upload>

    <HdError name='file' />
  </div>
</template>

<style lang='scss' scoped>
.avatar-uploader .avatar {
  height: 178px;
  display: block;
  @apply bg-gray-200;
}
.avatar-uploader{
  ::v-deep(.el-upload__tip) {
    color: red;
  }

  .el-upload .el-upload--text {
    @apply border;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: red;
    }
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  @apply border;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 80px;
  height: 50px;
  text-align: center;
}


</style>
