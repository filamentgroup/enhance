// getMeta function: get a meta tag's content attr by its name
(function( w ){
  w.getMeta = function( metaname ){
  	var metas = window.document.getElementsByTagName( "meta" );
  	var meta;
  	for( var i = 0; i < metas.length; i ++ ){
  		if( metas[ i ].name && metas[ i ].name === metaname ){
  			meta = metas[ i ];
  			break;
  		}
  	}
  	return meta.content;
  };
  
  // commonjs
  if( typeof module !== "undefined" ){
  	module.exports = w.getMeta;
  }
}( this ));
