<style lang="scss">
    @import '~@/abstracts/_variables.scss';

    .content-outer-gallery {
        margin-bottom: 25px;
        position: relative;
        padding-bottom: 5px;
        min-width: 350px;

        .content-inner {
            position: relative;
            padding: 1% 3% 0 3%;
            background-color: $innerBackground;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            display: inline-block;
            width: 100%;

            .more-button-box {
                height: 34px;
                right: 14px;
                bottom: 10px;
            }
        }

        .hidden-content {
            visibility: collapse;
            display: inline-grid;
            height: 0 !important;
        }
    }

    .contentGalleryView p {
        display: block;
    }
</style>

<template>
    <div ref="gbox" class="cell content-outer-gallery" v-show="show">
        <div class="content-inner js-gallery">
            <div class="col-sm-12 u-padding-small half-padd">
                <h4 class="title">{{ content.title }}</h4>
                <h5 v-bind:title="ad.intro">{{ ad.intro }}</h5>
                <p><strong><span data-language-input="CONT,suburb" v-text="showLanguage('cont','suburb')"></span> {{ content.suburb }}</strong></p>
                <p><strong><span data-language-input="CONT,phone" v-text="showLanguage('cont','phone')"></span> {{ content.phone }}</strong></p>
                <p class="date-created hide-for-small-only"><strong><span data-language-input="CONT,adCreated" v-text="showLanguage('cont','adCreated')"></span> {{ content.created }} </strong></p>
                <p class="date-created hide-for-medium hide-for-large"><strong><span data-language-input="CONT,adCreated" v-text="showLanguage('cont','adCreated')"></span> {{ content.date }} </strong></p>
                <p v-bind:class="isaBot"><a v-bind:href="'/latest/' + content.slug_ad">{{ content.slug_ad }}</a></p>
                <div class="hidden-content">{{ content.text }}</div>
            </div>
            <div class="more-button-box">
                <button @click="showMoreAd(content.id)" class="btn btn-primary pull-right" data-language-input="GLOBAL, more" v-text="showLanguage('global','more')"></button>
            </div>
        </div>
    </div>
</template>

<script>
    /*
     *   Imports the mixins used by the component.  :key="content.id" :content="content"
     */
    import { LatestTextFilter } from '../../mixins/filters/LatestTextFilter.js';
    import { LatestCityFilter } from '../../mixins/filters/LatestCityFilter.js';

    /*
     * Import the Event bus
     */
    import { EventBus } from '../../event-bus.js';

    export default {
        /*
         *   The component accepts one ad as a property
         */
        props: ['content'],

        /*
         * Define the data used by the component.
         */
        data(){
            return {
                show: true
            }
        },

        /*
         *   Define the mixins used by the component.
         */
        mixins: [
            LatestTextFilter,
            LatestCityFilter
        ],

        /*
        *   Listen to the mounted lifecycle hook.
        */
        mounted() {
            /*
             * When the filters are updated, we process the filters.
             */
            EventBus.$on('filters-updated', function( filters ) {
                this.processFilters( filters );

            }.bind(this));

            /*
             * Apply filters
             */
            this.processFilters();
        },

        /*
         * Defines the computed properties on the component.
         */
        computed: {
            /*
             *   Is the browser a BOT?
             */
            isaBot() {
                return this.$store.getters.getBotStatus;
            },

            displayClass() {
                let status = this.$store.getters.getUserLoadStatus;
                return (status === 2) ? '' : 'u-display-none is-hidden';
            },

            /*
             *   Gets the city filter from the Vuex data store.
             */
            cityFilter(){
                return this.$store.getters.getCityFilter;
            },

            /*
             *    Gets the text search filter from the Vuex data store.
             */
            textSearch(){
                return this.$store.getters.getTextSearch;
            }
        },

        /*
         *   Defined methods for the component
         */
        methods: {
            /*
             *   Trigger the single item preview/display overlay
             */
            showMoreAd( id ) {
                console.log('show more triggered for: ' + id);
                EventBus.$emit('show-content', { id: id });
                this.$store.dispatch( 'setDisplayedContent', { id: id } );
            },

            /*
             * Calls the Translation and Language service
             */
            showLanguage( context, key ) {
                //return this.$trans( context, key );
                return this.$store.getters.getLanguageString( context, key );
            },

            /*
             *   Process the selected filters from the user.
             */
            processFilters( ) {
                /*
                 * If no filters are selected, show the card
                 */
                if (this.textSearch === ''
                    && this.cityFilter === '') {
                    this.show = true;

                } else {
                    /*
                     *    Initialize flags for the filtering
                     */
                    let textPassed = false,
                        cityPassed = false;

                    console.log("running search with: " + this.textSearch);

                    /*
                     * Check if text passes
                     */
                    if (this.textSearch !== '' && this.processLatestTextFilter(this.content, this.textSearch)) {
                        textPassed = true;
                    }

                    /*
                     *   Checks to see if the city passed or not.
                     */
                    if (this.cityFilter !== '' && this.processLatestCityFilter(this.content, this.cityFilter)) {
                        cityPassed = true;
                    }

                    /*
                     * If we have passes, then we show the Ad Card
                     */
                    this.show = textPassed || cityPassed;
                }
            }
        },

        /*
         *   Defines what should be watched by the Ad card.
         */
        watch: {
            /*
             *   Watches the city filter
             */
            cityFilter() {
                this.processFilters();
            },

            /*
             *    Watches the text search filter.
             */
            textSearch() {
                this.processFilters();
            }
        }
    }
</script>
