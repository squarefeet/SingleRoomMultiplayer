function MouseHandler() {
    var _leftBtnValue = 1,
        _rightBtnValue = 3,
        that = this;

    this.prevX = 0;
    this.prevY = 0;
    this.centerX = window.innerWidth / 2 | 0;
    this.centerY = window.innerHeight / 2 | 0;
    this.x = +this.centerX;
    this.y = +this.centerY;

    this.left = 0;
    this.right = 0;


    document.addEventListener( 'mousedown', function( e ) {
        e.preventDefault();
        if( e.which === _leftBtnValue ) {
            that.left = 1;
        }
        else if( e.which === _rightBtnValue ) {
            that.right = 1;
        }
    }, false );


    document.addEventListener( 'mousemove', function( e ) {
        that.prevX = that.x;
        that.prevY = that.y;
        that.x = e.pageX;
        that.y = e.pageY;
    }, false );


    document.addEventListener( 'mouseup', function( e ) {
        e.preventDefault();
        if( e.which === _leftBtnValue ) {
            that.left = 0;
        }
        else if( e.which === _rightBtnValue ) {
            that.right = 0;
        }
    }, false );


    this.onResize = function() {
        that.centerX = window.innerWidth / 2;
        that.centerY = window.innerHeight / 2;
    };
}