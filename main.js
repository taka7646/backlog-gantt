var loadCount = 0;
var selectIds = [];

const onSelect = (e) => {
    const current = e.target.value;
    for(let i = 0; i < selectIds.length; i++) {
        const index = selectIds[i];
        const t = document.getElementById("group_" + index);
        const f = document.getElementById("update_form_" + index);
        if (index == current || current == "") {
            t.style.display = "block";
            f.style.display = "block";
            if (current != "") {
                const g = document.getElementById("gantt_table_" + index);
                if (g.classList.contains("initialized_fixed_header")) {
                    // 取得済み
                    g.style.display = "table";
                } else {
                    // タスク内容を取得
                    const btn = t.getElementsByClassName("title-group__icon-collapsed")[0];
                    btn.click();
                }
            }
        } else {
            t.style.display = "none";
            f.style.display = "none";
        }
    }
}

function createOption(name, value) {
    let o = document.createElement('option');
    o.value = value;
    o.innerText = name;
    return o;
}

const createSelector = () => {
    const parent = document.getElementsByClassName('global-nav__list')[0];
    const tag = document.createElement('li');
    tag.className = "global-nav__list-item"
    const sel = document.createElement('select');
    sel.appendChild(createOption('---', ''));
    tag.appendChild(sel);
    
    const titles = document.getElementsByClassName("title-group -gantt");
    if (titles.length == 0) {
        loadCount++;
        if (loadCount < 10) {
            setTimeout(createSelector, 200);
        }
        return;
    }
    for(let i = 0; i < titles.length; i++) {
        let t = titles[i];
        const index = t.id.replace(/group_/,'');
        selectIds.push(index);
        sel.appendChild(createOption(t.innerText.trim(), index));
    }
    parent.appendChild(tag);
    tag.firstChild.addEventListener('change', onSelect);
}


function onLoad(e) {
    createSelector();
}
let observer = new MutationObserver(createSelector);
observer.observe(document.getElementById("global"), {childList: true });
window.addEventListener('load', onLoad);
