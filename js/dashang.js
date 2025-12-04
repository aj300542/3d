const fileListEl = document.getElementById('fileList');
const amountButtons = Array.from(document.querySelectorAll('.amount-btn'));
const buyModal = document.getElementById('payModal');
const selectedAmountEl = document.getElementById('selectedAmount');
const paidBtn = document.getElementById('paidConfirm');
const cancelBtn = document.getElementById('payCancel');
const downloadAllEl = document.getElementById('downloadAll');

// 生成单个行：含 gif 缩略图 + 元数据 + 按钮（锁定态）
function createLockedRow(f) {
    const row = document.createElement('div');
    row.className = 'file';
    row.innerHTML = `
        <div class="file-left">
          <figure class="gif-thumb" aria-hidden="false">
            <img src="${f.gif}" alt="${f.gifAlt}" loading="lazy" />
          </figure>
          <div class="meta">
            <div class="name">${f.name}</div>
            <div class="sub">OBJ • <span data-size>已锁定</span></div>
          </div>
        </div>
        <div class="actions">
          <button class="btn-locked" disabled>${LOCKED_LABEL}</button>
        </div>
      `;
    return row;
}

// 解锁态行
function createUnlockedRow(f) {
    const row = document.createElement('div');
    row.className = 'file';
    row.innerHTML = `
        <div class="file-left">
          <figure class="gif-thumb" aria-hidden="false">
            <img src="${f.gif}" alt="${f.gifAlt}" loading="lazy" />
          </figure>
          <div class="meta">
            <div class="name">${f.name}</div>
            <div class="sub">OBJ •</div>
          </div>
        </div>
        <div class="actions">
          <a class="btn" href="${f.path}" download>下载</a>
        </div>
      `;
    return row;
}

// 初始化锁定列表（含 gif）
function lockFileList() {
    fileListEl.innerHTML = '';
    FILES.forEach(f => fileListEl.appendChild(createLockedRow(f)));

    // 锁定全部下载按钮（视觉与主按钮一致但不可用）
    downloadAllEl.className = 'btn';
    downloadAllEl.style.opacity = '0.62';
    downloadAllEl.style.pointerEvents = 'none';
    downloadAllEl.href = '#';
    downloadAllEl.setAttribute('aria-disabled', 'true');
    downloadAllEl.removeAttribute('download');
}


// 打开模态并设置金额显示
let selectedAmount = null;
function openModalWithAmount(amount) {
    selectedAmount = amount;
    selectedAmountEl.textContent = `支持金额：¥${amount}`;
    paidBtn.disabled = false;
    paidBtn.textContent = '我已完成付款';
    buyModal.style.display = 'flex';
    buyModal.setAttribute('aria-hidden', 'false');
    paidBtn.focus();
}
function closeModal() {
    buyModal.style.display = 'none';
    buyModal.setAttribute('aria-hidden', 'true');
}

// 绑定金额按钮
amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        amountButtons.forEach(x => x.classList.remove('active'));
        btn.classList.add('active');
        const amount = btn.getAttribute('data-amount');
        openModalWithAmount(amount);
    });
});

// 取消模态
cancelBtn.addEventListener('click', closeModal);

// 点击已支付（客户端示例：直接解锁）
paidBtn.addEventListener('click', () => {
    paidBtn.disabled = true;
    paidBtn.textContent = '正在处理...';
    setTimeout(() => {
        unlockFileList();
        closeModal();
    }, 700);
});

// Esc 关闭
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && buyModal.getAttribute('aria-hidden') === 'false') closeModal();
});

document.addEventListener('DOMContentLoaded', () => {
    lockFileList();
    // 如需可在此处更新二维码图片路径
    // document.getElementById('qrAlipay').src = '3d_print/img/1711604188130.jpg';
    // document.getElementById('qrWeChat').src = '3d_print/img/mm_facetoface_collect_qrcode_1711603406115.png';
});