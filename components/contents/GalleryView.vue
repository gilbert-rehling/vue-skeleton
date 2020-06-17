<style lang="scss">

</style>

<template>
    <article id="contentGalleryView" class="row grid-container hide-loading" v-show="(showGallery)">
        <div class="grid-x grid-margin-x small-up-2 medium-up-3 large-up-4 contentGalleryView">
            <gallery-card v-for="ad in latest" :key="ad.id" v-bind:ad="ad"></gallery-card>
        </div>
    </article>
</template>

<script>
    /*
     * Import the Event bus
     */
    import { EventBus } from '../../event-bus.js';

    /*
     *   Import components for the Gallery View
     */
    import GalleryCard from '../../components/ads/GalleryCard.vue';

    export default {
        /*
         *   Register the components to be used by this page.
         */
        components: {
            GalleryCard
        },

        /*
         *   The data required for this component
         */
        data() {
            return {
                display: true
            }
        },

        /*
         * Defines the computed properties on the component.
         */
        computed: {
            /*
             *   Get the latest ads
             */
            latest() {
                return this.$store.getters.getLatest;
            },

            /*
             *   To be or not to be!!
             */
            showGallery() {
                return this.display;
            }
        },

        mounted() {
            EventBus.$on('change-gallery', function (data) {
                if (data.show === true) {
                    this.display = true;
                }
                if (data.hide === true) {
                    this.display = false;
                }
            }.bind(this));
        }
    }
</script>
