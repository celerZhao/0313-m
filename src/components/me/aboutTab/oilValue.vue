<template lang="html">
  <div v-html="dataList.storagevalue">
  </div>
</template>

<script>
import api from '../../../fetch/ajax.js'
export default {
  data() {
    return {
      dataList:[]
    }
  },
  created() {
    api.getAppSettingData({
      category: 'storagevalue',
      ver: '5.2.2'
    }).then(response => {
      this.dataList = response.data.data.dataList;
    }).catch(error => {
      console.log(error)
    })

  }
}
</script>

<style lang="css" scoped>
.p-tag{
  position: relative;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  overflow: hidden;
}
.p-tag-li{
  display: flex;
  width: 60%;
  margin: 8px auto;
  border: 2px solid #fd9a27;
  border-radius: 18px;
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  color: #666;
}
.p-tag-li > li{
  flex: 0 0 50%;
  padding: 8px 0;
}
.p-tag-li > li.active{
  background-color: #fd9a27;
  color: #fff;
}
</style>