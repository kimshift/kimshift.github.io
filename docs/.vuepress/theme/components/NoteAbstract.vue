<template>
  <div class="abstract-wrapper">
    <NoteAbstractItem
      v-for="item in currentPageData"
      :key="item.path"
      :item="item"
      :currentPage="currentPage"
      :currentTag="currentTag"
    />
  </div>
</template>

<script>
import NoteAbstractItem from './NoteAbstractItem';

export default {
  components: { NoteAbstractItem },
  props: ['data', 'currentPage', 'currentTag', 'limit'],
  computed: {
    currentPageData() {
      const limit = this.limit || 10;
      const start = this.currentPage * limit - limit;
      const end = this.currentPage * limit;
      return this.data.slice(start, end);
    },
  },
};
</script>

<style lang="stylus" scoped>
.abstract-wrapper
  width 100%
</style>
