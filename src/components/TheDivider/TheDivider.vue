<template>
  <div
    class="divider w-full border-b border-slate-300"
    :class="{ dark: darkTheme }"
  ></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheDivider",
  computed: {
    ...mapState(["darkTheme"]),
  },
};
</script>
<style lang="scss" scoped>
.dark {
  border-color: rgba(78, 78, 78, 0.8);
}
</style>
