/* Pure browse model: labels are data; renderers must use textContent. */
var VivaCatalog = (function () {
  'use strict';
  function normalize(value) { return String(value || '').normalize('NFKC').toLowerCase().replace(/[\s\-‐‑–—]+/g, ''); }
  function createModel(animals, plants, morphs, genusNames, carePositions) {
    morphs = morphs || {}; genusNames = genusNames || {}; carePositions = carePositions || {};
    var nodes = [], byId = new Map(), childMap = new Map(), entries = new Map(), text = new Map();
    function add(id, label, parentId, kind, page, extra) {
      if (byId.has(id)) return byId.get(id);
      var node = Object.assign({id: id, label: label, parentId: parentId, kind: kind, page: page, count: 0}, extra || {});
      nodes.push(node); byId.set(id, node); childMap.set(id, []);
      if (parentId) childMap.get(parentId).push(node);
      return node;
    }
    add('animals', '동물 도감', null, 'root', 'animals');
    add('plants', '식물 도감', null, 'root', 'plants');
    function branch(parent, key, label, kind) { return add(parent.id + '/' + key, label, parent.id, kind || 'group', parent.page); }
    function genus(parent, value) { return branch(parent, 'genus:' + value.toLowerCase(), genusNames[value] || value, 'genus'); }
    function animalParent(row) {
      var major = row.major || '분류 미확인', middle = row.middle || '분류 미확인', latin = row.latin || '', g = latin.split(/\s+/)[0];
      var keys = {'파충류':'reptiles','양서류':'amphibians','절지동물':'arthropods','연체동물':'molluscs'};
      var p = branch(byId.get('animals'), keys[major] || 'unclassified', major);
      if (major === '파충류') {
        if (middle === '게코') {
          p = branch(p, 'geckos', '게코');
          return /^Phelsuma /.test(latin) ? branch(p, 'day-geckos', '데이게코류') : p;
        }
        if (middle.indexOf('뱀') === 0) return branch(branch(p, 'snakes', '뱀'), middle.indexOf('보아') >= 0 ? 'boas-pythons' : 'other', middle.indexOf('보아') >= 0 ? '보아·파이톤류' : '콜루브리드·기타');
        if (middle === '거북') return branch(branch(p, 'turtles', '거북'), /^(Testudo|Chelonoidis)$/.test(g) ? 'tortoises' : 'box-turtles', /^(Testudo|Chelonoidis)$/.test(g) ? '육지거북류' : '상자거북류');
        p = branch(p, 'other-lizards', '기타 도마뱀');
        if (middle === '스킨크') return branch(p, 'skinks', '스킨크류');
        if (middle === '카멜레온' || /^(Chamaeleo|Furcifer|Calumma)$/.test(g)) return branch(p, 'chameleons', '카멜레온류');
        if (middle === '모니터' || g === 'Varanus') return branch(p, 'monitors', '모니터류');
        if (middle === '아가마·혼리자드') return branch(p, 'agamids-horned', '아가마·드래곤·혼리자드류');
        return branch(p, 'other', '그 외 도마뱀');
      }
      if (major === '양서류') {
        if (middle === '도롱뇽·뉴트') return branch(p, 'salamanders', '도롱뇽·뉴트');
        p = branch(p, 'frogs-toads', '개구리·두꺼비');
        if (/^(Dendrobates|Ranitomeya|Oophaga|Epipedobates|Phyllobates|Adelphobates|Ameerega)$/.test(g)) return branch(p, 'dart-frogs', '다트프로그류');
        if (/^(Ceratophrys|Chacophrys)$/.test(g)) return branch(p, 'pacman', '팩맨·혼프로그류');
        if (/^(Agalychnis|Dendropsophus|Hyla|Litoria|Phyllomedusa|Pithecopus|Polypedates|Theloderma|Zhangixalus|Trachycephalus)$/.test(g)) return branch(p, 'tree-frogs', '트리프로그류');
        return branch(p, 'other-frogs', '그 외 개구리·두꺼비');
      }
      if (major === '절지동물') {
        if (middle === '등각류') return genus(branch(p, 'isopods', '등각류'), g || '분류 미확인');
        if (middle === '톡토기') return branch(p, 'springtails', '톡토기');
        if (middle === '노래기') return branch(p, 'millipedes', '노래기');
        if (/^(게|육지소라게)$/.test(middle)) return branch(p, 'crabs-hermits', '게·육지소라게');
        if (/^(거미류|타란튤라|전갈류)$/.test(middle)) {
          p = branch(p, 'arachnids', '거미·전갈·기타 거미류');
          var key = middle === '타란튤라' ? 'tarantulas' : middle === '전갈류' ? 'scorpions' : g === 'Phidippus' ? 'jumping-spiders' : 'other';
          return branch(p, key, {tarantulas:'타란튤라',scorpions:'전갈', 'jumping-spiders':'점핑스파이더',other:'그 외 거미류'}[key]);
        }
        if (/^(곤충|사마귀|대벌레·잎벌레|딱정벌레)$/.test(middle)) {
          p = branch(p, 'insects', '곤충');
          return branch(p, {'사마귀':'mantises','대벌레·잎벌레':'stick-leaf','딱정벌레':'beetles'}[middle] || 'other', middle === '곤충' ? '그 외 곤충' : middle);
        }
      }
      if (major === '연체동물' && middle === '달팽이') return branch(p, 'snails', '달팽이류');
      return branch(p, 'unclassified:' + encodeURIComponent(middle), middle);
    }
    function plantParent(row) {
      var category = row.category || '', g = (row.latin || '').split(/\s+/)[0], p = byId.get('plants');
      if (/^(Neoregelia|Tillandsia|Guzmania|Cryptanthus)$/.test(g) || category === '브로멜리아·착생') p = branch(p, 'bromeliads', '브로멜리아류');
      else if (category === '보석란' || category === '착생란') p = branch(branch(p, 'orchids', '난초류'), category === '보석란' ? 'jewel' : 'other', category === '보석란' ? '보석란' : '그 외 착생란·소형 난초');
      else if (category === '고사리·석송류' || category === '양치식물' || /^(Leptochilus|Bolbitis|Crepidomanes|Hymenophyllum)$/.test(g)) p = branch(p, 'ferns', '고사리·석송류');
      else if (category === '이끼' || category === '이끼류') p = branch(p, 'mosses', '선류 (이끼)');
      else if (category === '우산이끼류' || category === '태류') p = branch(p, 'liverworts', '태류 (우산이끼·잎태류)');
      else if (category === '뿔이끼류') p = branch(p, 'hornworts', '뿔이끼류');
      else if (category === '식충식물') p = branch(p, 'carnivorous', '식충식물');
      else if (['관엽식물','덩굴식물','지피식물','수변식물'].indexOf(category) >= 0) p = branch(p, 'foliage', '관엽·초화류');
      else p = branch(p, 'unclassified', '분류 미확인');
      return genus(p, g || '분류 미확인');
    }
    function addEntry(row, parent) {
      var n = add('entry:' + row.id, row.name, parent.id, 'entry', parent.page, {entryId:row.id,mossHabitats:row.mossHabitats || [],mossForms:row.mossForms || []});
      entries.set(row.id, n);
      var searchText = [row.name, row.latin, row.aliases, row.varieties, row.genus, genusNames[(row.latin || '').split(/\s+/)[0]], row.id.indexOf('plant-')===0 ? carePositions[row.id] : ''];
      (morphs[row.id] || []).forEach(function (m, index) {
        var mn = add('morph:' + row.id + ':' + index, m.name, n.id, 'morph', n.page, {entryId:row.id,morphIndex:index});
        text.set(mn.id, normalize([m.name,m.aliases])); searchText.push(m.name, m.aliases);
      });
      if (parent.page === 'plants') (row.varieties || []).forEach(function (value, index) {
        var v = typeof value === 'string' ? {name:value} : value;
        var vn = add('variety:' + row.id + ':' + index, v.name, n.id, 'variety', n.page, {entryId:row.id,varietyIndex:index});
        text.set(vn.id, normalize([v.name,v.aliases])); searchText.push(v.name, v.aliases);
      });
      text.set(n.id, normalize(searchText));
    }
    (animals || []).forEach(function (r) { var p = animalParent(r), g = (r.latin || '').match(/^[A-Z][a-z]+\b/); if (p.kind !== 'genus' && g) p = genus(p, g[0]); addEntry(r, p); });
    (plants || []).forEach(function (r) { addEntry(r, plantParent(r)); });
    function children(id) { return (childMap.get(id) || []).slice(); }
    function path(id) { var result = [], n = byId.get(id); while (n) { result.unshift(n); n = byId.get(n.parentId); } return result; }
    function descendantEntryIds(id) {
      var n = byId.get(id); if (!n) return [];
      if (n.entryId) return [n.entryId];
      return children(id).reduce(function (out, c) { return out.concat(descendantEntryIds(c.id)); }, []);
    }
    nodes.forEach(function (n) { n.count = new Set(descendantEntryIds(n.id)).size; });
    return {nodes:nodes, children:children, path:path, entryNode:function (id) { return entries.get(id); }, descendantEntryIds:descendantEntryIds,
      matchesMoss:function (entryId, habitat, form) {
        var n = entries.get(entryId); return !!n && (!habitat || habitat === 'all' || n.mossHabitats.indexOf(habitat) >= 0) && (!form || form === 'all' || n.mossForms.indexOf(form) >= 0);
      },
      search:function (query, scopeId) {
        var q = normalize(query), allowed = scopeId ? new Set(descendantEntryIds(scopeId)) : null;
        return nodes.filter(function (n) { return text.has(n.id) && (!allowed || allowed.has(n.entryId)) && (!q || text.get(n.id).indexOf(q) >= 0); });
      }};
  }
  return {createModel:createModel};
}());
