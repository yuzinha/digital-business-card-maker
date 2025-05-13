document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const previewContent = document.getElementById('previewContent');

    let lastPreviewData = null;

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const nameRomaji = document.getElementById('nameRomaji').value;
        const profileImage = document.getElementById('profileImage').files[0];
        const topic = document.getElementById('topic').value;
        const productTitle = document.getElementById('productTitle').value;
        const productImageUrl = document.getElementById('productImageUrl').value;
        const productLinkUrl = document.getElementById('productLinkUrl').value;

        if (!name || !nameRomaji || !profileImage || !topic || !productTitle || !productImageUrl || !productLinkUrl) {
            alert('すべての項目を入力してください。');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            lastPreviewData = {
                name, nameRomaji, imageUrl, topic, productTitle, productImageUrl, productLinkUrl
            };
            updatePreview(name, nameRomaji, imageUrl, topic, productTitle, productImageUrl, productLinkUrl);
        };
        reader.readAsDataURL(profileImage);
    });

    function updatePreview(name, nameRomaji, profileImageUrl, topic, productTitle, productImageUrl, productLinkUrl) {
        // QRコード生成（Google Chart API）
        const qrCodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(productLinkUrl)}`;

        previewContent.innerHTML = `
            <img src="${profileImageUrl}" alt="${name}" class="profile-image">
            <div class="profile-name">${name}</div>
            <div class="profile-name-romaji">${nameRomaji}</div>
            <div class="product-box">
                <div class="product-topic">${topic}</div>
                <div class="product-title">${productTitle}</div>
                <a href="${productLinkUrl}" target="_blank">
                    <img src="${productImageUrl}" alt="${productTitle}" class="product-image">
                </a>
                <div class="qr-label">ここから商品情報が見られるよ♪</div>
                <img src="${qrCodeUrl}" alt="QRコード" class="qr-code">
            </div>
        `;
        addDownloadButton(name, nameRomaji, profileImageUrl, topic, productTitle, productImageUrl, productLinkUrl, qrCodeUrl);
    }

    function addDownloadButton(name, nameRomaji, profileImageUrl, topic, productTitle, productImageUrl, productLinkUrl, qrCodeUrl) {
        // 既存のダウンロードボタンを削除
        const oldBtn = document.getElementById('downloadBtn');
        if (oldBtn) oldBtn.remove();

        const downloadButton = document.createElement('button');
        downloadButton.textContent = '自己紹介ページをダウンロード';
        downloadButton.className = 'download-button';
        downloadButton.id = 'downloadBtn';
        downloadButton.style.marginTop = '2rem';
        downloadButton.onclick = (e) => {
            e.preventDefault();
            downloadProfilePage(name, nameRomaji, profileImageUrl, topic, productTitle, productImageUrl, productLinkUrl, qrCodeUrl);
        };
        previewContent.appendChild(downloadButton);
    }

    function downloadProfilePage(name, nameRomaji, profileImageUrl, topic, productTitle, productImageUrl, productLinkUrl, qrCodeUrl) {
        const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}の自己紹介</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        .profile-image {
            width: 220px;
            height: 220px;
            border-radius: 50%;
            object-fit: cover;
            background: #d6ede7;
            margin-bottom: 1.5rem;
            border: none;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        .profile-name {
            font-size: 2rem;
            font-weight: bold;
            color: #444;
            margin-bottom: 0.2rem;
            text-align: center;
        }
        .profile-name-romaji {
            font-size: 1.2rem;
            color: #7f8c8d;
            margin-bottom: 2rem;
            text-align: center;
        }
        .product-box {
            background: #fcf8e3;
            border: 3px solid #f7e3a1;
            border-radius: 10px;
            padding: 2rem 1rem;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }
        .product-topic {
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }
        .product-title {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
        }
        .product-image {
            width: 200px;
            height: 120px;
            object-fit: contain;
            border: 1px solid #eee;
            border-radius: 6px;
            background: #fff;
            margin-bottom: 1.2rem;
        }
        .qr-label {
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: #666;
            font-size: 1rem;
        }
        .qr-code {
            width: 120px;
            height: 120px;
            margin: 0 auto;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="${profileImageUrl}" alt="${name}" class="profile-image">
        <div class="profile-name">${name}</div>
        <div class="profile-name-romaji">${nameRomaji}</div>
        <div class="product-box">
            <div class="product-topic">${topic}</div>
            <div class="product-title">${productTitle}</div>
            <a href="${productLinkUrl}" target="_blank">
                <img src="${productImageUrl}" alt="${productTitle}" class="product-image">
            </a>
            <div class="qr-label">ここから商品情報が見られるよ♪</div>
            <img src="${qrCodeUrl}" alt="QRコード" class="qr-code">
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}-profile.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}); 