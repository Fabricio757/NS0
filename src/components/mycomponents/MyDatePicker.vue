<template>
    <FlexboxLayout flexDirection="column">
      <DatePicker v-model="localValue" />
      <Label :text="localValue" fontSize="16" style="text-align: left" />
      <button text="Ok"></button>
    </FlexboxLayout>
</template>

<script>


export default {
    props: {
        value: {
          required: true
        },
        hint: '',
      },
    data() {
      return {
        localValue: this.value,
      }
    },
    watch: {
        localValue (newValue) {
          this.$emit('input', newValue)
        },
        value (newValue) {
          this.localValue = newValue
        },
     },
    methods: {
,
    },
}
</script>