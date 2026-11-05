/* Buildless catalog panel. All labels and identifiers are escaped before rendering. */
var VivaCatalogBrowser = (function () {
  'use strict';
  function escape(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function button(action, id, label, attrs) { return '<button type="button" data-nav-' + action + '="' + escape(id) + '"' + (attrs || '') + '>' + escape(label) + '</button>'; }
  function mount(root, callbacks) {
    callbacks = callbacks || {};
    var model = null, selected = null, rootId = 'animals', remembered = {}, opener = null, columnScroll = {}, lastColumnsHTML = null, lastResultsHTML = null, searchTimer = null;
    function cancelSearch(){if(searchTimer!==null){clearTimeout(searchTimer);searchTimer=null;}}
    function runSearch(){searchTimer=null;if(!callbacks.managedSearch)render();if(callbacks.onSearch)callbacks.onSearch(search.value);}
    function scheduleSearch(){cancelSearch();if(callbacks.searchDelay&&typeof setTimeout==='function')searchTimer=setTimeout(runSearch,callbacks.searchDelay);else runSearch();}
    function flushSearch(){if(searchTimer!==null){cancelSearch();runSearch();}}
    var title = root.querySelector('#catalogMenuTitle'), search = root.querySelector('#catalogNavSearch'), scope = root.querySelector('#catalogSearchScope'), trail = root.querySelector('#catalogTrail'), columns = root.querySelector('#catalogColumns'), results = root.querySelector('#catalogSearchResults'), status = root.querySelector('#catalogMenuStatus');
    var mossFilters = root.querySelector('#catalogMossFilters'), habitat = root.querySelector('#catalogMossHabitat'), form = root.querySelector('#catalogMossForm');
    function matching(id) { return model.descendantEntryIds(id).filter(function(entryId){ return rootId !== 'plants' || model.matchesMoss(entryId, habitat && habitat.value, form && form.value); }); }
    function visibleChildren(id) { return model.children(id).filter(function(n){return matching(n.id).length > 0;}); }
    function node(id) { var p = model ? model.path(id) : []; return p[p.length - 1]; }
    function close() { if (callbacks.inline) { if(callbacks.onClose)callbacks.onClose();return; } root.hidden = true; if (opener && typeof opener.focus === 'function') opener.focus(); }
    function select(id) {
      if (!node(id)) return;
      selected = id; rootId = model.path(id)[0].id; remembered[rootId] = id; render();
    }
    function row(n, selectedIds, nested) {
      var children = model.children(n.id), terminal = n.kind === 'entry' || n.kind === 'morph' || n.kind === 'variety';
      var primary = terminal ? button('open', n.id, n.label) : button('node', n.id, n.label + ' (' + matching(n.id).length + '항목)', ' aria-expanded="' + (selectedIds.indexOf(n.id) >= 0) + '"');
      if (terminal && children.length) primary += button('node', n.id, '›', ' aria-label="' + escape(n.label + ' 하위 항목 펼치기') + '" aria-expanded="' + (selectedIds.indexOf(n.id) >= 0) + '"');
      if(callbacks.tree&&!terminal)primary+=button('toggle',n.id,selectedIds.indexOf(n.id)>=0?'−':'+',' aria-label="'+escape(n.label+' 분류 접기·펼치기')+'" aria-expanded="'+(selectedIds.indexOf(n.id)>=0)+'"');
      return '<li class="catalog-node' + (selectedIds.indexOf(n.id) >= 0 ? ' selected' : '') + '"><div class="catalog-node-row">' + primary + '</div>' + (nested||'') + '</li>';
    }
    function treeRows(id,ids){
      return '<ul class="catalog-tree-branch">'+visibleChildren(id).map(function(n){return row(n,ids,ids.indexOf(n.id)>=0&&model.children(n.id).length?treeRows(n.id,ids):'');}).join('')+'</ul>';
    }
    function render() {
      if (!model) { status.textContent = '도감을 불러오는 중입니다.'; return; }
      // Rebuilding the path must not reset the columns the user is browsing.
      var horizontalScroll = columns.scrollLeft || 0;
      if (typeof columns.querySelectorAll === 'function') {
        Array.from(columns.querySelectorAll('[data-nav-column]')).forEach(function(column){
          columnScroll[column.dataset.navColumn] = column.scrollTop;
        });
      }
      var current = node(selected) || node(rootId), path = model.path(current.id), ids = path.map(function(n){return n.id;});
      title.textContent = path[0].label + ' 목차';
      if (mossFilters) mossFilters.hidden = rootId !== 'plants' || (callbacks.tree && !path.some(function(n){return /\/(mosses|liverworts|hornworts)(\/|$)/.test(n.id);}) && (!habitat||habitat.value==='all') && (!form||form.value==='all'));
      trail.innerHTML = path.map(function(n){return button('node',n.id,n.label);}).join('<span aria-hidden="true"> › </span>');
      var levels = path.filter(function(n){return model.children(n.id).length || n.kind === 'root';});
      var columnsHTML = callbacks.tree ? '<section class="catalog-column catalog-tree current" data-nav-column="'+escape(rootId)+'" aria-label="'+escape(path[0].label)+'">'+button('browse',rootId,'전체 보기')+treeRows(rootId,ids)+'</section>' : levels.map(function(n,i){
        var back = n.parentId ? button('node',n.parentId,'← 상위 분류') : '';
        var browse = (n.kind === 'root' || n.kind === 'group' || n.kind === 'genus') ? button('browse',n.id,'이 분류 전체 보기') : button('open',n.id,n.label + ' 상세 보기');
        return '<section class="catalog-column' + (i === levels.length-1 ? ' current' : '') + '" data-nav-column="' + escape(n.id) + '" aria-label="' + escape(n.label) + '">' + back + '<h3>' + escape(n.label) + '</h3>' + browse + '<ul>' + visibleChildren(n.id).map(function(c){return row(c,ids);}).join('') + '</ul></section>';
      }).join('');
      if (lastColumnsHTML !== columnsHTML) {
        lastColumnsHTML = columnsHTML;
        columns.innerHTML = columnsHTML;
        if (typeof columns.querySelectorAll === 'function') Array.from(columns.querySelectorAll('[data-nav-column]')).forEach(function(column){column.scrollTop = columnScroll[column.dataset.navColumn] || 0;});
        columns.scrollLeft = horizontalScroll;
      }
      var query = search.value.trim();
      results.hidden = !query; columns.hidden = !!query;
      if (query) {
        var found = model.search(query, scope.checked ? current.id : undefined).filter(function(n){return rootId !== 'plants' || model.matchesMoss(n.entryId, habitat && habitat.value, form && form.value);});
        if(callbacks.resultFilter)found=found.filter(callbacks.resultFilter);
        if(callbacks.sortResults)found=callbacks.sortResults(found);
        var resultsHTML = found.map(function(n){
          var context = model.path(n.id).slice(0,-1).map(function(p){return p.label;}).join(' › ');
          var type = {entry:'도감 항목',morph:'모프·패턴',variety:'품종'}[n.kind] || n.kind;
          if(callbacks.resultPhoto)return '<article class="catalog-search-result photo-result"><button type="button" data-nav-open="'+escape(n.id)+'">'+callbacks.resultPhoto(n)+'<strong>'+escape(n.label)+'</strong><small>'+escape(context)+'</small><span>'+escape(type)+'</span></button></article>';
          return '<div class="catalog-search-result"><small>' + escape(context) + '</small>' + button('open',n.id,n.label) + '<span>' + escape(type) + '</span></div>';
        }).join('') || '<p>검색 결과가 없습니다.</p>' + button('reset','','검색 초기화');
        if(lastResultsHTML!==resultsHTML){lastResultsHTML=resultsHTML;results.innerHTML=resultsHTML;}
        status.textContent = found.length + '개 검색 결과';
      } else { if(lastResultsHTML!==''){lastResultsHTML='';results.innerHTML='';} status.textContent = matching(current.id).length + '개 도감 항목'; }
    }
    root.addEventListener('click', function(event) {
      var target = event.target && typeof event.target.closest === 'function' ? event.target.closest('button') : null;
      if (!target || !root.contains(target)) return;
      var data = target.dataset || {};
      flushSearch();
      if (target.id === 'catalogMenuClose') { close(); return; }
      if (Object.prototype.hasOwnProperty.call(data,'navReset')) { search.value = ''; runSearch(); return; }
      if (!model) return;
      if(data.navToggle){var toggled=node(data.navToggle);if(toggled)select(model.path(selected).some(function(n){return n.id===toggled.id;})?toggled.parentId:toggled.id);return;}
      if (data.navNode) { select(data.navNode); if(callbacks.inline) { var chosen=node(data.navNode); if(chosen && ['entry','morph','variety'].indexOf(chosen.kind)>=0) { if(callbacks.onOpen) callbacks.onOpen(chosen); } else if(callbacks.onNavigate) callbacks.onNavigate(data.navNode); } }
      if (data.navBrowse && node(data.navBrowse)) { close(); if (callbacks.onBrowse) callbacks.onBrowse(data.navBrowse); }
      if (data.navOpen && node(data.navOpen)) { var n = node(data.navOpen); if(callbacks.inline) select(n.id); close(); if (callbacks.onOpen) callbacks.onOpen(n); }
    });
    root.addEventListener('input', function(event) { if(event.target === search) scheduleSearch(); });
    root.addEventListener('change', function(event) { flushSearch();if(event.target === scope) render(); if(event.target === habitat || event.target === form) { if (!matching(selected || rootId).length) selected = rootId; remembered[rootId] = selected; render();if(callbacks.onFilter)callbacks.onFilter(); } });
    root.addEventListener('keydown', function(event) { if(event.key === 'Escape' && !root.hidden) { event.preventDefault(); close(); } });
    return {
      setModel:function(value) { model = value; if (selected && !node(selected)) selected = null; render(); },
      open:function(id) { cancelSearch();if(root.hidden) opener = root.ownerDocument && root.ownerDocument.activeElement; rootId = id || rootId; selected = remembered[rootId] || rootId; search.value = ''; scope.checked = false; root.hidden = false; render(); if(typeof search.focus === 'function') search.focus(); },
      close:close, setSelected:select, setSearch:function(value){if(search.value!==value){search.value=value;render();}}, isOpen:function(){return !root.hidden;}
    };
  }
  return {mount:mount};
}());
