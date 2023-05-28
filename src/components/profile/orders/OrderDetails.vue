<template>
  <div class="d-flex flex-column" style="gap: 0.5rem">
    <div class="d-flex flex-row justify-space-between">
      <span class="bold-font">تاریخ سفارش:</span>
      <span id="value" class="bold-font" dir="ltr">{{ item.persianLastUpdateTime }}</span>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <span class="bold-font">نام کالا:</span>
      <span id="value" class="opensans-bold">{{ item.productName }}</span>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <span class="bold-font">برند:</span>
      <span id="value" class="bold-font">{{ item.brand.name }}</span>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <span class="bold-font">سایز:</span>
      <span id="value" class="bold-font">{{ item.size }}</span>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <span class="bold-font">قیمت (لیر):</span>
      <span id="value" class="bold-font">{{ item.price }}</span>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <span class="bold-font">وزن (گرم):</span>
      <span id="value" class="bold-font">{{ item.weight }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  props: {
    item: {
      type: Object,
      default: {},
      required: true,
    }
  }
}
</script>

<style scoped>
#value {
  text-align: end;
  font-size: 14px;
}
</style>