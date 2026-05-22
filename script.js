const storyPages = [
    {
        pageId: 0,
        milestones: [
            { id: 1, pathPercent: 0.22, icon: "https://img.icons8.com/?size=100&id=7oDLiKhJyBCV&format=png&color=000000", modalIcon: "memories/memory001.jpg", date: "march 2024", desc: "first date!" }, // rose
            { id: 2, pathPercent: 0.52, icon: "https://img.icons8.com/?size=100&id=cwhLAZV7PdD9&format=png&color=000000", modalIcon: "memories/memory002.jpg", date: "april 2024", desc: "first kiss... and yk" }, // daisy
            { id: 3, pathPercent: 0.82, icon: "https://img.icons8.com/?size=100&id=wXAKpdSZRGMD&format=png&color=000000", modalIcon: "memories/memory003.jpg", date: "june 2024", desc: "first... nito" } // tulip
        ]
    },
    {
        pageId: 1,
        milestones: [
            { id: 4, pathPercent: 0.25, icon: "https://img.icons8.com/?size=100&id=vgvdUorODfWE&format=png&color=000000", modalIcon: "memories/memory004.jpg", date: "august 2024", desc: "first birthday salubong" }, // lavender
            { id: 5, pathPercent: 0.58, icon: "https://img.icons8.com/?size=100&id=fvhMoHEKVJMg&format=png&color=000000", modalIcon: "memories/memory005.jpg", date: "october 2024", desc: "i don't remember why you were here you probably just missed me" }, // daisy
            { id: 6, pathPercent: 0.85, icon: "https://img.icons8.com/?size=100&id=gBbOveYifc4w&format=png&color=000000", modalIcon: "memories/memory006.jpg", date: "december 2024", desc: "1ST CHRISTMAS" } // mistletoe
        ]
    },
    {
        pageId: 2,
        milestones: [
            { id: 7, pathPercent: 0.25, icon: "https://img.icons8.com/?size=100&id=HIbj7WorHLRT&format=png&color=000000", modalIcon: "memories/memory007.jpg", date: "january 2025", desc: "this and gootopia!" }, // sunflower
            { id: 8, pathPercent: 0.55, icon: "https://img.icons8.com/?size=100&id=T9HN3Xc2RaHJ&format=png&color=000000", modalIcon: "memories/memory008a.jpg", date: "february 2025", desc: "met pedro and tkim for the first time + tried badminton and baking with bubby" }, // tissue rose
            { id: 9, pathPercent: 0.85, icon: "https://img.icons8.com/?size=100&id=ZirWHujWhcCH&format=png&color=000000", modalIcon: "memories/memory009.jpg", date: "may 2025", desc: "tried to recreate our first date... and failed heh" } // carnation
        ]
    },
    {
        pageId: 3,
        milestones: [
            { id: 10, pathPercent: 0.25, icon: "https://img.icons8.com/?size=100&id=tKXB4ORgNHh3&format=png&color=000000", modalIcon: "memories/memory010.jpg", date: "july 2025", desc: "this after samgyup 🤤" }, // hibiscus
            { id: 11, pathPercent: 0.55, icon: "https://img.icons8.com/?size=100&id=1pDs7VZLvrqz&format=png&color=000000", modalIcon: "memories/memory011.jpg", date: "september 2025", desc: "it's just you and me~" }, // blue tulip
            { id: 12, pathPercent: 0.85, icon: "https://img.icons8.com/?size=100&id=yd4mReUJEvkX&format=png&color=000000", modalIcon: "memories/memory012.jpg", date: "october 2025", desc: "YOU HAVE STOLEN MY HEART" } // twice bouquet
        ]
    },
    {
        pageId: 4,
        milestones: [
            { id: 13, pathPercent: 0.20, icon: "https://img.icons8.com/?size=100&id=WYCR35ummeRN&format=png&color=000000", modalIcon: "memories/memory013.jpg", date: "december 2025", desc: "i have been changed for goodddddd" }, // gardenia
            { id: 14, pathPercent: 0.42, icon: "https://img.icons8.com/?size=100&id=Pn5GETbGimEC&format=png&color=000000", modalIcon: "memories/memory014.jpg", date: "february 2025", desc: "don't look at my chin" }, // rose
            { id: 15, pathPercent: 0.65, icon: "https://img.icons8.com/?size=100&id=Md5CclQNqlvh&format=png&color=000000", modalIcon: "memories/memory015.jpg", date: "april 2025", desc: "thank you for taking care of me! in every way possible :')" }, // dandelion
            { id: 16, pathPercent: 0.88, icon: "https://img.icons8.com/?size=100&id=70LKs2EHRJsP&format=png&color=000000", modalIcon: "memories/birthdaybub.jpg", date: "today", desc: "happy birthday, kyle!" } // hive - kyle pogi
        ]
    }
];

const bee = document.getElementById('bee');
const actionBtn = document.getElementById('actionBtn');
const memoryModal = document.getElementById('memory');
const milestonesLayer = document.getElementById('milestones-layer');

let isModalOpen = false;
let currentPageIndex = -1;
let activeMilestone = null;

function renderPageMilestones(pageIndex) {
    milestonesLayer.innerHTML = '';
    
    const visualPath = document.getElementById(`path-page-${pageIndex}-visual`);
    if (!visualPath) return;
    
    const pathLength = visualPath.getTotalLength();
    const currentMilestones = storyPages[pageIndex].milestones;

    currentMilestones.forEach(m => {
        const point = visualPath.getPointAtLength(m.pathPercent * pathLength);
        const node = document.createElement('div');
        node.className = 'flower';
        node.id = `milestone-${m.id}`;
        node.style.left = `${(point.x / 1000) * 100}%`;
        node.style.top = `${(point.y / 600) * 100}%`;
        
        if (m.icon.startsWith('http') || m.icon.startsWith('/') || m.icon.includes('.')) {
            node.innerHTML = `<img src="${m.icon}" alt="icon" style="width: 100%; height: 100%; object-fit: contain;" />`;
        } else {
            node.innerText = m.icon;
        }
        
        milestonesLayer.appendChild(node);
    });
}

window.addEventListener('scroll', () => {
    if (isModalOpen) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight - windowHeight;
    let globalPercent = Math.min(Math.max(scrollY / docHeight, 0), 1);

    const totalPages = storyPages.length;
    let pageTarget = Math.floor(globalPercent * totalPages);
    if (pageTarget >= totalPages) pageTarget = totalPages - 1;

    let pagePercent = (globalPercent * totalPages) - pageTarget;

    if (pageTarget !== currentPageIndex) {
        currentPageIndex = pageTarget;
        renderPageMilestones(currentPageIndex);
        
        document.querySelectorAll('.flight-path-visual').forEach(el => el.style.display = 'none');
        document.getElementById(`path-page-${currentPageIndex}-visual`).style.display = 'block';
    }

    const visualPath = document.getElementById(`path-page-${currentPageIndex}-visual`);
    const maskPath = document.getElementById(`path-page-${currentPageIndex}-mask`);
    
    if (!visualPath || !maskPath) return;
    
    const totalPathLength = visualPath.getTotalLength();
    let restrictedPercent = 0.05 + (pagePercent * 0.90); 

    if (currentPageIndex === totalPages - 1) {
        const lastMilestonePercent = 0.88;
        if (restrictedPercent > lastMilestonePercent) {
            restrictedPercent = lastMilestonePercent;
        }
    }

    maskPath.style.strokeDasharray = totalPathLength;
    maskPath.style.strokeDashoffset = totalPathLength - (restrictedPercent * totalPathLength);

    const currentBeePoint = visualPath.getPointAtLength(restrictedPercent * totalPathLength);
    const lookAheadPoint = visualPath.getPointAtLength(Math.min(restrictedPercent * totalPathLength + 2, totalPathLength));
    const angle = Math.atan2(lookAheadPoint.y - currentBeePoint.y, lookAheadPoint.x - currentBeePoint.x) * 180 / Math.PI;

    let pctX = (currentBeePoint.x / 1000) * 100;
    let pctY = (currentBeePoint.y / 600) * 100;

    bee.style.left = `${pctX}%`;
    bee.style.top = `${pctY}%`;
    
    let flipY = (angle > 90 || angle < -90) ? -1 : 1;
    bee.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleY(${flipY})`;

    actionBtn.style.left = `${pctX}%`;
    actionBtn.style.top = `${pctY + 12}%`;

    let currentMilestones = storyPages[currentPageIndex].milestones;
    let currentActive = null;

    currentMilestones.forEach(m => {
        const nodeElement = document.getElementById(`milestone-${m.id}`);
        if (!nodeElement) return;

        let distance = Math.abs(restrictedPercent - m.pathPercent);

        if (distance < 0.03) {
            nodeElement.classList.add('active');
            currentActive = m;
        } else {
            nodeElement.classList.remove('active');
        }
    });

    if (currentActive) {
        activeMilestone = currentActive;
        actionBtn.classList.add('visible');
        
        if (currentActive.id === 16) {
            actionBtn.innerText = "Come in?";
        } else {
            actionBtn.innerText = "Smell the flowers?";
        }
    } else {
        activeMilestone = null;
        actionBtn.classList.remove('visible');
    }
});

actionBtn.addEventListener('click', () => {
    if (!activeMilestone) return;

    const imgContainer = document.getElementById('mem-img');
    
    if (activeMilestone.modalIcon.startsWith('/') || activeMilestone.modalIcon.includes('.')) {
        imgContainer.innerHTML = `<img src="${activeMilestone.modalIcon}" alt="Memory Image" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;" />`;
    } else {
        imgContainer.innerText = activeMilestone.modalIcon;
    }

    document.getElementById('mem-date').innerText = activeMilestone.date;
    document.getElementById('mem-desc').innerText = activeMilestone.desc;
    
    memoryModal.classList.add('show');
    isModalOpen = true;
    actionBtn.classList.remove('visible');
});

window.closeMemory = function() {
    memoryModal.classList.remove('show');
    isModalOpen = false;
}

function initBeePosition() {
    currentPageIndex = 0;
    renderPageMilestones(currentPageIndex);
    
    document.getElementById('path-page-0-visual').style.display = 'block';
    
    const visualPath = document.getElementById('path-page-0-visual');
    const maskPath = document.getElementById('path-page-0-mask');
    
    if (!visualPath || !maskPath) return;
    
    const totalPathLength = visualPath.getTotalLength();
    let initialPercent = 0.05; 
    
    maskPath.style.strokeDasharray = totalPathLength;
    maskPath.style.strokeDashoffset = totalPathLength - (initialPercent * totalPathLength);
    
    const startPoint = visualPath.getPointAtLength(initialPercent * totalPathLength);
    const lookAheadPoint = visualPath.getPointAtLength(initialPercent * totalPathLength + 2);
    const angle = Math.atan2(lookAheadPoint.y - startPoint.y, lookAheadPoint.x - startPoint.x) * 180 / Math.PI;
    
    let pctX = (startPoint.x / 1000) * 100;
    let pctY = (startPoint.y / 600) * 100;
    
    bee.style.left = `${pctX}%`;
    bee.style.top = `${pctY}%`;
    bee.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    
    actionBtn.style.left = `${pctX}%`;
    actionBtn.style.top = `${pctY + 12}%`;
}

document.addEventListener('DOMContentLoaded', initBeePosition);