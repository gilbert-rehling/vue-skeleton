<style lang="scss">
    @import '~@/abstracts/_variables.scss';

    div#my-content-modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: 0;
        padding: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 3;

        div.my-content-modal {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            margin-left:auto;
            margin-right:auto;
            padding: 20px;
            background-color: $white;
            border: 1px solid $modalBorderColor;
            -webkit-box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
            box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
            border-radius: 4px;
            font-size: 16px;
            z-index: 4;
            height: 100%;
            overflow: auto;
            scroll-behavior: smooth;

            h3 {
                height: 45px;

                .close-label {
                    cursor: pointer;

                    img {
                        border: $red dotted 1px;
                    }
                }
            }

            .content-data-container {
                margin-top: 50px;
            }

            .modal-image {
                padding-left: 0;
            }

            .modal-text {
                padding-right: 0;
            }

            .modal-close-button {
                button {
                    background-color: $moreBackgroundColor;
                    color: $whiteFont;
                    border: $modalBorderColor 1px solid;
                    border-radius: 5px;
                    padding: 5px 10px;

                    &:hover {
                        background-color: $moreBackgroundColorHover;
                        border-color: $moreBorderColorHover;
                    }
                }
            }
        }
    }

    /* Small only - (max-width: 39.9375em) */
    @media screen and (max-width: 768px) {
        div#my-ad-modal{
            div.my-content-modal-box{
                width: 95%;
                max-width: 100%;
            }
        }
    }

    /* Medium only - (min-width: 40em) and (max-width: 63.9375em) */
    @media (min-width: 769px) and (max-width: 992px) {
        div#my-ad-modal {
            div.my-content-modal {
                max-width: 840px;
                min-width: 640px;
            }
        }
    }

    /* Large only - (min-width: 64em) and (max-width: 74.9375em) */
    @media (min-width: 993px) and (max-width: 2048px) {
        div#my-ad-modal {
            div.my-content-modal {
                max-width: 1240px;
                min-width: 1080px;
            }
        }
    }
</style>

<template>
    <div id="my-content-modal" v-show="displayModal" v-on:click="closeDialogOutside($event)">
        <div class="my-content-modal">
            <div class="model-content">
                <h3>{{ content.title }} <span v-on:click="closeThisDialog('button')" class="btn-info close-label float-right" type="button"><img title="Close modal" alt="Close modal" src="/img/close-icon.svg"></span></h3>
                <div class="grid-x text-center grid-padding-x">
                    <div class="cell small-12 medium-6 large-6 text-center modal-image">
                        <ImageSlider v-bind:images.sync="images"></ImageSlider>
                    </div>
                    <div class="cell small-12 medium-6 large-6 modal-text">
                        <div v-html="content.text"></div>
                    </div>
                </div>
                <div class="grid-x">
                    <div class="cell">
                        <hr>
                    </div>
                </div>
                <div class="content-data-container grid-x">
                    <div class="cell hide-for-small-only medium-2 large-3">
                        &nbsp;
                    </div>
                    <div class="cell small-12 medium-8 large-6">
                        <p><strong class="title" v-text="showLanguage('cont', 'phone')"></strong>		 <span class="data"><a tel="{ content.phone }">{{ content.phone }}</a></span></p>
                        <p><strong class="title" v-text="showLanguage('cont', 'suburb')"></strong>		 <span class="data">{{ content.suburb }}</span></p>
                        <p v-show="content.state"><strong class="title" v-text="showLanguage('cont', 'state')"></strong>		 <span class="data">{{ content.state }}</span></p>
                        <p><strong class="title" v-text="showLanguage('cont', 'language')"></strong>		 <span class="data">{{ content.language }}</span></p>
                        <p v-show="content.website"><strong class="title" v-text="showLanguage('cont', 'website')"></strong>	<span class="data"><a :href="content.website" target="_blank">{{ content.website }}</a></span></p>
                        <p><strong class="title" v-text="showLanguage('cont', 'adCreated')"></strong>	 <span class="data">{{ content.created }}</span></p>
                    </div>
                    <div class="cell hide-for-small-only medium-2 large-3">
                        &nbsp;
                    </div>
                </div>
                <div class="grid-x">
                    <div class="cell">
                        <p><strong class="title" v-text="showLanguage('cont', 'adLink')"></strong> <span class="data"><strong>	<a :href="'/#/' + content.slug_ad">{{ content.slug_ad }}</a></strong></span></p>
                        <hr>
                    </div>
                </div>
                <div class="grid-x">
                    <div v-show="content.video" class="cell">
                        <video data-video-source="{ content.video }" width="99%" height="auto" controls class="no-padd">
                        </video>
                    </div>
                </div>
            </div>
            <div class="modal-close-button">
                <button v-on:click="closeThisDialog('button')" class="btn-info float-right" type="button" v-text="showLanguage('global', 'close')"></button>
            </div>
        </div>
    </div>
</template>

<script>
    /*
     *   Imports the event bus.
     * <div class="image-container" v-for="i in ad.images" :key="i.id" :img="i.image">
     *    <p :title="showLanguage('title', 'moreImages')"><img class="image" alt="Images" :src="'/images/photos/' + img "></p>
     *  </div>
     */
    import { EventBus } from '../../event-bus.js';

    /*
     *   Import the Image Slider
     */
    import ImageSlider from '../../components/ads/ImageSlider.vue';

    export default {
        /*
         *   components we need to embrace
         */
        components: {
            ImageSlider
        },

        /*
         *   Defines the data used by the component.
         */
        data() {
            return {
                show: null,
                content: {},
                images: ''
            }
        },

        /*
         * Sets up the component on the mounted lifecycle hook.
         */
        mounted() {
            /*
             * When prompted to show a single item
             */
            EventBus.$on('show-item', function(data) {
                //console.log(' request to show content: ' + data);
                //console.log(' request to show content id: ' + data.id);
                this.getDisplayItem( data.id );
                this.show = true;

            }.bind(this));
        },

        beforeDestroy() {
            EventBus.$emit('closing-ad-modal');
        },

        computed: {
            displayModal() {
                return this.show;
            }
        },

        /*
         *   Methods required for this component
         */
        methods: {
            getDisplayItem( id ) {
                this.content = this.$store.getters.getDisplayItem( id );
            },

            /*
             * Calls the Translation and Language service
             */
            showLanguage( context, key ) {
                // !! old method !! return this.$trans( context, key );
                return this.$store.getters.getLanguageString( context, key );
            },

            /*
             * If ratings are required on images
             */
            setImageRating( value ) {
                return value === 1 ? 'Yes' : 'No';
            },

            /*
             * Return the images array
             */
            returnImages( images ) {
                return images;
            },

            /*
             * Close this modal dialog
             */
            closeThisDialog() {
                this.show = false;
                this.content = {};
                this.$store.dispatch( 'clearDisplayedItem' );
            },

            /*
             * Monitor for clicks outside the modal/dialog box
             */
            closeDialogOutside( event ) {
                if ($(event.target).is('#my-content-modal')) {
                    this.closeThisDialog();
                }
            },
        },

        /*
         *  Setup the watchers for this component
         */
        watch: {
            content: function() {
                // we can make the image display optional (only if images are present)
                if (this.content.images) {
                    let images = this.content.images;
                    if (images.indexOf(',')) {
                        images = images.split(',')
                    }
                    this.images = images;
                }
            }
        }
    }
</script>
