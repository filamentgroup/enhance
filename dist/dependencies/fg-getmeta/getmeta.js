// getMeta function: get a meta tag's content attr by its name
(function( w ){
  var getMeta = function( metaname ){
  	var metas = w.document.getElementsByTagName( "meta" );
  	var meta;
  	for( var i = 0; i < metas.length; i ++ ){
  		if( metas[ i ].name && metas[ i ].name === metaname ){
  			meta = metas[ i ];
  			break;
  		}
  	}
  	return meta && meta.content;
  };
  
  // commonjs
  if( typeof module !== "undefined" ){
  	module.exports = getMeta;
  }
  else {
    w.getMeta = getMeta
  }
}( typeof global !== "undefined" ? global : this ));
