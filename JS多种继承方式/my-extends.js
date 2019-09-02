function Son () {
  Father.apply(this, arguments)
}
function Father () {

}

Son.prototype = Object.create(Father.prototype, {
  constructor: {
    value: Son,
    writeable: true
  }
});
Object.setPrototypeOf(Son, Father);
