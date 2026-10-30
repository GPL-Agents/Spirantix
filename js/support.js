(function () {
  var form = document.querySelector('[data-support-search]');
  if (!form) return;
  var input = document.getElementById('support-q');
  var count = document.querySelector('[data-support-count]');
  var rows = [].slice.call(document.querySelectorAll('[data-support-section]'));
  function textOf(row) { return (row.getAttribute('data-search') + ' ' + row.textContent).toLowerCase(); }
  function apply() {
    var q = (input.value || '').trim().toLowerCase();
    var words = q ? q.split(/\s+/) : [];
    var shown = 0;
    rows.forEach(function (row) {
      var t = textOf(row);
      var ok = words.every(function (w) { return t.indexOf(w) !== -1; });
      row.hidden = !ok;
      if (ok) shown++;
    });
    if (!count) return;
    count.textContent = q ? (shown ? shown + ' section' + (shown === 1 ? '' : 's') + ' match ' + q : 'Nothing on this page matches ' + q + '. Try sign in, calendar, photos, or helpers.') : '';
  }
  input.addEventListener('input', apply);
  form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
  apply();
})();
