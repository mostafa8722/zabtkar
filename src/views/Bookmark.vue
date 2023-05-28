<template>
  <div>
    <BookmarkHeader v-if="$vuetify.breakpoint.width <= 600" />
    <div v-if="getBookmarksCount == 0" class="d-flex flex-row justify-center align-center">
      <p class="mt-5 text-center text-h5">
        <span class="bold-font">لیست علاقه مندی های شما خالی  می باشد</span>
      </p> 
    </div>
    <BookmarkList v-if="getBookmarksCount != 0"/>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex';
import BookmarkHeader from '../components/bookmark/BookmarkHeader'
import BookmarkList from '../components/bookmark/BookmarkList'

export default {
  name: "Bookmark",
  components: {
    BookmarkHeader,
    BookmarkList
  },
  computed: {
    ...mapGetters('bookmark', ['getBookmarksCount'])
  }
}
</script>

<style scoped>

</style>