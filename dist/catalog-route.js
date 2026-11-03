'use strict';
var VivaCatalogRoute=(()=>{
  const defaults={page:'animals',catalogNode:'animals',search:'',environment:'all',category:'all',subgroup:'all',availability:'all',sizeClass:'all',sort:'popular',savedOnly:false,excludeSpecial:false};
  function encode(state,entryId=null,selectionId=null){
    const params=new URLSearchParams();
    for(const key of Object.keys(defaults)){const value=state[key]??defaults[key];if(value!==defaults[key])params.set(key,String(value));}
    if(entryId)params.set('entry',entryId);if(selectionId)params.set('selection',selectionId);
    return '#guide?'+params.toString();
  }
  function decode(hash){
    if(!String(hash).startsWith('#guide?'))return null;
    const params=new URLSearchParams(hash.slice(7)),state={...defaults};
    for(const key of Object.keys(defaults))if(params.has(key))state[key]=typeof defaults[key]==='boolean'?params.get(key)==='true':params.get(key);
    if(!['animals','plants','shops'].includes(state.page))state.page='animals';
    if(!['popular','name','recent','saved'].includes(state.sort))state.sort='popular';
    if(!['all','domestic','new','unranked','size','priced'].includes(state.availability))state.availability='all';
    if(!['all','small','medium','large','unknown'].includes(state.sizeClass))state.sizeClass='all';
    if(!params.has('catalogNode'))state.catalogNode=state.page==='plants'?'plants':'animals';
    const id=params.get('entry'),selection=params.get('selection');
    return {state,entryId:/^(species|plant)-\d+$/.test(id||'')?id:null,selectionId:/^(morph|variety):(species|plant)-\d+:\d+$/.test(selection||'')?selection:null};
  }
  return {encode,decode};
})();
