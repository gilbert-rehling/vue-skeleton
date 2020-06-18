export const ContentTextFilter = {
  methods: {
    processContentTextFilter( content, text ) {
      /*
       *  Only process if the text is greater than 1
       */
      if ( text.length > 1 ) {
        /*
         *  If any of these properties matche the entered text return true otherwise return false.
         *  ToDo !! You will want to review and edit/add your own properties in here !!
         */
        if( content.title.toLowerCase().match( '[^,]*' + text.toLowerCase() + '[,$]*' )
          || content.intro.toLowerCase().match( '[^,]*' + text.toLowerCase() + '[,$]*' )
          || content.text.toLowerCase().match( '[^,]*' + text.toLowerCase() + '[,$]*' )
          || content.phone.toLowerCase().match( '[^,]*' + text.toLowerCase() + '[,$]*' )
          || content.suburb.toLowerCase().match( '[^,]*' + text.toLowerCase() + '[,$]*' )
          || content.postcodes.toLowerCase().match( '[^,]*' + text.toLowerCase() + '[,$]*' )) {
            // content is matched
          return true;

        } else {
            // content is not matched
          return false;
        }

      } else {
          // error!! search text not founds
        return true;
      }
    }
  }
};
