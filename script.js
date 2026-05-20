const storyPages = [
    {
        pageId: 0,
        milestones: [
            { id: 1, pathPercent: 0.22, icon: "🌻", modalIcon: "🌻", date: "sample", desc: "WAIT LANG" },
            { id: 2, pathPercent: 0.52, icon: "🌷", modalIcon: "🌷", date: "sample", desc: "WAIT LANG" },
            { id: 3, pathPercent: 0.82, icon: "🌹", modalIcon: "🌹", date: "sample", desc: "WAIT LANG" }
        ]
    },
    {
        pageId: 1,
        milestones: [
            { id: 4, pathPercent: 0.25, icon: "🌺", modalIcon: "🌺", date: "sample", desc: "WAIT LANG" },
            { id: 5, pathPercent: 0.58, icon: "💐", modalIcon: "💐", date: "sample", desc: "WAIT LANG" },
            { id: 6, pathPercent: 0.85, icon: "🐝", modalIcon: "🐝", date: "sample", desc: "WAIT LANG" }
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
    const maskPath = document.getElementById(`path-page-${pageIndex}-mask`);
    const pathLength = maskPath.getTotalLength();
    const currentMilestones = storyPages[pageIndex].milestones;

    currentMilestones.forEach(m => {
        const point = maskPath.getPointAtLength(m.pathPercent * pathLength);
        const node = document.createElement('div');
        node.className = 'flower';
        node.id = `milestone-${m.id}`;
        node.style.left = `${(point.x / 1000) * 100}%`;
        node.style.top = `${(point.y / 600) * 100}%`;
        node.innerText = m.icon;
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

    const maskPath = document.getElementById(`path-page-${currentPageIndex}-mask`);
    const totalPathLength = maskPath.getTotalLength();
    
    let restrictedPercent = 0.05 + (pagePercent * 0.90); 

    maskPath.style.strokeDasharray = totalPathLength;
    maskPath.style.strokeDashoffset = totalPathLength - (restrictedPercent * totalPathLength);

    const currentBeePoint = maskPath.getPointAtLength(restrictedPercent * totalPathLength);
    const lookAheadPoint = maskPath.getPointAtLength(Math.min(restrictedPercent * totalPathLength + 2, totalPathLength));
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
        actionBtn.innerText = "Smell the flowers?";
    } else {
        activeMilestone = null;
        actionBtn.classList.remove('visible');
    }
});

actionBtn.addEventListener('click', () => {
    if (!activeMilestone) return;
    document.getElementById('mem-img').innerText = activeMilestone.modalIcon;
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
    
    const maskPath = document.getElementById('path-page-0-mask');
    const totalPathLength = maskPath.getTotalLength();
    
    let initialPercent = 0.05; 
    
    maskPath.style.strokeDasharray = totalPathLength;
    maskPath.style.strokeDashoffset = totalPathLength - (initialPercent * totalPathLength);
    
    const startPoint = maskPath.getPointAtLength(initialPercent * totalPathLength);
    const lookAheadPoint = maskPath.getPointAtLength(initialPercent * totalPathLength + 2);
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