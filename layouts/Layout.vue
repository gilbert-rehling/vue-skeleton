<style lang="scss">
    @import '~@/abstracts/_variables.scss';

    div#app-layout {
        header.header-content {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background: url(/img/header-background-dark-blue.png) repeat-x 0 -22px;
            padding-top: 16px;
            z-index: 2;

            .grid-container {
                max-width: 99%;
            }
        }
        .main-content {
            background-color: $mainBackgroundColor;
            padding: 30px 0 10px 0;
            margin-top: 0;
        }
    }
</style>

<template>
    <div id="app-layout" class="off-canvas-wrapper-inner" ref="appLayout">
        <header class="header-content">
            <navigation></navigation>
        </header>

        <success-notification></success-notification>

        <error-notification></error-notification>

        <message-notification></message-notification>

        <item-modal></item-modal>

        <current-spot></current-spot>

        <router-view></router-view>

        <no-results-found></no-results-found>

        <site-footer></site-footer>

        <register-modal></register-modal>

        <login-modal></login-modal>

        <language-modal></language-modal>

        <image-slideshow></image-slideshow>

    </div>
</template>

<script>
    /*
    *   Imports the event bus
    *   v-on:scroll="weAreScrolling($event)"
    *   v-on:scroll.native="weAreScrolling($event)"
    */
    import { EventBus } from '../event-bus.js';

    /*
    *   Import components
    */
    import Navigation from '../components/global/Navigation.vue';

    import CurrentSpot from '../components/global/CurrentSpot.vue';

    import SuccessNotification from "../components/global/SuccessNotification.vue";

    import ErrorNotification from "../components/global/ErrorNotification.vue";

    import MessageNotification from "../components/global/MessageNotification";

    import ItemModal from "../components/contents/ContentModal.vue";

    import ImageSlideshow from '../components/contents/ImageSlideshow.vue';

    import NoResultsFound from "../components/contents/NoResultsFound.vue";

    import SiteFooter from "../components/global/SiteFooter.vue";

    import RegisterModal from "../components/global/RegisterModal.vue";

    import LoginModal from "../components/global/LoginModal.vue";

    import LanguageModal from "../components/global/LanguageModal";

    export default {
        components: {
            Navigation,
            CurrentSpot,
            SuccessNotification,
            ErrorNotification,
            MessageNotification,
            ItemModal,
            ImageSlideshow,
            NoResultsFound,
            SiteFooter,
            RegisterModal,
            LoginModal,
            LanguageModal
        },

        /*
         * These are methods available for this component
         */
        method: {
            /*
             * For global sites we store the active vistors country
             */
            getCountryFromCookie() {
                return this.$cookie.get('my-country');
            },

            /*
             * I use IpCountry to fetch the visitor details
             */
            getCountryFromStore() {
                return this.$store.getters.getCountryName;
            },

            /*
             * In some cases we need tro monitor page scrolling
            weAreScrolling(event) {
                console.log("scrolling...");
                console.log(event.target.scrollHeight);
                console.log(event.target.scrollTop);
            }
        },

        /*
         * Actions that trigger when this component is mounted
         */
        mounted() {
            /*
             * We let the country cookie override the stored value
             */
            if (this.getCountryFromCookie !== this.getCountryFromStore)  {
                this.$store.dispatch('setCountryNameFromCookie', this.$cookie.get('my-country'));
            }
        },

        /*
         * Actions that trigger when this component is created
         */
        created() {
            /*
             * Get the visitor loction data
             */
            this.$store.dispatch( 'getLocation');
            
            /*
             * Set the default language
             */
            this.$store.dispatch( 'setDefaultLanguage' );

            /*
             * Handle error status
             */
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch('logoutUser');
                    }
                    throw err;
                });
            });

            /*
             * Attempt to load the user
             */
            this.$store.dispatch( 'loadUser' );

            /*
             * Experimenting with window scrolling
             */
            window.addEventListener('scroll', this.weAreScrolling);
        },

        /*
         * Action that trigger when this component is destroyed
         */
        destroyed() {
            /*
             * Stop watching for the window scroll
             */
            window.removeEventListener('scroll', this.weAreScrolling);
        }
    }
</script>
