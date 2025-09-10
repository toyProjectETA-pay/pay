let menuData = null;
let menuSet = [];

export const loadMenu = async ()=>{
    if(menuData) return menuData;

    try{
        const res = await fetch('/static/menu.json');
        if(!res.ok){
            throw new Error(`${res.status}`);
        }
        menuData = await res.json();
        return menuData;
    }catch(err){
        console.error('[Error] Fail to load menu : ', err);
    }
}

export const getActivatedMenuList = (id)=>{
    if(!menuData) return null;

    return menuData.categories.find((categories) => categories.id === id);
}

export const getAllMenuList = ()=>{
    if(!menuData) return null;

    menuSet = menuData.categories.flatMap(cat =>
        cat.items.map(({id, name, price})=>({id, name, price}))
    );
    // console.log(menuSet);
    return menuSet;
}